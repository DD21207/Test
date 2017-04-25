
(function($) {
	 

	jQuery(document).on('ready', function(){
		document.getElementById("bgAudio").volume = 0.3;
		/*PRELOADER JS*/

		


		
		$(window).on('load', function() { 

			setTimeout(function(){
				$('#I span').show()

			       $('#I').addClass('slideInLeft')
			    },800);
			setTimeout(function(){
				$('#L span').show()
			       $('#L').addClass('bounceIn')
			    },1600);
			setTimeout(function(){
				$('#You span').show()
			       $('#You').addClass('rubberBand')
			    },2200);
			setTimeout(function(){
				$('#forever span').show()
			       $('#forever').addClass('rotateInDownRight')
			    },2800);

			// $('.status').fadeOut(3550);
			$('.preloader').delay(4500).fadeOut('slow'); 
			$('#text-box').delay(5000).typetype('  ').delay(1500).typetype('亲爱的，今年是我们在一起的第七年了，我们还是想以往一样深爱着对方。还记得在我们刚在一起的时候，那时候真的是3天一小吵，7天一大吵，还整天像做贼一样的要瞒着各自的家里人。经历过风风雨雨的我们也将会在两年之后步入婚姻的殿堂，去迎接艇仔的到来。我以前觉得爱一个人就是敢说一句"我爱你"，想无时无刻在一起，不介意旁人眼光大庭广众下牵手接吻。后来才发现你敢用对方的牙刷刷牙，敢对方在洗手间方便时冲进去洗漱，敢穿对方穿过的衣服去小卖部，敢在对方说要分手时讽刺的说一句"你癫嗲啪"。小清新只是恋爱，重口味才是爱。我爱你！亲爱的', {
    e: 0.08, // 错误率.设为0刚没有出错
    t: 300, // 按键的间隔时间
    }) // jQuery效果
		}); 
		/*END PRELOADER JS*/		
		
		/*START MENU JS*/
			$('a.page-scroll').on('click', function(e){
				var anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $(anchor.attr('href')).offset().top - 50
				}, 1500);
				e.preventDefault();
			});		

			$(window).on('scroll', function() {
			  if ($(this).scrollTop() > 100) {

			  	
				$('.menu-top').addClass('menu-shrink');
			  } else {
				$('.menu-top').removeClass('menu-shrink');
			  }
			});
			
			var s = $("#sticker");
			var pos = s.position();					   
			$(window).on('scroll', function() {


				var windowpos = $(window).scrollTop();
				if (windowpos >= pos.top) {
					s.addClass("stick");
				} else {
					s.removeClass("stick");	
				}
			});
			
			$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
			});				
		/*END MENU JS*/			

		/*START PARTNER LOGO*/
		// $('.partner').owlCarousel({
		//   autoPlay: 5000, //Set AutoPlay to 3 seconds
		//   items : 4,
		//   itemsDesktop : [1199,3],
		//   itemsDesktopSmall : [979,3]
		// });
		/*END PARTNER LOGO*/
		
		/*START VIDEO JS*/
		//  function autoPlayYouTubeModal() {
		// 	var trigger = $("body").find('[data-toggle="modal"]');
		// 	trigger.on("click",function() {
		// 	  var theModal = $(this).data("target"),
		// 		videoSRC = $('#video-modal iframe').attr('src'),
		// 		videoSRCauto = videoSRC + "?autoplay=1";
		// 	  $(theModal + ' iframe').attr('src', videoSRCauto);
		// 	  $(theModal + ' button.close').on("click",function() {
		// 		$(theModal + ' iframe').attr('src', videoSRC);
		// 	  });
		// 	  $('.modal').on("click",function() {
		// 		$(theModal + ' iframe').attr('src', videoSRC);
		// 	  });
		// 	});
		//   }
		//   autoPlayYouTubeModal();
		// /*END VIDEO JS*/
		
		//  /*START PORTFOLIO POPUP JS*/
		//   $("a[data-rel^='prettyPhoto']").prettyPhoto();				 
		//   $('#projectModal').on('shown.bs.modal', function () {
		// 	  $('#myInput').focus()
		//   })
		//   /*END PORTFOLIO POPUP JS*/ 
		  
		// /*START GOOGLE MAP*/
		// function initialize() {
		//   var mapOptions = {
		// 	zoom: 15,
		// 	scrollwheel: false,
		// 	center: new google.maps.LatLng(40.7127837, -74.00594130000002)
		//   };
		//   var map = new google.maps.Map(document.getElementById('map'),
		// 	  mapOptions);
		//   var marker = new google.maps.Marker({
		// 	position: map.getCenter(),
		// 	icon: 'assets/img/map_pin.png',
		// 	map: map
		//   });
		// }
		// google.maps.event.addDomListener(window, 'load', initialize);	
		/*END GOOGLE MAP*/	
			
	}); 		
	
	/* START PARALLAX JS */
	(function () {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { 
		} else {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true
			});
		}
	}());
	/* END PARALLAX JS  */		
	
	/*START WOW ANIMATION JS*/
	  new WOW().init();	
	/*END WOW ANIMATION JS*/	
				
})(jQuery);


  

