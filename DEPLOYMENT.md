# Deployment Guide - ML Deconstructed

This guide will help you deploy the ML Deconstructed website to GitHub Pages for free hosting.

## 🚀 GitHub Pages Deployment

### Prerequisites
- A GitHub account
- Git installed on your local machine
- The ML Deconstructed project files

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `ml-deconstructed`)
5. Make it public (required for free GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 2: Push Your Code to GitHub

```bash
# Initialize git in your project directory (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: ML Deconstructed website"

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/ml-deconstructed.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 2-5 minutes
- You'll see a green checkmark when deployment is complete
- Your site will be available at: `https://YOUR_USERNAME.github.io/ml-deconstructed`

## 🌐 Custom Domain (Optional)

If you want to use a custom domain:

1. Purchase a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In your repository settings, go to "Pages"
3. Enter your custom domain in the "Custom domain" field
4. Add a CNAME record pointing to `YOUR_USERNAME.github.io`
5. Wait for DNS propagation (can take up to 24 hours)

## 📱 Testing Your Deployment

### Local Testing
Before deploying, test locally:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Post-Deployment Testing
After deployment, test:
- [ ] All pages load correctly
- [ ] Navigation works properly
- [ ] Mathematical formulas render with KaTeX
- [ ] Visualizations display correctly
- [ ] Mobile responsiveness
- [ ] All links work

## 🔄 Updating Your Site

To update your deployed site:

```bash
# Make your changes
# Then commit and push
git add .
git commit -m "Update: [describe your changes]"
git push origin main
```

GitHub Pages will automatically rebuild and deploy your updated site.

## 🛠️ Troubleshooting

### Common Issues

1. **Site not loading**
   - Check if GitHub Pages is enabled
   - Verify the branch and folder settings
   - Wait a few minutes for initial deployment

2. **Mathematical formulas not rendering**
   - Ensure KaTeX CDN links are accessible
   - Check browser console for JavaScript errors

3. **Visualizations not working**
   - Verify Plotly.js CDN is loading
   - Check for JavaScript errors in console

4. **Mobile issues**
   - Test on different devices
   - Check viewport meta tag
   - Verify CSS media queries

### Debug Steps

1. **Check GitHub Actions** (if enabled)
   - Go to Actions tab in your repository
   - Look for any build errors

2. **Browser Developer Tools**
   - Open F12 in your browser
   - Check Console for errors
   - Check Network tab for failed requests

3. **GitHub Pages Status**
   - Check [GitHub Status](https://www.githubstatus.com/)
   - Verify your repository settings

## 📊 Performance Optimization

### Before Deployment
- [ ] Minify CSS and JavaScript (optional)
- [ ] Optimize images
- [ ] Enable gzip compression (GitHub Pages handles this)

### After Deployment
- [ ] Test page load speeds
- [ ] Verify mobile performance
- [ ] Check Core Web Vitals

## 🔒 Security Considerations

- GitHub Pages automatically provides HTTPS
- No sensitive data in your repository
- Keep dependencies updated
- Use CDN links for external libraries

## 📈 Analytics (Optional)

To track website usage:

1. **Google Analytics**
   - Create a Google Analytics account
   - Add tracking code to your HTML

2. **GitHub Insights**
   - View traffic in your repository
   - Check popular content

## 🎯 Next Steps

After successful deployment:

1. **Share your site** with the ML community
2. **Collect feedback** from users
3. **Iterate and improve** based on feedback
4. **Add more content** and algorithms
5. **Consider monetization** options if desired

## 📞 Support

If you encounter issues:

- Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review [GitHub community discussions](https://github.com/orgs/community/discussions)
- Open an issue in your repository
- Contact GitHub support if needed

---

**Happy Deploying! 🚀**

Your ML Deconstructed website will soon be helping learners around the world understand machine learning concepts better.
