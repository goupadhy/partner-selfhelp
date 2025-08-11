# Azure Static Web App Deployment Script
# Run this script after installing Azure CLI

# Variables
$resourceGroupName = "rg-partner-resources"
$appName = "partner-resources-for-self-help"
$location = "East US2"

Write-Host "🚀 Starting Azure Static Web App Deployment..." -ForegroundColor Green
Write-Host "App Name: $appName" -ForegroundColor Yellow
Write-Host "Resource Group: $resourceGroupName" -ForegroundColor Yellow
Write-Host "Location: $location" -ForegroundColor Yellow

# Check if Azure CLI is installed
try {
    az --version | Out-Null
    Write-Host "✅ Azure CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI not found. Please install Azure CLI first:" -ForegroundColor Red
    Write-Host "https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
    exit 1
}

# Login to Azure
Write-Host "🔐 Logging into Azure..." -ForegroundColor Yellow
az login

# Create resource group
Write-Host "📦 Creating resource group..." -ForegroundColor Yellow
az group create --name $resourceGroupName --location $location

# Create static web app
Write-Host "🌐 Creating Static Web App..." -ForegroundColor Yellow
$deployment = az staticwebapp create `
    --name $appName `
    --resource-group $resourceGroupName `
    --location $location `
    --source "." `
    --app-location "/" `
    --build-location "" `
    --output json | ConvertFrom-Json

if ($deployment) {
    Write-Host "✅ Static Web App created successfully!" -ForegroundColor Green
    Write-Host "🔗 App URL: $($deployment.defaultHostname)" -ForegroundColor Cyan
    Write-Host "📊 Resource ID: $($deployment.id)" -ForegroundColor Gray
    
    # Open the app in browser
    $url = "https://$($deployment.defaultHostname)"
    Write-Host "🌐 Opening $url in browser..." -ForegroundColor Yellow
    Start-Process $url
} else {
    Write-Host "❌ Failed to create Static Web App" -ForegroundColor Red
}

Write-Host "🎉 Deployment script completed!" -ForegroundColor Green
