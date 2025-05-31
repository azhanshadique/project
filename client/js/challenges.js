// Challenges page JavaScript file for CodeAcademy platform

document.addEventListener('DOMContentLoaded', () => {
  // Load challenges
  loadChallenges();
  
  // Setup event listeners
  setupFilterListeners();
  setupSearchListener();
  setupSortListener();
  setupPaginationListeners();
});

// Global state
const state = {
  challenges: [],
  filteredChallenges: [],
  currentPage: 1,
  totalPages: 1,
  perPage: 9,
  filters: {
    difficulty: [],
    category: [],
    source: []
  },
  sort: 'newest',
  search: ''
};

// Load challenges
async function loadChallenges() {
  const challengesContainer = document.getElementById('challenges-container');
  if (!challengesContainer) return;
  
  try {
    // Show skeleton loaders
    challengesContainer.innerHTML = '';
    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-loader challenge-card-skeleton';
      challengesContainer.appendChild(skeleton);
    }
    
    // Fetch challenges from API (or mock data)
    const response = await window.utils.fetchAPI('/api/challenges');
    
    if (response.success) {
      // For demo, use mock data and create more challenges
      let challenges = window.mockData.challenges;
      
      // Create more challenges for demo pagination
      const extraChallenges = [];
      for (let i = 0; i < 15; i++) {
        const baseChallenge = challenges[i % challenges.length];
        extraChallenges.push({
          ...baseChallenge,
          _id: `extra-${i}`,
          title: `${baseChallenge.title} ${i + 1}`,
          createdAt: new Date(Date.now() - i * 86400000).toISOString() // Each a day older
        });
      }
      
      challenges = [...challenges, ...extraChallenges];
      
      // Update state
      state.challenges = challenges;
      state.filteredChallenges = [...challenges];
      state.totalPages = Math.ceil(challenges.length / state.perPage);
      
      // Render challenges
      renderChallenges();
      updatePagination();
    } else {
      challengesContainer.innerHTML = '<p class="error-message">Failed to load challenges. Please try again later.</p>';
    }
  } catch (error) {
    console.error('Error loading challenges:', error);
    challengesContainer.innerHTML = '<p class="error-message">Failed to load challenges. Please try again later.</p>';
  }
}

// Render challenges based on current state
function renderChallenges() {
  const challengesContainer = document.getElementById('challenges-container');
  if (!challengesContainer) return;
  
  // Clear container
  challengesContainer.innerHTML = '';
  
  // Get current page challenges
  const startIndex = (state.currentPage - 1) * state.perPage;
  const endIndex = startIndex + state.perPage;
  const currentChallenges = state.filteredChallenges.slice(startIndex, endIndex);
  
  if (currentChallenges.length === 0) {
    challengesContainer.innerHTML = '<p class="no-results">No challenges found matching your filters. Try adjusting your criteria.</p>';
    return;
  }
  
  // Create challenge cards
  currentChallenges.forEach(challenge => {
    const card = createChallengeCard(challenge);
    challengesContainer.appendChild(card);
  });
}

// Create challenge card element
function createChallengeCard(challenge) {
  const card = document.createElement('div');
  card.className = 'challenge-card';
  
  // Get difficulty class
  const difficultyClass = challenge.difficulty.toLowerCase();
  
  // Format date
  const formattedDate = window.utils.formatDate(challenge.createdAt);
  
  card.innerHTML = `
    <div class="card-header">
      <span class="difficulty ${difficultyClass}">${capitalizeFirstLetter(challenge.difficulty)}</span>
      <span class="source">${challenge.source}</span>
    </div>
    <div class="card-content">
      <h3 class="challenge-title">${challenge.title}</h3>
      <div class="challenge-meta">
        <span class="category">${capitalizeFirstLetter(challenge.category)}</span>
        <span class="xp-reward">+${challenge.xpReward} XP</span>
      </div>
    </div>
    <div class="card-footer">
      <span class="challenge-date">${formattedDate}</span>
      <a href="editor.html?challenge=${challenge._id}" class="btn btn-primary">Solve Challenge</a>
    </div>
  `;
  
  return card;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Setup filter listeners
function setupFilterListeners() {
  // Difficulty filters
  const difficultyFilters = document.querySelectorAll('.difficulty-filter');
  difficultyFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      const value = filter.value;
      if (filter.checked) {
        if (!state.filters.difficulty.includes(value)) {
          state.filters.difficulty.push(value);
        }
      } else {
        state.filters.difficulty = state.filters.difficulty.filter(d => d !== value);
      }
      applyFilters();
    });
  });
  
  // Category filters
  const categoryFilters = document.querySelectorAll('.category-filter');
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      const value = filter.value;
      if (filter.checked) {
        if (!state.filters.category.includes(value)) {
          state.filters.category.push(value);
        }
      } else {
        state.filters.category = state.filters.category.filter(c => c !== value);
      }
      applyFilters();
    });
  });
  
  // Source filters
  const sourceFilters = document.querySelectorAll('.source-filter');
  sourceFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      const value = filter.value;
      if (filter.checked) {
        if (!state.filters.source.includes(value)) {
          state.filters.source.push(value);
        }
      } else {
        state.filters.source = state.filters.source.filter(s => s !== value);
      }
      applyFilters();
    });
  });
  
  // Clear filters button
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      // Uncheck all checkboxes
      document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
      
      // Clear filter state
      state.filters.difficulty = [];
      state.filters.category = [];
      state.filters.source = [];
      
      // Apply filters (resets to all challenges)
      applyFilters();
    });
  }
}

