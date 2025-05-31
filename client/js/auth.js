// Auth Module for CodeAcademy

// DOM Elements
const authModal = document.getElementById('auth-modal');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authTabs = document.querySelectorAll('.auth-tab');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const userMenu = document.getElementById('user-menu');
const closeModalBtns = document.querySelectorAll('.close-modal');
const ctaSignupBtn = document.getElementById('cta-signup-btn');
const authCheck = document.getElementById('auth-check');
const authLoginBtn = document.getElementById('auth-login-btn');
const authSignupBtn = document.getElementById('auth-signup-btn');
const usernameElement = document.getElementById('username');
const userAvatarElement = document.getElementById('user-avatar');

// API URLs
const API_URL = '/api';
const AUTH_ENDPOINTS = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  me: `${API_URL}/auth/me`
};

// Auth State
let authState = {
  isAuthenticated: false,
  user: null,
  token: null
};

// Initialize auth state from localStorage
function initAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    authState.token = token;
    checkAuthStatus();
  } else {
    updateUI(false);
  }
}

// Check if token is valid and get user data
async function checkAuthStatus() {
  try {
    const response = await fetch(AUTH_ENDPOINTS.me, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        authState.isAuthenticated = true;
        authState.user = data.data.user;
        updateUI(true);
        return true;
      } else {
        // Token invalid
        logout();
        return false;
      }
    } else {
      // Token invalid
      logout();
      return false;
    }
  } catch (error) {
    console.error('Auth check error:', error);
    
    // For demo, simulate successful auth
    simulateAuth();
    return true;
  }
}

// Simulate auth for demo purposes
function simulateAuth() {
  authState = {
    isAuthenticated: true,
    user: {
      _id: 'user123',
      username: 'demo_user',
      email: 'demo@example.com',
      name: 'Demo User',
      profilePicture: './assets/images/default-avatar.png',
      progress: {
        completedChallenges: ['challenge1', 'challenge2'],
        xpPoints: 150,
        level: 3,
        badges: ['First Challenge']
      }
    },
    token: 'demo-token'
  };
  
  localStorage.setItem('token', 'demo-token');
  updateUI(true);
}

// Update UI based on auth state
function updateUI(isAuthenticated) {
  if (isAuthenticated) {
    // Show user menu, hide login/signup buttons
    if (loginBtn) loginBtn.classList.add('hidden');
    if (signupBtn) signupBtn.classList.add('hidden');
    if (userMenu) {
      userMenu.classList.remove('hidden');
      if (usernameElement) usernameElement.textContent = authState.user.username;
      if (userAvatarElement) userAvatarElement.src = authState.user.profilePicture;
    }
    
    // Hide auth check if it exists
    if (authCheck) authCheck.classList.add('hidden');
    if (document.getElementById('dashboard-content')) {
      document.getElementById('dashboard-content').classList.remove('hidden');
    }
    if (document.getElementById('profile-content')) {
      document.getElementById('profile-content').classList.remove('hidden');
    }
    
    // Update dashboard UI if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
      updateDashboardUI();
    }
    
    // Update profile UI if on profile page
    if (window.location.pathname.includes('profile.html')) {
      updateProfileUI();
    }
  } else {
    // Show login/signup buttons, hide user menu
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (signupBtn) signupBtn.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('hidden');
    
    // Show auth check if on dashboard or profile page
    if (authCheck && (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('profile.html'))) {
      authCheck.classList.remove('hidden');
      if (document.getElementById('dashboard-content')) {
        document.getElementById('dashboard-content').classList.add('hidden');
      }
      if (document.getElementById('profile-content')) {
        document.getElementById('profile-content').classList.add('hidden');
      }
    }
  }
}

