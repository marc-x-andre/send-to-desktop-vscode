import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import createIcon from "../icon";

suite("Icon", () => {
  vscode.window.showInformationMessage("Start 'Icon' tests.");

  test("createIcon should create an icon on specify location", async () => {
    const path = await createIcon(
      "C:\\Users\\madaigneault\\Desktop",
      "Test Project",
      "#e7700d",
      "#fbcca7"
    );
    console.log(path);
  });
});
