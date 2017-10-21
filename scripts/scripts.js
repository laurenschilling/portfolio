$(document).ready(function() {
	
	
	// ---- NAVIGATION ----
	
	// toggle menu when hamburger is clicked	
	$('#hamburger').click(function(){
		$(this).toggleClass('open');

		if ($(this).attr('class') == 'open') {
			$('#menu ul').css('display', 'block');
			$('#menu ul li a').removeClass('fadeOutUp').addClass('fadeInDown');
			$('#menu ul li').on('click', function() {
				$('#menu ul li').removeClass('active-item');
		        $('#menu ul li').find('span').removeClass('span-active');
		        $(this).addClass('active-item');
		        $(this).find('span').addClass('span-active'); })
		} else {
			$('#menu ul li a').removeClass('fadeInDown').addClass('fadeOutUp');
			$('#menu ul').css('display', 'none');
		}
	});
	
	// hover animations for menu items
	$(function() {
		var line, 
			active,
			li = $('#menu ul li');

		// on hover, show span line
		li.bind('mouseover', function() {
			line = $(this).find('span');
			line.removeClass('move-line-back').addClass('move-line');
		});
	
		// hide span line	
		li.bind('mouseleave', function() {	
			line.addClass('move-line-back').removeClass('move-line');
		});
	});
	

	// ---- HIDE LANDING PAGE : SHOW HOME PAGE ----

	// if ( window.location.href === "http://laurenschilling.com.au" ) {
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
	
	// ---- SMOOTH SCROLL TO ID TAGS ----

	$('#menu ul li a').click(function(e) {
		var thisLink = $(this).attr('href');
		event.preventDefault();
		
		switch (thisLink) {
            case '#about': 
			    $('html, body').animate({
			        scrollTop: $("#about").offset().top - 50
			    }, 1000, 'easeInOutCubic'); 
			    break;			
			case '#portfolio':
				$('html, body').animate({
			        scrollTop: $("#portfolio").offset().top - 20
			    }, 1000, 'easeInOutCubic');
			    break;
			case '#contact':
				$('html, body').animate({
			        scrollTop: $("#contact").offset().top
			    }, 1000, 'easeInOutCubic');
			    break;
		} 
	});
	
// Initialise Isotope	
	var $grid = $('.grid').isotope({
		// options
		itemSelector: '.grid-item',
		layoutMode: 'masonry',
		percentPosition: true,
		masonry: {
			// use element for option
			columnWidth: '.grid-sizer',
			gutter: 10,
			horizontalOrder: true
  		}
	})

// Layout Isotope after each image loads
	$grid.imagesLoaded().progress( function() {
		$grid.isotope('layout');
	});
	
// Filter items on button click
	$('.portfolio-filter').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
		$('.button').removeClass('active').addClass('inactive');
		$(this).removeClass('inactive').addClass('active');
	});

// Filter selectors			
	
	// filter .web items
	$grid.isotope({ filter: '.web' });
	
	// filter .apps items
	$grid.isotope({ filter: '.apps' });
	
	// filter .commercial items
	$grid.isotope({ filter: '.commercial' });
	
	// filter .graphics items
	$grid.isotope({ filter: '.graphics' });
	
	// filter .branding items
	$grid.isotope({ filter: '.branding' });
	
	// filter .campaigns items
	$grid.isotope({ filter: '.campaigns' });
	
	// filter .accessibility items
	$grid.isotope({ filter: '.accessibility' });
	
	// filter .print items
	$grid.isotope({ filter: '.print' });

	// show all items
	$grid.isotope({ filter: '*' });
	

});	
	