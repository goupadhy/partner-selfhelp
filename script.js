// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cards = document.querySelectorAll('.card');
const actionButtons = document.querySelectorAll('.action-btn');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on menu items
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Add click event listeners to navigation links
document.querySelectorAll('.nav-menu a, .cta-button').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const sectionId = href.substring(1);
            scrollToSection(sectionId);
        }
    });
});

// Filter Cards Functionality
function filterCards(category) {
    // Remove active class from all buttons
    actionButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    const activeButton = Array.from(actionButtons).find(btn => 
        btn.textContent.toLowerCase().includes(category.toLowerCase()) || 
        (category === 'all' && btn.textContent.toLowerCase().includes('show all'))
    );
    if (activeButton) {
        activeButton.classList.add('active');
    }

    cards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.classList.add('visible');
            
            // Add staggered animation delay
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }
    });
}

// Add event listeners to filter buttons
actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('getting started')) {
            filterCards('getting-started');
        } else if (buttonText.includes('technical')) {
            filterCards('technical');
        } else if (buttonText.includes('business')) {
            filterCards('business');
        } else if (buttonText.includes('show all')) {
            filterCards('all');
        }
    });
});

// Card hover effects and interactions
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click tracking for analytics (placeholder)
    card.addEventListener('click', () => {
        const cardTitle = card.querySelector('h3').textContent;
        console.log(`Card clicked: ${cardTitle}`);
        
        // Add ripple effect
        createRippleEffect(card, event);
    });
});

// Create ripple effect on card click
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 120, 212, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 120, 212, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #0078d4, #106ebe)';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
            
            // Add staggered animation for cards in the same section
            const sectionCards = entry.target.querySelectorAll('.card');
            sectionCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Search functionality (placeholder for future enhancement)
function searchResources(query) {
    const searchTerm = query.toLowerCase();
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('search-result');
        } else {
            card.style.display = 'none';
            card.classList.remove('search-result');
        }
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Press '1', '2', '3' to navigate to sections
    if (e.key === '1') scrollToSection('getting-started');
    if (e.key === '2') scrollToSection('technical-resources');
    if (e.key === '3') scrollToSection('business-support');
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Integrate with your analytics platform here
}

// Track page load
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_load', {
        page: 'Azure Marketplace Resources',
        timestamp: new Date().toISOString()
    });
    
    // Initialize default filter (show all)
    filterCards('all');
    
    // Add loading animation to initial elements
    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// Resource link click tracking
document.querySelectorAll('.card-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const cardTitle = link.closest('.card').querySelector('h3').textContent;
        const href = link.getAttribute('href');
        
        // Only prevent default for placeholder links (href="#")
        if (href === '#') {
            e.preventDefault();
            console.log(`Navigating to resource: ${cardTitle}`);
        }
        
        trackEvent('resource_click', {
            resource: cardTitle,
            section: link.closest('.section').id,
            url: href
        });
        
        // Add visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
        }, 150);
    });
});

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Performance optimization: Lazy loading for images (if added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading if images are present
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

// Export functions for external use (if needed)
window.AzureMarketplaceApp = {
    scrollToSection,
    filterCards,
    searchResources,
    trackEvent,
    toggleTheme
};

// ============================
// CHAT FUNCTIONALITY
// ============================

// Chat Widget Variables
let chatWidget = null;
let chatContainer = null;
let chatMessages = null;
let chatInput = null;
let isTyping = false;

// OpenAI API Configuration - SECURE VERSION
const OPENAI_CONFIG = {
    // API endpoint should be your backend server, not direct OpenAI
    endpoint: '/api/chat', // This should point to your secure backend
    // API key should NEVER be in client-side code
    // apiKey: 'REMOVED_FOR_SECURITY', // Move this to your backend server
    maxMessageLength: 500,
    rateLimitDelay: 2000 // Minimum 2 seconds between messages
};

// Rate limiting variables
let lastMessageTime = 0;
let messageCount = 0;
const MAX_MESSAGES_PER_MINUTE = 10;

// System prompt for Azure Marketplace assistance
const SYSTEM_PROMPT = `You are an Azure Marketplace Partner Support assistant. You help partners with:
- Getting started with Azure Marketplace
- Understanding offer types (SaaS, VM, Container, etc.)
- Publishing processes and requirements
- Billing, payouts, and pricing
- Co-sell opportunities
- Technical integration questions
- Partner Center account setup
- Private offers and marketplace policies

Provide helpful, accurate, and concise responses. When appropriate, direct users to Microsoft Learn documentation or Partner Center resources. Keep responses under 300 words and use bullet points when listing multiple items.`;

// Fallback responses for when API is unavailable
const fallbackResponses = [
    "I'm temporarily having trouble connecting to our support system. Please try again in a moment, or check our resource sections above for immediate help.",
    "Sorry, I'm experiencing a temporary issue. You can find helpful resources in the sections above or visit Microsoft Learn for Azure Marketplace documentation.",
    "I'm currently unable to process your request. Please refer to our Getting Started, Technical Resources, or Market and Grow sections above for assistance."
];

// Input validation and sanitization
function validateAndSanitizeInput(message) {
    // Remove script tags and other potentially dangerous content
    const sanitized = message
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/javascript:/gi, '')
        .replace(/data:/gi, '')
        .trim();
    
    // Check length
    if (sanitized.length === 0) {
        throw new Error('Message cannot be empty');
    }
    
    if (sanitized.length > OPENAI_CONFIG.maxMessageLength) {
        throw new Error(`Message too long. Maximum ${OPENAI_CONFIG.maxMessageLength} characters allowed.`);
    }
    
    // Check for spam patterns
    const spamPatterns = [
        /(.)\1{10,}/, // Repeated characters
        /^[^a-zA-Z0-9\s]{10,}$/, // Only special characters
    ];
    
    for (const pattern of spamPatterns) {
        if (pattern.test(sanitized)) {
            throw new Error('Message appears to be spam');
        }
    }
    
    return sanitized;
}

