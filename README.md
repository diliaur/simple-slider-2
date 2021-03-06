# Simple Slider 2: A Responsive WordPress Slider

This slider is based off my [original slider](https://github.com/diliaur/simple-slider). It adds the improvements of a widget (rather than just a shortcode) which allows the user to choose a timeframe for posts, number of posts to show, and multiple categories of post to display.

## Pre-requisites

- Posts must have a featured image/thumbnail set, or the post will not show up in the slider (this is on purpose)
- You choose the desired aspect ratio and size of the featured image.
	- Ideally the images would all be the same size for consistency, but the slider will resize around different image sizes.

## How To Install Plugin in WordPress

Download this repository and unzip it into your Plugins directory. Activate it, set up the options in the widget area of the dashboard, and off you go.

---

## To Do

- [ ] allow on/off toggle of categories displayed on image
- [ ] allow choice of label color of categories displayed on image
- [ ] Change HTML and CSS in accordance with correct plugin slug
- [ ] Let user decide the slide duration
- [ ] Add shortcode back so people can use the slider in posts (if they want)
- [ ] Add shortcode options to echo widget options
- [ ] On/off toggle titles (e.g. just have photo + excerpt, vs full titles) - might make more sense for ppl who want to use the slider within a page (will need to modify shortcode for options)
- [ ] Make title character cutoff more sophisticated (e.g. don't break within word)

## Done

- [x] _2018-12-24_ Responsive mobile layout

## Issues

Note: Because this is a rehash of an older slider, it may still have some of the same issues. However, the modification of the slider into a widget may have resolved some issues. They have not been examined yet so can't be ruled out, but because *this* version hasn't been tested in the same way, the issues also won't be ported here. You can read about the previous slider's issues in its [readme](https://github.com/diliaur/simple-slider).

- PHP strtotime() _may_ cause wonky behavior in choosing the time frame, but this is yet to be seen. The time frame is not meant to be super precise, however. It is mostly intended to keep too-old posts from resurfacing.
- Don't seem to be able to have two sliders present on the same page, probably because of the way post globals are being used... May not be a huge issue since I don't forsee WP users needing more than one of these per page, but you never know.

### Issues from _Old Version_ to Check out
- JS or CSS throws off behavior of *other* slider plugins when this plugin is active
- Strange behavior when shortcode used in non-widget areas. Currently don't have a shortcode, so maybe this will be moot
- jQuery selectors don't allow for multiple iterations of the slider on one page
