import * as vscode from "vscode";
import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";

const execPromise = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "Git User: Loading...";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  const updateGitUser = async () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders || workspaceFolders.length === 0) {
      statusBarItem.text = "👤 Workspace not found";
      return;
    }

    const workspaceFolder = workspaceFolders[0].uri.fsPath;
    try {
      // Check if the workspace folder contains a .git directory
      const gitDir = path.join(workspaceFolder, ".git");
      const { stdout } = await execPromise(`git config --local user.name`, {
        cwd: workspaceFolder,
      });
      if (stdout) {
        statusBarItem.text = `👤 ${stdout.trim()}`;
      } else {
        statusBarItem.text = "👤 Git user not set locally";
      }
    } catch (error) {
      statusBarItem.text = "👤 Git user not found";
    }
  };

  updateGitUser();

  // Update user when the Git repository changes
  vscode.workspace.onDidChangeWorkspaceFolders(updateGitUser);
}

export function deactivate() {}
