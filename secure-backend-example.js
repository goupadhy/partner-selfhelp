// SECURE BACKEND IMPLEMENTATION EXAMPLE
// This should be implemented on your server (Node.js/Express example)

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Security middleware
app.use(helmet()); // Security headers
app.use(express.json({ limit: '1mb' })); // Limit request size

// CORS configuration
app.use(cors({
    origin: ['https://yourdomain.com'], // Only allow your domain
    credentials: true
}));

// Rate limiting
const chatRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many chat requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Input validation middleware
function validateChatInput(req, res, next) {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid message format' });
    }
    
    if (message.length > 500) {
        return res.status(400).json({ error: 'Message too long' });
    }
    
    // Sanitize input
    req.body.message = message
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]*>/g, '')
        .trim();
    
    if (req.body.message.length === 0) {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }
    
    next();
}

// Secure chat endpoint
app.post('/api/chat', chatRateLimit, validateChatInput, async (req, res) => {
    try {
        const { message } = req.body;
        
        // Your OpenAI API configuration (server-side only)
        const OPENAI_CONFIG = {
            endpoint: 'https://openai-partnerselfhelp.openai.azure.com/',
            apiKey: process.env.OPENAI_API_KEY, // Store in environment variables
            deploymentName: 'gpt-4o',
            apiVersion: '2024-12-01-preview'
        };
        
        const systemPrompt = `You are an Azure Marketplace Partner Support assistant. You help partners with:
- Getting started with Azure Marketplace
- Understanding offer types (SaaS, VM, Container, etc.)
- Publishing processes and requirements
- Billing, payouts, and pricing
- Co-sell opportunities
- Technical integration questions
- Partner Center account setup
- Private offers and marketplace policies

Provide helpful, accurate, and concise responses. When appropriate, direct users to Microsoft Learn documentation or Partner Center resources. Keep responses under 300 words and use bullet points when listing multiple items.`;
        
        // Call OpenAI API securely from backend
        const apiUrl = `${OPENAI_CONFIG.endpoint}openai/deployments/${OPENAI_CONFIG.deploymentName}/chat/completions?api-version=${OPENAI_CONFIG.apiVersion}`;
        
        const requestBody = {
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 500,
            temperature: 0.7
        };
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': OPENAI_CONFIG.apiKey
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            console.error('OpenAI API error:', response.status);
            return res.status(503).json({ error: 'Service temporarily unavailable' });
        }
        
        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            res.json({ response: data.choices[0].message.content.trim() });
        } else {
            res.status(503).json({ error: 'No response generated' });
        }
        
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Environment variables setup (.env file)
/*
OPENAI_API_KEY=1tH9l37IEaJnPU4I8deKEQZXoY4Zc0EtdzPQHOyYq4kxmuJSStZnJQQJ99BGACYeBjFXJ3w3AAABACOGbu3P
PORT=3000
NODE_ENV=production
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Secure chat backend running on port ${PORT}`);
});

module.exports = app;
