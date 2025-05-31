// Profile page JavaScript for CodeAcademy platform

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is authenticated
  if (window.authModule && window.authModule.isAuthenticated()) {
    // Load profile data
    loadProfileData();
    
    // Setup event listeners
    setupEventListeners();
  }
});

// Load profile data
async function loadProfileData() {
  try {
    // Get user from auth module
    const user = window.authModule.getUser();
    
    if (!user) return;
    
    // Update profile info
    updateProfileInfo(user);
    
    // Load submissions
    loadSubmissions(user._id);
    
    // Load badges
    loadBadges(user.progress.badges);
  } catch (error) {
    console.error('Error loading profile data:', error);
  }
}

// Update profile info
function updateProfileInfo(user) {
  // Set username
  const profileUsername = document.getElementById('profile-username');
  if (profileUsername) {
    profileUsername.textContent = user.username;
  }
  
  // Set avatar
  const profileAvatar = document.getElementById('profile-avatar');
  if (profileAvatar) {
    profileAvatar.src = user.profilePicture;
  }
  
  // Set stats
  const profileChallenges = document.getElementById('profile-challenges');
  if (profileChallenges) {
    profileChallenges.textContent = user.progress.completedChallenges.length;
  }
  
  const profileXp = document.getElementById('profile-xp');
  if (profileXp) {
    profileXp.textContent = user.progress.xpPoints;
  }
  
  const profileLevel = document.getElementById('profile-level');
  if (profileLevel) {
    profileLevel.textContent = user.progress.level;
  }
  
  const profileBadges = document.getElementById('profile-badges');
  if (profileBadges) {
    profileBadges.textContent = user.progress.badges.length;
  }
  
  // Set tagline (default if not set)
  const profileTagline = document.getElementById('profile-tagline');
  if (profileTagline) {
    profileTagline.textContent = user.tagline || 'Coding enthusiast | Learning JavaScript';
  }
  
  // Set about me
  const aboutMeContent = document.getElementById('about-me-content');
  if (aboutMeContent) {
    aboutMeContent.textContent = user.bio || 'No bio yet. Click \'Edit Profile\' to add your bio.';
  }
  
  // Set skills
  const skillsList = document.getElementById('skills-list');
  if (skillsList) {
    // Clear skills
    skillsList.innerHTML = '';
    
    // Add skills (default if not set)
    const skills = user.skills || ['JavaScript', 'HTML', 'CSS'];
    
    skills.forEach(skill => {
      const skillTag = document.createElement('span');
      skillTag.className = 'skill-tag';
      skillTag.textContent = skill;
      skillsList.appendChild(skillTag);
    });
  }
}

// Load submissions
async function loadSubmissions(userId) {
  try {
    // For demo, use mock data
    const submissions = window.mockData.submissions;
    
    // Update submissions list
    updateSubmissionsList(submissions);
    
    // Update submissions table
    updateSubmissionsTable(submissions);
  } catch (error) {
    console.error('Error loading submissions:', error);
  }
}

// Update submissions list
function updateSubmissionsList(submissions) {
  const submissionsList = document.getElementById('latest-submissions-list');
  if (!submissionsList) return;
  
  // Clear list
  submissionsList.innerHTML = '';
  
  // Add submissions
  submissions.forEach(submission => {
    const submissionItem = document.createElement('div');
    submissionItem.className = 'submission-item';
    
    // Format date
    const formattedDate = window.utils.formatDate(submission.submittedAt);
    
    submissionItem.innerHTML = `
      <div class="submission-challenge">${submission.challenge.title}</div>
      <div class="submission-details">
        <span class="submission-language">${capitalizeFirstLetter(submission.language)}</span>
        <span class="submission-status ${submission.status === 'accepted' ? 'success' : 'failed'}">${formatStatus(submission.status)}</span>
      </div>
      <div class="submission-date">${formattedDate}</div>
    `;
    
    submissionsList.appendChild(submissionItem);
  });
}

