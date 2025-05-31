// Main JavaScript file for CodeAcademy platform

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

// Toggle mobile menu
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    
    // Toggle menu icon (hamburger to X)
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (mobileMenuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mainNav && mainNav.classList.contains('active') && !e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle')) {
    mainNav.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    const spans = mobileMenuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Show active navigation item based on current page
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    } else if (currentPath.endsWith('/') && href === 'index.html') {
      link.classList.add('active');
    }
  });
});

// Fetch API wrapper with error handling
async function fetchAPI(url, options = {}) {
  try {
    // For demo purposes, check if we should return mock data
    if (url.includes('/api/') && !options.bypassMock) {
      return await mockAPIResponse(url, options);
    }
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    
    // Return mock data as fallback
    return await mockAPIResponse(url, options);
  }
}

// Mock API responses for demo purposes
async function mockAPIResponse(url, options = {}) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Import mock data
  const mockData = await import('./mockData.js');
  
  // Route the request to the appropriate mock data
  if (url.includes('/api/challenges')) {
    return {
      success: true,
      data: mockData.challenges
    };
  } else if (url.includes('/api/videos')) {
    return {
      success: true,
      data: mockData.videos
    };
  } else if (url.includes('/api/articles')) {
    return {
      success: true,
      data: mockData.articles
    };
  } else if (url.includes('/api/users/leaderboard')) {
    return {
      success: true,
      data: mockData.leaderboard
    };
  } else if (url.includes('/api/users/progress')) {
    return {
      success: true,
      data: mockData.progress
    };
  } else if (url.includes('/api/submissions')) {
    return {
      success: true,
      data: mockData.submissions
    };
  }
  
  // Default fallback
  return {
    success: false,
    message: 'Mock API endpoint not found'
  };
}

// Format date helper
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

// Export utilities for other modules
window.utils = {
  fetchAPI,
  formatDate
};

// Create mock data module for client-side demo
window.mockData = {
  challenges: [
    {
      _id: 'challenge1',
      title: 'Two Sum',
      difficulty: 'easy',
      category: 'algorithms',
      xpReward: 10,
      source: 'LeetCode',
      createdAt: '2023-05-12T10:20:30Z'
    },
    {
      _id: 'challenge2',
      title: 'Reverse a String',
      difficulty: 'easy',
      category: 'algorithms',
      xpReward: 8,
      source: 'LeetCode',
      createdAt: '2023-06-15T14:30:20Z'
    },
    {
      _id: 'challenge3',
      title: 'Binary Search',
      difficulty: 'medium',
      category: 'algorithms',
      xpReward: 15,
      source: 'LeetCode',
      createdAt: '2023-07-10T09:15:40Z'
    },
    {
      _id: 'challenge4',
      title: 'Linked List Cycle',
      difficulty: 'medium',
      category: 'data-structures',
      xpReward: 20,
      source: 'LeetCode',
      createdAt: '2023-08-05T11:45:10Z'
    },
    {
      _id: 'challenge5',
      title: 'Build a REST API',
      difficulty: 'medium',
      category: 'web',
      xpReward: 25,
      source: 'CodeAcademy',
      createdAt: '2023-09-02T16:20:30Z'
    }
  ],
  videos: [
    {
      id: 'video1',
      title: 'JavaScript Crash Course for Beginners',
      thumbnailUrl: 'https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg',
      channelName: 'Traversy Media',
      views: '3.2M',
      duration: '1:27:33',
      description: 'In this crash course we will go through all of the fundamentals of JavaScript including variables, data types, loops, conditionals, functions, objects and more.',
      embedUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c'
    },
    {
      id: 'video2',
      title: 'React JS Crash Course',
      thumbnailUrl: 'https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg',
      channelName: 'Traversy Media',
      views: '1.8M',
      duration: '1:48:47',
      description: 'Get started with React in this crash course. We will be building a task tracker app and look at components, props, state, hooks, working with an API and more.',
      embedUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
    },
    {
      id: 'video3',
      title: 'Python Crash Course For Beginners',
      thumbnailUrl: 'https://i.ytimg.com/vi/JJmcL1N2KQs/maxresdefault.jpg',
      channelName: 'Traversy Media',
      views: '1.2M',
      duration: '1:31:55',
      description: 'Python crash course to learn Python programming for beginners. This Python tutorial teaches the Python programming language by building projects.',
      embedUrl: 'https://www.youtube.com/embed/JJmcL1N2KQs'
    }
  ],
  articles: [
    {
      id: 'article1',
      title: 'Understanding JavaScript Promises',
      author: 'Sarah Johnson',
      date: '2023-05-12',
      readTime: '8 min read',
      thumbnailUrl: 'https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg',
      summary: 'Promises are a pattern for handling asynchronous operations in JavaScript. This article explores how they work and how to use them effectively.'
    },
    {
      id: 'article2',
      title: 'CSS Grid Layout: A Comprehensive Guide',
      author: 'Michael Chen',
      date: '2023-06-23',
      readTime: '12 min read',
      thumbnailUrl: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
      summary: 'CSS Grid Layout provides a two-dimensional layout system for the web. Learn how to create complex layouts with this powerful CSS module.'
    },
    {
      id: 'article3',
      title: 'Introduction to Data Structures',
      author: 'Emily Rodriguez',
      date: '2023-07-05',
      readTime: '15 min read',
      thumbnailUrl: 'https://images.pexels.com/photos/1181275/pexels-photo-1181275.jpeg',
      summary: 'Data structures are the building blocks of computer science. This article introduces the most common data structures and their applications.'
    }
  ],
  leaderboard: [
    {
      username: 'codemaster',
      name: 'Alex Johnson',
      profilePicture: './assets/images/avatars/user1.jpg',
      progress: {
        xpPoints: 1250,
        level: 13
      }
    },
    {
      username: 'devguru',
      name: 'Samantha Lee',
      profilePicture: './assets/images/avatars/user2.jpg',
      progress: {
        xpPoints: 980,
        level: 10
      }
    },
    {
      username: 'pythonista',
      name: 'Daniel Brown',
      profilePicture: './assets/images/avatars/user3.jpg',
      progress: {
        xpPoints: 840,
        level: 9
      }
    }
  ],
  progress: {
    completedChallenges: ['challenge1', 'challenge2'],
    completedCourses: ['javascript-basics', 'html-css-fundamentals'],
    xpPoints: 150,
    level: 3,
    badges: ['First Challenge', 'Quick Learner']
  },
  submissions: [
    {
      _id: 'submission1',
      challenge: {
        _id: 'challenge1',
        title: 'Two Sum',
        difficulty: 'easy',
        category: 'algorithms'
      },
      language: 'javascript',
      status: 'accepted',
      executionTime: 52,
      memoryUsed: 42.1,
      submittedAt: '2023-10-15T14:30:20Z',
      testCasesPassed: 3,
      totalTestCases: 3
    },
    {
      _id: 'submission2',
      challenge: {
        _id: 'challenge3',
        title: 'Binary Search',
        difficulty: 'medium',
        category: 'algorithms'
      },
      language: 'javascript',
      status: 'wrong_answer',
      executionTime: 35,
      memoryUsed: 38.2,
      submittedAt: '2023-10-14T10:15:40Z',
      testCasesPassed: 1,
      totalTestCases: 3
    }
  ]
};