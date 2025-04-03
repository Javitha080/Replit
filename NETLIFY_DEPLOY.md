# Deploying to Netlify

This document provides instructions for deploying the Homagama Maha Vidyalaya website to Netlify.

## Prerequisites

1. A [Netlify](https://www.netlify.com/) account
2. Your project code in a Git repository (GitHub, GitLab, Bitbucket)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first deployment)

1. Log in to your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
4. Select the repository containing this project
5. Configure the build settings:
   - Build command: `./netlify-build.sh`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy using Netlify CLI

1. Install the Netlify CLI:
   ```
   npm install netlify-cli -g
   ```

2. Login to your Netlify account:
   ```
   netlify login
   ```

3. Initialize a new Netlify site:
   ```
   netlify init
   ```

4. Follow the prompts to either connect to an existing site or create a new one

5. Deploy the site:
   ```
   netlify deploy
   ```

6. For production deployment:
   ```
   netlify deploy --prod
   ```

## Custom Domain Setup

1. From your Netlify site dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name and follow the instructions to configure DNS settings

## Environment Variables

For any environment variables that might be needed in the future:

1. Go to your site settings in Netlify
2. Navigate to "Build & deploy" → "Environment variables"
3. Add your required environment variables

## Troubleshooting

If you encounter build issues:

1. Check the build logs in Netlify for specific error messages
2. Verify that the `netlify-build.sh` script is executable
3. Ensure that the build directory structure matches what's expected in the Netlify configuration

## Post-Deployment

After successful deployment:

1. Check that all pages and assets are loading correctly
2. Test the responsive design on various devices
3. Verify that all interactive elements are working properly

For any questions or issues, please contact the development team.