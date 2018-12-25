<?php
/*
Plugin Name: Simple Slider 2
Plugin URI: https://github.com/diliaur/simple-slider-2
Description: A post slider based upon categories and featured image. Lets you choose time frame for posts to display and max number of post slots.
Version: 1.0
Author: Diliaur Tellei
Author URI: http://diliaur.github.io
License: GPL2
*/

class simple_slider_2_widget extends WP_Widget {

	/**
	 *
	 * Constructor. Sets up the widget.
	 *
	 */
	public function __construct() {
		$widget_options = array(
			'classname' => 'simple_slider_2_widget',
			'description' => 'A featured images-, category-based post slider.'
		);
		parent::__construct('simple_slider_2_widget','Simple Slider 2.0 Widget', $widget_options);
	}

	/**
	 *
	 * Outputs the admin-facing part of the widget. Provides widget options via a form.
	 * @param $instance The widget data & config options pulled from the database.
	 */
	public function form( $instance ) {

		$title = !empty($instance['title']) ? $instance['title'] : "New title";
		$max_num_posts = !empty($instance['max_num_posts']) ? $instance['max_num_posts'] : 5; // 5 is default
		$time_frame = !empty($instance['time_frame']) ? $instance['time_frame'] : "-1 month"; // default is 1 month in the past
		$categories = !empty($instance['categories']) ? $instance['categories'] : "";

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
			       value="-6 months"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-6 months" ); ?>>
			       <label>Past 6 months</label><br/>
			<input type="radio"
			       value="-1 year"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-1 year" ); ?>>
			       <label>Past year</label><br/>
			<input type="radio"
			       value="-3 years"
			       name="<?php echo esc_attr_e($this->get_field_name('time_frame')); ?>"
			       <?php checked( $time_frame, "-3 years" ); ?>>
			       <label>Past 3 years</label>
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

	/**
	 *
	 * Outputs the visitor-facing part of the widget. Uses The Loop to show posts.
	 * @param $args Widget title, description, etc.
	 * @param $instance The widget data & config options pulled from the database
	 */
	public function widget( $args, $instance ) {

		// vars
		$categories = $instance['categories'];
		$max_posts = $instance['max_num_posts'];
		$time_frame = $instance['time_frame'];

		// set up the args for the query
		$args = array(
			'category_name' => $categories,
			'posts_per_page' => $max_posts
			//'meta_key' => '_thumnail_id'
			);

		$my_query = new WP_Query( $args );

		//test line
		//echo "<p>showing posts from following categories: " . $categories . " from within " . $time_frame . "</p>";

		//////////////

		?>

		<div class="ss2-container-slider">
			<div class="ss2-container-slides">
				<ul class="ss2-slide-list">
					<?php
					$args = array(
						'category_name' => $categories,
						'posts_per_page' => $max_posts,
						'meta_key' => '_thumbnail_id'
						);
					$my_query = new WP_Query( $args );
					while ( $my_query->have_posts() ) : $my_query->the_post();
					//$do_not_duplicate = $post->ID; idk if this is necessary?
						if ( has_post_thumbnail() && (strtotime(get_the_date()) > strtotime($time_frame)) ) { // if in this order, # slides is impacted.
						?>
							<li>
								<div class="ss2-title-and-date">
									<span class="ss2-title"><a href=<?php the_permalink(); ?>><?php the_title(); ?></a></span>
									<span class="ss2-date"><?php echo get_the_date(); ?></span>
								</div>
								<div class="ss2-categories"><?php the_category(); ?></div>
								<a href=<?php the_permalink(); ?>>
									<?php the_post_thumbnail(null, array( 'class' => 'current-slide-img' )); ?>
								</a>
								<div class="ss2-excerpt"><?php the_excerpt(); ?></div>
							</li>
						<?php
						} else {
							//echo "sorry, this post is too old to show<br/>";
						}
					endwhile;
					wp_reset_postdata(); // since used the_post()
					?>
				</ul>
				<div class="ss2-slide-nav">
					<div class="ss2-arrow-left"><i class="fa fa-arrow-left fa-2x"></i></div>
					<div class="ss2-nav-dots"></div>
					<div class="ss2-arrow-right"><i class="fa fa-arrow-right fa-2x"></i></div>
					<div class="ss2-clearfix"></div>
				</div>
			</div>
			<div class="ss2-container-titles"></div>
			<div class="ss2-clearfix"></div>
		</div><!--end slider container-->
		<?php

		//////////////

	}

	/**
	 *
	 * Saves the new admin configurations to the database.
	 * @param $new_instance The new options
	 * @param $old_instance The link to the current instance in the db, to be updated
	 *
	 */
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

/**
 *
 * Register the widget
 *
 */
function register_sslider2_widget() {
	register_widget( 'simple_slider_2_widget' );
}
add_action('widgets_init', 'register_sslider2_widget');

/**
 *
 * Enqueue scripts and styles
 *
 */
function simple_slider_2_enqueue_scripts_styles() {
	wp_enqueue_script( 'simple-slider-2-js', plugins_url( 'slider.js', __FILE__ ), array( 'jquery' ), date("h:i:s") ); // slider.js
	// wp_enqueue_script( 'simple-slider-2-js', plugins_url( 'test.js', __FILE__ ), array( 'jquery' ), date("h:i:s") ); // slider.js
	wp_enqueue_style( 'simple-slider-2-css', plugins_url( 'slider.css', __FILE__ ) );
	wp_enqueue_style( 'ss2-font-awesome', plugins_url('lib/font-awesome-4.7.0/css/font-awesome.min.css',__FILE__) ); // font awesome icons
}
add_action( 'wp_enqueue_scripts', 'simple_slider_2_enqueue_scripts_styles' );
?>
