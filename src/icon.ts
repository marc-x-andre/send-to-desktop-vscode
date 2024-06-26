import fs from "fs/promises";
import { parse, stringify } from "svgson";
import sharp from "sharp";
import ico from "sharp-ico";
import crypto from "crypto";

const modifySVGFillColor = async (
  svgContent: string,
  colorFore: string,
  colorBack: string
) => {
  const jsonSVG = await parse(svgContent);
  const pathFore = jsonSVG.children[0];
  const pathBack = jsonSVG.children[1];
  if (colorFore && pathFore?.attributes?.fill) {
    pathFore.attributes.fill = colorFore;
  }
  if (colorBack && pathBack?.attributes?.fill) {
    pathBack.attributes.fill = colorBack;
  }
  return stringify(jsonSVG);
};

const convertSVGtoICO = async (
  svgContent: string,
  outputFilePath: string,
  width: number = 256,
  height: number = 256
) => {
  await ico.sharpsToIco(
    [sharp(Buffer.from(svgContent)).resize(width, height)],
    outputFilePath
  );
};

const createIcon = async (
  iconSVGPath: string,
  outputPath: string,
  projectName: string,
  colorFore: string,
  colorBack: string
) => {
  const svgContent = await fs.readFile(iconSVGPath, "utf-8");
  const reconstructSVG = await modifySVGFillColor(
    svgContent,
    colorFore,
    colorBack
  );
  const fileName = `${projectName}_${crypto
    .randomBytes(4)
    .toString("hex")}.ico`;
  const filePath = `${outputPath}/${fileName}`;
  await convertSVGtoICO(reconstructSVG, filePath);
  return filePath;
};

export default createIcon;