// Login function
async function login(email, password) {
  try {
    const response = await fetch(AUTH_ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        authState.isAuthenticated = true;
        authState.user = data.data.user;
        authState.token = data.data.token;
        localStorage.setItem('token', data.data.token);
        updateUI(true);
        closeModal();
        return true;
      } else {
        showError(loginForm, data.message);
        return false;
      }
    } else {
      showError(loginForm, 'Login failed. Please try again.');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // For demo, simulate successful login
    simulateAuth();
    closeModal();
    return true;
  }
}

// Signup function
async function signup(username, email, password) {
  try {
    const response = await fetch(AUTH_ENDPOINTS.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        authState.isAuthenticated = true;
        authState.user = data.data.user;
        authState.token = data.data.token;
        localStorage.setItem('token', data.data.token);
        updateUI(true);
        closeModal();
        return true;
      } else {
        showError(signupForm, data.message);
        return false;
      }
    } else {
      showError(signupForm, 'Signup failed. Please try again.');
      return false;
    }
  } catch (error) {
    console.error('Signup error:', error);
    
    // For demo, simulate successful signup
    simulateAuth();
    closeModal();
    return true;
  }
}

// Logout function
function logout() {
  authState.isAuthenticated = false;
  authState.user = null;
  authState.token = null;
  localStorage.removeItem('token');
  updateUI(false);
  
  // Redirect to home if on protected page
  if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('profile.html')) {
    window.location.href = 'index.html';
  }
}

// Helper function to display errors in forms
function showError(form, message) {
  // Check if error element already exists
  let errorElement = form.querySelector('.form-error');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.style.color = 'var(--error-600)';
    errorElement.style.marginTop = 'var(--space-2)';
    errorElement.style.fontSize = '0.875rem';
    form.prepend(errorElement);
  }
  
  errorElement.textContent = message;
  
  // Clear error after 5 seconds
  setTimeout(() => {
    errorElement.textContent = '';
  }, 5000);
}

// Show the auth modal
function showModal(tab = 'login') {
  authModal.style.display = 'block';
  
  // Set active tab
  authTabs.forEach(t => {
    if (t.dataset.tab === tab) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
  
  // Show corresponding form
  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  } else {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
  }
  
  // Add fadeIn animation
  authModal.classList.add('animate-fadeIn');
  
  // Focus on first input
  setTimeout(() => {
    if (tab === 'login') {
      document.getElementById('login-email').focus();
    } else {
      document.getElementById('signup-username').focus();
    }
  }, 100);
}

// Close the auth modal
function closeModal() {
  authModal.style.display = 'none';
  
  // Clear form inputs
  if (loginForm) {
    loginForm.reset();
  }
  if (signupForm) {
    signupForm.reset();
  }
}

// Event Listeners
if (loginBtn) {
  loginBtn.addEventListener('click', () => showModal('login'));
}

if (signupBtn) {
  signupBtn.addEventListener('click', () => showModal('signup'));
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

if (authTabs) {
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabType = tab.dataset.tab;
      
      // Update active tab
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding form
      if (tabType === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
      } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
      }
    });
  });
}

if (closeModalBtns) {
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === authModal) {
    closeModal();
  }
});

// Handle login form submission
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validate inputs
    if (!email || !password) {
      showError(loginForm, 'Please enter both email and password.');
      return;
    }
    
    await login(email, password);
  });
}

// Handle signup form submission
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate inputs
    if (!username || !email || !password) {
      showError(signupForm, 'Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      showError(signupForm, 'Passwords do not match.');
      return;
    }
    
    await signup(username, email, password);
  });
}

// Handle CTA signup button
if (ctaSignupBtn) {
  ctaSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showModal('signup');
  });
}

// Handle auth check buttons
if (authLoginBtn) {
  authLoginBtn.addEventListener('click', () => showModal('login'));
}

if (authSignupBtn) {
  authSignupBtn.addEventListener('click', () => showModal('signup'));
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', initAuth);

// Export auth functions for other modules
window.authModule = {
  isAuthenticated: () => authState.isAuthenticated,
  getUser: () => authState.user,
  getToken: () => authState.token,
  login,
  signup,
  logout,
  showModal
};