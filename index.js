var Vibrant = require("node-vibrant");
const trianglify = require('trianglify')

/**
 * Generates and displays an image that matches the description
 * in the README file. Can eaily be modified to return the canvas 
 * or it's PNG equivalent.
 * @param {number} width - value in pixels; can pass viewer width if desired
 * @param {number} height - value in pixels; can pass viewer height if desired
 * @param {string} url - the location of the image, either locally or online
 * @param {string} bigText - larger text; optional parameter
 * @param {string} smallText - smaller text; required if big text used
 */
function getShareImage(width, height, url, bigText, smallText) {
  let colors = [];
  Vibrant.from(url).getPalette()
    .then((palette) => {
      let i = 0;
      for (const swatch in palette) {
        // Adds the even numbered swatches, which are typically
        // vibrant, dark vibrant, and light vibrant/muted
        let rgb = palette[swatch]._rgb.map(x => Math.round(x))
        let color = `rgb(${rgb.toString()})`;
        if (i % 2) colors.push(color);
        i++;
      }
    }).then(() => {
      const canvas = trianglify({
        width: width,
        height: height,
        cellSize: 50,
        variance: 1.0,
        xColors: colors
      }).toCanvas()
  
      let imageSize = width / 2;
      let imageX = (width / 2) - (imageSize / 2);
      let imageY = (height / 2) - (imageSize / 2);
      if (!!bigText) imageY *= .65; // If there's text, move the image up
      let ctx = canvas.getContext('2d');
      base_image = new Image();
      base_image.src = url;
      base_image.onload = () => ctx.drawImage(base_image, imageX, imageY, imageSize, imageSize);

      // Add text if applicable
      if (!!bigText) {
        let textY = (height / 2) + 50;
        let font = "Papyrus";
        ctx.font = `24px ${font}`;
        ctx.fillStyle = "white";
        ctx.textAlign = 'center';
        ctx.fillText(bigText, width / 2, textY);

        if (!!smallText) {
          ctx.font = `18px ${font}`;
          ctx.fillStyle = "#A9A9A9";
          ctx.fillText(smallText, width / 2, textY + 30);
        }
      }
      
      // Until I change it from the promise format, there is no way to
      // return a value back to the synchronous JavaScript. Hence my 
      // workaround by passing it as a parameter to another function.
      addCanvasToPage(canvas);
    }).catch((err) => alert(err)); // Lazy error handling for now
}

module.exports = { getShareImage };