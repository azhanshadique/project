// Dashboard page JavaScript for CodeAcademy platform

let progressChart;
let activityChart;

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is authenticated
  if (window.authModule && window.authModule.isAuthenticated()) {
    // Load dashboard data
    loadDashboardData();
    
    // Initialize charts
    initCharts();
  }
});

// Load dashboard data
async function loadDashboardData() {
  try {
    // Get user from auth module
    const user = window.authModule.getUser();
    
    if (!user) return;
    
    // Update user info
    updateUserInfo(user);
    
    // Load progress data
    loadProgressData(user._id);
    
    // Load activity data
    loadActivityData(user._id);
    
    // Load badges
    loadBadges(user.progress.badges);
    
    // Load recommended challenges
    loadRecommendedChallenges();
    
    // Load leaderboard
    loadLeaderboard(user.username);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
  }
}

// Update user info
function updateUserInfo(user) {
  // Set username
  const dashboardUsername = document.getElementById('dashboard-username');
  if (dashboardUsername) {
    dashboardUsername.textContent = user.username;
  }
  
  // Set avatar
  const dashboardAvatar = document.getElementById('dashboard-avatar');
  if (dashboardAvatar) {
    dashboardAvatar.src = user.profilePicture;
  }
  
  // Set stats
  const challengesCompleted = document.getElementById('challenges-completed');
  if (challengesCompleted) {
    challengesCompleted.textContent = user.progress.completedChallenges.length;
  }
  
  const xpPoints = document.getElementById('xp-points');
  if (xpPoints) {
    xpPoints.textContent = user.progress.xpPoints;
  }
  
  const userLevel = document.getElementById('user-level');
  if (userLevel) {
    userLevel.textContent = user.progress.level;
  }
  
  // Set level progress
  const currentLevel = document.getElementById('current-level');
  const nextLevel = document.getElementById('next-level');
  const currentXp = document.getElementById('current-xp');
  const nextLevelXp = document.getElementById('next-level-xp');
  const levelProgressFill = document.getElementById('level-progress-fill');
  
  if (currentLevel && nextLevel && currentXp && nextLevelXp && levelProgressFill) {
    const level = user.progress.level;
    const xp = user.progress.xpPoints;
    const xpForCurrentLevel = level * 100;
    const xpForNextLevel = (level + 1) * 100;
    const xpProgress = xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const progressPercentage = (xpProgress / xpNeeded) * 100;
    
    currentLevel.textContent = level;
    nextLevel.textContent = level + 1;
    currentXp.textContent = xp;
    nextLevelXp.textContent = xpForNextLevel;
    levelProgressFill.style.width = `${progressPercentage}%`;
  }
}

// Load progress data
async function loadProgressData(userId) {
  try {
    // For demo, use mock data
    updateProgressChart();
  } catch (error) {
    console.error('Error loading progress data:', error);
  }
}

// Load activity data
async function loadActivityData(userId) {
  try {
    // For demo, use mock data
    updateActivityList();
    updateActivityChart();
  } catch (error) {
    console.error('Error loading activity data:', error);
  }
}

// Load badges
function loadBadges(badges) {
  const badgesContainer = document.getElementById('badges-container');
  if (!badgesContainer) return;
  
  // Clear container
  badgesContainer.innerHTML = '';
  
  // Add badges
  if (badges && badges.length > 0) {
    badges.forEach(badge => {
      const badgeItem = createBadgeItem(badge);
      badgesContainer.appendChild(badgeItem);
    });
  }
  
  // Add locked badges for demo
  const lockedBadges = [
    {
      name: '3-Day Streak',
      description: 'Practiced coding for 3 consecutive days',
      icon: 'fa-fire'
    },
    {
      name: 'Level 5 Achiever',
      description: 'Reached level 5',
      icon: 'fa-graduation-cap'
    },
    {
      name: 'Algorithm Master',
      description: 'Completed 10 algorithm challenges',
      icon: 'fa-trophy'
    }
  ];
  
  lockedBadges.forEach(badge => {
    const badgeItem = createBadgeItem(badge.name, badge.description, badge.icon, true);
    badgesContainer.appendChild(badgeItem);
  });
}

