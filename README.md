# Partner Resources for Self Help - Azure Static Web App

This repository contains the source code for the Azure Marketplace Partner Resources static web application.

## Project Structure

```
partner-resources-sampleapp/
├── index.html                    # Main HTML file
├── styles.css                   # CSS styling
├── script.js                    # JavaScript functionality
├── staticwebapp.config.json     # Azure Static Web Apps configuration
├── sample.md                    # Project documentation
└── README.md                    # This file
```

## Azure Static Web Apps Deployment

This application is configured for deployment to Azure Static Web Apps with the following features:

- **App Name**: Partner Resources for Self Help
- **Routing**: Single Page Application (SPA) routing configured
- **Caching**: Optimized cache headers for static assets
- **Fallback**: 404 errors redirect to index.html for client-side routing

## Features

- 🚀 **Getting Started Resources** - Marketplace fundamentals and Partner Center setup
- 💻 **Technical Resources** - SaaS development and VM/Container offers
- 🤝 **Business Support** - Sales, marketing, and partner support tools
- 💬 **Secure AI Chat** - Partner support chatbot with proper security implementation

## 🔐 Security Setup (IMPORTANT)

### Prerequisites
This application includes a chat feature that requires a secure backend to protect API keys.

### Quick Setup
1. **Copy environment template**:
   ```bash
   cp .env.example .env
   ```

2. **Add your OpenAI API key to .env**:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. **Install backend dependencies**:
   ```bash
   npm run install-backend
   ```

4. **Run the secure backend**:
   ```bash
   npm run backend
   ```

5. **Serve the frontend** (in another terminal):
   ```bash
   npm start
   ```

### Security Features Implemented
- ✅ API keys stored in environment variables (never in source code)
- ✅ Rate limiting to prevent abuse
- ✅ Input validation and sanitization
- ✅ Error message sanitization
- ✅ CORS and security headers
- ✅ Backend proxy architecture

⚠️ **Never commit .env files to version control!**
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Clean, professional Microsoft-themed design
- ⚡ **Fast Performance** - Optimized static assets and minimal dependencies

## Local Development

To run locally:
1. Open `index.html` in a web browser
2. Or serve using a local web server:
   ```bash
   npx serve .
   ```

## Deployment Instructions

### Option 1: Azure Portal (Recommended)
1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new "Static Web App" resource
3. Configure with these settings:
   - **App name**: `partner-resources-for-self-help`
   - **Source**: Upload files or connect to GitHub
   - **Build preset**: Custom
   - **App location**: `/`
   - **Build location**: (leave empty)

### Option 2: Azure CLI
```bash
# Login to Azure
az login

# Create resource group (if needed)
az group create --name rg-partner-resources --location "East US"

# Create static web app
az staticwebapp create \
  --name partner-resources-for-self-help \
  --resource-group rg-partner-resources \
  --location "East US2" \
  --source . \
  --branch main \
  --app-location "/" \
  --build-location ""
```

### Option 3: GitHub Actions (for CI/CD)
1. Push code to GitHub repository
2. Connect GitHub repo to Azure Static Web Apps
3. GitHub Actions will automatically deploy on push

## Configuration

The `staticwebapp.config.json` file includes:
- Routing rules for SPA behavior
- Cache optimization
- MIME type configurations
- 404 fallback handling

## License

© 2025 Microsoft Corporation. All rights reserved.
