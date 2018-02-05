jQuery( document ).ready( function( $ ) {

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *																		   *
	 *                            GLOBAL  VARIABLES                            *
	 *																		   *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var NUM_SLIDES = $( '.slide-list > li' ).length;
	var SLIDE_MAX = NUM_SLIDES - 1;
	//console.log ("SLIDE_MAX -> " + SLIDE_MAX);
	var allSlideTitles = $( '.slide-list > li .title-and-date' ); // keeping this out here so others can use it
	var currentSlide = 0; // begins at 0

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *																		   *
	 *                               THE CODE                                  *
	 *																		   *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	/**
	 * Based on the slides, populate the title container div with titles
	 */
	function populateTitles() {
		$( '.container-titles' ).append(allSlideTitles); // move allSlideTitles to target div
	}

	/**
	 *
	 * Sets up the heights of the title elements, based on the height of the
	 *  slide image container
	 *
	 */
	function setTitleHeights() {

		var slideContainerHeight = $( '.cseasss-container-slides' ).height(); // direct height grab
		var borderHeight = NUM_SLIDES; // compensate for total height taken by borders (should be v small)
		var indivTitleHeight = (slideContainerHeight - borderHeight) / NUM_SLIDES;


		//console.log('direct title height:' + (indivTitleHeight * NUM_SLIDES));
		//console.log('direct container height: ' + slideContainerHeight);

		// assign height to title element class
		// use innerheight because it takes padding into consideration
		$( '.title-and-date' ).innerHeight(indivTitleHeight);

		/*
		 * Check for width of screen, and place titles underneath
		 * the slides instead.
		 * 
		 * THIS DOESN'T WORK - JAN 22, 2018
		 */
		var minWindowWidth = 1000;

		if ( $( window ).width() < minWindowWidth ) {
			//$( 'div.container-titles' ).addClass( 'container-titles-no-float' );
			//$( 'div.container-titles' ).removeClass( 'container-titles' );
		} else {
			//$( 'div.container-titles' ).addClass( 'container-titles' );
			//$( 'div.container-titles' ).removeClass( 'container-titles-no-float' );
		}
	}

	/**
	 *
	 * Prints # of dots based on # of slides
	 *
	 */
	function generateDots() {
		$( '.cs-dots' ).append( "<ul>" );
		for (var count = 0; count < NUM_SLIDES; count++) {
			$( '.cs-dots ul' ).append( "<li>&#9633;</>" ); // UNICODE "White Circle" U+25CB
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
		var dots = $( '.cs-dots ul li' );

		// use global to turn empty dot into filled dot
		dots.eq(current).html( "&#9632;" );

		// check if previous needs to wrap (if it's bigger than max)
		//     this is to adjust for when clicking previous arrow/going backward
		if ( previous > SLIDE_MAX ) {
			previous = 0;
		}

		// turn previously filled dot to empty dot
		dots.eq(previous).html( "&#9633;" );

		//console.log("dots: current- " + current + ", prev- " + previous);
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
		var allSlides = $( '.slide-list > li' ); // get all slides in easy array format

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
		var allSlides = $( '.slide-list > li' );

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
		setTitleHeights();
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
		var allSlides = $( '.slide-list > li' );

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
		setTitleHeights();
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

			var allSlides = $( '.slide-list > li' );

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
			setTitleHeights();
			
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
	$( '.arrow-left' ).click(function(){
		// stop the sliding action
		clearInterval(slideAction);
		
		// go backward 1
		slideBackward();

		// restart the sliding action
		slideAction = setInterval(slideForward,3000);
	});
	
	/**
	 *
	 * RIGHT ARROW CONTROL
	 *  Goes forward a single slide.
	 *
	 */
	$( '.arrow-right' ).click(function(){
		// stop the sliding action
		clearInterval(slideAction);
		
		// go forward 1
		slideForward();

		// restart sliding action
		slideAction = setInterval(slideForward,3000);
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
			slideAction = setInterval(slideForward,3000);
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
	$( '.cs-dots' ).on("click", "ul li", function(event) { 
		// get dots ul li
		var dots = $( '.cs-dots ul li ');

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
		slideAction = setInterval(slideForward,3000);
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
	setTitleHeights();
	manipulateDots();
	var slideAction = setInterval(slideForward, 3000);

	/** 
	 *
	 * WINDOW RESIZE
	 *  Every time window resizes, check the slides height and assign it to
	 *  the height of the titles.
	 *
	 */
	$( window ).resize( function() {
		setTitleHeights();
	});
});