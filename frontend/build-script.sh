# Vercel Build Configuration
# This tells Vercel how to build the React app

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --legacy-peer-deps
fi

echo "Running build..."
CI=false npm run build

if [ ! -d "build" ]; then
  echo "Error: Build directory not created"
  exit 1
fi

echo "Build successful!"
