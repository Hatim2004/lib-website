#!/bin/bash

# Exit on any error
set -e

# Step 1: Build the project
echo "📦 Building project..."
npm run build

# Step 2: Remove old files from the web root
echo "🧹 Cleaning /srv/http/..."
sudo rm -rf /srv/http/*

# Step 3: Copy new build files
echo "📁 Deploying to /srv/http/..."
sudo cp -r dist/* /srv/http/

# Step 4: Restart Apache server
echo "🔁 Restarting Apache (httpd)..."
sudo systemctl restart httpd

echo "✅ Deployment complete!"
