// Home page JavaScript file for CodeAcademy platform

document.addEventListener('DOMContentLoaded', () => {
  // Load featured videos
  loadFeaturedVideos();
  
  // Load featured articles
  loadFeaturedArticles();
  
  // Load featured challenges
  loadFeaturedChallenges();
  
  // Animation for hero section
  animateHero();
});

// Load featured videos
async function loadFeaturedVideos() {
  const videoContainer = document.getElementById('video-container');
  if (!videoContainer) return;
  
  try {
    // Clear skeleton loaders
    videoContainer.innerHTML = '';
    
    // Fetch videos from API (or mock data)
    const response = await window.utils.fetchAPI('/api/videos');
    
    if (response.success) {
      // Use mock data for demo
      const videos = window.mockData.videos.slice(0, 3);
      
      videos.forEach(video => {
        const videoCard = createVideoCard(video);
        videoContainer.appendChild(videoCard);
      });
    } else {
      videoContainer.innerHTML = '<p class="error-message">Failed to load videos. Please try again later.</p>';
    }
  } catch (error) {
    console.error('Error loading videos:', error);
    videoContainer.innerHTML = '<p class="error-message">Failed to load videos. Please try again later.</p>';
  }
}

// Create video card element
function createVideoCard(video) {
  const card = document.createElement('div');
  card.className = 'video-card';
  card.innerHTML = `
    <div class="video-thumbnail">
      <img src="${video.thumbnailUrl}" alt="${video.title}">
      <span class="video-duration">${video.duration}</span>
    </div>
    <div class="video-info">
      <h3 class="video-title">${video.title}</h3>
      <p class="video-channel">${video.channelName}</p>
      <p class="video-meta">${video.views} views</p>
    </div>
  `;
  
  // Add click event to open video
  card.addEventListener('click', () => {
    openVideoModal(video);
  });
  
  return card;
}

// Open video modal
function openVideoModal(video) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal video-modal';
  modal.innerHTML = `
    <div class="modal-content video-modal-content">
      <span class="close-modal">&times;</span>
      <div class="video-player">
        <iframe 
          width="100%" 
          height="100%" 
          src="${video.embedUrl}" 
          title="${video.title}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <div class="video-details">
        <h2>${video.title}</h2>
        <p class="video-meta">${video.channelName} • ${video.views} views</p>
        <p class="video-description">${video.description}</p>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Show modal
  setTimeout(() => {
    modal.style.display = 'block';
  }, 10);
  
  // Close modal event
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    setTimeout(() => {
      modal.remove();
    }, 300);
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  });
}

// Load featured articles
async function loadFeaturedArticles() {
  const articleContainer = document.getElementById('article-container');
  if (!articleContainer) return;
  
  try {
    // Clear skeleton loaders
    articleContainer.innerHTML = '';
    
    // Fetch articles from API (or mock data)
    const response = await window.utils.fetchAPI('/api/articles');
    
    if (response.success) {
      // Use mock data for demo
      const articles = window.mockData.articles.slice(0, 3);
      
      articles.forEach(article => {
        const articleCard = createArticleCard(article);
        articleContainer.appendChild(articleCard);
      });
    } else {
      articleContainer.innerHTML = '<p class="error-message">Failed to load articles. Please try again later.</p>';
    }
  } catch (error) {
    console.error('Error loading articles:', error);
    articleContainer.innerHTML = '<p class="error-message">Failed to load articles. Please try again later.</p>';
  }
}

// Create article card element
function createArticleCard(article) {
  const card = document.createElement('div');
  card.className = 'article-card';
  card.innerHTML = `
    <div class="article-thumbnail">
      <img src="${article.thumbnailUrl}" alt="${article.title}">
    </div>
    <div class="article-info">
      <h3 class="article-title">${article.title}</h3>
      <p class="article-meta">By ${article.author} • ${article.readTime}</p>
      <p class="article-summary">${article.summary}</p>
    </div>
  `;
  
  // Add click event to open article
  card.addEventListener('click', () => {
    openArticleModal(article);
  });
  
  return card;
}

// Open article modal
function openArticleModal(article) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'modal article-modal';
  modal.innerHTML = `
    <div class="modal-content article-modal-content">
      <span class="close-modal">&times;</span>
      <div class="article-header">
        <h2>${article.title}</h2>
        <p class="article-meta">By ${article.author} • ${article.date} • ${article.readTime}</p>
      </div>
      <div class="article-featured-image">
        <img src="${article.thumbnailUrl}" alt="${article.title}">
      </div>
      <div class="article-content">
        <p>${article.content || article.summary}</p>
        <p>This is a placeholder for the full article content. In a real application, this would contain the complete article text with proper formatting, images, code examples, and more.</p>
        <p>The article would continue with more detailed explanations, examples, and insights about the topic. It would be structured with headings, paragraphs, lists, and other elements to make it easy to read and understand.</p>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.appendChild(modal);
  
  // Show modal
  setTimeout(() => {
    modal.style.display = 'block';
  }, 10);
  
  // Close modal event
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    setTimeout(() => {
      modal.remove();
    }, 300);
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  });
}

