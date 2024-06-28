import createIcon from "./icon";
import createShortcut from "./shortcut";
import { generatePalette } from "./utils/colors";
import { getFolderName, upsertPath } from "./utils/path";
import { transformToTitleCase } from "./utils/strings";
import updateVScodeSettings from "./vscode";

export const ICO_DIR = `${process.env.APPDATA}/desktop-shortcut/generated-ico`;

export const createShortcutCommand = async (folderPath: string) => {
  const projectName = transformToTitleCase(getFolderName(folderPath));

  const { foreground, background } = generatePalette();

  upsertPath(ICO_DIR);

  const iconPath = await createIcon(
    ICO_DIR,
    projectName,
    foreground,
    background
  );

  createShortcut(projectName, iconPath, folderPath);

  await updateVScodeSettings(folderPath, foreground, background);
};
