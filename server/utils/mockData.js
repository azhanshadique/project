// Mock data for challenges

export const mockChallenges = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "easy",
    category: "algorithms",
    starterCode: {
      javascript: "function twoSum(nums, target) {\n  // Your code here\n}",
      python: "def two_sum(nums, target):\n    # Your code here\n    pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}"
    },
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]",
        isHidden: false
      },
      {
        input: "[3,3]\n6",
        expectedOutput: "[0,1]",
        isHidden: false
      }
    ],
    solutionCode: {
      javascript: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
      python: "def two_sum(nums, target):\n    map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in map:\n            return [map[complement], i]\n        map[num] = i\n    return []",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}"
    },
    xpReward: 10,
    source: "LeetCode"
  },
  {
    title: "Reverse a String",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    difficulty: "easy",
    category: "algorithms",
    starterCode: {
      javascript: "function reverseString(s) {\n  // Your code here\n}",
      python: "def reverse_string(s):\n    # Your code here\n    pass",
      java: "class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}"
    },
    testCases: [
      {
        input: "[\"h\",\"e\",\"l\",\"l\",\"o\"]",
        expectedOutput: "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
        isHidden: false
      },
      {
        input: "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        expectedOutput: "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
        isHidden: false
      }
    ],
    xpReward: 8,
    source: "LeetCode"
  },
  {
    title: "Binary Search",
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    difficulty: "medium",
    category: "algorithms",
    starterCode: {
      javascript: "function search(nums, target) {\n  // Your code here\n}",
      python: "def search(nums, target):\n    # Your code here\n    pass",
      java: "class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n    }\n}"
    },
    testCases: [
      {
        input: "[-1,0,3,5,9,12]\n9",
        expectedOutput: "4",
        isHidden: false
      },
      {
        input: "[-1,0,3,5,9,12]\n2",
        expectedOutput: "-1",
        isHidden: false
      }
    ],
    xpReward: 15,
    source: "LeetCode"
  },
  {
    title: "Linked List Cycle",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer.",
    difficulty: "medium",
    category: "data-structures",
    starterCode: {
      javascript: "function hasCycle(head) {\n  // Your code here\n}",
      python: "def has_cycle(head):\n    # Your code here\n    pass",
      java: "public class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Your code here\n    }\n}"
    },
    testCases: [
      {
        input: "[3,2,0,-4] pos=1",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "[1,2] pos=0",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "[1] pos=-1",
        expectedOutput: "false",
        isHidden: false
      }
    ],
    xpReward: 20,
    source: "LeetCode"
  },
  {
    title: "Build a REST API",
    description: "Create a simple REST API with Node.js and Express that handles CRUD operations for a 'todo' resource.",
    difficulty: "medium",
    category: "web",
    starterCode: {
      javascript: "// server.js\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\n// Your code here\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});"
    },
    testCases: [
      {
        input: "GET /todos",
        expectedOutput: "[]",
        isHidden: false
      },
      {
        input: "POST /todos {\"title\":\"Learn REST API\",\"completed\":false}",
        expectedOutput: "{\"id\":1,\"title\":\"Learn REST API\",\"completed\":false}",
        isHidden: false
      }
    ],
    xpReward: 25,
    source: "CodeAcademy"
  }
];

// Mock data for YouTube videos
export const mockYoutubeVideos = [
  {
    id: "video1",
    title: "JavaScript Crash Course for Beginners",
    thumbnailUrl: "https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
    channelName: "Traversy Media",
    views: "3.2M",
    duration: "1:27:33",
    description: "In this crash course we will go through all of the fundamentals of JavaScript including variables, data types, loops, conditionals, functions, objects and more.",
    embedUrl: "https://www.youtube.com/embed/hdI2bqOjy3c"
  },
  {
    id: "video2",
    title: "React JS Crash Course",
    thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    channelName: "Traversy Media",
    views: "1.8M",
    duration: "1:48:47",
    description: "Get started with React in this crash course. We will be building a task tracker app and look at components, props, state, hooks, working with an API and more.",
    embedUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8"
  },
  {
    id: "video3",
    title: "Python Crash Course For Beginners",
    thumbnailUrl: "https://i.ytimg.com/vi/JJmcL1N2KQs/maxresdefault.jpg",
    channelName: "Traversy Media",
    views: "1.2M",
    duration: "1:31:55",
    description: "Python crash course to learn Python programming for beginners. This Python tutorial teaches the Python programming language by building projects.",
    embedUrl: "https://www.youtube.com/embed/JJmcL1N2KQs"
  },
  {
    id: "video4",
    title: "Data Structures and Algorithms in JavaScript",
    thumbnailUrl: "https://i.ytimg.com/vi/t2CEgPsws3U/maxresdefault.jpg",
    channelName: "freeCodeCamp.org",
    views: "987K",
    duration: "1:45:32",
    description: "This course teaches data structures and algorithms from basics to advanced. For beginners, we start off with a recap of important JavaScript concepts.",
    embedUrl: "https://www.youtube.com/embed/t2CEgPsws3U"
  },
  {
    id: "video5",
    title: "MongoDB Crash Course",
    thumbnailUrl: "https://i.ytimg.com/vi/-56x56UppqQ/maxresdefault.jpg",
    channelName: "Traversy Media",
    views: "748K",
    duration: "35:18",
    description: "In this video we will explore MongoDB and how to use it with Node.js and the Mongoose ODM to create a simple application.",
    embedUrl: "https://www.youtube.com/embed/-56x56UppqQ"
  }
];