// Update submissions table
function updateSubmissionsTable(submissions) {
  const submissionsTableBody = document.getElementById('submissions-table-body');
  if (!submissionsTableBody) return;
  
  // Clear table
  submissionsTableBody.innerHTML = '';
  
  // Add submissions
  submissions.forEach(submission => {
    const row = document.createElement('tr');
    
    // Format date
    const formattedDate = window.utils.formatDate(submission.submittedAt);
    
    row.innerHTML = `
      <td>${submission.challenge.title}</td>
      <td><span class="status-badge ${submission.status === 'accepted' ? 'success' : 'failed'}">${formatStatus(submission.status)}</span></td>
      <td>${capitalizeFirstLetter(submission.language)}</td>
      <td>${submission.executionTime}ms</td>
      <td>${submission.memoryUsed}MB</td>
      <td>${formattedDate}</td>
      <td>
        <button class="btn-icon view-submission" data-id="${submission._id}"><i class="fas fa-eye"></i></button>
        <button class="btn-icon edit-submission" data-id="${submission._id}"><i class="fas fa-code"></i></button>
      </td>
    `;
    
    submissionsTableBody.appendChild(row);
  });
  
  // Add event listeners to buttons
  document.querySelectorAll('.view-submission').forEach(button => {
    button.addEventListener('click', () => {
      const submissionId = button.dataset.id;
      viewSubmission(submissionId);
    });
  });
  
  document.querySelectorAll('.edit-submission').forEach(button => {
    button.addEventListener('click', () => {
      const submissionId = button.dataset.id;
      editSubmission(submissionId);
    });
  });
}