// Rate limiting check
function checkRateLimit() {
    const now = Date.now();
    
    // Reset message count every minute
    if (now - lastMessageTime > 60000) {
        messageCount = 0;
    }
    
    // Check if user is sending too many messages
    if (messageCount >= MAX_MESSAGES_PER_MINUTE) {
        throw new Error('Too many messages. Please wait a moment before sending another message.');
    }
    
    // Check minimum delay between messages
    if (now - lastMessageTime < OPENAI_CONFIG.rateLimitDelay) {
        throw new Error('Please wait a moment before sending another message.');
    }
    
    messageCount++;
    lastMessageTime = now;
}

// Initialize chat widget
function initializeChat() {
    chatWidget = document.getElementById('chat-widget');
    chatContainer = document.getElementById('chat-container');
    chatMessages = document.getElementById('chat-messages');
    chatInput = document.getElementById('chat-input');
    
    if (!chatWidget) return;
    
    // Chat toggle functionality
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatSend = document.getElementById('chat-send');
    const chatBadge = document.getElementById('chat-badge');
    
    // Toggle chat visibility
    chatToggle.addEventListener('click', () => {
        const isVisible = chatContainer.classList.contains('visible');
        if (isVisible) {
            closeChatWidget();
        } else {
            openChatWidget();
        }
    });
    
    // Close chat
    chatClose.addEventListener('click', closeChatWidget);
    
    // Send message
    chatSend.addEventListener('click', sendMessage);
    
    // Send message on Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const message = btn.getAttribute('data-message');
            if (message) {
                sendUserMessage(message);
                await processMessage(message);
            }
        });
    });
    
    // Hide badge initially after a delay
    setTimeout(() => {
        if (chatBadge) {
            chatBadge.style.opacity = '0';
        }
    }, 5000);
}

// Open chat widget
function openChatWidget() {
    if (chatContainer) {
        chatContainer.classList.add('visible');
        chatInput.focus();
        
        // Hide badge when opened
        const chatBadge = document.getElementById('chat-badge');
        if (chatBadge) {
            chatBadge.style.display = 'none';
        }
        
        trackEvent('chat_opened');
    }
}

// Close chat widget
function closeChatWidget() {
    if (chatContainer) {
        chatContainer.classList.remove('visible');
        trackEvent('chat_closed');
    }
}

// Send message with security checks
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message || isTyping) {
        return;
    }
    
    try {
        // Security checks
        checkRateLimit();
        const sanitizedMessage = validateAndSanitizeInput(message);
        
        sendUserMessage(sanitizedMessage);
        chatInput.value = '';
        
        // Process the message
        await processMessage(sanitizedMessage);
        
        trackEvent('chat_message_sent', { 
            messageLength: sanitizedMessage.length,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        // Show user-friendly error message
        sendBotMessage(`⚠️ ${error.message}`);
        console.warn('Message validation failed:', error.message);
    }
}

// Add user message to chat
function sendUserMessage(message) {
    const messageElement = createMessageElement(message, 'user');
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Process message and generate response with error handling
async function processMessage(message) {
    showTypingIndicator();
    
    try {
        // Use secure backend only - no fallback to direct API
        const response = await generateAIResponse(message);
        
        hideTypingIndicator();
        sendBotMessage(response);
        
    } catch (error) {
        console.error('Error generating AI response:', error);
        hideTypingIndicator();
        
        // Don't expose technical details to users
        const userFriendlyMessage = "I'm having trouble processing your request right now. Please try again in a moment, or check our resource sections above for immediate help.";
        sendBotMessage(userFriendlyMessage);
        
        trackEvent('chat_api_error', { 
            error: 'API_ERROR', // Don't log sensitive error details
            timestamp: new Date().toISOString()
        });
    }
}

// SECURE: Generate AI response using backend proxy (recommended approach)
async function generateAIResponse(userMessage) {
    try {
        // This should call your secure backend endpoint, not OpenAI directly
        const response = await fetch(OPENAI_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add CSRF token if using sessions
                // 'X-CSRF-Token': getCSRFToken(),
            },
            credentials: 'same-origin', // Include cookies for authentication
            body: JSON.stringify({
                message: userMessage,
                // Add user session info if needed
                sessionId: generateSessionId()
            })
        });
        
        if (!response.ok) {
            // Don't expose detailed error information to client
            throw new Error('Service temporarily unavailable');
        }
        
        const data = await response.json();
        
        if (data.response) {
            return data.response;
        } else {
            throw new Error('Invalid response format');
        }
        
    } catch (error) {
        console.error('Secure API call failed:', error);
        throw new Error('Unable to process your request at this time');
    }
}

// Generate session ID for tracking (not for security)
function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// REMOVED FOR SECURITY: Direct API calls are insecure
// This function has been removed to prevent API key exposure
// All API calls should go through your secure backend
async function generateAIResponseDirect(userMessage) {
    throw new Error('Direct API calls are disabled for security. Please set up the secure backend.');
}

// Generate bot response based on message (fallback function)
function generateResponse(message) {
    // This function is now used as a fallback only
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Add bot message to chat
function sendBotMessage(message) {
    const messageElement = createMessageElement(message, 'bot');
    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Create message element
function createMessageElement(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (type === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message.replace(/\n/g, '<br>')}</p>
                <div class="message-time">${time}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <div class="message-time">${time}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    }
    
    return messageDiv;
}

// Show typing indicator
function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
    isTyping = false;
}

// Scroll chat to bottom
function scrollToBottom() {
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeChat();
});
