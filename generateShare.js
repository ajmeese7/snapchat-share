const Vibrant = require("node-vibrant");
const trianglify = require("trianglify");

/**
 * Generates and displays an image that matches the description
 * in the README file. Can eaily be modified to return the canvas
 * or its PNG equivalent.
 * @param {Number} width Value in pixels; can pass viewer width if desired
 * @param {Number} height Value in pixels; can pass viewer height if desired
 * @param {String} url The location of the image, either locally or online
 * @param {String} bigText Larger text; optional parameter
 * @param {String} smallText Smaller text; required if big text used
 * @param {String} font The URL to a custom font, if so desired
 * @returns {HTMLCanvasElement|undefined} The generated image on a canvas
 */
async function getShareImage(width, height, url, bigText, smallText, font) {
  const palette = await Vibrant.from(url).getPalette((err, palette) =>
    err ? console.error(err) : palette
  );

  if (!palette) return undefined;
  const colors = await getColors(palette);
  const canvas = await createCanvas(width, height, colors);

  const imageSize = (height > width ? width : height) / 2;
  const imageX = (width / 2) - (imageSize / 2);
  const imageY = (height / 2) - (imageSize / 2);
  if (!!bigText) imageY *= .65; // If there's text, move the image up
  const ctx = canvas.getContext("2d");

  // https://stackoverflow.com/a/36248266/6456163
  let canvasFont = "Papyrus";
  if (font) {
    const myFont = new FontFace("Custom Font", `url(${font})`);
    await myFont.load().then((font) => {
      document.fonts.add(font);
      console.log("Custom font loaded!");
      canvasFont = "Custom Font";
    });
  }

  // https://stackoverflow.com/a/46639473/6456163
  return new Promise((resolve) => {
    // https://stackoverflow.com/a/30517793/6456163
    base_image = new Image();
    base_image.crossOrigin = "anonymous";
    base_image.onerror = () => console.error(`${url} failed to load!`);
    base_image.onload = () => {
      // Add image
      ctx.drawImage(base_image, imageX, imageY, imageSize, imageSize);

      // Add text if applicable
      if (bigText) {
        ctx.font = `24px ${canvasFont}`;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        let textY = (height / 2) + (height > width ? 50 : 85);
        let bigLines = getLines(ctx, bigText, width * 0.85);
        bigLines.forEach((line) => {
          ctx.fillText(line, width / 2, textY);
          textY += 30;
        });

        if (smallText) {
          // Wraps the lines at 85% of the canvas's width; could make a parameter
          ctx.font = `18px ${canvasFont}`;
          ctx.fillStyle = "#A9A9A9";
          const smallLines = getLines(ctx, smallText, width * 0.85);
          smallLines.forEach((line) => {
            ctx.fillText(line, width / 2, textY);
            textY += 25;
          });
        }
      }

      resolve(canvas);
    }

    base_image.src = url;
  });
}

/**
 * Gets the colors from the palette.
 * @param {Vibrant.Palette} palette The palette from `Vibrant`
 * @returns {String[]} The colors to be used in the image
 */
function getColors(palette) {
  let colors = [];
  let i = 0;
  for (const swatch in palette) {
    // Adds the even numbered swatches, which are typically
    // vibrant, dark vibrant, and light vibrant/muted
    const rgb = palette[swatch]._rgb.map((x) => Math.round(x));
    const color = `rgb(${rgb.toString()})`;
    if (i % 2) colors.push(color);
    i++;
  }

  return colors;
}

/**
 * Creates a canvas with a `trianglify` background.
 * @param {Number} width The width of the canvas
 * @param {Number} height The height of the canvas
 * @param {String[]} colors The colors to be used in the image
 * @returns {HTMLCanvasElement} The canvas with the triangle pattern
 */
function createCanvas(width, height, colors) {
  const canvas = trianglify({
    width: width,
    height: height,
    cellSize: 50,
    variance: 1.0,
    xColors: colors
  }).toCanvas();

  return canvas;
}

/**
 * Breaks a string of text down into multiple lines
 * to be wrapped at the specified width.
 * @param {Object} ctx The canvas context
 * @param {String} text The text to be wrapped
 * @param {Integer} maxWidth The width at which to wrap text
 * @returns {String[]} The array of lines
 */
function getLines(ctx, text, maxWidth) {
  // https://stackoverflow.com/a/16599668/6456163
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }

  lines.push(currentLine);
  return lines;
}

module.exports = { getShareImage };
