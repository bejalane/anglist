<?php
/*
Template Name Posts: post-activities-blue
 */
get_header();?>
<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        <div class="container-fluid beauty-container beauty-container-blue">
            <div class="row">
                <div class="col-lg-12">
                    <div class="beauty-header">
                        <h2><span><?php the_field('post-activities-small-title');?></span><br><?php the_field('post-activities-title');?></h2>
                        <div class="beauty-subheader"><?php the_field('post-activities-subtitle')?></div>
                    </div>
                    <div class="col-md-4 col-md-push-8 post-letters-column plc-blue">
                        <div class="beauty-letters">
                            <div class="beauty-letters-heading">
                                <p><span>מכתבי</span><br>תודה</p>
                            </div>
                            <i class="letters-scroll-up fa fa-chevron-up"></i>
                            <div class="scrolling-beauty-letters">
                                <?php
                                if(get_field('post-activities-posts')) {
                                $posts = get_field('post-activities-posts'); ?>
                                <?php if( $posts ): ?>
                                    <?php foreach( $posts as $post): // variable must be called $post (IMPORTANT) ?>
                                        <?php setup_postdata($post); ?>
                                        <article class="beauty-letter">
                                            <p class="beauty-letter-heading"><?php the_field('thank-letter-title');?></p>
                                            <div class="beauty-letter-text"><?php the_field('thank-letter-text');?></div>
                                            <p class="beauty-letter-sender"><?php the_field('thank-letter-signature');?></p>
                                        </article>
                                    <?php endforeach; ?>
                                    <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>
                                <?php endif; 
                                }?>
                            </div>
                            <div class="letters-scroll-down"><i class="fa fa-chevron-down"></i></div>
                        </div>
                    </div>
                    <div class="col-md-8 col-md-pull-4 post-slider-column">
                        <div class="beauty-slider" >
                            <?php
                            $images = get_field('post-activities-slider-images');
                            if( $images ): ?>
                                <div id="slider" dir="ltr" class="flexslider">
                                    <ul class="slides">
                                        <?php foreach( $images as $image ): ?>
                                            <li>
                                                <img src="<?php echo $image['sizes']['slider-image']; ?>" alt="<?php echo $image['alt']; ?>" />
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                                <div id="carousel" dir="ltr" class="flexslider">
                                    <ul class="slides">
                                        <?php foreach( $images as $image ): ?>
                                            <li>
                                                <img src="<?php echo $image['sizes']['thumbnail']; ?>" alt="<?php echo $image['alt']; ?>" />
                                            </li>
                                        <?php endforeach; ?>
                                    </ul>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <!--<?php
                    // check if the flexible content field has rows of data
                    if( have_rows('post-activities-button') ):
                        // loop through the rows of data
                        while ( have_rows('post-activities-button') ) : the_row();
                            if( get_row_layout() == 'post-activities-button-block' ): ?>
                                <div class="beauty-button">
                                    <a href="<?php the_sub_field('post-activities-button-external-link'); the_sub_field('post-activities-button-inner-link');?>" class="beauty-operations">
                                        <?php the_sub_field('post-activities-button-text');?>
                                    </a>
                                </div>
                            <?php endif;
                        endwhile;
                    else :
                        // no layouts found
                    endif;
                    ?>-->
                    <div class="beauty-button">
                        <a href="<?php echo get_page_link(127); ?>" class="beauty-operations">לרשימת כל הפעילויות</a>
                    </div>
                    <div class="beauty-button">
                        <?php $options = get_option( 'ormish_theme_options' ); ?>
                        <a target="_blank" href="<?php if (!empty($options['email'])) {?><?php echo $options['email'];?><?php }?>" class="beauty-operations">לפעילויות פתוחות להרשמה <span>כעת</span></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="beauty-gradient">
            <div class="beauty-h2-img"><h2 class="beauty-text-gradient">לטעת אור בלבבות ראויים</h2><img src="<?php echo get_template_directory_uri()?>/img/bird.png" alt=""/></div>
        </div>
    <?php endwhile; ?>
<?php endif; ?>
    <script>
        $(document).ready(function(){
            
        })
    </script>
    <div class="home-video-modal-container hidden">
        <div class="home-video-modal-wrapper">
            <iframe width="700" height="500" src="" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
<?php get_footer('phone');?>