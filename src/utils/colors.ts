function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}

export function isColorDark(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  // Using the formula for perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // A threshold of 128 for perceived brightness
  return brightness < 128;
}

export function generatePalette() {
  function hslToHex(h: number, s: number, l: number): string {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // Convert to hex and pad with 0
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  // Random hue, saturation, and lightness values
  const hue = Math.floor(Math.random() * 360);
  const saturation = 70 + Math.floor(Math.random() * 30); // Saturation between 70% and 100%
  const lightness1 = 40 + Math.floor(Math.random() * 20); // Lightness between 40% and 60%
  const lightness2 = 80 + Math.floor(Math.random() * 20); // Lightness between 80% and 100%

  const foreground = hslToHex(hue, saturation, lightness1);
  const background = hslToHex(hue, saturation, lightness2);

  return { foreground, background };
}
