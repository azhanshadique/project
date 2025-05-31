// Code Editor JavaScript file for CodeAcademy platform

// Initialize CodeMirror
let editor;

document.addEventListener('DOMContentLoaded', () => {
  // Initialize CodeMirror editor
  initializeCodeEditor();
  
  // Load challenge data
  loadChallengeData();
  
  // Setup event listeners
  setupEventListeners();
});

// Initialize CodeMirror editor
function initializeCodeEditor() {
  const editorElement = document.getElementById('code-editor');
  if (!editorElement) return;
  
  editor = CodeMirror.fromTextArea(editorElement, {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'dracula',
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
    extraKeys: {
      'Tab': function(cm) {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
        cm.replaceSelection(spaces);
      }
    }
  });
  
  // Set initial size
  editor.setSize('100%', '400px');
  
  // Set initial code
  setStarterCode('javascript');
}

// Load challenge data
async function loadChallengeData() {
  try {
    // Get challenge ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('challenge');
    
    // If no challenge ID, load default challenge
    if (!challengeId) {
      // For demo, use the first mock challenge
      const defaultChallenge = window.mockData.challenges[0];
      updateChallengeUI(defaultChallenge);
      return;
    }
    
    // Fetch challenge data from API
    const response = await window.utils.fetchAPI(`/api/challenges/${challengeId}`);
    
    if (response.success) {
      updateChallengeUI(response.data);
    } else {
      // For demo, use the first mock challenge
      const defaultChallenge = window.mockData.challenges[0];
      updateChallengeUI(defaultChallenge);
    }
  } catch (error) {
    console.error('Error loading challenge data:', error);
    
    // For demo, use the first mock challenge
    const defaultChallenge = window.mockData.challenges[0];
    updateChallengeUI(defaultChallenge);
  }
}

// Update challenge UI with data
function updateChallengeUI(challenge) {
  // Set challenge title
  const titleElement = document.getElementById('challenge-title');
  if (titleElement) {
    titleElement.textContent = `Challenge: ${challenge.title}`;
  }
  
  // Set difficulty badge
  const difficultyElement = document.getElementById('challenge-difficulty');
  if (difficultyElement) {
    difficultyElement.textContent = capitalizeFirstLetter(challenge.difficulty);
    difficultyElement.className = `difficulty-badge ${challenge.difficulty}`;
  }
  
  // Set description
  const descriptionElement = document.getElementById('challenge-description');
  if (descriptionElement) {
    descriptionElement.innerHTML = challenge.description || '<p>No description available.</p>';
  }
  
  // Set starter code for current language
  const languageSelect = document.getElementById('language-select');
  const language = languageSelect ? languageSelect.value : 'javascript';
  setStarterCode(language, challenge);
  
  // Update test cases
  updateTestCases(challenge);
}

// Set starter code based on selected language
function setStarterCode(language, challenge = null) {
  // For demo, use predefined starter code
  let starterCode = '';
  
  if (challenge && challenge.starterCode && challenge.starterCode[language]) {
    starterCode = challenge.starterCode[language];
  } else {
    // Default starter code if not available in challenge
    switch (language) {
      case 'javascript':
        starterCode = `function twoSum(nums, target) {\n  // Your code here\n}`;
        break;
      case 'python':
        starterCode = `def two_sum(nums, target):\n    # Your code here\n    pass`;
        break;
      case 'java':
        starterCode = `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}`;
        break;
      case 'cpp':
        starterCode = `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};`;
        break;
      default:
        starterCode = `function twoSum(nums, target) {\n  // Your code here\n}`;
    }
  }
  
  // Set editor mode based on language
  switch (language) {
    case 'javascript':
      editor.setOption('mode', 'javascript');
      break;
    case 'python':
      editor.setOption('mode', 'python');
      break;
    case 'java':
    case 'cpp':
      editor.setOption('mode', 'clike');
      break;
    default:
      editor.setOption('mode', 'javascript');
  }
  
  // Set editor content
  editor.setValue(starterCode);
}

