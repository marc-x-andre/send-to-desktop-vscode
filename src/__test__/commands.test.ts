import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { createShortcutCommand } from "../commands";

suite("Commands VS code", () => {
  vscode.window.showInformationMessage("Start 'Commands VS code' tests.");

  test("Sample test", async () => {});
});
