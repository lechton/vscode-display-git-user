import * as vscode from "vscode";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.text = "👤 Loading...";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  const updateGitUser = async () => {
    try {
      const { stdout } = await execPromise("git config user.name");
      statusBarItem.text = `👤 ${stdout.trim()}`;
    } catch (error) {
      statusBarItem.text = "👤 Git user not found";
    }
  };

  updateGitUser();

  // Update user when the Git repository changes
  vscode.workspace.onDidChangeWorkspaceFolders(updateGitUser);
}

export function deactivate() {}
