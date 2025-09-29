# AI-LASER-QR Deploy Script

# Build with explicit settings for Vercel
npm run build

# Verify build output
echo "Build completed. Checking dist folder:"
ls -la dist/

# Check if main files exist
if [ -f "dist/index.html" ] && [ -d "dist/assets" ]; then
    echo "✅ Build successful - ready for deployment"
else
    echo "❌ Build failed - missing files"
    exit 1
fi