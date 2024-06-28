import sharp from "sharp";
import ico from "sharp-ico";
import crypto from "crypto";

const originalFolderSVG = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="foregroundColor" d="M19.97586,10V9a3,3,0,0,0-3-3H10.69678l-.31622-.94868A3,3,0,0,0,7.53451,3H3.97586a3,3,0,0,0-3,3V19a2,2,0,0,0,2,2H3.3067a2,2,0,0,0,1.96774-1.64223l1.40283-7.71554A2,2,0,0,1,8.645,10Z" class="color6563ff svgShape">
    </path>
    <path fill="backgroundColor" d="M22.02386,10H8.645a2,2,0,0,0-1.96777,1.64221L5.27441,19.35773A2,2,0,0,1,3.3067,21H19.55292a2,2,0,0,0,1.96771-1.64227l1.48712-8.17884A1,1,0,0,0,22.02386,10Z" class="colorb2b1ff svgShape">
    </path>
</svg>
`;

const createIcon = async (
  outputPath: string,
  projectName: string,
  colorFore: string,
  colorBack: string
) => {
  let modifiedSVG = originalFolderSVG;
  modifiedSVG = modifiedSVG.replace("foregroundColor", colorFore);
  modifiedSVG = modifiedSVG.replace("backgroundColor", colorBack);

  const fileName = `${projectName.toLowerCase().replaceAll(" ", "")}_${crypto
    .randomBytes(4)
    .toString("hex")}.ico`;

  const filePath = `${outputPath}/${fileName}`;

  await ico.sharpsToIco(
    [sharp(Buffer.from(modifiedSVG)).resize(256, 256)],
    filePath
  );

  return filePath;
};

export default createIcon;
