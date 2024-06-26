import * as vscode from "vscode";
import { createShortcutCommand } from "./commands";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "send-to-desktop-vscode" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "send-to-desktop-vscode.createShortcut",
    (uri: vscode.Uri) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Send to Desktop!");
      const extensionPath = context.extensionPath;
      const workspaceUri =
        vscode.workspace.workspaceFolders &&
        vscode.workspace.workspaceFolders[0].uri;
      const currentURI = uri || workspaceUri;
      const iconSVGPath = `${extensionPath}/dist/desktop-icon.svg`;

      try {
        createShortcutCommand(iconSVGPath, currentURI.fsPath);
      } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage("Error !");
      }
    }
  );
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
