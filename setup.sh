#!/bin/bash
# Quick setup script for Social Media Angular UI

echo "🅰️ Setting up Social Media Angular UI..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Angular CLI if not present
if ! command -v ng &> /dev/null; then
    echo "🔧 Installing Angular CLI..."
    npm install -g @angular/cli
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   npm start"
echo ""
echo "🌐 The app will be available at:"
echo "   http://localhost:4200"
echo ""
echo "⚙️  Don't forget to update the API URL in:"
echo "   src/environments/environment.ts"
