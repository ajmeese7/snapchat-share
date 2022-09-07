<p align="center">
  <h1 align="center">👻Snapchat Share👻</h1>
</p>

<p align="center">
   <img src="https://img.shields.io/badge/language-HTML-red"/>
   <img src="https://img.shields.io/github/license/ajmeese7/snapchat-share"/>
   <img src="https://img.shields.io/github/stars/ajmeese7/snapchat-share"/>
   <img src="https://img.shields.io/github/forks/ajmeese7/snapchat-share"/>
   <img src="https://img.shields.io/static/v1?label=%F0%9F%8C%9F&message=If%20Useful&style=style=flat&color=BC4E99" alt="Star Badge"/>
</p>

<p align="center">Create your own shares for Snapchat, similar to Spotify's implementation.</p>
<p align="center">
  <img height="450px" title="Spotify Share Example" alt="Spotify Share Example" src="https://user-images.githubusercontent.com/17814535/85864633-666cd600-b78a-11ea-8665-21e1e6b60504.jpg">
  <img height="450px" title="Snapchat Share Example" alt="Snapchat Share Example" src="https://user-images.githubusercontent.com/17814535/90982218-5162b800-e52b-11ea-9756-abe0b8c52b98.png">
  <img height="450px" title="Snapchat Share with Text" alt="Snapchat Share with Text" src="https://user-images.githubusercontent.com/17814535/90982193-24aea080-e52b-11ea-8550-cc52642fdb83.png">
</p>

## Idea
I'm sure many of you are familiar with Spotify and Snapchat. Both companies
are on the bleeding edge of technology, and strive to perfect the little
things that keep people coming back.

One of those little things that has stuck out to me the most is Spotify's
integration with Snapchat in its sharing feature. It has the same integration
with Instagram, but you can use the same content for either app, so one
project such as this one can handle both use cases.

I thought that was super neat, but on my integration I wanted to make it a little
fancier. So I did.

Of course, linear gradients are SO 2016, so I opted for [Trianglify](https://github.com/qrohlf/trianglify)
and its unique pattern generation. I wanted the colors to match the image
the application is hoping to share, so I did some Window shopping and found
[node-vibrant](https://github.com/Vibrant-Colors/node-vibrant), an excellent
color palette generator that takes an image as input.

I simply combined the two, used an HTML wrapper so I could create an image
element to stick right in the middle of the canvas, which is the middle image
you see above.

As neat as that was, the Spotify share included some helpful details along with
the image, in their case the song name and artist. I figured it would be cool
to offer similar functionality, so I included a text parameter as well.

You can also pass in a custom font URL, with the default being "Papyrus" if you
should decide to not use this option.

## Installation
First, make sure you have Node.js and npm installed on your machine. For a guide on
how to do that, check [here](https://treehouse.github.io/installation-guides/windows/node-windows.html).

Next, download the project and change into the project directory. Open a terminal from
within that directory and run `npm install` to download the required dependencies.

Since the project is currently configured to display the result in your browser,
you must run `npm run build` to bundle all the required files into a single JavaScript file
that the browser can use. When you want to call the function, it will be called like
`share.getShareImage(...)`.

Once you've done that, you can open the `index.html` file to make sure everything is
functioning properly. If you see something on the screen, you're good to go! Move on
to the usage instructions to learn what you can do with it.

## Usage
#### getShareImage
Parameters:
- `width`: value in pixels; can pass viewer width if desired
- `height`: value in pixels; can pass viewer height if desired
- `url`: the location of the image, either locally or online
- `bigText`: larger text; optional parameter
- `smallText`:  smaller text; required if big text used
- `font`: the URL to a custom font, if so desired
  - Defaults to the Papyrus font if no alternative is offered

## Troubleshooting
### downloadable font: rejected by sanitizer
If you pass a font string like `https://fonts.googleapis.com/css?family=Alata`,
you are going to get this error. The issue lies in the lack of a file extension.

The fix is to navigate to that link in your browser and browse the contents
until you find the URL with a file extension, which in this example is
`https://fonts.gstatic.com/s/alata/v2/PbytFmztEwbIoce9zqY.woff2`.

## Plans
I'm not sure which direction I want to take this project in yet, but I
know it's working.

If I should get this running on a server as a service you can call on
demand, I will update the installation instructions accordingly. That
may be a desirable direction, because I have always wanted to implement
an API for something like this.

I plan to allow users to select custom colors, and potentially not even
require an image if they're just looking for a colored background for text.