// Load badges
function loadBadges(badges) {
  const badgesContainer = document.getElementById('all-badges-container');
  if (!badgesContainer) return;
  
  // Clear container
  badgesContainer.innerHTML = '';
  
  // Add badges
  if (badges && badges.length > 0) {
    badges.forEach(badge => {
      const badgeCard = createBadgeCard(badge);
      badgesContainer.appendChild(badgeCard);
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
    },
    {
      name: 'Data Structure Pro',
      description: 'Completed 5 data structure challenges',
      icon: 'fa-database'
    },
    {
      name: 'Code Ninja',
      description: 'Solved a hard challenge in under 10 minutes',
      icon: 'fa-code'
    }
  ];
  
  lockedBadges.forEach(badge => {
    const badgeCard = createBadgeCard(badge.name, badge.description, badge.icon, true);
    badgesContainer.appendChild(badgeCard);
  });
}

// Create badge card
function createBadgeCard(name, description, icon = 'fa-award', locked = false) {
  const badgeCard = document.createElement('div');
  badgeCard.className = `badge-card${locked ? ' locked' : ''}`;
  
  badgeCard.innerHTML = `
    <div class="badge-icon"><i class="fas ${icon}"></i></div>
    <div class="badge-info">
      <div class="badge-name">${name}</div>
      <div class="badge-description">${description || 'Achievement unlocked!'}</div>
      <div class="badge-earned">${locked ? 'Not earned yet' : 'Earned 3 days ago'}</div>
    </div>
  `;
  
  return badgeCard;
}

// View submission
function viewSubmission(submissionId) {
  console.log(`Viewing submission: ${submissionId}`);
  // In a real app, this would open a modal or navigate to a submission details page
  alert(`Viewing submission ${submissionId} details`);
}

// Edit submission
function editSubmission(submissionId) {
  console.log(`Editing submission: ${submissionId}`);
  // In a real app, this would navigate to the code editor with the submission code
  window.location.href = `editor.html?submission=${submissionId}`;
}

// Setup event listeners
function setupEventListeners() {
  // Profile tabs
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding tab content
      tabContents.forEach(content => {
        if (content.id === `${tabName}-tab`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
  
  // Edit profile button
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const editProfileModal = document.getElementById('edit-profile-modal');
  
  if (editProfileBtn && editProfileModal) {
    editProfileBtn.addEventListener('click', () => {
      // Show edit profile modal
      editProfileModal.style.display = 'block';
      
      // Populate form with current values
      const user = window.authModule.getUser();
      
      if (user) {
        document.getElementById('edit-name').value = user.name || '';
        document.getElementById('edit-tagline').value = user.tagline || 'Coding enthusiast | Learning JavaScript';
        document.getElementById('edit-bio').value = user.bio || '';
        document.getElementById('edit-skills').value = (user.skills || ['JavaScript', 'HTML', 'CSS']).join(', ');
      }
    });
  }
  
  // Close modals
  const closeModalBtns = document.querySelectorAll('.close-modal');
  
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
  
  // Edit profile form
  const editProfileForm = document.getElementById('edit-profile-form');
  
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('edit-name').value;
      const tagline = document.getElementById('edit-tagline').value;
      const bio = document.getElementById('edit-bio').value;
      const skills = document.getElementById('edit-skills').value.split(',').map(skill => skill.trim());
      
      // Update user in auth module (for demo)
      const user = window.authModule.getUser();
      
      if (user) {
        user.name = name;
        user.tagline = tagline;
        user.bio = bio;
        user.skills = skills;
        
        // Update UI
        updateProfileInfo(user);
      }
      
      // Close modal
      editProfileModal.style.display = 'none';
    });
  }
  
  // Edit avatar button
  const editAvatarBtn = document.getElementById('edit-avatar-btn');
  
  if (editAvatarBtn) {
    editAvatarBtn.addEventListener('click', () => {
      // In a real app, this would open a file picker or avatar selection modal
      alert('Avatar editing functionality would be implemented here.');
    });
  }
  
  // Delete account button
  const deleteAccountBtn = document.getElementById('delete-account-btn');
  const deleteAccountModal = document.getElementById('delete-account-modal');
  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  const deleteConfirmInput = document.getElementById('delete-confirm');
  
  if (deleteAccountBtn && deleteAccountModal) {
    deleteAccountBtn.addEventListener('click', () => {
      // Show delete account modal
      deleteAccountModal.style.display = 'block';
    });
  }
  
  if (deleteConfirmInput && confirmDeleteBtn) {
    deleteConfirmInput.addEventListener('input', () => {
      // Enable confirm button only if input is 'DELETE'
      confirmDeleteBtn.disabled = deleteConfirmInput.value !== 'DELETE';
    });
  }
  
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (deleteConfirmInput.value === 'DELETE') {
        // In a real app, this would send a delete request to the server
        alert('Account deletion would be processed here.');
        
        // Log out the user
        window.authModule.logout();
        
        // Redirect to home page
        window.location.href = 'index.html';
      }
    });
  }
  
  // Account settings form
  const accountSettingsForm = document.getElementById('account-settings-form');
  
  if (accountSettingsForm) {
    accountSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const username = document.getElementById('settings-username').value;
      const email = document.getElementById('settings-email').value;
      
      // In a real app, this would send an update request to the server
      alert(`Account settings would be updated with username: ${username} and email: ${email}`);
    });
  }
  
  // Change password form
  const changePasswordForm = document.getElementById('change-password-form');
  
  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const currentPassword = document.getElementById('current-password').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmNewPassword = document.getElementById('confirm-new-password').value;
      
      // Validate passwords
      if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match.');
        return;
      }
      
      // In a real app, this would send a change password request to the server
      alert('Password would be updated here.');
      
      // Clear form
      changePasswordForm.reset();
    });
  }
  
  // Notification settings form
  const notificationSettingsForm = document.getElementById('notification-settings-form');
  
  if (notificationSettingsForm) {
    notificationSettingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const emailNotifications = document.getElementById('email-notifications').checked;
      const achievementNotifications = document.getElementById('achievement-notifications').checked;
      const challengeNotifications = document.getElementById('challenge-notifications').checked;
      const marketingEmails = document.getElementById('marketing-emails').checked;
      
      // In a real app, this would send an update request to the server
      alert('Notification preferences would be updated here.');
    });
  }
  
  // Submission filters
  const statusFilter = document.getElementById('status-filter');
  const languageFilter = document.getElementById('language-filter');
  const submissionSearch = document.getElementById('submission-search');
  const submissionSearchBtn = document.getElementById('submission-search-btn');
  
  if (statusFilter) {
    statusFilter.addEventListener('change', filterSubmissions);
  }
  
  if (languageFilter) {
    languageFilter.addEventListener('change', filterSubmissions);
  }
  
  if (submissionSearchBtn && submissionSearch) {
    submissionSearchBtn.addEventListener('click', filterSubmissions);
    
    // Search on enter key
    submissionSearch.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        filterSubmissions();
      }
    });
  }
}

