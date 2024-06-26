import { promises as fs } from "fs";
import { isColorDark } from "./utils/colors.js";
import { upsertPath } from "./utils/path.js";

const newSettings = (colorFore: string, colorBack: string) => ({
  "workbench.colorCustomizations": {
    "activityBar.background": colorBack,
    "titleBar.activeBackground": colorFore,
    "titleBar.activeForeground": isColorDark(colorFore) ? "#1f1f1f" : "#FCF9F9",
  },
});

const updateVScodeSettings = async (
  folderPath: string,
  colorFore: string,
  colorBack: string
) => {
  const settingFile = `${folderPath}/.vscode/settings.json`;
  await upsertPath(`${folderPath}/.vscode`);
  // Getting the content
  let fileContent = {};
  try {
    const data = await fs.readFile(settingFile, "utf8");
    fileContent = JSON.parse(data);
  } catch (err) {}
  // Merging
  const updatedContent = {
    ...fileContent,
    ...newSettings(colorFore, colorBack),
  };
  // Writing
  await fs.writeFile(
    settingFile,
    JSON.stringify(updatedContent, null, 4),
    "utf8"
  );
};

export default updateVScodeSettings;
