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
		parent::__construct('simple_slider_2_widget','Simple Slider 2.0 Widget', $widget_options);
	}

	// form - back end on admin dash

	public function form( $instance ) {

		$title = !empty($instance['title']) ? $instance['title'] : "New title";
		$max_num_posts = !empty($instance['max_num_posts']) ? $instance['max_num_posts'] : 5; // 5 is default
		$time_frame = !empty($instance['time_frame']) ? $instance['time_frame'] : "-1 month"; // default is 1 month in the past
		$categories = !empty($instance['categories']) ? $instance['categories'] : "";


		//////////////

		echo "<hr/> test output section" . "<br/>";

		
		// use the following line ($this->get_field_name()) bc this is what will
		//     be output html. avoids collisions with other widgets by providing
		//     a unique name.
		echo "title field name via wp: " . $this->get_field_name('title') . "<br/>"; 
		echo "<br/><br/>";
		echo "title: " . $title . " | default: New title<br/>";
		echo "max posts: " . $max_num_posts . " | default: 5<br/>";
		echo "timeframe: " . $time_frame . " | default : -1 month<br/>";
		echo "categories: " . $categories . " | default : \"\" <br/>";

		echo "<hr/>";

		/////////

		?>

		<!-- TITLE -->
		<p>
			<label for="<?php echo $this->get_field_id('title'); ?>"><?php esc_attr_e( 'Title:', 'simple-slider-2' ); ?></label>
			<input class="widefat" 
				type="text" 
				id="<?php echo $this->get_field_id('title'); ?>" 
				name="<?php echo esc_attr($this->get_field_name('title')); ?>"
				value="<?php echo $title; ?>">
		</p>

		<!-- MAX NUMBER OF POSTS -->
		<p>
			<label><strong><?php esc_attr_e('Maximum number of posts to display:', 'simple-slider-2') ?></strong></label>
			<br/><em>Recommended absolute max is 7.</em>
			<input class="widefat"
				   type="text"
				   id="<?php echo esc_attr($this->get_field_id('max_num_posts')); ?>"
				   name="<?php echo esc_attr($this->get_field_name('max_num_posts')); ?>"
				   value="<?php echo $max_num_posts; ?>">
		</p>

		<!-- TIME FRAME OF POSTS -->

		<p><strong>Only show posts within the timeframe:</strong><br/>
			<input type="radio"
			       value="-1 week"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-1 week" ); ?>>
			       <label>Past week</label><br/>
	       	<input type="radio"
			       value="-1 month"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-1 month" ); ?>>
			       <label>Past month</label><br/>
			<input type="radio"
			       value="-3 months"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-3 months" ); ?>>
			       <label>Past 3 months</label><br/>
			<input type="radio"
			       value="-1 year"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-1 year" ); ?>>
			       <label>Past year</label><br/>
			<input type="radio"
			       value=""
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "" ); ?>>
			       <label>Beginning of time (any date)</label>
		</p>

		<!-- FEATURED CATEGORIES - which category/ies to pull for posts -->

		<p>
			<label><strong>Featured categories (comma-separated):</strong></label>
			<br/><em>These must be categories which already exist on your site.</em>
			<input class="widefat"
				   type="text"
				   id="<?php echo esc_attr_e($this->get_field_id('categories')); ?>"
				   name="<?php echo esc_attr($this->get_field_name('categories')); ?>"
				   value="<?php echo esc_attr($categories); ?>">
		</p>

		<?php
	}

	// output

	public function widget( $args, $instance ) {

		// add the stylesheet
		wp_enqueue_style( 'cseas-recent-posts-css', plugins_url( 'style.css', __FILE__ ) );

		echo "Simple Slider 2 Test";

	}

	// update

	public function update( $new_instance, $old_instance ) {

		$instance = $old_instance;

		$instance['title'] = $new_instance['title'];
		$instance['max_num_posts'] = $new_instance['max_num_posts'];
		$instance['time_frame'] = $new_instance['time_frame'];

		// need to do some parsing for categories. first remove whitespace
		$categories = str_replace(" ", "", $new_instance['categories']);
		// then escape
		$instance['categories'] = esc_attr($categories);

		return $instance;
	}
}

// hook that shit in yoooooo o  o o
function register_sslider2_widget() {
	register_widget( 'simple_slider_2_widget' );
}
add_action('widgets_init', 'register_sslider2_widget');
?>