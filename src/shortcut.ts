import createDesktopShortcut from "create-desktop-shortcuts";

const createShortcut = (
  projectName: string,
  icoFilePath: string,
  folderPath: string
) => {
  return createDesktopShortcut({
    windows: {
      filePath: "%LocalAppData%\\Programs\\Microsoft VS Code\\Code.exe",
      name: projectName,
      icon: icoFilePath,
      arguments: `${folderPath}`,
    },
  });
};

export default createShortcut;
