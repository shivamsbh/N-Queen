# 🚀 Quick Start Guide

## Method 1: Automated Start (Recommended)

```bash
# Make the script executable and run it
chmod +x start-project.sh
./start-project.sh
```

## Method 2: Manual Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

## Method 3: If Still Not Working

1. **Test with Simple Version:**
   ```bash
   # Edit src/index.js and change:
   # import App from './App';
   # to:
   # import App from './App-simple';
   ```

2. **Test with Working Version (Recommended):**
   ```bash
   # Edit src/index.js and change:
   # import App from './App';
   # to:
   # import App from './App-working';
   ```

3. **Test with Original Functionality (Exact Match):**
   ```bash
   # Edit src/index.js and change:
   # import App from './App';
   # to:
   # import App from './App-exact';
   ```

4. **Test with Google-Style UI (Enhanced):**
   ```bash
   # Edit src/index.js and change:
   # import App from './App';
   # to:
   # import App from './App-google';
   ```

2. **Check Browser Console:**
   - Open browser (Chrome/Firefox)
   - Press F12 to open Developer Tools
   - Go to Console tab
   - Look for any red error messages

3. **Fresh Install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

## Expected Result

✅ **Working App Should Show:**
- Header with "N-Queens Visualiser" and crown icon
- Input field for number of queens (1-8)
- Speed slider
- Play/Stop button
- Chess boards with solutions when you click Play

## Common Issues Fixed

- ✅ Updated FontAwesome to latest version
- ✅ Added error boundary for better debugging
- ✅ Created simple test version
- ✅ Fixed CSS imports
- ✅ Added proper error handling

## Need Help?

If you're still having issues:
1. Check the TROUBLESHOOTING.md file
2. Share the error messages from browser console
3. Verify your Node.js version: `node --version` (should be 14+)