// Update test cases UI
function updateTestCases(challenge) {
  const testCasesListElement = document.getElementById('test-cases-list');
  if (!testCasesListElement) return;
  
  // Clear test cases
  testCasesListElement.innerHTML = '';
  
  // Get test cases from challenge or use default
  const testCases = challenge.testCases || [
    {
      input: '[2,7,11,15]\n9',
      expectedOutput: '[0,1]',
      isHidden: false
    },
    {
      input: '[3,2,4]\n6',
      expectedOutput: '[1,2]',
      isHidden: false
    },
    {
      input: '[3,3]\n6',
      expectedOutput: '[0,1]',
      isHidden: false
    }
  ];
  
  // Add test cases to UI
  testCases.forEach((testCase, index) => {
    if (testCase.isHidden) return; // Skip hidden test cases
    
    const testCaseElement = document.createElement('div');
    testCaseElement.className = 'test-case';
    testCaseElement.innerHTML = `
      <div class="test-case-header">
        <div class="test-case-title">Test Case ${index + 1}</div>
        <div class="test-case-status pending"><i class="fas fa-circle"></i> Pending</div>
      </div>
      <div class="test-case-details">
        <div class="test-case-input">
          <div class="test-label">Input:</div>
          <pre><code>${escapeHtml(testCase.input)}</code></pre>
        </div>
        <div class="test-case-expected">
          <div class="test-label">Expected:</div>
          <pre><code>${escapeHtml(testCase.expectedOutput)}</code></pre>
        </div>
        <div class="test-case-actual hidden">
          <div class="test-label">Your Output:</div>
          <pre><code></code></pre>
        </div>
      </div>
    `;
    
    testCasesListElement.appendChild(testCaseElement);
  });
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Setup event listeners
function setupEventListeners() {
  // Language selector
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      const language = languageSelect.value;
      setStarterCode(language);
    });
  }
  
  // Run code button
  const runCodeBtn = document.getElementById('run-code-btn');
  if (runCodeBtn) {
    runCodeBtn.addEventListener('click', () => {
      runCode();
    });
  }
  
  // Submit code button
  const submitCodeBtn = document.getElementById('submit-code-btn');
  if (submitCodeBtn) {
    submitCodeBtn.addEventListener('click', () => {
      submitCode();
    });
  }
  
  // Reset code button
  const resetCodeBtn = document.getElementById('reset-code-btn');
  if (resetCodeBtn) {
    resetCodeBtn.addEventListener('click', () => {
      const language = document.getElementById('language-select').value;
      setStarterCode(language);
    });
  }
  
  // Clear console button
  const clearConsoleBtn = document.getElementById('clear-console-btn');
  if (clearConsoleBtn) {
    clearConsoleBtn.addEventListener('click', () => {
      clearConsole();
    });
  }
  
  // Run tests button
  const runTestsBtn = document.getElementById('run-tests-btn');
  if (runTestsBtn) {
    runTestsBtn.addEventListener('click', () => {
      runTests();
    });
  }
  
  // Panel tabs
  const panelTabs = document.querySelectorAll('.panel-tab');
  panelTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      
      // Update active tab
      panelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update panel content (for demo, just simulate tab switching)
      console.log(`Switched to ${tabName} tab`);
    });
  });
  
  // Result modal close buttons
  const closeResultBtns = document.querySelectorAll('.close-result');
  closeResultBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const resultModal = document.getElementById('result-modal');
      if (resultModal) {
        resultModal.style.display = 'none';
      }
    });
  });
  
  // Next challenge button
  const nextChallengeBtn = document.getElementById('next-challenge-btn');
  if (nextChallengeBtn) {
    nextChallengeBtn.addEventListener('click', () => {
      // For demo, just reload the page
      window.location.reload();
    });
  }
}

// Run code function
function runCode() {
  const code = editor.getValue();
  const language = document.getElementById('language-select').value;
  const consoleOutput = document.getElementById('console-output');
  
  // Clear console
  clearConsole();
  
  // Add loading indicator
  const loadingElement = document.createElement('div');
  loadingElement.className = 'console-loading';
  loadingElement.innerHTML = '<div class="loading-spinner"></div> Running code...';
  consoleOutput.appendChild(loadingElement);
  
  // Simulate code execution
  setTimeout(() => {
    // Remove loading indicator
    loadingElement.remove();
    
    // For demo, just simulate output based on language
    let output = '';
    
    switch (language) {
      case 'javascript':
        output = 'JavaScript output:\n[0, 1]\n\nExecution completed in 45ms';
        break;
      case 'python':
        output = 'Python output:\n[0, 1]\n\nExecution completed in 52ms';
        break;
      case 'java':
        output = 'Java output:\n[0, 1]\n\nExecution completed in 63ms';
        break;
      case 'cpp':
        output = 'C++ output:\n[0, 1]\n\nExecution completed in 38ms';
        break;
      default:
        output = 'Output:\n[0, 1]\n\nExecution completed successfully';
    }
    
    // Add output to console
    const outputElement = document.createElement('div');
    outputElement.className = 'console-output-text';
    outputElement.innerHTML = `<pre>${escapeHtml(output)}</pre>`;
    consoleOutput.appendChild(outputElement);
  }, 1000);
}