// Setup search listener
function setupSearchListener() {
  const searchInput = document.getElementById('challenge-search');
  const searchBtn = document.getElementById('search-btn');
  
  if (searchInput && searchBtn) {
    // Search on enter key
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        state.search = searchInput.value.trim().toLowerCase();
        applyFilters();
      }
    });
    
    // Search on button click
    searchBtn.addEventListener('click', () => {
      state.search = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }
}

// Setup sort listener
function setupSortListener() {
  const sortSelect = document.getElementById('sort-select');
  
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      applySorting();
      renderChallenges();
    });
  }
}

// Setup pagination listeners
function setupPaginationListeners() {
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  
  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (state.currentPage > 1) {
        state.currentPage--;
        renderChallenges();
        updatePagination();
        // Scroll to top of challenges
        document.querySelector('.challenges-section').scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    nextPageBtn.addEventListener('click', () => {
      if (state.currentPage < state.totalPages) {
        state.currentPage++;
        renderChallenges();
        updatePagination();
        // Scroll to top of challenges
        document.querySelector('.challenges-section').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Apply all filters and update view
function applyFilters() {
  let filteredChallenges = [...state.challenges];
  
  // Apply difficulty filter
  if (state.filters.difficulty.length > 0) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      state.filters.difficulty.includes(challenge.difficulty)
    );
  }
  
  // Apply category filter
  if (state.filters.category.length > 0) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      state.filters.category.includes(challenge.category)
    );
  }
  
  // Apply source filter
  if (state.filters.source.length > 0) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      state.filters.source.includes(challenge.source)
    );
  }
  
  // Apply search
  if (state.search) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      challenge.title.toLowerCase().includes(state.search) ||
      challenge.category.toLowerCase().includes(state.search)
    );
  }
  
  // Update state
  state.filteredChallenges = filteredChallenges;
  state.totalPages = Math.ceil(filteredChallenges.length / state.perPage);
  state.currentPage = 1; // Reset to first page when filtering
  
  // Apply sorting
  applySorting();
  
  // Update UI
  renderChallenges();
  updatePagination();
}