// Mock data for articles
export const mockArticles = [
  {
    id: "article1",
    title: "Understanding JavaScript Promises",
    author: "Sarah Johnson",
    date: "2023-05-12",
    readTime: "8 min read",
    thumbnailUrl: "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg",
    summary: "Promises are a pattern for handling asynchronous operations in JavaScript. This article explores how they work and how to use them effectively.",
    content: "JavaScript Promises are objects representing the eventual completion or failure of an asynchronous operation. They allow you to chain asynchronous operations, handle errors, and write cleaner code compared to callbacks. In this article, we'll explore the fundamentals of Promises, how to create them, and common patterns for working with them in modern JavaScript applications."
  },
  {
    id: "article2",
    title: "CSS Grid Layout: A Comprehensive Guide",
    author: "Michael Chen",
    date: "2023-06-23",
    readTime: "12 min read",
    thumbnailUrl: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    summary: "CSS Grid Layout provides a two-dimensional layout system for the web. Learn how to create complex layouts with this powerful CSS module.",
    content: "CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows for the creation of complex layouts that were previously difficult or impossible to achieve with traditional CSS. This article covers everything from basic grid creation to advanced grid techniques, responsive layouts, and combining Grid with Flexbox for even more powerful layouts."
  },
  {
    id: "article3",
    title: "Introduction to Data Structures",
    author: "Emily Rodriguez",
    date: "2023-07-05",
    readTime: "15 min read",
    thumbnailUrl: "https://images.pexels.com/photos/1181275/pexels-photo-1181275.jpeg",
    summary: "Data structures are the building blocks of computer science. This article introduces the most common data structures and their applications.",
    content: "Data structures are specialized formats for organizing, processing, retrieving, and storing data. They provide a means to manage large amounts of data efficiently for uses such as large databases and internet indexing services. This article covers fundamental data structures including arrays, linked lists, stacks, queues, trees, graphs, and hash tables, with examples of their implementations and use cases."
  },
  {
    id: "article4",
    title: "RESTful API Design Principles",
    author: "David Park",
    date: "2023-08-17",
    readTime: "10 min read",
    thumbnailUrl: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    summary: "Learn the principles of designing RESTful APIs that are scalable, maintainable, and easy to use.",
    content: "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations on resources. This article explores the core principles of RESTful API design, including resource naming, HTTP methods, status codes, authentication, versioning, and documentation. By following these principles, you can create APIs that are intuitive, scalable, and easy to maintain."
  },
  {
    id: "article5",
    title: "Getting Started with Docker",
    author: "Lisa Wong",
    date: "2023-09-02",
    readTime: "9 min read",
    thumbnailUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
    summary: "Docker is a platform for developing, shipping, and running applications in containers. This guide will help you get started with Docker.",
    content: "Docker is a platform that enables developers to build, package, and run applications in containers. Containers are lightweight, portable, and consistent environments that can run on any machine with Docker installed. This article covers Docker basics, including containers vs. virtual machines, Dockerfiles, Docker Compose, and best practices for containerizing applications. By the end, you'll have a solid foundation for using Docker in your development workflow."
  }
];

// Mock data for user leaderboard
export const mockLeaderboard = [
  {
    username: "codemaster",
    name: "Alex Johnson",
    profilePicture: "/assets/images/avatars/user1.jpg",
    progress: {
      xpPoints: 1250,
      level: 13
    }
  },
  {
    username: "devguru",
    name: "Samantha Lee",
    profilePicture: "/assets/images/avatars/user2.jpg",
    progress: {
      xpPoints: 980,
      level: 10
    }
  },
  {
    username: "pythonista",
    name: "Daniel Brown",
    profilePicture: "/assets/images/avatars/user3.jpg",
    progress: {
      xpPoints: 840,
      level: 9
    }
  },
  {
    username: "algowhiz",
    name: "Emma Wilson",
    profilePicture: "/assets/images/avatars/user4.jpg",
    progress: {
      xpPoints: 720,
      level: 8
    }
  },
  {
    username: "webdev123",
    name: "Ryan Martinez",
    profilePicture: "/assets/images/avatars/user5.jpg",
    progress: {
      xpPoints: 650,
      level: 7
    }
  }
];