// Create badge item
function createBadgeItem(name, description, icon = 'fa-award', locked = false) {
  const badgeItem = document.createElement('div');
  badgeItem.className = `badge-item${locked ? ' locked' : ''}`;
  
  badgeItem.innerHTML = `
    <div class="badge-icon"><i class="fas ${icon}"></i></div>
    <div class="badge-info">
      <div class="badge-name">${name}</div>
      <div class="badge-description">${description || 'Achievement unlocked!'}</div>
    </div>
  `;
  
  return badgeItem;
}

// Load recommended challenges
function loadRecommendedChallenges() {
  const recommendedContainer = document.getElementById('recommended-challenges');
  if (!recommendedContainer) return;
  
  // Clear container
  recommendedContainer.innerHTML = '';
  
  // For demo, use mock data
  const recommendedChallenges = [
    {
      _id: 'challenge5',
      title: 'Valid Parentheses',
      difficulty: 'easy',
      category: 'algorithms'
    },
    {
      _id: 'challenge6',
      title: 'Merge Two Sorted Lists',
      difficulty: 'easy',
      category: 'data-structures'
    },
    {
      _id: 'challenge7',
      title: 'Maximum Subarray',
      difficulty: 'medium',
      category: 'algorithms'
    }
  ];
  
  // Add recommended challenges
  recommendedChallenges.forEach(challenge => {
    const recommendationItem = createRecommendationItem(challenge);
    recommendedContainer.appendChild(recommendationItem);
  });
}

// Create recommendation item
function createRecommendationItem(challenge) {
  const item = document.createElement('div');
  item.className = 'recommendation-item';
  
  item.innerHTML = `
    <div class="recommendation-info">
      <div class="recommendation-title">${challenge.title}</div>
      <div class="recommendation-meta">
        <span class="difficulty ${challenge.difficulty}">${capitalizeFirstLetter(challenge.difficulty)}</span>
        <span class="category">${capitalizeFirstLetter(challenge.category)}</span>
      </div>
    </div>
    <a href="editor.html?challenge=${challenge._id}" class="btn btn-small">Solve</a>
  `;
  
  return item;
}

// Load leaderboard
function loadLeaderboard(currentUsername) {
  const leaderboardList = document.getElementById('leaderboard-list');
  if (!leaderboardList) return;
  
  // Clear container
  leaderboardList.innerHTML = '';
  
  // For demo, use mock data
  const leaderboard = window.mockData.leaderboard;
  
  // Add current user
  const currentUserItem = document.createElement('div');
  currentUserItem.className = 'leaderboard-item current-user';
  
  // Find user's rank (for demo, assume rank 5)
  const userRank = 5;
  const userXp = 650;
  
  currentUserItem.innerHTML = `
    <div class="leaderboard-rank">${userRank}</div>
    <div class="leaderboard-user">
      <div class="user-avatar small">
        <img src="./assets/images/default-avatar.png" alt="User Avatar">
      </div>
      <div class="leaderboard-username">You</div>
    </div>
    <div class="leaderboard-xp">${userXp} XP</div>
  `;
  
  leaderboardList.appendChild(currentUserItem);
  
  // Add separator
  const separator = document.createElement('div');
  separator.className = 'leaderboard-separator';
  separator.innerHTML = `
    <div class="separator-line"></div>
    <div class="separator-text">Top Users</div>
    <div class="separator-line"></div>
  `;
  
  leaderboardList.appendChild(separator);
  
  // Add top users
  leaderboard.forEach((user, index) => {
    const leaderboardItem = document.createElement('div');
    leaderboardItem.className = 'leaderboard-item';
    
    leaderboardItem.innerHTML = `
      <div class="leaderboard-rank">${index + 1}</div>
      <div class="leaderboard-user">
        <div class="user-avatar small">
          <img src="${user.profilePicture}" alt="User Avatar">
        </div>
        <div class="leaderboard-username">${user.username}</div>
      </div>
      <div class="leaderboard-xp">${user.progress.xpPoints} XP</div>
    `;
    
    leaderboardList.appendChild(leaderboardItem);
  });
}

