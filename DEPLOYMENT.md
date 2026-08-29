# Deployment Guide for palmhomesgujrat.com

## Your Production Build
All production-ready files are in the `dist` folder. Upload **ALL contents** of this folder to your web server.

## Deployment Methods

### Method 1: Traditional Web Hosting (cPanel/FTP)

1. **Access your hosting:**
   - Log into your cPanel or FTP client
   - Navigate to your domain's root directory (usually `public_html` or `www`)

2. **Upload files:**
   - Upload ALL contents from the `dist` folder
   - Make sure `.htaccess` is uploaded (it may be hidden - enable "Show hidden files" in your FTP client)
   - Structure should be:
     ```
     public_html/
       ├── index.html
       ├── .htaccess
       ├── favicon.ico
       ├── robots.txt
       └── assets/
           └── (all asset files)
     ```

3. **Verify:**
   - Visit `https://palmhomesgujrat.com`
   - Test all pages and navigation

### Method 2: Vercel (Easiest - Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /Users/shahmeer/Documents/WebSite
   vercel --prod
   ```

3. **Connect Domain:**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add `palmhomesgujrat.com` and `www.palmhomesgujrat.com`
   - Update your domain's DNS records as instructed

### Method 3: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   cd /Users/shahmeer/Documents/WebSite
   netlify deploy --prod --dir=dist
   ```

3. **Connect Domain:**
   - Go to Netlify Dashboard → Site Settings → Domain Management
   - Add your custom domain and update DNS

### Method 4: GitHub Pages

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Use GitHub Actions or deploy manually:**
   - Upload `dist` folder contents to `gh-pages` branch
   - Or set up GitHub Actions for automatic deployment

## Important Notes

- ✅ The `.htaccess` file is already in the `dist` folder for SPA routing
- ✅ Always upload the **contents** of `dist`, not the `dist` folder itself
- ✅ Make sure `.htaccess` is uploaded (some FTP clients hide it)
- ✅ After deployment, test all routes to ensure they work
- ✅ For HTTPS, ensure SSL certificate is installed on your hosting

## DNS Configuration

Make sure your domain's DNS records point to your hosting:
- **A Record**: `@` → Your server IP
- **CNAME**: `www` → `palmhomesgujrat.com` (or your server)

## Troubleshooting

- **404 errors on routes**: Ensure `.htaccess` is uploaded and `mod_rewrite` is enabled
- **Assets not loading**: Check file paths and ensure all files uploaded
- **SSL issues**: Install SSL certificate (Let's Encrypt is free)

## Quick FTP Upload Command (if you have SSH access)

```bash
# From your local machine
cd /Users/shahmeer/Documents/WebSite/dist
scp -r * user@your-server:/path/to/public_html/
```