// Load featured challenges
async function loadFeaturedChallenges() {
  const challengeContainer = document.getElementById('challenge-container');
  if (!challengeContainer) return;
  
  try {
    // Clear skeleton loaders
    challengeContainer.innerHTML = '';
    
    // Fetch challenges from API (or mock data)
    const response = await window.utils.fetchAPI('/api/challenges');
    
    if (response.success) {
      // Use mock data for demo
      const challenges = window.mockData.challenges.slice(0, 3);
      
      challenges.forEach(challenge => {
        const challengeItem = createChallengeItem(challenge);
        challengeContainer.appendChild(challengeItem);
      });
    } else {
      challengeContainer.innerHTML = '<p class="error-message">Failed to load challenges. Please try again later.</p>';
    }
  } catch (error) {
    console.error('Error loading challenges:', error);
    challengeContainer.innerHTML = '<p class="error-message">Failed to load challenges. Please try again later.</p>';
  }
}

// Create challenge item element
function createChallengeItem(challenge) {
  const item = document.createElement('div');
  item.className = 'challenge-item';
  
  // Get difficulty class
  const difficultyClass = challenge.difficulty.toLowerCase();
  
  item.innerHTML = `
    <div class="challenge-info">
      <h3 class="challenge-title">${challenge.title}</h3>
      <div class="challenge-meta">
        <span class="difficulty ${difficultyClass}">${capitalizeFirstLetter(challenge.difficulty)}</span>
        <span class="category">${capitalizeFirstLetter(challenge.category)}</span>
        <span class="xp-reward">+${challenge.xpReward} XP</span>
      </div>
    </div>
    <a href="editor.html?challenge=${challenge._id}" class="btn btn-small">Solve</a>
  `;
  
  return item;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Animate hero section
function animateHero() {
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroContent) {
    heroContent.classList.add('animate-slideInUp');
    heroContent.style.animationDelay = '0.2s';
  }
  
  if (heroImage) {
    heroImage.classList.add('animate-slideInUp');
    heroImage.style.animationDelay = '0.4s';
  }
}

