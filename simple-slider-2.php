<?php 
/*
Plugin Name: Simple Slider 2 
Plugin URI: na
Description: s e n d h e l p
Version: 1.0
Author: Diliaur Tellei
Author URI: http://diliaur.github.io
License: GPL2
*/

class simple_slider_2_widget extends WP_Widget {
	// constructor

	public function __construct() {
		$widget_options = array(
			'classname' => 'simple_slider_2_widget',
			'description' => 'this is the second slider and it is killing me'
		);
		parent::__construct('simple_slider_2_widget','Simple Slider Widget 2.0 TEST', $widget_options);
	}

	// form - back end on admin dash

	public function form( $instance ) {

		echo "there's nothing heeeeeere. there WILL be a form soon";
	}

	// output

	public function widget( $args, $instance ) {

		echo "Simple Slider 2 Test";

	}

	// update

	public function update( $new_instance, $old_instance ) {

	}
}

// hook that shit in yoooooo o  o o
function register_sslider2_widget() {
	register_widget( 'simple_slider_2_widget' );
}
add_action('widgets_init', 'register_sslider2_widget');
?>