# Frogger

A remake of a group project I did for an undergraduate course in JS using p5.js.
It's also a remake of Konami's Frogger.

## Description

[https://brianlam37.github.io/Frogger/](https://brianlam37.github.io/Frogger/)

### How to play

Use the WASD keys to navigate through the map, dodging cars, hopping onto floating objects without drowning all the way to the lilypad.

## Background

I wanted to practice some object-oriented programming and thought about refactoring an older project from college. In the end I decided to completely rewrite the program from C++ to JavaScript. I was originally unsatisfied with the original program because it didn't function the way I wanted it to.

## How it was made

I first started out by revisting my original game and Konami's original game.

I then decided what library to use, it was between Phaser3 or p5.js.

In the end I chose p5.js since it was familiar to what I had used in high school.

After that I implemented the basic functionality of the game and had used p5's shapes as standins for the actual sprites.

Later on I drew all of the sprites used based off of one of Konami's versions of Frogger.

## Challenges during development

The biggest issue I had in the original game was creating a perfect grid/tile based movement. I found a solution, although its quite complicated, using JS generators based off of what I learned while learning C# in Unity. It was a inconvenient transfer from C# but it worked out in the end.
