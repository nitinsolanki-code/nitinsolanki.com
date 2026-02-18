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
          height: 100vh;
          border: none;
          border-radius: 0;
          transform: translateY(-100vh);
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
        background: transparent;
        border: none;
        outline: none;
        font-family: 'Inter', sans-serif;
        font-size: 0.85rem;
        color: var(--chat-primary-text);
        resize: none;
        max-height: 80px;
        padding: 0;
        line-height: 1.5;
      }

      #nitin-chat-input::placeholder {
        color: var(--chat-light-gray);
      }

      #nitin-chat-send {
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        font-size: 1.2rem;
        color: var(--chat-primary-text);
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.6;
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
          padding: 16px 20px;
        }

        #nitin-chat-input {
          font-size: 0.8rem;
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
      <input
        type="text"
        id="nitin-chat-input"
        placeholder="Type a question..."
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
    this.inputField.focus();

    // Show greeting if no messages
    if (this.messageHistory.length === 0) {
      this.addMessage(CHAT_CONFIG.greeting, 'ai');
    }

    this.scrollToBottom();
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
