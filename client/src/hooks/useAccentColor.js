import { useEffect, useState } from 'react';

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s * 100, l * 100];
}

// Convert HSL to hex
function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Check if a color is too grey/neutral to be useful as accent
function isNeutral(s, l) {
  return s < 15 || l < 10 || l > 88;
}

// Get contrast ratio for text-on-background legibility
function getContrastColor(h, s, l) {
  // Perceived luminance approximation
  return l > 55 ? '#0a0a0a' : '#ffffff';
}

// Apply all CSS custom properties to :root
function applyAccentToCss(h, s, l) {
  const root = document.documentElement;
  // Clamp saturation and lightness to useful range
  const sClamped = Math.min(Math.max(s, 50), 80);
  const lBase = Math.min(Math.max(l, 45), 65);

  root.style.setProperty('--accent', hslToHex(h, sClamped, lBase));
  root.style.setProperty('--accent-dark', hslToHex(h, sClamped, lBase - 12));
  root.style.setProperty('--accent-soft', hslToHex(h, sClamped, lBase) + '26'); // 15% opacity
  root.style.setProperty('--accent-glow', hslToHex(h, sClamped, lBase) + '40'); // 25% opacity
  root.style.setProperty('--accent-text', getContrastColor(h, sClamped, lBase));
  root.style.setProperty('--accent-h', `${h}`);
  root.style.setProperty('--accent-s', `${sClamped}%`);
  root.style.setProperty('--accent-l', `${lBase}%`);
}

export function useAccentColor(avatarUrl) {
  const [accentHex, setAccentHex] = useState('#3b82f6');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!avatarUrl) return;

    setIsLoading(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = avatarUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 80; // Sample at 80x80 for performance
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, size, size);

        // Sample a grid of pixels from the center 60% of the image
        const margin = Math.floor(size * 0.2);
        const data = ctx.getImageData(margin, margin, size - margin * 2, size - margin * 2).data;

        let bestH = 210, bestS = 60, bestL = 55; // default blue
        let bestScore = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 200) continue; // skip transparent

          const [h, s, l] = rgbToHsl(r, g, b);
          if (isNeutral(s, l)) continue;

          // Score: prefer high saturation, mid-lightness hues
          const score = s * (1 - Math.abs((l - 50) / 50));
          if (score > bestScore) {
            bestScore = score;
            bestH = h; bestS = s; bestL = l;
          }
        }

        applyAccentToCss(bestH, bestS, bestL);
        setAccentHex(hslToHex(bestH, Math.min(Math.max(bestS, 50), 80), Math.min(Math.max(bestL, 45), 65)));
      } catch (err) {
        console.warn('Color extraction failed, using default accent.', err);
        // Apply default blue
        applyAccentToCss(217, 91, 60);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      console.warn('Avatar image failed to load for color extraction.');
      applyAccentToCss(217, 91, 60);
      setIsLoading(false);
    };
  }, [avatarUrl]);

  return { accentHex, isLoading };
}