// Update activity list
function updateActivityList() {
  const activityList = document.getElementById('activity-list');
  if (!activityList) return;
  
  // Clear container
  activityList.innerHTML = '';
  
  // For demo, use mock data
  const activities = [
    {
      type: 'completion',
      title: 'Completed Challenge: Two Sum',
      time: '2 hours ago',
      xp: 10,
      icon: 'fa-check-circle'
    },
    {
      type: 'attempt',
      title: 'Attempted Challenge: Binary Search',
      time: 'Yesterday',
      xp: 0,
      icon: 'fa-code'
    },
    {
      type: 'badge',
      title: 'Earned Badge: First Challenge',
      time: '3 days ago',
      icon: 'fa-trophy'
    },
    {
      type: 'level',
      title: 'Reached Level 3',
      time: '1 week ago',
      icon: 'fa-level-up-alt'
    },
    {
      type: 'completion',
      title: 'Completed Challenge: Reverse a String',
      time: '1 week ago',
      xp: 8,
      icon: 'fa-check-circle'
    }
  ];
  
  // Add activities
  activities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    activityItem.innerHTML = `
      <div class="activity-icon"><i class="fas ${activity.icon}"></i></div>
      <div class="activity-details">
        <div class="activity-title">${activity.title}</div>
        <div class="activity-meta">${activity.time}${activity.xp ? ` • +${activity.xp} XP` : ''}</div>
      </div>
    `;
    
    activityList.appendChild(activityItem);
  });
}

// Initialize charts
function initCharts() {
  initProgressChart();
  initActivityChart();
}

// Initialize progress chart
function initProgressChart() {
  const progressChartCanvas = document.getElementById('progress-chart');
  if (!progressChartCanvas) return;
  
  const ctx = progressChartCanvas.getContext('2d');
  
  progressChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Algorithms', 'Data Structures', 'Web Development', 'Databases', 'Incomplete'],
      datasets: [{
        data: [25, 15, 10, 5, 45],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',   // Primary blue
          'rgba(20, 184, 166, 0.8)',   // Secondary teal
          'rgba(249, 115, 22, 0.8)',   // Accent orange
          'rgba(16, 185, 129, 0.8)',   // Success green
          'rgba(229, 231, 235, 0.5)'   // Gray (incomplete)
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(229, 231, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            boxWidth: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              return `${label}: ${value}%`;
            }
          }
        }
      },
      cutout: '70%'
    }
  });
}

// Update progress chart
function updateProgressChart() {
  if (!progressChart) return;
  
  // For demo, the chart is already initialized with mock data
}