// Filter submissions
function filterSubmissions() {
  // Get filter values
  const statusFilter = document.getElementById('status-filter').value;
  const languageFilter = document.getElementById('language-filter').value;
  const searchQuery = document.getElementById('submission-search').value.toLowerCase();
  
  // Get all rows
  const rows = document.querySelectorAll('#submissions-table-body tr');
  
  // Filter rows
  rows.forEach(row => {
    const status = row.querySelector('.status-badge').textContent;
    const language = row.cells[2].textContent;
    const challenge = row.cells[0].textContent.toLowerCase();
    
    // Check if row matches filters
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'accepted' && status === 'Accepted') ||
                          (statusFilter === 'failed' && status !== 'Accepted');
    
    const matchesLanguage = languageFilter === 'all' || language.toLowerCase() === languageFilter;
    
    const matchesSearch = searchQuery === '' || challenge.includes(searchQuery);
    
    // Show/hide row
    if (matchesStatus && matchesLanguage && matchesSearch) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Format submission status
function formatStatus(status) {
  switch (status) {
    case 'accepted':
      return 'Accepted';
    case 'wrong_answer':
      return 'Wrong Answer';
    case 'time_limit_exceeded':
      return 'Time Limit Exceeded';
    case 'memory_limit_exceeded':
      return 'Memory Limit Exceeded';
    case 'runtime_error':
      return 'Runtime Error';
    case 'compilation_error':
      return 'Compilation Error';
    default:
      return capitalizeFirstLetter(status);
  }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add CSS for profile page
const style = document.createElement('style');
style.textContent = `
  /* Profile Styles */
  .profile-header {
    padding: var(--space-8) 0;
  }
  
  .profile-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }
  
  .profile-cover {
    height: 180px;
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%);
    position: relative;
  }
  
  .profile-info {
    position: relative;
    padding: 0 var(--space-6) var(--space-6);
  }
  
  .profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: var(--radius-full);
    border: 4px solid white;
    overflow: hidden;
    position: absolute;
    top: -60px;
    left: var(--space-6);
    background-color: white;
  }
  
  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .edit-avatar-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-full);
    background-color: var(--primary-600);
    color: white;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color var(--transition-fast);
  }
  
  .edit-avatar-btn:hover {
    background-color: var(--primary-700);
  }
  
  .profile-details {
    margin-left: 140px;
    padding-top: var(--space-4);
  }
  
  .profile-details h1 {
    margin-bottom: var(--space-2);
    font-size: 1.75rem;
  }
  
  .profile-tagline {
    color: var(--neutral-600);
    margin-bottom: var(--space-4);
  }
  
  .profile-stats {
    display: flex;
    gap: var(--space-6);
  }
  
  .profile-stat {
    text-align: center;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--space-1);
    color: var(--primary-600);
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--neutral-600);
  }
  
  .edit-profile-btn {
    position: absolute;
    top: var(--space-4);
    right: var(--space-6);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    background-color: var(--primary-600);
    color: white;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: background-color var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .edit-profile-btn:hover {
    background-color: var(--primary-700);
  }
  
  /* Profile Tabs */
  .profile-tabs {
    background-color: white;
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--space-8);
  }
  
  .tabs {
    display: flex;
    gap: var(--space-4);
  }
  
  .tab {
    padding: var(--space-4) var(--space-4);
    background: none;
    border: none;
    font-weight: 500;
    color: var(--neutral-600);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all var(--transition-fast);
  }
  
  .tab.active {
    color: var(--primary-600);
    border-bottom-color: var(--primary-600);
  }
  
  .tab:hover:not(.active) {
    color: var(--neutral-800);
  }
  
  /* Tab Content */
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
  }
  
  /* Profile Grid */
  .profile-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
  }
  
  .profile-card {
    overflow: hidden;
  }
  
  .card-header {
    padding: var(--space-4);
    border-bottom: 1px solid var(--neutral-200);
  }
  
  .card-header h2 {
    margin-bottom: 0;
    font-size: 1.25rem;
  }
  
  .card-content {
    padding: var(--space-4);
  }
  
  /* About Me */
  .about-me {
    grid-column: 1 / 3;
  }
  
  /* Skills */
  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  
  .skill-tag {
    background-color: var(--primary-100);
    color: var(--primary-700);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  /* Recent Achievements */
  .achievements-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .achievement-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3);
    background-color: var(--neutral-50);
    border-radius: var(--radius-md);
  }
  
  .achievement-icon {
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
  
  .achievement-name {
    font-weight: 600;
    margin-bottom: 2px;
  }
  
  .achievement-date {
    font-size: 0.875rem;
    color: var(--neutral-600);
  }
  
  /* Latest Submissions */
  .submissions-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .submission-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    background-color: var(--neutral-50);
    border-radius: var(--radius-md);
  }
  
  .submission-challenge {
    font-weight: 600;
  }
  
  .submission-details {
    display: flex;
    gap: var(--space-2);
    font-size: 0.875rem;
  }
  
  .submission-language {
    color: var(--primary-600);
  }
  
  .submission-status {
    font-weight: 500;
  }
  
  .submission-status.success {
    color: var(--success-600);
  }
  
  .submission-status.failed {
    color: var(--error-600);
  }
  
  .submission-date {
    font-size: 0.875rem;
    color: var(--neutral-600);
    margin-top: var(--space-1);
  }
  
  /* Submissions Tab */
  .submissions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6);
  }
  
  .submissions-filters {
    display: flex;
    gap: var(--space-4);
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .filter-group label {
    font-weight: 500;
  }
  
  .submissions-search {
    display: flex;
    max-width: 300px;
  }
  
  .submissions-search input {
    flex-grow: 1;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--neutral-300);
    border-right: none;
    border-radius: var(--radius-md) 0 0 var(--radius-md);
  }
  
  .submissions-search button {
    background-color: var(--primary-600);
    color: white;
    border: none;
    padding: var(--space-2) var(--space-3);
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    cursor: pointer;
  }
  
  .submissions-table-container {
    overflow-x: auto;
  }
  
  .submissions-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .submissions-table th {
    background-color: var(--neutral-100);
    padding: var(--space-3);
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid var(--neutral-300);
  }
  
  .submissions-table td {
    padding: var(--space-3);
    border-bottom: 1px solid var(--neutral-200);
  }
  
  .status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .status-badge.success {
    background-color: var(--success-100);
    color: var(--success-700);
  }
  
  .status-badge.failed {
    background-color: var(--error-100);
    color: var(--error-700);
  }
  
  /* Badges Tab */
  .badges-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-4);
  }
  
  .badge-card {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-4);
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    transition: transform var(--transition-fast);
  }
  
  .badge-card:hover {
    transform: translateY(-4px);
  }
  
  .badge-card.locked {
    opacity: 0.7;
    filter: grayscale(1);
  }
  
  .badge-icon {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-full);
    background-color: var(--primary-100);
    color: var(--primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    flex-shrink: 0;
  }
  
  .badge-card.locked .badge-icon {
    background-color: var(--neutral-200);
    color: var(--neutral-500);
  }
  
  .badge-info {
    flex-grow: 1;
  }
  
  .badge-name {
    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: var(--space-1);
  }
  
  .badge-description {
    color: var(--neutral-600);
    margin-bottom: var(--space-2);
  }
  
  .badge-earned {
    font-size: 0.875rem;
    color: var(--neutral-500);
  }
  
  /* Settings Tab */
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: var(--space-6);
  }
  
  .settings-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }
  
  .account-settings {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  
  .change-password {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  
  .notification-settings {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  
  .danger-zone {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  
  .danger-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
  }
  
  .danger-info h3 {
    color: var(--error-600);
    margin-bottom: var(--space-2);
    font-size: 1.125rem;
  }
  
  .danger-info p {
    font-size: 0.875rem;
    color: var(--neutral-600);
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .profile-grid {
      grid-template-columns: 1fr;
    }
    
    .about-me {
      grid-column: 1 / 2;
    }
    
    .settings-grid {
      grid-template-columns: 1fr;
    }
    
    .account-settings,
    .change-password,
    .notification-settings,
    .danger-zone {
      grid-column: 1 / 2;
    }
    
    .account-settings {
      grid-row: 1 / 2;
    }
    
    .change-password {
      grid-row: 2 / 3;
    }
    
    .notification-settings {
      grid-row: 3 / 4;
    }
    
    .danger-zone {
      grid-row: 4 / 5;
    }
  }
  
  @media (max-width: 768px) {
    .tabs {
      flex-wrap: wrap;
    }
    
    .tab {
      flex-grow: 1;
      text-align: center;
    }
    
    .profile-details {
      margin-left: 0;
      padding-top: calc(60px + var(--space-4));
      text-align: center;
    }
    
    .profile-avatar {
      left: 50%;
      transform: translateX(-50%);
    }
    
    .profile-stats {
      justify-content: center;
    }
    
    .edit-profile-btn {
      top: calc(60px + var(--space-4));
      right: 50%;
      transform: translateX(50%);
    }
    
    .submissions-header {
      flex-direction: column;
      gap: var(--space-4);
      align-items: stretch;
    }
    
    .submissions-filters {
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .submissions-search {
      max-width: 100%;
    }
    
    .danger-action {
      flex-direction: column;
      text-align: center;
    }
  }
`;

document.head.appendChild(style);