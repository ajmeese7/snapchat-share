/**
 * Generates a canvas and appends it to the body, after clearing
 * out any previous canvases that may have been on the page.
 */
async function generateImage() {
    let url = document.getElementById("image_url").value;
    if (!url) url = URL.createObjectURL(document.getElementById("local_img").files[0]);
    let bigText = document.getElementById("big_text").value;
    let smallText = document.getElementById("small_text").value;
    let width = document.getElementById("width").value;
    let height = document.getElementById("height").value;
    let font = "https://fonts.gstatic.com/s/alata/v2/PbytFmztEwbIoce9zqY.woff2";

    let canvas = await share.getShareImage(width, height, url, bigText, smallText, font);
    [].forEach.call(document.querySelectorAll('canvas'), (el) => {
        // Removes any existing canvases on the page, so only the latest
        // one will show up
        el.parentNode.removeChild(el);
    });

    document.body.appendChild(canvas);
    let download = document.getElementById("download");
    download.href = canvas.toDataURL();
    let fileName = bigText.split(' ').join('_');
    download.download = `${fileName ? fileName : "download"}.png`;
}