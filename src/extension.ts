import * as vscode from "vscode";
import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";

const execPromise = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
  // Create a status bar item
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "Git User: Loading...";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Function to update the status bar with the Git user
  const updateGitUser = async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
      statusBarItem.text = "👤 Workspace not found";
      return;
    }

    const workspaceFolder = workspaceFolders[0].uri.fsPath;
    try {
      // Try to get the local Git user
      let { stdout: localUser } = await execPromise(
        `git config --local user.name`,
        {
          cwd: workspaceFolder,
        }
      );

      if (localUser.trim()) {
        // If local user exists, display it in the status bar
        statusBarItem.text = `👤 git local: ${localUser.trim()}`;
      } else {
        // If no local user exists, check for global Git user
        let { stdout: globalUser } = await execPromise(
          `git config --global user.name`
        );

        if (globalUser.trim()) {
          // If global user exists, display it in the status bar
          statusBarItem.text = `👤 git global: ${globalUser.trim()}`;
        } else {
          // If neither local nor global user exists, show not found message
          statusBarItem.text = "👤 Git user not found";
        }
      }
    } catch (error) {
      // If there's an error with local, fall back to global
      try {
        let { stdout: globalUser } = await execPromise(
          `git config --global user.name`
        );

        if (globalUser.trim()) {
          // If global user exists, display it in the status bar
          statusBarItem.text = `👤 git global: ${globalUser.trim()}`;
        } else {
          // If neither local nor global user exists, show not found message
          statusBarItem.text = "👤 Git user not found";
        }
      } catch (error) {
        // Handle any errors (e.g., if git command fails)
        statusBarItem.text = "👤 Git user not found";
      }
    }
  };

  // Initial update when the extension is activated
  updateGitUser();

  // Re-run the update when workspace folders change (e.g., new folder added)
  vscode.workspace.onDidChangeWorkspaceFolders(updateGitUser);
}

// Deactivate function (currently not doing anything, but required)
export function deactivate() {}
