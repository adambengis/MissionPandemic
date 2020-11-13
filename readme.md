## What is the Phaser Project Template?

This is a simple project template created to help add structure and automation to your next [Phaser](http://phaser.io/) game. It includes the following things:

*   A **package.json** for installing npm dependencies
*   **GruntFile.js** for automating build tasks and compiling your game
*   **src** folder where you can put your game code.
*   **deploy** folder where all code gets compiled to and you can push to a server

To get started all you need to do is download this template, the latest version of <a target="_blank" href="https://github.com/photonstorm/phaser">Phaser</a>, [NodeJS](http://nodejs.org) and [Grunt](http://gruntjs.com/).

## Installing NodeJS and Grunt

You can get a copy of NodeJS on its site <a target="_blank" href="http://nodejs.org/">here</a> and install it. After installing it you will want to install grunt from the command line.

Now you can install Grunt's command line tools by typing out the following:

<pre lang="javascript">> npm install -g grunt-cli</pre>

From here, Grunt should work via the command line. If you have never installed Node or Grunt, make sure you watch these two videos:

* [Installing Git, NodeJS and PHP for Impact Game Dev Part 1](http://vimeo.com/78634968)
* [Installing Git, NodeJS and PHP for Impact Game Dev Part 2](http://vimeo.com/78637475)

These two videos help walk you through how to use Node and Grunt. *Note: You will not need to install PHP for this project which is covered in these videos*.


## Setting up the Template's Dependencies

Via the command line, navigate into the template directory's root and run the following command:

<pre lang="javascript">> npm install</pre>

This will download all the dependencies in the package.json file and install them locally for you to use. 

After that you can simply run the following:

<pre lang="javascript">> grunt</pre>

You can start building a game with Phaser, simply modify the main.js file inside of the src/game directory. As long as you have the Grunt task running, your project will automatically recompile every time you make a change to any JavaScript file inside of the src directory. Once the project is recompiled, simply refresh your browser to see the changes. Also make sure you disable your browser's cache.