// Initialize activity chart
function initActivityChart() {
  const activityChartCanvas = document.getElementById('activity-chart');
  if (!activityChartCanvas) return;
  
  const ctx = activityChartCanvas.getContext('2d');
  
  // Get last 7 days
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
  }
  
  activityChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [{
        label: 'Challenges Completed',
        data: [0, 1, 0, 2, 1, 0, 1],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Update activity chart
function updateActivityChart() {
  if (!activityChart) return;
  
  // For demo, the chart is already initialized with mock data
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add CSS for dashboard page
const style = document.createElement('style');
style.textContent = `
  /* Dashboard Styles */
  .dashboard-header {
    background-color: white;
    padding: var(--space-8) 0;
    box-shadow: var(--shadow-md);
  }
  
  .user-profile-summary {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }
  
  .user-info {
    flex-grow: 1;
  }
  
  .user-info h1 {
    margin-bottom: var(--space-2);
    font-size: 1.75rem;
  }
  
  .user-stats {
    display: flex;
    gap: var(--space-6);
  }
  
  .user-stat {
    text-align: center;
  }
  
  .stat-icon {
    font-size: 1.25rem;
    color: var(--primary-600);
    margin-bottom: var(--space-1);
  }
  
  .stat-value {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--space-1);
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--neutral-600);
  }
  
  .level-progress {
    margin-top: var(--space-6);
  }
  
  .level-progress-bar {
    height: 8px;
    background-color: var(--neutral-200);
    border-radius: var(--radius-full);
    overflow: hidden;
    margin-bottom: var(--space-2);
  }
  
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-600) 0%, var(--secondary-600) 100%);
    border-radius: var(--radius-full);
    transition: width var(--transition-normal);
  }
  
  .level-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
  
  .current-level, .next-level {
    font-weight: 600;
  }
  
  .xp-progress {
    color: var(--neutral-600);
  }
  
  .dashboard-main {
    padding: var(--space-8) 0 var(--space-16);
    background-color: var(--neutral-100);
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: var(--space-6);
  }
  
  .dashboard-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }
  
  .card-header {
    padding: var(--space-4);
    border-bottom: 1px solid var(--neutral-200);
  }
  
  .card-title {
    margin-bottom: 0;
    font-size: 1.25rem;
  }
  
  .card-content {
    padding: var(--space-4);
  }
  
  /* Grid layout for specific cards */
  .progress-summary {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  
  .activity-summary {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  
  .achievements {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  
  .recent-activity {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  
  .recommended-challenges {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  
  .leaderboard {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
  
  /* Chart container */
  .chart-container {
    width: 100%;
    height: 250px;
    position: relative;
  }
  
  /* Badges styles */
  .badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-3);
  }
  
  .badge-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--neutral-50);
    transition: transform var(--transition-fast);
  }
  
  .badge-item:hover {
    transform: translateY(-2px);
  }
  
  .badge-item.locked {
    opacity: 0.7;
    filter: grayscale(1);
  }
  
  .badge-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    background-color: var(--primary-100);
    color: var(--primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
  
  .badge-item.locked .badge-icon {
    background-color: var(--neutral-200);
    color: var(--neutral-500);
  }
  
  .badge-name {
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .badge-description {
    font-size: 0.875rem;
    color: var(--neutral-600);
  }
  
  /* Activity list styles */
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .activity-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--neutral-50);
    transition: transform var(--transition-fast);
  }
  
  .activity-item:hover {
    transform: translateY(-2px);
  }
  
  .activity-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background-color: var(--primary-100);
    color: var(--primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }
  
  .activity-title {
    font-weight: 500;
    margin-bottom: 2px;
  }
  
  .activity-meta {
    font-size: 0.875rem;
    color: var(--neutral-600);
  }
  
  /* Recommendation styles */
  .challenge-recommendations {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .recommendation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3);
    border-radius: var(--radius-md);
    background-color: var(--neutral-50);
    transition: transform var(--transition-fast);
  }
  
  .recommendation-item:hover {
    transform: translateY(-2px);
  }
  
  .recommendation-title {
    font-weight: 500;
    margin-bottom: var(--space-1);
  }
  
  .recommendation-meta {
    display: flex;
    gap: var(--space-2);
    font-size: 0.75rem;
  }
  
  .difficulty {
    font-weight: 500;
    padding: 2px 6px;
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
    font-weight: 500;
    padding: 2px 6px;
    border-radius: var(--radius-full);
    background-color: var(--primary-100);
    color: var(--primary-700);
  }
  
  /* Leaderboard styles */
  .leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .leaderboard-item {
    display: flex;
    align-items: center;
    padding: var(--space-2);
    border-radius: var(--radius-md);
    transition: background-color var(--transition-fast);
  }
  
  .leaderboard-item:hover {
    background-color: var(--neutral-100);
  }
  
  .leaderboard-item.current-user {
    background-color: var(--primary-50);
    font-weight: 500;
  }
  
  .leaderboard-rank {
    width: 30px;
    text-align: center;
    font-weight: 600;
  }
  
  .leaderboard-user {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-grow: 1;
  }
  
  .leaderboard-xp {
    font-weight: 500;
    color: var(--primary-600);
  }
  
  .leaderboard-separator {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: var(--space-3) 0;
    color: var(--neutral-500);
  }
  
  .separator-line {
    flex-grow: 1;
    height: 1px;
    background-color: var(--neutral-300);
  }
  
  .separator-text {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  /* Responsive styles */
  @media (max-width: 1200px) {
    .dashboard-grid {
      grid-template-columns: 1fr 1fr;
    }
    
    .progress-summary {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    
    .activity-summary {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }
    
    .achievements {
      grid-column: 1 / 3;
      grid-row: 2 / 3;
    }
    
    .recent-activity {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }
    
    .recommended-challenges {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
    
    .leaderboard {
      grid-column: 1 / 3;
      grid-row: 4 / 5;
    }
  }
  
  @media (max-width: 768px) {
    .dashboard-grid {
      grid-template-columns: 1fr;
    }
    
    .progress-summary,
    .activity-summary,
    .achievements,
    .recent-activity,
    .recommended-challenges,
    .leaderboard {
      grid-column: 1 / 2;
    }
    
    .progress-summary {
      grid-row: 1 / 2;
    }
    
    .activity-summary {
      grid-row: 2 / 3;
    }
    
    .achievements {
      grid-row: 3 / 4;
    }
    
    .recent-activity {
      grid-row: 4 / 5;
    }
    
    .recommended-challenges {
      grid-row: 5 / 6;
    }
    
    .leaderboard {
      grid-row: 6 / 7;
    }
    
    .user-profile-summary {
      flex-direction: column;
      text-align: center;
    }
    
    .user-stats {
      justify-content: center;
    }
  }
`;

document.head.appendChild(style);