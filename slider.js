jQuery( document ).ready( function( $ ) {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *																		   *
	 *                            GLOBAL  VARIABLES                            *
	 *																		   *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var NUM_SLIDES = $( '.ss2-slide-list > li' ).length;
	var SLIDE_MAX = NUM_SLIDES - 1;
	//console.log ("SLIDE_MAX -> " + SLIDE_MAX);
	var allSlideTitles = $( '.ss2-slide-list > li .ss2-title-and-date' ); // keeping this out here so others can use it
	var allSlideTitlesClone = allSlideTitles.clone(); // a copy for the large size
	var currentSlide = 0; // begins at 0
	var slideTime = 10000; // time ea slide displays in ms

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *																		   *
	 *                               THE CODE                                  *
	 *																		   *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 * Based on the slides, populate the title container div with titles
	 */
	function populateTitles() {
		$( '.ss2-container-titles' ).append(allSlideTitlesClone); // move allSlideTitles to target div
	}

	/**
	 *
	 * Sets up the heights of the title elements, based on the height of the
	 *  slide image container
	 *
	 */
	function setTitleHeights() {

		var slideContainerHeight = $( '.ss2-slide-list' ).height() + $( '.ss2-slide-nav' ).height();

		console.log(slideContainerHeight);
		var borderHeight = NUM_SLIDES; // compensate for total height taken by borders (should be v small)
		var indivTitleHeight = (slideContainerHeight - borderHeight) / NUM_SLIDES;

		// assign height to title element class
		// use innerheight because it takes padding into consideration
		$( '.ss2-container-titles .ss2-title-and-date' ).innerHeight(indivTitleHeight);

		// re-visibilize if coming back up from small screen layout
		allSlideTitlesClone.show();
	}

	/**
	 *
	 * Prints # of dots based on # of slides
	 *
	 */
	function generateDots() {
		$( '.ss2-nav-dots' ).append( "<ul>" );
		for (var count = 0; count < NUM_SLIDES; count++) {
			$( '.ss2-nav-dots ul' ).append( "<li><i class='fa fa-circle-o'></i></>" ); // UNICODE "White Circle" U+25CB
		}
	}

	/**
	 *
	 * Manipulates the navigation dots; highlights current slide corresponding
	 * dot and removes previous dot highlight.
	 * Used by any function which moves the slides in any direction.
	 * Should not need to manipulate currentSlide global. Purely reactionary.
	 * @param {current} The current slide, given by calling method
	 * @param {previous} The previous slide, given by calling method
	 *
	 */
	function manipulateDots(current,previous) {
		// get dots
		var dots = $( '.ss2-nav-dots ul li' );

		// use global to turn empty dot into filled dot
		dots.eq(current).html( "<i class='fa fa-circle'></i>" );

		// check if previous needs to wrap (if it's bigger than max)
		//     this is to adjust for when clicking previous arrow/going backward
		if ( previous > SLIDE_MAX ) {
			previous = 0;
		}

		// turn previously filled dot to empty dot
		dots.eq(previous).html( "<i class='fa fa-circle-o'></i>" );

		//console.log("dots: current- " + current + ", prev- " + previous);
	}

/*
 * Determines whether to hide all the titles or to calculate their height.
 * Based on window width.
 * Note: this means that title switching action will not work for the small layout
 *       on large devices & the breakpoint switchoff must be perfect.
 * @param {number} window_width The current width of the window in pixels
 */
function titleSetup(window_width) {
	allSlideTitles.hide() // this group should always be hidden -- only show current one (below)

	if (window_width <= 991) { // Bootstrap 4 md screens are >= 992
		// small & xsmall devices

		// hide all side titles
		allSlideTitlesClone.hide()

		// show current on-image one
		allSlideTitles.eq(currentSlide).show();

	} else {
		// medium + up devices
		setTitleHeights();
	}
}
	/**
	 *
	 * Sets up the slides to begin sliding motion -- hides all slides but the
	 *   first, highlights current title card, and sets up dots.
	 *
	 */
	function slideSetup() {
		// ---------------------------------
		// SETUP - initial page load
		// hide all slides but the first one
		// ---------------------------------
		var allSlides = $( '.ss2-slide-list > li' ); // get all slides in easy array format

		allSlides.hide(); // hide all slides

		// show the first (is first because currentSlide is initialized to 0)
		allSlides.eq(currentSlide).show();

		allSlideTitles.eq(currentSlide).addClass( 'current' ); // highlight the first title

		manipulateDots(currentSlide); // setup initial dot to be filled
	}

	/**
	 *
	 * Advance slides by 1
	 * modifies currentSlide global
	 *
	 */
	function slideForward() {
		// get all slides
		var allSlides = $( '.ss2-slide-list > li' );

		// add 1 to currentSlide global
		//     make sure it is not max, or wrap around to 0
		if ( currentSlide < SLIDE_MAX ) {
			currentSlide++;
		} else {
			currentSlide = 0;
		}

		// hide all slides
		allSlides.hide();

		// show slide.eq(currentSlide)
		allSlides.eq(currentSlide).show();

		// hide prev slide title, e.g. slideTitles.eq(currentSlide-1)
		allSlideTitles.eq(currentSlide-1).removeClass( 'current' );

		// show current slide title
		allSlideTitles.eq(currentSlide).addClass( 'current' );

		// advance dot
		manipulateDots(currentSlide,currentSlide-1);

		// make sure titles are sized correctly to the image
		// this accounts for variable height images
		// setTitleHeights();
		titleSetup($(window).width());
	}

	/**
	 *
	 * Retreat slides by 1
	 * modifies currentSlide global
	 * note: seems to make a weird skipping effect when changing slides,
	 *       e.g. from the first to the last when going around, or sometimes
	 *       in the middle. need to check if this repeats on other machines.
	 *       may not be an issue, since this method will be used once at a time
	 *       when arrows are clicked, and not for continuous motion like
	 *       slideForward()
	 *
	 */
	function slideBackward() {
		//console.log("----")
		// get all slides
		var allSlides = $( '.ss2-slide-list > li' );

		// subtract 1 from currentSlide global
		//     make sure it is not 0, or wrap around to max
		if ( currentSlide > 0 ) {
			currentSlide--;
		} else {
			currentSlide = SLIDE_MAX;
		}

		// hide all slides
		allSlides.hide();

		// show slide.eq(currentSlide)
		allSlides.eq(currentSlide).show();

		// hide prev slide title, slideTitle.eq(currentSlide+1)
		if (currentSlide == SLIDE_MAX) {
			allSlideTitles.eq(0).removeClass( 'current' );
			//console.log("remove from " + 0);
		} else {
			allSlideTitles.eq(currentSlide+1).removeClass( 'current' );
			//console.log("remove from " + (currentSlide+1));
		}

		// show current slide title
		allSlideTitles.eq(currentSlide).addClass( 'current' );

		// change dot
		manipulateDots(currentSlide,currentSlide+1);

		// make sure titles are sized correctly to the image
		// this accounts for variable height images
		// setTitleHeights();
		titleSetup($(window).width());
	}

	/**
	 *
	 * Jump to any slide by given index
	 * modifies currentSlide global
	 * @param {newSlide} the slide to which the slider will jump when this
	 *                   method is called
	 *
	 */
	function slideJumpTo( newSlide ) {
		// test if current is within bounds
		if ( newSlide >= 0 && newSlide <= SLIDE_MAX) {

			var allSlides = $( '.ss2-slide-list > li' );

			// hide all slides
			allSlides.hide();

			// show new slide as per parameter
			allSlides.eq(newSlide).show();

			// first remove title class 'current' so no fancy math is needed later
			allSlideTitles.eq(currentSlide).removeClass('current');

			// update title highlight
			allSlideTitles.eq(newSlide).addClass('current');

			// update dot
			//console.log("jump: current- " + newSlide + ", prev- " + currentSlide);

			manipulateDots(newSlide,currentSlide); //next,prev as parameters

			currentSlide = newSlide; // finally, update currentSlide

			// make sure titles are sized correctly to the image
			// this accounts for variable height images
			// setTitleHeights();
			titleSetup($(window).width());

		} // else do nothing
	}

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *																		   *
	 *                             CLICK EVENTS                                *
	 *																		   *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 *
	 * LEFT ARROW CONTROL
	 *  Goes back a single slide.
	 *
	 */
	$( '.ss2-arrow-left' ).click(function(){
		// stop the sliding action
		clearInterval(slideAction);

		// go backward 1
		slideBackward();

		// restart the sliding action
		slideAction = setInterval(slideForward,slideTime);
	});

	/**
	 *
	 * RIGHT ARROW CONTROL
	 *  Goes forward a single slide.
	 *
	 */
	$( '.ss2-arrow-right' ).click(function(){
		// stop the sliding action
		clearInterval(slideAction);

		// go forward 1
		slideForward();

		// restart sliding action
		slideAction = setInterval(slideForward,slideTime);
	});

	/**
	 *
	 * PAUSE
	 *  Click event used for testing. Works on element with class 'pause'.
	 *  Elements needs to be added into the slider HTML manually to be used.
	 *
	 */
	$( '.pause' ).click(function(){
		if ( $('.pause').text() == "pause" ) {
			clearInterval(slideAction);
			$('.pause').text("unpause");
		} else {
			slideAction = setInterval(slideForward,slideTime);
			$('.pause').text("pause");
		}
	});

	/**
	 *
	 * DOTS . . .
	 *  For when a dot is clicked! Will go to the slide corresponding to that dot.
	 *  This will modify @currentSlide because of the call to slideJumpTo().
	 *
	 *  Note: Had to use on() instead of click() because dots ul was generated
	 *  	by jQuery; click() only attaches to elements which existed at
	 *  	document ready.
	 *
	 */
	$( '.ss2-nav-dots' ).on("click", "ul li", function(event) {
		// get dots ul li
		var dots = $( '.ss2-nav-dots ul li ');

		// stall sliding action
		clearInterval(slideAction);

		// check what # of dot was clicked
		//     previously had assigned value to currentSlide, but that seemed
		//     to mess up the movement of the dots... once used a separate var,
		//     nextSlide, everything cleared up.
		nextSlide = dots.index(event.target);
		//console.log(nextSlide);

		slideJumpTo(nextSlide);

		// restart sliding action - should take care of the dot change too
		slideAction = setInterval(slideForward,slideTime);
	});

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *																		   *
	 *                            Running the code                             *
	 *																		   *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 *
	 * SETUP
	 *  Setup elements & initiate the sliding action.
	 *
	 */
	generateDots();
	populateTitles();
	slideSetup(); // this comes before setTitleHeights() for correct calculations
	titleSetup($( window ).width());
	manipulateDots();
	var slideAction = setInterval(slideForward, slideTime);

	/**
	 *
	 * WINDOW RESIZE
	 *  Every time window resizes, check the slides height and assign it to
	 *  the height of the titles.
	 *
	 */
	$( window ).resize( function() {
		// setTitleHeights();
		titleSetup($(window).width());
	});
});
