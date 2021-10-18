$(document).ready(function(e) {
    $(function () {
			
		
	

		if ($('html').hasClass('csstransforms3d') && msieversion() == 0) {	$('.thumb').removeClass('scroll').addClass('flip');		
			$('.thumb.flip').hover(
				function () {
				$(this).find('.thumb-wrapper').addClass('flipIt');	},
				function () {$(this).find('.thumb-wrapper').removeClass('flipIt');});} 
				
				
				
				else if (msieversion() < 10) { 
					$('.thumb').hover(function(){
					$(this).find('.thumb-detail').addClass('foco');
					$('.foco').animate({bottom:'0px'},400);

					},
					
					function() {
								$('.thumb-detail').animate({bottom:'-280px'},400);
				$(this).find('.thumb-detail').removeClass('foco');
						}
					
					);
				} else {
					
					$('.thumb').hover(
					
					
					
						function () {
							

							$(this).find('.thumb-detail').animate({bottom:0}, 500, 'easeOutCubic');

				},
				function () {
					
					$(this).find('.thumb-detail').animate({bottom: ($(this).height() * -1) }, 500, 'easeOutCubic');			
				});
				}});
});// JavaScript Document 

