# Simple Slider 2
## A WordPress Slider

This slider is based off my [original slider](https://github.com/diliaur/simple-slider). It adds the improvements of a widget (rather than just a shortcode) which allows the user to choose a timeframe for posts, number of posts to show, and multiple categories of post to display.

## Pre-requisites

- Posts must have a featured image/thumnail set, or they will not show
- You choose the desired aspect ratio and size of the featured image. Ideally they would all be the same size for consistency, but the slider will resize around the image.

## To Install

Just download the repo and unzip it into your Plugins directory. Activate it, set up the options in the widget area of the dashboard, and off you go.

## To Do

Currently in the process of porting Todos over from the [original slider](https://github.com/diliaur/simple-slider).

## Issues

- PHP strtotime() _may_ cause wonky behavior in choosing the time frame, but this is yet to be seen. The time frame is not meant to be super precise, however. It is mostly intended to keep too-old posts from resurfacing.
- Looks wonky at lower resolutions and on mobile. Need a way to collapse titles underneath slide images. This will be on the todo list.