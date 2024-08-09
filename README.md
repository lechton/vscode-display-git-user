# Display Git User (VSCode Extension)

*Displays git user.name in Status Bar of VSCode.*


## Overview

This Visual Studio Code (VSCode) extension provides a simple status bar item that displays the currently configured Git user for your workspace. It checks both local and global Git configurations and updates the status bar accordingly.

### Key Features:

- Displays the Git user configured locally in the workspace.
- Falls back to display the global Git user if no local configuration is found.
- Provides real-time updates when the workspace or Git configuration changes.

## How It Works

- **Local User Check:** The extension first checks if a local Git user is configured for the workspace by running the command `git config --local user.name`.
- **Global User Check:** If no local user is found, the extension checks for a global Git user configuration using `git config --global user.name`.
- **Status Bar Update:** Depending on the result, the extension updates the VSCode status bar with one of the following messages:
  - `👤 git local: <username>` – when a local Git user is found.
  - `👤 git global: <username>` – when only a global Git user is found.
  - `👤 Git user not found` – when neither a local nor a global Git user is configured.

## Installation (of the node project)

To use this extension, clone the repository and install the necessary dependencies:

```bash
git clone <repository-url>
cd <repository-directory>
npm install
```

## Installation (of the plugin)

If it's not already installed, install vsce package

```bash
npm install -g @vscode/vsce
```

### Step 1: Create the .vsix file (VS Code extension)

```bash
vsce package
```

This will create a .vsix file (e.g., display-git-user-v.x.x.vsix) in the root directory of your project. This file is your packaged extension.

### Step 2: Install the extension in VSCode

- Click on the three dots (...) in the top right corner of the Extensions view, and select "Install from VSIX...".
- Browse and select the display-git-user-v.x.x.vsix file.

## How to delete the extension ? 

Delete: right click on extension and delete

And reload VSCode

- by pressing Ctrl+Shift+X (Windows/Linux) or Cmd+Shift+X (macOS).
- Start typing "Reload Window" in the Command Palette.
- Select `Developer: Reload Window` from the dropdown list and press Enter.
