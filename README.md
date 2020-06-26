# snapchat-share
Create your own shares for Snapchat, similar to Spotify's implementation.

## Idea
I'm sure many of you are familiar with Spotify and Snapchat. Both companies
are on the bleeding edge of technology, and strive to perfect the little 
things that keep people coming back.

One of those little things that has stuck out to me the most is Spotify's
integration with Snapchat in its sharing feature. It has the same integration
with Instagram, but you can use the same content for either app, so one
project such as this one can handle both use cases.

Here is an example of the Spotify-generated share page in Snapchat:
![](https://user-images.githubusercontent.com/17814535/85797216-cfa80700-b700-11ea-9dae-49dc03b65c94.jpg)

I thought that was super neat, but on my integration I wanted to make it a little
fancier. So I did.

Of course, linear gradients are SO 2016, so I opted for [Trianglify](https://github.com/qrohlf/trianglify)
and its unique pattern generation. I wanted the colors to match the image
the application is hoping to share, so I did some Window shopping and found
[node-vibrant](https://github.com/Vibrant-Colors/node-vibrant), an excellent
color palette generator that takes an image as input.

I simply combined the two, used an HTML wrapper so I could create an image
element to stick right in the middle of the Canvas, and this is the result:
![](https://user-images.githubusercontent.com/17814535/85798729-92914400-b703-11ea-9844-710d9b3753e7.png)

As neat as that was, the Spotify share included some helpful details along with
the image, in their case the song name and artist. I figured it would be cool
to offer similar functionality, so I included a text parameter as well:
![](https://user-images.githubusercontent.com/17814535/85852715-c6f21800-b776-11ea-8ed2-786f770276fd.png)

Yes, the text doesn't look all that great right now. I wanted to use a nicer looking
font like Spotify did, but I don't have the time to implement non-web safe fonts right
now for the canvas. If somebody else would like to add in support for that, I would
really appreciate it!

## Installation
First, make sure you have Node.js and npm installed on your machine. For a guide on
how to do that, check [here](https://treehouse.github.io/installation-guides/windows/node-windows.html).

Next, download the project and change into the project directory. Open a terminal from
within that directory and run `npm install` to download the required dependencies.

Since the project is currently configured to display the result in your browser,
you must run `browserify index.js -o bundle.js` to bundle all the required files
into one JavaScript file that the browser can use.

Once you've done that, you can open the `index.html` file to make sure everything is
functioning properly. If you see something on the screen, you're good to go! Move on
to the usage instructions to learn what you can do with it.

## Usage
The behavior described below could change in the near future, as this is only the
first iteration of the project. Documentation will be updated to reflect updates.

[TODO]

## Plans
I'm not sure which direction I want to take this project in yet, but I 
know it's working. Deciding if I want to implement it as an API or
a NPM package or something that can be used in the browser is something
I can work on later.

If I should get this running on a server as a service you can call on
demand, I will update the installation instructions accordingly. That
may be a desirable direction, because I have always wanted to implement
an API for something like this.