// Submit code function
function submitCode() {
  const code = editor.getValue();
  const language = document.getElementById('language-select').value;
  
  // Run tests first
  runTests(true).then(result => {
    // Show result modal
    const resultModal = document.getElementById('result-modal');
    const successResult = document.getElementById('result-success');
    const failureResult = document.getElementById('result-failure');
    
    if (resultModal) {
      resultModal.style.display = 'block';
      
      if (result.success) {
        // Show success result
        successResult.classList.remove('hidden');
        failureResult.classList.add('hidden');
        
        // Update stats
        document.getElementById('runtime-value').textContent = `${result.runtime}ms`;
        document.getElementById('memory-value').textContent = `${result.memory}MB`;
        document.getElementById('xp-value').textContent = `+${result.xp} XP`;
      } else {
        // Show failure result
        successResult.classList.add('hidden');
        failureResult.classList.remove('hidden');
        
        // Update stats
        document.getElementById('tests-passed').textContent = `${result.passed}/${result.total}`;
      }
    }
  });
}

// Run tests function
async function runTests(isSubmission = false) {
  const code = editor.getValue();
  const language = document.getElementById('language-select').value;
  const testCases = document.querySelectorAll('.test-case');
  
  // Reset test case status
  testCases.forEach(testCase => {
    const statusElement = testCase.querySelector('.test-case-status');
    statusElement.className = 'test-case-status pending';
    statusElement.innerHTML = '<i class="fas fa-circle"></i> Pending';
    
    // Hide actual output
    const actualElement = testCase.querySelector('.test-case-actual');
    if (actualElement) {
      actualElement.classList.add('hidden');
    }
  });
  
  // Track overall result
  let passed = 0;
  const total = testCases.length;
  
  // Process each test case
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const statusElement = testCase.querySelector('.test-case-status');
    const actualElement = testCase.querySelector('.test-case-actual');
    const actualCodeElement = actualElement.querySelector('code');
    
    // Update to running
    statusElement.className = 'test-case-status running';
    statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running';
    
    // Simulate test execution (random success/failure for demo)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Determine result (for demo, make first test pass, others random)
    const isSuccess = i === 0 ? true : Math.random() > 0.3;
    
    if (isSuccess) {
      // Test passed
      statusElement.className = 'test-case-status success';
      statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Passed';
      
      // Show actual output (same as expected for demo)
      actualElement.classList.remove('hidden');
      const expectedElement = testCase.querySelector('.test-case-expected code');
      actualCodeElement.textContent = expectedElement.textContent;
      
      passed++;
    } else {
      // Test failed
      statusElement.className = 'test-case-status failed';
      statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Failed';
      
      // Show actual output (different from expected for demo)
      actualElement.classList.remove('hidden');
      actualCodeElement.textContent = '[1, 0]';
    }
  }
  
  // Return result for submission
  return {
    success: passed === total,
    passed,
    total,
    runtime: 45 + Math.floor(Math.random() * 20),
    memory: 38.4 + Math.random() * 8,
    xp: 10
  };
}

