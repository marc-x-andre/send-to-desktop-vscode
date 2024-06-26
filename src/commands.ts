import { ICO_DIR } from "./const";
import createIcon from "./icon";
import createShortcut from "./shortcut";
import { generatePalette } from "./utils/colors";
import { getFolderName, upsertPath } from "./utils/path";
import { transformToTitleCase } from "./utils/strings";
import updateVScodeSettings from "./vscode";

export const createShortcutCommand = async (
  iconSVGPath: string,
  folderPath: string
) => {
  const projectName = getFolderName(folderPath);

  const { foreground, background } = generatePalette();

  upsertPath(ICO_DIR);

  const iconPath = await createIcon(
    iconSVGPath,
    ICO_DIR,
    projectName,
    foreground,
    background
  );

  createShortcut(transformToTitleCase(projectName), iconPath, folderPath);

  await updateVScodeSettings(folderPath, foreground, background);
};
