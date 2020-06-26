var Vibrant = require("node-vibrant");
const trianglify = require('trianglify')

// Example function call
getShareImage(350, 600, "https://res.cloudinary.com/couponbooked/image/upload/v1593047435/templates/books/Friend/friends_mmvend.png", "Friend", "For my bestie.");

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
        let rgb = `rgb(${palette[swatch]._rgb.toString()})`;
        if (i % 2) colors.push(rgb);
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

        ctx.font = `18px ${font}`;
        ctx.fillStyle = "#A9A9A9";
        ctx.fillText(smallText, width / 2, textY + 30);
      }
      
      // You can uncomment the following to save the image
      document.body.appendChild(canvas);
    });
}
