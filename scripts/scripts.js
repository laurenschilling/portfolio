$(document).ready(function() {
	
	// GLOBAL VARIABLES
	
	var menuLink = $('#menu ul li a');
	

	// ---- HIDE LANDING PAGE & SHOW HOME PAGE ----

	// if ( window.location.href === "http://laurenschilling.com.au" || window.location.href === "http://laurenschilling.com.au/index.html" ) {
	
	if ( window.location.href === "http://localhost:8888/github/portfolio" ) {

		$('#landing img').click(function() {
			$('#landing').hide();
			$('#wrapper').show();		
		})
		
		$('#enter').click(function() {
			$('#landing').hide();
			$('#wrapper').show();	
		})
	
	} else {
		$('#landing').hide();
		$('#wrapper').show();
	}


	// ---- NAVIGATION ----

		
	$(document).on('scroll', onScroll);

	// TOGGLE MENU when hamburger is clicked	
	$('#hamburger').click(function(){
		$(this).toggleClass('open');
		
		// if menu is open
		if ($(this).attr('class') == 'open') {
		
			// if screen is 450px wide or less
			if ($('header').width() <= 450 && $('main').hasClass('home')){
				$('#logo').fadeOut();
			}
	
			// display menu items
			$('#menu ul').css('display', 'block');
			menuLink.removeClass('fadeOutUp').addClass('fadeInDown');
			
			if (!($('header').hasClass('turn-off'))) {
				// when menu item is clicked
				menuLink.click(function(e) {
					
					// remove all active styles
					menuLink.removeClass('active-item');
			        menuLink.find('span').removeClass('span-active');
			       
			        // add active style for active item
			        $(this).addClass('active-item');
					$(this).find('span').addClass('span-active'); 
	
					// SMOOTH SCROLL to href value on page
					var thisLink = $(this).attr('href');
					event.preventDefault();
					$(document).off("scroll");
					
					// switch statement used to make sure section h2 is visible on smooth scroll
					switch (thisLink) {
			            case '#about': 
						    if ($('header').width() <= 450 ){
							    $('html, body').stop().animate({
								    scrollTop: $("#about").offset().top - 120
								    }, 1000, 'easeInOutCubic', function() {
							            $(document).on("scroll", onScroll);
									})
							} else {
							    $('html, body').stop().animate({
									scrollTop: $("#about").offset().top - 50
								    }, 1000, 'easeInOutCubic', function() {
							            $(document).on("scroll", onScroll);
									})
							} 
						    break;			
						case '#portfolio':
							if ($('header').width() <= 450 ){
								$('html, body').stop().animate({
							        scrollTop: $("#portfolio").offset().top - 90
								    }, 1000, 'easeInOutCubic', function() {
							            $(document).on("scroll", onScroll);
									})
							} else {
								$('html, body').stop().animate({
							        scrollTop: $("#portfolio").offset().top - 20
								    }, 1000, 'easeInOutCubic', function() {
							            $(document).on("scroll", onScroll);
									})
							}	
						    break;
						case '#contact':
							$('html, body').stop().animate({
						        scrollTop: $("#contact").offset().top
						    }, 1000, 'easeInOutCubic', function() {
					            $(document).on("scroll", onScroll);
							}); 
						    break;
						default: break;
					} 	            
				});
			}
		
		// if menu is closed, hide menu items	
		} else {
			menuLink.removeClass('fadeInDown').addClass('fadeOutUp');
			$('#menu ul').css('display', 'none');
			
			// if screen is 450px wide or less
			if ($('header').width() <= 450 && $('main').hasClass('home')){
				$('#logo').fadeIn();
			}
		}
	});
	
	// ADD ACTIVE CLASS based on scroll position
	function onScroll(event) {
	    if (!($('header').hasClass('turn-off'))) {
			var scrollPos = $(document).scrollTop();
		    	
			menuLink.each(function() {
		        var currLink = $(this);
		        var refElement = $(currLink.attr('href'));
		        
		        // if scroll position is in About or Portfolio sections
		        if (refElement.position().top - 100 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	
					// remove all active styles	            
		            menuLink.removeClass('active-item');
		            menuLink.find('span').removeClass('span-active');
	
			        // add active style for current scroll pos item
		            currLink.addClass('active-item');
			        currLink.find('span').addClass('span-active'); 
			    
			    // else if scroll position is at bottom of page    
			    } else if ($(window).scrollTop() + $(window).height() == $(document).height()) {
	
					// remove all active styles	            
		        	menuLink.removeClass('active-item');
					menuLink.find('span').removeClass('span-active');
	
			        // add active style for contact menu item
		            $('#contact-item').addClass('active-item');
			        $('#contact-item').find('span').addClass('span-active'); 
			
				// if scroll position is in no section (i.e. top of page)	
		        } else {
			        // remove all active styles
		            currLink.removeClass('active-item');
		            currLink.find('span').removeClass('span-active'); 
		        }
			});
		} 
	}
    
	// HOVER ANIMATIONS for menu items
	$(function() {
		var line;
		
		// on hover, show span line
		$('#menu ul li').bind('mouseover', function() {
			line = $(this).find('span');
			line.removeClass('move-line-back').addClass('move-line');
		});
	
		// on hover leave, hide span line	
		$('#menu ul li').bind('mouseleave', function() {	
			line.addClass('move-line-back').removeClass('move-line');
		});
	});
	
	// BACK TO TOP BUTTON
	var offset = 900, 	// no of px to scroll before back to top button shows	
		$top = $('.top');

	// hide or show the back to top button
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $top.addClass('is-visible') : $top.removeClass('is-visible fade-out');
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 1) {
			$top.css({'bottom':'50px'});
		} else {
			$top.css({'bottom':'25px'});
		}
	});

	// smooth scroll to top
	$top.on('click', function(event){
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0 ,
	 	}, 1000, 'easeInOutCubic');
	});


	// ---- PORTFOLIO ITEM HOVER ----
	$('.grid-item').hover(function() {
		$(this).find('.grid-title').toggleClass('show');
	})
	
	
	// ---- ISOTOPE PLUGIN ----
	  	
	// initialise isotope	
	var $itemGrid = $('.item-grid').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'masonry',
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-sizer',
			gutter: 10
  		}
	})

	// layout isotope after each image loads
	$itemGrid.imagesLoaded().progress( function() {
		$itemGrid.isotope('layout');
	});


	// initialise isotope	
	var $grid = $('.grid').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'masonry',
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-sizer',
			gutter: 10,
			horizontalOrder: true
  		}
	})

	// layout isotope after each image loads
	$grid.imagesLoaded().progress( function() {
		$grid.isotope('layout');
	});
	
	// filter items on button click
	$('.portfolio-filter').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
		$('.button').removeClass('active').addClass('inactive');
		$(this).removeClass('inactive').addClass('active');
	});

	// filter selectors			
		// all web items
		$grid.isotope({ filter: '.web' });
		
		// all app items
		$grid.isotope({ filter: '.apps' });
		
		// all commercial items
		$grid.isotope({ filter: '.commercial' });
		
		// all graphics items
		$grid.isotope({ filter: '.graphics' });
		
		// all branding items
		$grid.isotope({ filter: '.branding' });
		
		// all campaign items
		$grid.isotope({ filter: '.campaigns' });
		
		// all accessibility items
		$grid.isotope({ filter: '.accessibility' });
		
		// all print items
		$grid.isotope({ filter: '.print' });
	
		// all items
		$grid.isotope({ filter: '*' });


	// ---- MEDIA QUERY ----

	// if on home page and screen is 450px or smaller
	$(window).resize(function() {
		if ($('header').width() <= 450 && $('main').hasClass('home')) {
	        $('header').addClass('home-header');
	        $('#logo').find('a').addClass('home-logo');
	        $('#menu').addClass('home-menu');
	        $('#rectangle').hide();
	        $('#menu ul li a').find('span').hide();   
	        $('#wrapper').css('padding-top','35px');
	        
	        if (!($('#menu ul').css('display') == 'none')) {
		    	$('#logo').hide();
		    }
		    
		} else if ($('header').width() > 450 && $('main').hasClass('home')) {
			$('header').removeClass('home-header');
	        $('#logo').find('a').removeClass('home-logo');
	        $('#menu').removeClass('home-menu');
	        $('#rectangle').show();
	        $('#menu ul li a').find('span').show();   
	        $('#wrapper').css('padding-top','0px');
	        $('#logo').fadeIn();
		}
	})

});