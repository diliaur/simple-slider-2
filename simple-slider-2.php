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

	// output

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
		echo "<p>showing posts from following categories: " . $categories . " from within " . $time_frame . "</p>";

		//////////////

		?>
		<div class="cseasss-container-slider">
			<div class="cseasss-container-slides">
				<ul class="slide-list">
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
								<div class="title-and-date">
									<span class="title"><a href=<?php the_permalink(); ?>><?php the_title(); ?></a></span>
									<span class="date"><?php echo get_the_date(); ?></span>
								</div>
								<div class="categories"><?php the_category(); ?></div>
								<a href=<?php the_permalink(); ?>>
									<?php the_post_thumbnail(null, array( 'class' => 'current-slide-img' )); ?>
								</a>
								<div class="excerpt"><?php the_excerpt(); ?></div>
							</li>
						<?php 
						} else {
							//echo "sorry, this post is too old to show<br/>";
						}
					endwhile; 
					wp_reset_postdata(); // since used the_post()
					?>
				</ul>
				<div class="slide-nav">
					<div class="arrow-left"><</div>
					<div class="cs-dots"></div>
					<div class="arrow-right">></div>
					<div class="clearfix-dt"></div>
				</div>
			</div>
			<div class="container-titles"></div>
			<div class="clearfix-dt"></div>
		</div><!--end slider container-->
		<?php
		//////////////

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
	wp_enqueue_script( 'simple-slider-2-js', plugins_url( 'slider.js', __FILE__ ), array( 'jquery' ) ); // slider.js
	wp_enqueue_style( 'simple-slider-2-css', plugins_url( 'slider.css', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'simple_slider_2_enqueue_scripts_styles' );
?>