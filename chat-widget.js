// Nitin Solanki - Aman-Inspired Chat Widget
// Luxury personal brand concierge-style chat interface

const CHAT_CONFIG = {
  apiEndpoint: 'https://nitin-chat-api.nitin-k-solanki.workers.dev',
  maxHistory: 10,
  greeting: "Ask me anything about Nitin — his career, values, perspective, or what drives him."
};

class NitinChatWidget {
  constructor() {
    this.isOpen = false;
    this.messageHistory = [];
    this.isWaitingForResponse = false;
    this.init();
  }

  init() {
    this.injectStyles();
    this.createDOM();
    this.attachEventListeners();
  }

  injectStyles() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      /* Chat Widget - Aman-inspired styling */
      :root {
        --chat-primary-bg: #F3EEE7;
        --chat-primary-text: #313131;
        --chat-warm-taupe: #D4C4B0;
        --chat-soft-sand: #E8DFD3;
        --chat-accent-dark: #000000;
        --chat-light-gray: #999999;
        --chat-lighter-gray: #555555;
      }

      * {
        box-sizing: border-box;
      }

      /* Trigger Button - Soft circle, distinct from rectangular Connect */
      #nitin-chat-trigger,
      #nitin-chat-trigger-desktop {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: var(--chat-primary-text);
        background: var(--chat-soft-sand);
        border: none;
        font-family: 'Inter', sans-serif;
        font-size: 0.45rem;
        font-weight: 400;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        padding: 0;
        cursor: pointer;
        transition: opacity 0.4s ease;
        flex-shrink: 0;
      }

      #nitin-chat-trigger:hover,
      #nitin-chat-trigger-desktop:hover {
        opacity: 0.7;
      }

      #nitin-chat-trigger:active,
      #nitin-chat-trigger-desktop:active {
        opacity: 0.6;
      }

      @media (min-width: 768px) {
        #nitin-chat-trigger,
        #nitin-chat-trigger-desktop {
          width: 44px;
          height: 44px;
          font-size: 0.5rem;
        }
      }

      /* Chat Panel - Desktop */
      #nitin-chat-panel {
        position: fixed;
        top: 70px;
        right: 30px;
        width: 380px;
        height: 520px;
        background: var(--chat-primary-bg);
        border: 1px solid var(--chat-warm-taupe);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        transform: translateY(-20px);
        opacity: 0;
        transition: transform 0.4s ease, opacity 0.4s ease;
        pointer-events: none;
      }

      #nitin-chat-panel.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      /* Chat Panel - Mobile */
      @media (max-width: 768px) {
        #nitin-chat-panel {
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          height: 100dvh;
          border: none;
          border-radius: 0;
          transform: translateY(-100%);
          padding-bottom: env(safe-area-inset-bottom);
        }

        #nitin-chat-panel.open {
          transform: translateY(0);
        }
      }

      @media (min-width: 1200px) {
        #nitin-chat-panel {
          top: 80px;
          right: 60px;
        }
      }

      /* Chat Header */
      #nitin-chat-header {
        padding: 24px;
        border-bottom: 1px solid var(--chat-warm-taupe);
        position: relative;
        flex-shrink: 0;
      }

      #nitin-chat-title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: 1px;
        color: var(--chat-primary-text);
        margin: 0 0 8px 0;
      }

      #nitin-chat-subtitle {
        font-family: 'Inter', sans-serif;
        font-size: 0.7rem;
        color: var(--chat-light-gray);
        margin: 0;
        line-height: 1.4;
      }

      /* Close Button */
      #nitin-chat-close {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 20px;
        height: 20px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.4s ease;
      }

      #nitin-chat-close:hover {
        opacity: 1;
      }

      #nitin-chat-close::before,
      #nitin-chat-close::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 16px;
        background: var(--chat-primary-text);
      }

      #nitin-chat-close::before {
        transform: rotate(45deg);
      }

      #nitin-chat-close::after {
        transform: rotate(-45deg);
      }

      /* Messages Container */
      #nitin-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      #nitin-chat-messages::-webkit-scrollbar {
        width: 6px;
      }

      #nitin-chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }

      #nitin-chat-messages::-webkit-scrollbar-thumb {
        background: var(--chat-warm-taupe);
        border-radius: 3px;
      }

      #nitin-chat-messages::-webkit-scrollbar-thumb:hover {
        background: var(--chat-warm-taupe);
      }

      /* Messages - User */
      .nitin-chat-message.user {
        display: flex;
        justify-content: flex-end;
      }

      .nitin-chat-message.user .nitin-chat-message-content {
        background: var(--chat-soft-sand);
        padding: 12px 16px;
        max-width: 85%;
        word-wrap: break-word;
      }

      /* Messages - AI */
      .nitin-chat-message.ai {
        display: flex;
        justify-content: flex-start;
      }

      .nitin-chat-message.ai .nitin-chat-message-content {
        background: transparent;
        color: var(--chat-lighter-gray);
        padding: 8px 0;
        max-width: 90%;
        word-wrap: break-word;
      }

      /* Message Content */
      .nitin-chat-message-content {
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        line-height: 1.5;
        color: var(--chat-primary-text);
        border: 1px solid transparent;
      }

      .nitin-chat-message.user .nitin-chat-message-content {
        border: none;
      }

      /* Typing Indicator */
      .nitin-chat-typing {
        display: flex;
        gap: 4px;
        align-items: flex-end;
        height: 16px;
      }

      .nitin-chat-typing-dot {
        width: 4px;
        height: 4px;
        background: var(--chat-light-gray);
        border-radius: 50%;
        animation: nitin-typing 1.4s infinite;
      }

      .nitin-chat-typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .nitin-chat-typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes nitin-typing {
        0%, 60%, 100% {
          opacity: 0.4;
        }
        30% {
          opacity: 1;
        }
      }

      /* Input Area */
      #nitin-chat-input-area {
        border-top: 1px solid var(--chat-warm-taupe);
        padding: 16px 24px;
        display: flex;
        gap: 12px;
        align-items: flex-end;
        flex-shrink: 0;
      }

      #nitin-chat-input {
        flex: 1;
        background: white;
        border: 1px solid var(--chat-warm-taupe);
        border-radius: 6px;
        outline: none;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        color: var(--chat-primary-text);
        resize: none;
        max-height: 80px;
        padding: 10px 12px;
        line-height: 1.5;
        -webkit-appearance: none;
        appearance: none;
      }

      #nitin-chat-input:focus {
        border-color: var(--chat-primary-text);
      }

      #nitin-chat-input::placeholder {
        color: var(--chat-light-gray);
      }

      #nitin-chat-send {
        background: var(--chat-primary-text);
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        color: var(--chat-primary-bg);
        padding: 10px 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.4s ease;
        flex-shrink: 0;
      }

      #nitin-chat-send:hover:not(:disabled) {
        opacity: 1;
      }

      #nitin-chat-send:disabled {
        cursor: not-allowed;
        opacity: 0.3;
      }

      /* Mic Button */
      #nitin-chat-mic {
        background: transparent;
        border: 1px solid var(--chat-warm-taupe);
        border-radius: 6px;
        cursor: pointer;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      #nitin-chat-mic svg {
        width: 16px;
        height: 16px;
        fill: var(--chat-primary-text);
        transition: fill 0.3s ease;
      }

      #nitin-chat-mic:hover {
        border-color: var(--chat-primary-text);
      }

      #nitin-chat-mic.listening {
        background: var(--chat-primary-text);
        border-color: var(--chat-primary-text);
        animation: nitin-mic-pulse 1.5s ease-in-out infinite;
      }

      #nitin-chat-mic.listening svg {
        fill: var(--chat-primary-bg);
      }

      @keyframes nitin-mic-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      #nitin-chat-mic.unsupported {
        display: none;
      }

      /* Speaking indicator */
      .nitin-chat-speaking {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-left: 6px;
      }

      .nitin-chat-speaking span {
        display: inline-block;
        width: 3px;
        height: 10px;
        background: var(--chat-primary-text);
        border-radius: 1px;
        animation: nitin-speak-bar 0.8s ease-in-out infinite;
      }

      .nitin-chat-speaking span:nth-child(2) { animation-delay: 0.15s; }
      .nitin-chat-speaking span:nth-child(3) { animation-delay: 0.3s; }

      @keyframes nitin-speak-bar {
        0%, 100% { height: 4px; }
        50% { height: 12px; }
      }

      /* Error Message */
      .nitin-chat-error {
        color: var(--chat-accent-dark);
        font-size: 0.8rem;
        text-align: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.05);
      }

      /* Mobile adjustments */
      @media (max-width: 768px) {
        #nitin-chat-header {
          padding: 20px;
        }

        #nitin-chat-messages {
          padding: 20px;
          gap: 12px;
        }

        #nitin-chat-input-area {
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom));
        }

        #nitin-chat-input {
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }

  createDOM() {
    // Create trigger button
    const trigger = document.createElement('button');
    trigger.id = 'nitin-chat-trigger';
    trigger.textContent = 'Ask';
    trigger.setAttribute('aria-label', 'Chat with nico.ai');

    // Inject trigger into header nav areas
    const headerCta = document.querySelector('.header-cta');
    if (headerCta) {
      headerCta.insertBefore(trigger, headerCta.firstChild);
      headerCta.style.gap = '8px';
    }
    const desktopNav = document.querySelector('.desktop-nav');
    if (desktopNav) {
      const desktopTrigger = trigger.cloneNode(true);
      desktopTrigger.id = 'nitin-chat-trigger-desktop';
      const connectBtn = desktopNav.querySelector('.reserve-btn');
      if (connectBtn) {
        desktopNav.insertBefore(desktopTrigger, connectBtn);
      } else {
        desktopNav.appendChild(desktopTrigger);
      }
      this._desktopTrigger = desktopTrigger;
    }

    // Create chat panel
    const panel = document.createElement('div');
    panel.id = 'nitin-chat-panel';

    // Header
    const header = document.createElement('div');
    header.id = 'nitin-chat-header';
    header.innerHTML = `
      <h2 id="nitin-chat-title">nico.ai</h2>
      <p id="nitin-chat-subtitle">Ask me anything about Nitin</p>
      <button id="nitin-chat-close" aria-label="Close chat"></button>
    `;

    // Messages area
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'nitin-chat-messages';

    // Input area
    const inputArea = document.createElement('div');
    inputArea.id = 'nitin-chat-input-area';
    inputArea.innerHTML = `
      <button id="nitin-chat-mic" aria-label="Voice input">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      </button>
      <input
        type="text"
        id="nitin-chat-input"
        placeholder="Type or tap mic..."
        autocomplete="off"
      />
      <button id="nitin-chat-send" aria-label="Send message">→</button>
    `;

    // Assemble panel
    panel.appendChild(header);
    panel.appendChild(messagesContainer);
    panel.appendChild(inputArea);

    // Add panel to DOM (trigger is already in header)
    document.body.appendChild(panel);
    // Fallback: if no header found, append trigger to body as fixed
    if (!headerCta && !desktopNav) {
      trigger.style.position = 'fixed';
      trigger.style.top = '20px';
      trigger.style.right = '20px';
      trigger.style.zIndex = '9998';
      document.body.appendChild(trigger);
    }

    // Store references
    this.trigger = trigger;
    this.panel = panel;
    this.messagesContainer = messagesContainer;
    this.inputField = document.getElementById('nitin-chat-input');
    this.sendButton = document.getElementById('nitin-chat-send');
    this.closeButton = document.getElementById('nitin-chat-close');
    this.micButton = document.getElementById('nitin-chat-mic');
    this.isListening = false;
    this.isSpeaking = false;
    this.recognition = null;
    this.synthesis = window.speechSynthesis;

    // Set up speech recognition
    this.setupSpeechRecognition();
  }

  attachEventListeners() {
    // Trigger button(s)
    this.trigger.addEventListener('click', () => this.togglePanel());
    if (this._desktopTrigger) {
      this._desktopTrigger.addEventListener('click', () => this.togglePanel());
    }

    // Close button
    this.closeButton.addEventListener('click', () => this.closePanel());

    // Send button
    this.sendButton.addEventListener('click', () => this.sendMessage());

    // Mic button
    this.micButton.addEventListener('click', () => this.toggleVoiceInput());

    // Input field
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closePanel();
      }
    });

    // Auto-grow input
    this.inputField.addEventListener('input', () => {
      this.inputField.style.height = 'auto';
      this.inputField.style.height = Math.min(this.inputField.scrollHeight, 80) + 'px';
    });
  }

  togglePanel() {
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel() {
    this.isOpen = true;
    this.panel.classList.add('open');

    // Show greeting if no messages
    if (this.messageHistory.length === 0) {
      this.addMessage(CHAT_CONFIG.greeting, 'ai');
    }

    this.scrollToBottom();

    // Delay focus for iOS Safari — keyboard won't appear if focus fires too early
    setTimeout(() => {
      this.inputField.focus();
    }, 400);
  }

  closePanel() {
    this.isOpen = false;
    this.panel.classList.remove('open');
    this.inputField.blur();
  }

  addMessage(content, role) {
    const messageElement = document.createElement('div');
    messageElement.className = `nitin-chat-message ${role}`;

    const contentElement = document.createElement('div');
    contentElement.className = 'nitin-chat-message-content';
    contentElement.textContent = content;

    messageElement.appendChild(contentElement);
    this.messagesContainer.appendChild(messageElement);

    if (role !== 'typing') {
      this.messageHistory.push({ role, content });
      // Maintain max history
      if (this.messageHistory.length > CHAT_CONFIG.maxHistory * 2) {
        this.messageHistory = this.messageHistory.slice(-CHAT_CONFIG.maxHistory * 2);
      }
    }

    this.scrollToBottom();
    return messageElement;
  }

  showTypingIndicator() {
    const messageElement = document.createElement('div');
    messageElement.className = 'nitin-chat-message ai';
    messageElement.id = 'nitin-typing-indicator';

    const typingContainer = document.createElement('div');
    typingContainer.className = 'nitin-chat-typing';

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'nitin-chat-typing-dot';
      typingContainer.appendChild(dot);
    }

    messageElement.appendChild(typingContainer);
    this.messagesContainer.appendChild(messageElement);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('nitin-typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  async sendMessage() {
    const text = this.inputField.value.trim();

    if (!text || this.isWaitingForResponse) {
      return;
    }

    // Track if this was a voice-initiated message
    const wasVoiceInput = this._lastInputWasVoice || false;
    this._lastInputWasVoice = false;

    // Add user message
    this.addMessage(text, 'user');
    this.inputField.value = '';
    this.inputField.style.height = 'auto';
    this.sendButton.disabled = true;
    this.isWaitingForResponse = true;

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Prepare API request
      const requestBody = {
        message: text,
        history: this.messageHistory.slice(-CHAT_CONFIG.maxHistory)
      };

      const response = await fetch(CHAT_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      this.removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = data.response || 'I didn\'t receive a valid response. Please try again.';

      this.addMessage(aiMessage, 'ai');

      // Speak the response if the question was asked by voice
      if (wasVoiceInput) {
        this.speakResponse(aiMessage);
      }
    } catch (error) {
      this.removeTypingIndicator();
      console.error('Chat widget error:', error);
      this.addMessage('I\'m having trouble connecting right now. Please try again.', 'ai');
    } finally {
      this.sendButton.disabled = false;
      this.isWaitingForResponse = false;
      this.inputField.focus();
    }
  }

  // ===== VOICE FEATURES =====

  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.micButton.classList.add('unsupported');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      this.inputField.value = transcript;

      // Auto-send when speech recognition returns a final result
      if (event.results[event.results.length - 1].isFinal) {
        this.stopListening();
        if (transcript.trim()) {
          this._lastInputWasVoice = true;
          this.sendMessage();
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.stopListening();
    };

    this.recognition.onend = () => {
      this.stopListening();
    };
  }

  toggleVoiceInput() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  }

  startListening() {
    if (!this.recognition) return;

    // Stop any ongoing TTS
    if (this.isSpeaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }

    this.isListening = true;
    this.micButton.classList.add('listening');
    this.inputField.placeholder = 'Listening...';
    this.inputField.value = '';

    try {
      this.recognition.start();
    } catch (e) {
      // Already started
      this.stopListening();
    }
  }

  stopListening() {
    this.isListening = false;
    this.micButton.classList.remove('listening');
    this.inputField.placeholder = 'Type or tap mic...';

    try {
      this.recognition.stop();
    } catch (e) {
      // Already stopped
    }
  }

  speakResponse(text) {
    if (!this.synthesis) return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to pick a natural-sounding voice
    const voices = this.synthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Samantha') || // iOS
      v.name.includes('Google UK English Female') || // Chrome
      v.name.includes('Microsoft Zira') || // Windows
      (v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (preferred) utterance.voice = preferred;

    this.isSpeaking = true;

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    this.synthesis.speak(utterance);
  }

  scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }, 0);
  }
}

// Initialize widget when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new NitinChatWidget();
  });
} else {
  new NitinChatWidget();
}
