Mode 7/3D perspective notes

- http://www.coranac.com/tonc/text/mode7.htm (mode 7 on a GBA, includes pretty diagrams)
- http://gamedev.stackexchange.com/a/28764 (basic 3d projection overview)

Possible Zulip question:

I'm working on a little racing game using <canvas>, and want to make it look similar to the original Mario Kart, with a 2D "track" image projected onto a 3D ground plane. I've found a few things online about doing this effect (like this SO post http://gamedev.stackexchange.com/questions/24957/doing-an-snes-mode-7-affine-transform-effect-in-pygame/28764#28764), and they usually use the same strategy:

- Get the 2D drawing as a flat texture
- Iterate over each pixel in the screen, projecting points of the original texture onto the points of the screen

This seems like it'd work fine in canvas, but I have an additional wrinkle: instead of actually having a 2D texture file, I'd like to draw the original texture *using canvas*. The only way I can think of to do this is to actually draw the texture onto a *hidden* canvas, then get pixels from this canvas using `getImageData`.


Wikipedia has a neat matrix transform for mode7:

http://en.wikipedia.org/wiki/Mode_7#Formula

People here saying it's impossible: http://stackoverflow.com/questions/3836036/mode7-like-perspective-transform-in-canvas

Perf is bad === use smaller canvas and scale up?



Lua magic <3 https://love2d.org/forums/viewtopic.php?f=4&t=24464