// Apply sorting
function applySorting() {
  switch (state.sort) {
    case 'newest':
      state.filteredChallenges.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      state.filteredChallenges.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'xp-high':
      state.filteredChallenges.sort((a, b) => b.xpReward - a.xpReward);
      break;
    case 'xp-low':
      state.filteredChallenges.sort((a, b) => a.xpReward - b.xpReward);
      break;
    case 'difficulty-easy':
      state.filteredChallenges.sort((a, b) => {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      });
      break;
    case 'difficulty-hard':
      state.filteredChallenges.sort((a, b) => {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      });
      break;
    default:
      state.filteredChallenges.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

// Update pagination UI
function updatePagination() {
  const currentPageElement = document.getElementById('current-page');
  const totalPagesElement = document.getElementById('total-pages');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  
  if (currentPageElement) {
    currentPageElement.textContent = state.currentPage;
  }
  
  if (totalPagesElement) {
    totalPagesElement.textContent = state.totalPages;
  }
  
  if (prevPageBtn) {
    prevPageBtn.disabled = state.currentPage <= 1;
  }
  
  if (nextPageBtn) {
    nextPageBtn.disabled = state.currentPage >= state.totalPages;
  }
}

// Add CSS for challenges page
const style = document.createElement('style');
style.textContent = `
  /* Challenges Page Styles */
  .page-header {
    background-color: var(--primary-600);
    color: white;
    padding: var(--space-12) 0;
    text-align: center;
  }
  
  .page-header h1 {
    color: white;
    margin-bottom: var(--space-2);
  }
  
  .page-header p {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .challenges-section {
    padding: var(--space-8) 0 var(--space-16);
  }
  
  .challenges-section .container {
    display: flex;
    gap: var(--space-6);
  }
  
  .challenges-sidebar {
    width: 280px;
    flex-shrink: 0;
  }
  
  .challenges-content {
    flex-grow: 1;
  }
  
  .filter-section {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--space-4);
    position: sticky;
    top: calc(60px + var(--space-4));
  }
  
  .filter-section h3 {
    margin-bottom: var(--space-4);
    font-size: 1.125rem;
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--neutral-200);
  }
  
  .filter-group {
    margin-bottom: var(--space-4);
  }
  
  .filter-group h4 {
    font-size: 1rem;
    margin-bottom: var(--space-2);
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
  }
  
  .filter-option input {
    cursor: pointer;
  }
  
  .challenges-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6);
  }
  
  .search-bar {
    display: flex;
    width: 100%;
    max-width: 400px;
  }
  
  .search-bar input {
    flex-grow: 1;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--neutral-300);
    border-right: none;
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }
  
  .search-bar button {
    background-color: var(--primary-600);
    color: white;
    border: none;
    padding: var(--space-2) var(--space-3);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    cursor: pointer;
  }
  
  .challenges-sort {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .challenges-sort label {
    font-weight: 500;
    color: var(--neutral-700);
  }
  
  .challenges-sort select {
    padding: var(--space-1) var(--space-2);
    border: 1px solid var(--neutral-300);
    border-radius: var(--radius-md);
    background-color: white;
  }
  
  .challenges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-6);
  }
  
  .challenge-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  }
  
  .challenge-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .challenge-card .card-header {
    padding: var(--space-3) var(--space-4);
    background-color: var(--neutral-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .challenge-card .card-content {
    padding: var(--space-4);
    flex-grow: 1;
  }
  
  .challenge-card .card-footer {
    padding: var(--space-3) var(--space-4);
    background-color: var(--neutral-50);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--neutral-200);
  }
  
  .challenge-title {
    font-size: 1.125rem;
    margin-bottom: var(--space-2);
  }
  
  .challenge-meta {
    display: flex;
    gap: var(--space-2);
  }
  
  .challenge-date {
    color: var(--neutral-600);
    font-size: 0.875rem;
  }
  
  .difficulty {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: var(--radius-full);
  }
  
  .difficulty.easy {
    background-color: var(--success-100);
    color: var(--success-700);
  }
  
  .difficulty.medium {
    background-color: var(--warning-100);
    color: var(--warning-700);
  }
  
  .difficulty.hard {
    background-color: var(--error-100);
    color: var(--error-700);
  }
  
  .source {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--neutral-600);
  }
  
  .category {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    background-color: var(--primary-100);
    color: var(--primary-700);
  }
  
  .xp-reward {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    background-color: var(--secondary-100);
    color: var(--secondary-700);
  }
  
  .pagination {
    margin-top: var(--space-8);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-4);
  }
  
  .pagination-btn {
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--primary-600);
    background-color: white;
    color: var(--primary-600);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 500;
    transition: all var(--transition-fast);
  }
  
  .pagination-btn:hover:not(:disabled) {
    background-color: var(--primary-50);
  }
  
  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .page-info {
    font-weight: 500;
  }
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: var(--space-8);
    background-color: var(--neutral-100);
    border-radius: var(--radius-lg);
    color: var(--neutral-700);
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .challenges-section .container {
      flex-direction: column;
    }
    
    .challenges-sidebar {
      width: 100%;
    }
    
    .filter-section {
      position: static;
    }
    
    .filter-options {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .challenges-header {
      flex-direction: column;
      gap: var(--space-4);
      align-items: flex-start;
    }
    
    .search-bar {
      max-width: 100%;
    }
    
    .challenges-grid {
      grid-template-columns: 1fr;
    }
  }
`;

document.head.appendChild(style);