// Clear console function
function clearConsole() {
  const consoleOutput = document.getElementById('console-output');
  if (consoleOutput) {
    consoleOutput.innerHTML = `
      <div class="console-welcome">
        <p>Welcome to the CodeAcademy Code Editor!</p>
        <p>Click "Run Code" to execute your code and see the output here.</p>
      </div>
    `;
  }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add CSS for editor page
const style = document.createElement('style');
style.textContent = `
  /* Editor Workspace Styles */
  .editor-workspace {
    display: grid;
    grid-template-columns: 300px 1fr 300px;
    grid-template-rows: 100vh;
    overflow: hidden;
  }
  
  /* Problem Panel */
  .problem-panel {
    background-color: white;
    border-right: 1px solid var(--neutral-200);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .panel-header {
    padding: var(--space-4);
    border-bottom: 1px solid var(--neutral-200);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  
  .panel-header h2 {
    font-size: 1.25rem;
    margin-bottom: 0;
    line-height: 1.3;
  }
  
  .difficulty-badge {
    align-self: flex-start;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    text-transform: uppercase;
  }
  
  .difficulty-badge.easy {
    background-color: var(--success-100);
    color: var(--success-700);
  }
  
  .difficulty-badge.medium {
    background-color: var(--warning-100);
    color: var(--warning-700);
  }
  
  .difficulty-badge.hard {
    background-color: var(--error-100);
    color: var(--error-700);
  }
  
  .panel-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: var(--space-4);
  }
  
  .description-section,
  .examples-section {
    margin-bottom: var(--space-6);
  }
  
  .description-section h3,
  .examples-section h3 {
    font-size: 1.125rem;
    margin-bottom: var(--space-3);
  }
  
  .example {
    background-color: var(--neutral-50);
    border-radius: var(--radius-md);
    padding: var(--space-3);
    margin-bottom: var(--space-3);
  }
  
  .example-title {
    font-weight: 600;
    margin-bottom: var(--space-2);
  }
  
  .example-code {
    font-family: var(--font-mono);
    background-color: var(--neutral-100);
    padding: var(--space-2);
    border-radius: var(--radius-sm);
    margin: 0;
    font-size: 0.875rem;
  }
  
  .panel-tabs {
    display: flex;
    border-top: 1px solid var(--neutral-200);
  }
  
  .panel-tab {
    flex: 1;
    padding: var(--space-3) 0;
    text-align: center;
    background: none;
    border: none;
    border-right: 1px solid var(--neutral-200);
    cursor: pointer;
    font-weight: 500;
    color: var(--neutral-600);
    transition: background-color var(--transition-fast);
  }
  
  .panel-tab:last-child {
    border-right: none;
  }
  
  .panel-tab.active {
    background-color: var(--primary-50);
    color: var(--primary-600);
  }
  
  .panel-tab:hover:not(.active) {
    background-color: var(--neutral-100);
  }
  
  /* Editor Panel */
  .editor-panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .editor-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    background-color: var(--neutral-800);
    color: white;
  }
  
  .language-selector {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .language-selector select {
    background-color: var(--neutral-700);
    color: white;
    border: none;
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
  }
  
  .editor-actions {
    display: flex;
    gap: var(--space-2);
  }
  
  .code-editor-container {
    flex-grow: 1;
    overflow: hidden;
  }
  
  .code-editor-container .CodeMirror {
    height: 100%;
    font-family: var(--font-mono);
    font-size: 14px;
  }
  
  .console-panel {
    height: 200px;
    background-color: var(--neutral-900);
    color: white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .console-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    background-color: var(--neutral-800);
    border-top: 1px solid var(--neutral-700);
    border-bottom: 1px solid var(--neutral-700);
  }
  
  .console-header h3 {
    font-size: 1rem;
    margin: 0;
    color: white;
  }
  
  .console-output {
    flex-grow: 1;
    padding: var(--space-4);
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }
  
  .console-welcome {
    opacity: 0.6;
  }
  
  .console-loading {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin-bottom: var(--space-2);
    color: var(--neutral-400);
  }
  
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--neutral-400);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .console-output-text pre {
    margin: 0;
    white-space: pre-wrap;
  }
  
  /* Test Cases Panel */
  .test-cases-panel {
    background-color: white;
    border-left: 1px solid var(--neutral-200);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .test-cases-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: var(--space-4);
  }
  
  .test-case {
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-md);
    margin-bottom: var(--space-3);
    overflow: hidden;
  }
  
  .test-case-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-3);
    background-color: var(--neutral-100);
    border-bottom: 1px solid var(--neutral-200);
  }
  
  .test-case-title {
    font-weight: 600;
  }
  
  .test-case-status {
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .test-case-status.pending {
    color: var(--neutral-500);
  }
  
  .test-case-status.running {
    color: var(--primary-600);
  }
  
  .test-case-status.success {
    color: var(--success-600);
  }
  
  .test-case-status.failed {
    color: var(--error-600);
  }
  
  .test-case-details {
    padding: var(--space-3);
  }
  
  .test-case-input,
  .test-case-expected,
  .test-case-actual {
    margin-bottom: var(--space-3);
  }
  
  .test-case-actual {
    border-top: 1px dashed var(--neutral-300);
    padding-top: var(--space-3);
  }
  
  .test-label {
    font-weight: 500;
    margin-bottom: var(--space-1);
    font-size: 0.875rem;
  }
  
  .test-case-details pre {
    background-color: var(--neutral-100);
    padding: var(--space-2);
    border-radius: var(--radius-sm);
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
  
  /* Result Modal */
  .result-message {
    text-align: center;
  }
  
  .result-icon {
    font-size: 3rem;
    margin-bottom: var(--space-4);
  }
  
  .result-message.success .result-icon {
    color: var(--success-500);
  }
  
  .result-message.failure .result-icon {
    color: var(--error-500);
  }
  
  .result-stats {
    display: flex;
    justify-content: center;
    gap: var(--space-6);
    margin: var(--space-6) 0;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--neutral-600);
    margin-bottom: var(--space-1);
  }
  
  .stat-value {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .result-actions {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }
  
  /* Responsive adjustments */
  @media (max-width: 1200px) {
    .editor-workspace {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      overflow: auto;
      height: auto;
    }
    
    .problem-panel,
    .test-cases-panel {
      height: auto;
      border: none;
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .panel-content,
    .test-cases-list {
      max-height: 300px;
    }
    
    .editor-panel {
      height: 700px;
    }
  }
`;

document.head.appendChild(style);