# Quick Setup Guide

## Prerequisites

Before running the project, you need to have **Node.js** installed on your system.

### Installing Node.js

1. **Download Node.js**
   - Visit [https://nodejs.org/](https://nodejs.org/)
   - Download the LTS (Long Term Support) version (version 18 or higher recommended)
   - Choose the Windows Installer (.msi) for your system

2. **Install Node.js**
   - Run the installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" during installation
   - Complete the installation

3. **Verify Installation**
   - Open a new terminal/command prompt
   - Run: `node --version` (should show v18.x.x or higher)
   - Run: `npm --version` (should show 9.x.x or higher)

## Installing and Running the Project

1. **Open Terminal/Command Prompt**
   - Navigate to the project directory:
     ```bash
     cd path\to\How2Chess\how2chess
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (may take 1-2 minutes)

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - The terminal will show a URL like: `http://localhost:5173`
   - Press `Ctrl + Click` on the URL or copy it to your browser
   - The application will automatically reload when you make changes

## Troubleshooting

### "npm is not recognized"
- **Solution**: Node.js is not installed or not in your PATH
- Restart your terminal after installing Node.js
- Verify installation: `node --version` and `npm --version`

### Port Already in Use
- **Solution**: Another application is using port 5173
- Kill the process or change the port in `vite.config.ts`

### Dependencies Installation Fails
- **Solution**: Clear npm cache and try again:
  ```bash
  npm cache clean --force
  npm install
  ```

### Build Errors
- **Solution**: Make sure you're in the `how2chess` directory:
  ```bash
  cd how2chess
  npm install
  npm run dev
  ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Features Overview

Once running, you can:
- 🎓 **Learn** - Interactive chess lessons with step-by-step tutorials
- 🧩 **Practice** - Solve tactical puzzles with hints and progress tracking
- ♟️ **Play** - Play full chess games with move history and analysis
- 📊 **Track Progress** - Monitor your learning journey

Enjoy learning chess! ♔
