import { useEffect, useState } from 'react';

// Convert HSL to hex
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);

  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color =
      l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

// Apply default blue/purple accent
function applyDefaultAccent() {
  const root = document.documentElement;

  const blue = hslToHex(217, 91, 60);
  const dark = hslToHex(217, 91, 48);

  root.style.setProperty('--accent', blue);
  root.style.setProperty('--accent-dark', dark);
  root.style.setProperty('--accent-soft', `${blue}26`);
  root.style.setProperty('--accent-glow', `${blue}40`);
  root.style.setProperty('--accent-text', '#ffffff');

  root.style.setProperty('--accent-h', '217');
  root.style.setProperty('--accent-s', '91%');
  root.style.setProperty('--accent-l', '60%');

  return blue;
}

export function useAccentColor(avatarUrl) {
  const [accentHex, setAccentHex] = useState('#3b82f6');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Always start with a valid theme.
    const defaultAccent = applyDefaultAccent();
    setAccentHex(defaultAccent);

    // Don't attempt to download external images for
    // canvas color extraction.
    if (!avatarUrl) {
      setIsLoading(false);
      return;
    }

    // External Google/Drive/etc. URLs can return
    // 429/CORS errors. The avatar itself can still
    // be displayed by the <img>.
    if (
      avatarUrl.includes('googleusercontent.com') ||
      avatarUrl.includes('drive.google.com')
    ) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const img = new Image();

    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 80;

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d', {
          willReadFrequently: true
        });

        if (!ctx) {
          throw new Error('Canvas unavailable');
        }

        ctx.drawImage(img, 0, 0, size, size);

        const margin = Math.floor(size * 0.2);

        const data = ctx.getImageData(
          margin,
          margin,
          size - margin * 2,
          size - margin * 2
        ).data;

        let bestH = 217;
        let bestS = 91;
        let bestL = 60;
        let bestScore = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          if (a < 200) continue;

          // RGB → HSL
          const rr = r / 255;
          const gg = g / 255;
          const bb = b / 255;

          const max = Math.max(rr, gg, bb);
          const min = Math.min(rr, gg, bb);

          let h = 0;
          let s = 0;
          const l = (max + min) / 2;

          if (max !== min) {
            const d = max - min;

            s =
              l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

            if (max === rr) {
              h = (gg - bb) / d + (gg < bb ? 6 : 0);
            } else if (max === gg) {
              h = (bb - rr) / d + 2;
            } else {
              h = (rr - gg) / d + 4;
            }

            h /= 6;
          }

          const hue = h * 360;
          const saturation = s * 100;
          const lightness = l * 100;

          if (
            saturation < 15 ||
            lightness < 10 ||
            lightness > 88
          ) {
            continue;
          }

          const score =
            saturation *
            (1 - Math.abs((lightness - 50) / 50));

          if (score > bestScore) {
            bestScore = score;
            bestH = hue;
            bestS = saturation;
            bestL = lightness;
          }
        }

        const finalS = Math.min(
          Math.max(bestS, 50),
          80
        );

        const finalL = Math.min(
          Math.max(bestL, 45),
          65
        );

        const accent = hslToHex(
          bestH,
          finalS,
          finalL
        );

        const root = document.documentElement;

        root.style.setProperty(
          '--accent',
          accent
        );

        root.style.setProperty(
          '--accent-dark',
          hslToHex(bestH, finalS, finalL - 12)
        );

        root.style.setProperty(
          '--accent-soft',
          `${accent}26`
        );

        root.style.setProperty(
          '--accent-glow',
          `${accent}40`
        );

        root.style.setProperty(
          '--accent-text',
          finalL > 55 ? '#0a0a0a' : '#ffffff'
        );

        root.style.setProperty(
          '--accent-h',
          `${bestH}`
        );

        root.style.setProperty(
          '--accent-s',
          `${finalS}%`
        );

        root.style.setProperty(
          '--accent-l',
          `${finalL}%`
        );

        setAccentHex(accent);

      } catch (error) {
        console.warn(
          'Color extraction unavailable. Using default accent.'
        );

        const defaultAccent = applyDefaultAccent();

        setAccentHex(defaultAccent);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      console.warn(
        'External image cannot be used for color extraction. Using default accent.'
      );

      const defaultAccent = applyDefaultAccent();

      setAccentHex(defaultAccent);
      setIsLoading(false);
    };

    img.src = avatarUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [avatarUrl]);

  return {
    accentHex,
    isLoading
  };
}