// Add CSS for animations and components that are not in the main CSS
const style = document.createElement('style');
style.textContent = `
  /* Video Card Styles */
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-6);
  }
  
  .video-card {
    background: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    cursor: pointer;
  }
  
  .video-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .video-thumbnail {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }
  
  .video-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
  
  .video-card:hover .video-thumbnail img {
    transform: scale(1.05);
  }
  
  .video-duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
  }
  
  .video-info {
    padding: var(--space-4);
  }
  
  .video-title {
    font-size: 1.125rem;
    margin-bottom: var(--space-2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .video-channel {
    color: var(--primary-600);
    font-weight: 500;
    margin-bottom: var(--space-1);
  }
  
  .video-meta {
    color: var(--neutral-600);
    font-size: 0.875rem;
  }
  
  /* Article Card Styles */
  .article-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-6);
  }
  
  .article-card {
    background: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    cursor: pointer;
  }
  
  .article-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .article-thumbnail {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }
  
  .article-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
  
  .article-card:hover .article-thumbnail img {
    transform: scale(1.05);
  }
  
  .article-info {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .article-title {
    font-size: 1.125rem;
    margin-bottom: var(--space-2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .article-meta {
    color: var(--neutral-600);
    font-size: 0.875rem;
    margin-bottom: var(--space-2);
  }
  
  .article-summary {
    color: var(--neutral-700);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 0;
    flex-grow: 1;
  }
  
  /* Challenge Item Styles */
  .challenge-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-top: var(--space-6);
  }
  
  .challenge-item {
    background: white;
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    box-shadow: var(--shadow-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  }
  
  .challenge-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
  
  .challenge-title {
    font-size: 1.125rem;
    margin-bottom: var(--space-2);
  }
  
  .challenge-meta {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
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
  
  /* Hero Section Styles */
  .hero {
    padding: var(--space-16) 0;
    background-color: var(--primary-50);
    position: relative;
    overflow: hidden;
  }
  
  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: radial-gradient(circle at 20% 35%, var(--primary-100) 0%, transparent 50%),
                     radial-gradient(circle at 80% 70%, var(--secondary-100) 0%, transparent 50%);
    opacity: 0.8;
  }
  
  .hero .container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: var(--space-8);
  }
  
  .hero-content {
    flex: 1;
  }
  
  .hero-title {
    font-size: 3rem;
    line-height: 1.2;
    font-weight: 700;
    margin-bottom: var(--space-4);
    background: linear-gradient(135deg, var(--primary-700) 0%, var(--secondary-600) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  
  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--neutral-700);
    margin-bottom: var(--space-6);
  }
  
  .hero-actions {
    display: flex;
    gap: var(--space-4);
  }
  
  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hero-image img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
  }
  
  /* Featured Paths Section */
  .featured-paths {
    padding: var(--space-16) 0;
  }
  
  .path-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
  
  .path-card {
    background: white;
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  }
  
  .path-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .path-icon {
    width: 64px;
    height: 64px;
    background: var(--primary-100);
    color: var(--primary-600);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-4);
    font-size: 1.75rem;
    transition: transform var(--transition-normal), background-color var(--transition-normal), color var(--transition-normal);
  }
  
  .path-card:hover .path-icon {
    transform: scale(1.1);
    background-color: var(--primary-600);
    color: white;
  }
  
  .path-card h3 {
    margin-bottom: var(--space-3);
    font-size: 1.25rem;
  }
  
  .path-card p {
    color: var(--neutral-600);
    margin-bottom: var(--space-4);
  }
  
  /* Feature Section */
  .features {
    padding: var(--space-16) 0;
    background-color: var(--neutral-50);
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-8);
    margin-top: var(--space-8);
  }
  
  .feature-item {
    text-align: center;
  }
  
  .feature-icon {
    width: 64px;
    height: 64px;
    background: var(--primary-100);
    color: var(--primary-600);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto var(--space-4);
    font-size: 1.75rem;
    transition: transform var(--transition-normal);
  }
  
  .feature-item:hover .feature-icon {
    transform: translateY(-4px);
  }
  
  .feature-item h3 {
    margin-bottom: var(--space-3);
    font-size: 1.25rem;
  }
  
  .feature-item p {
    color: var(--neutral-600);
  }
  
  /* CTA Section */
  .cta {
    padding: var(--space-16) 0;
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-600) 100%);
    color: white;
    text-align: center;
  }
  
  .cta h2 {
    color: white;
    font-size: 2.5rem;
    margin-bottom: var(--space-4);
  }
  
  .cta p {
    font-size: 1.25rem;
    margin-bottom: var(--space-8);
    opacity: 0.9;
  }
  
  .cta .btn-primary {
    background-color: white;
    color: var(--primary-700);
    border: none;
    font-size: 1.125rem;
    padding: var(--space-3) var(--space-6);
  }
  
  .cta .btn-primary:hover {
    background-color: var(--neutral-100);
  }
  
  /* Modal Styles */
  .video-modal-content {
    max-width: 800px;
    padding: 0;
    overflow: hidden;
  }
  
  .video-player {
    aspect-ratio: 16 / 9;
    width: 100%;
  }
  
  .video-details {
    padding: var(--space-4) var(--space-6) var(--space-6);
  }
  
  .video-details h2 {
    margin-bottom: var(--space-2);
  }
  
  .article-modal-content {
    max-width: 800px;
  }
  
  .article-header {
    margin-bottom: var(--space-4);
  }
  
  .article-featured-image {
    margin-bottom: var(--space-6);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  
  .article-featured-image img {
    width: 100%;
    height: auto;
  }
  
  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .hero-title {
      font-size: 2.5rem;
    }
  }
  
  @media (max-width: 768px) {
    .hero .container {
      flex-direction: column;
    }
    
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1.125rem;
    }
    
    .hero-image {
      margin-top: var(--space-8);
    }
    
    .features-grid {
      grid-template-columns: 1fr;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

document.head.appendChild(style);