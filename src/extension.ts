import * as vscode from "vscode";
import { createShortcutCommand } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "send-to-desktop-vscode.createShortcut",
    async (uri: vscode.Uri) => {
      const workspaceUri =
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders[0].uri;
      const currentURI = uri || workspaceUri;

      await createShortcutCommand(currentURI.fsPath)
        .then(() => {
          vscode.window.showErrorMessage("Shortcut created");
        })
        .catch((error) => {
          console.error(error);
          vscode.window.showErrorMessage(
            "Error while creating shortcut, see logs"
          );
        });
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
