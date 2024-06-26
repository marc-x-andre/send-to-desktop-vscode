import fs from "fs/promises";
import path from "path";

export function getFolderName(filePath: string): string {
  // Get absolute path
  const absolutePath = path.resolve(filePath);
  // Get the base name of the directory
  return path.basename(absolutePath);
}

export async function upsertPath(filePath: string) {
  try {
    await fs.access(filePath);
  } catch (err) {
    await fs.mkdir(filePath, { recursive: true });
  }
}
