# 🚀 Deploy "Partner Resources for Self Help" to Azure Static Web Apps

## Quick Deployment via Azure Portal (Recommended)

Since Azure CLI installation is in progress, here's the fastest way to deploy your app:

### Step 1: Prepare Files for Upload
Your files are ready in: `C:\Users\goupadhy\Downloads\partner-resources-sampleapp\`

Files included:
- ✅ index.html
- ✅ styles.css  
- ✅ script.js
- ✅ staticwebapp.config.json
- ✅ package.json

### Step 2: Deploy via Azure Portal

1. **Open Azure Portal**: https://portal.azure.com
2. **Click "Create a resource"**
3. **Search for "Static Web App"** and select it
4. **Click "Create"**

### Step 3: Configure Deployment

Fill in these details:
```
Subscription: [Your Azure Subscription]
Resource Group: Create new "rg-partner-resources"
Name: partner-resources-for-self-help
Hosting plan: Free
Region: East US 2
Source: Upload
```

### Step 4: Upload Files

1. **Click "Browse for files"**
2. **Select all files** from your folder: 
   `C:\Users\goupadhy\Downloads\partner-resources-sampleapp\`
3. **Upload the following files**:
   - index.html
   - styles.css
   - script.js
   - staticwebapp.config.json

### Step 5: Review and Create

1. Click **"Review + create"**
2. Click **"Create"**
3. Wait for deployment (2-3 minutes)

### Step 6: Access Your App

After deployment completes:
- Your app URL will be: `https://partner-resources-for-self-help.azurestaticapps.net`
- Or something similar with a random string

## Alternative: ZIP Upload Method

If you prefer, you can:

1. **Create a ZIP file** of all your files
2. **Use Azure CLI** after restart:
   ```powershell
   az login
   az staticwebapp create --name partner-resources-for-self-help --resource-group rg-partner-resources --source . --location "East US2"
   ```

## Features Your Deployed App Will Have

✅ **3 Resource Sections**: Getting Started, Technical Resources, Business Support  
✅ **6 Interactive Cards**: With hover effects and filtering  
✅ **Responsive Design**: Works on all devices  
✅ **Partner Center Integration**: Direct link to partner.microsoft.com  
✅ **Modern UI**: Microsoft-themed professional design  
✅ **Fast Loading**: Optimized static assets  

## Next Steps After Deployment

1. **Test the live site**
2. **Share the URL** with your team
3. **Add more resource links** as needed
4. **Monitor usage** via Azure portal

Your "Partner Resources for Self Help" will be live and accessible to partners worldwide! 🌍
