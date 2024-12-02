$(document).ready(function(){ 

// scroll 함수

	var W = [];
	var H = [0];

	var speed = 600;


	// console.log('skew_L : '+skew_L+'skew_R : '+skew_R);
	
	// sns hover start
	var sns = [];
	$('.sns a').on('mouseenter', function(){
		
		for (i = 0; i < $(this).length; i++) {
			sns[i] = $(this).find('img').eq(i).attr('src').replace('.png','_over.png');
			$(this).find('img').attr('src',sns[i]);
		}
	})
	$('.sns a').on('mouseleave', function(){
		
		for (i = 0; i < $(this).length; i++) {
			sns[i] = $(this).find('img').eq(i).attr('src').replace('_over.png','.png');
			$(this).find('img').attr('src',sns[i]);
		}
	}) // sns hover end

	$('.fix_top div').animate({'top' : '30px'}, function(){

		$('.tit .line').animate({'width':'100px', 'opacity':'1'}, function(){
			$('.intro_up').animate({'top':'0'});
			$('.intro_down').animate({'top':'0'});
		})
	});

	$('.pg_tit').hide();

	$('.fix_nav').animate({'left' : '30px'}, speed, function(){		

		$('.fix_nav i').eq(now()).animate({'width' : '30px'});

	});


	// cate list start
	$('.cate').on('click', function(){

		if(!$(this).hasClass('on')) {
			
			$(this).addClass('on');
			$('.cate i').css({'background-color':'#222'}).animate({'top':'10px'}, function(){
				$('.cate i:nth-child(1)').addClass('rotateL');
				$('.cate i:nth-child(2)').addClass('rotateR');
				$('.cate i:nth-child(3)').hide();
			});

			$('.cate_bg div').css({'opacity':'1'});
			$('.cate_list').fadeIn();
			$('.cate_list ul').css({'opacity':'1'});
			$('.cate_list li').css({'width':'200px'});
			$('.left').css({'transform':'rotate(0deg) scale(1)'});
			$('.right').css({'transform':'rotate(0deg) scale(1)'});

			$('.cate_list a').on('mouseenter',function(){
				$(this).find('.cover_txt').stop().animate({'left':'0'});
				$(this).find('span').css({'color':'#eee'});
			});
			$('.cate_list a').on('mouseleave',function(){
				$(this).find('.cover_txt').stop().animate({'left':'100%'}, function(){
					$('.cover_txt').css({'left':'-200px'});
				});
				$(this).find('span').css({'color':'#222'});
			});
		} else {

			$(this).removeClass('on');
			$('.cate i').animate({'top':'10px'}, function(){
				if(now()==2||now()==4) {
					$(this).css({'background-color':'#222'})
				} else {					
					$(this).css({'background-color':'#eee'})
				}
				$('.cate i:nth-child(1)').removeClass('rotateL').animate({'top':'0'});
				$('.cate i:nth-child(2)').removeClass('rotateR').animate({'top':'10px'});
				$('.cate i:nth-child(3)').show().animate({'top':'20px'});
			});


			if(now()==2||now()==4) $('.cate i').css({'background-color' : '#222'});

			$('.cate_bg div').css({'opacity':'0'});
			$('.cate_list ul').css({'opacity':'0'});
			$('.cate_list li').animate({'width':'0'});
			$('.left').css({'transform':'perspective( 600px ) rotateY( -45deg )'});
			$('.right').css({'transform':'perspective( 600px ) rotateY( 45deg )'});
		}

	}); // cate list end

	function now(){ // now함수를 선언 - 현재 보여지는 페이지

		var X; // 리턴시켜줄 가상의 변수 선언
		var T = $(window).scrollTop(); // 현재 문서의 스크롤탑위치를 변수에 대입
		var WH = $(window).outerHeight(); // 브라우저의 높이

		var h = 0;
		$('section').each(function (i) {// section의 갯수만큼 loop

			
			T+(WH/3)>= h ? X = i : false; // loop될때마다 각 section의 높이값을 더해서 비교
			h+=$(this).outerHeight();

			H[i+1] = h;
		}); 
		return X; // X변수를 함수호출위치로 리턴
	}

	function active (i){

		if (i>=0&&i<$('section').length) {

			$('.fix_nav i').not(':eq('+i+')').animate({'width' : '0'});
			$('.fix_nav i').eq(i).animate({'width' : '30px'});
			
			if(now()==0) $('.pg_tit p').css({'margin-top' : '30px'});
			$('.pg_tit p').eq(i-1).clearQueue().animate({'margin-top' : '-30px'}, function(){
				$('.pg_tit p').eq(i).clearQueue().animate({'margin-top' : '0', 'opacity' : '1'});
				$('.pg_tit p').not(':eq('+i+')').animate({'opacity' : '0'});
				$('.pg_tit p').eq(i+1).clearQueue().animate({'margin-top' : '30px'});
			});
		}
		
		if(now()==2||now()==4) {
			$('.fix_nav').find('span').css({'color' : '#222'});
			$('.fix_nav').find('i').css({'background-color' : '#222'});
			$('.cate i').css({'background-color' : '#222'});
		} else {
			$('.fix_nav').find('span').css({'color' : '#eee'});
			$('.fix_nav').find('i').css({'background-color' : '#eee'});
			$('.cate i').css({'background-color' : '#eee'});
		}

		now()==0 ? $('.sns').fadeIn() : $('.sns').fadeOut();
		now()==0 ? $('.pg_tit').fadeOut() : $('.pg_tit').fadeIn();

	}
	var moving = false;
	function move(i){

		moving = true;

		if ($('html,body').is(':animated')) return false;
		$('html,body').clearQueue().animate({scrollTop: H[i]},600, function () {
			
			active(i);
			moving = false;
		});		
	}

	$(window).on('mousewheel', function(){

		var direction;
		event.wheelDelta>0 ? direction = -1 : direction = 1;

			direction ? move(now()+direction) : active(now());

			return false;
		// }
	});

	var old_T = 0;
	
	var ex_bar_W = [];

	for (i = 0; i < $('#experience li').length; i++) {
		ex_bar_W[i] = $(this).find('.course span').eq(i).width();
		$('.ex_bar').eq(i).width(ex_bar_W[i]+50);
	}

	$(window).on('scroll', function(){

		var new_T = $(this).scrollTop();

		if (moving) return false;

		active(now());

		old_T = new_T;

		// home start

		// home end

		// about start
		if(now()>='1') {
			$('.about_line').animate({'width' : '100%'}, function(){
				$('.line_top').animate({'top' : '0'}, speed, function(){
					$('.my_info').animate({'top' : '0'},  speed);
				});
				$('.line_bottom').animate({'top' : '100%'}, speed, function(){
					$('.my_interest').animate({'bottom' : '0'}, speed);
				});
			});
		}; // about end

		// skills start(https://github.com/rendro/easy-pie-chart)
		if(now()>='2') {
			$('.chart').easyPieChart({
				easing: 'easeOut',
				onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				},
				barColor: '#f86b74',
				lineWidth: 10,
				size: 130,
				scaleColor:"transparent"
			});
			$('.skill_line').animate({'width' : '90%'}, speed, function(){
					$('.license').animate({'top' : '0'}, speed);
			});
		}; // skills end

		// experience start
		if(now()>='3') {

			$('.ex_center').animate({'top' : '50%'}, 1000, function(){
				$('.ex_left .tit').animate({'right' : '10%'},600);
				$('.ex_right .tit').animate({'left' : '10%'},600, function(){
					$('.ex_point').fadeIn('slow', function(){
						$('.edu .ex_bar').animate({'right' : '0', 'opacity' : '1'});
						$('.exp .ex_bar').animate({'left' : '0', 'opacity' : '1'}, function(){
							$('.period').animate({'top' : '10%', 'opacity' : '1'});
							$('.course').animate({'top' : '50%', 'opacity' : '1'});
						});
					});
				});
			});
		}
		// experience end

		// portfolio start
		if(now()>='4') {

			$('.pf_list li').find('.pf_mockup').animate({'right' : '0', 'opacity' : '1'}, 1000, function(){
				$('.pf_list li').find('.pf_bar').animate({'left' : '0', 'width' : '70%'}, 1000, function(){
					$('.pf_txt_top').animate({'top' : '50%'});
					$('.pf_txt_bottom').animate({'top' : '10%'}, function(){
						$('.pf_view_btn').fadeIn();
					});
					
				});
			});

			$('.view_left').css({'top' : '100%'});
			$('.view_bottom').css({'left' : '100%'});
			$('.view_right').css({'bottom' : '100%'});
			$('.view_top').css({'right' : '100%'});

			$('.pf_view_btn').on('mouseenter', function(){
				
				$(this).addClass('view');

				if($(this).hasClass('view')) {
					$('.view_top').css({'right' : '0'});
					$('.view_right').css({'bottom' : '0'});
					$('.view_bottom').css({'left' : '0'});
					$('.view_left').css({'top' : '0'});
				}
			})

			$('.pf_view_btn').on('mouseleave', function(){

				$(this).removeClass('view');

				$('.view_left').css({'top' : '100%'});
				$('.view_bottom').css({'left' : '100%'});
				$('.view_right').css({'bottom' : '100%'});
				$('.view_top').css({'right' : '100%'});
			})

			var nowidx = 0;

			$('.pf_control').find('div').on('mouseenter',function(){

				$(this).css({'background-color' : '#ddd'});
			})

			$('.pf_control').find('div').on('mouseleave',function(){

				$(this).css({'background-color' : '#eee'});
			})

			$('.pf_prev').on('click', function(){

				if(nowidx==0) return false;

				pf_pg(-1);
			});

			$('.pf_next').on('click', function(){

				if(nowidx==($('.pf_list li').length-1)) return false;
				pf_pg(1);
			});	
			

			function pf_pg(i) {

				if($('.pf_list').is(':animated')) return false;
				nowidx+=i;
				$('.pf_list').stop().animate({'margin-left' : (nowidx*-1)+'00%'});
			}

		}
		
		// portfolio end
		
		// contact start
		if(now()>='5') {

			$('.send_msg').animate({'margin-top' : '0', 'opacity' : '1'}, function(){
				$('.contact_bar').animate({'width' : '100%'}, 600, function(){
					$('.contact_tit').find('span').animate({'top' : '0'});
					$('.contact_info').find('span').animate({'top' : '15%'});
				});
			});

			$('.send_btn').on('mouseover', function(){
				$('.send_bg').css({'width' : '100%', 'border' : '1px solid #eee'});
				$(this).find('a').css({'color' : '#eee'});
			})

			$('.send_btn').on('mouseleave', function(){
				$('.send_bg').css({'width' : '0', 'border' : '0'})
				$(this).find('a').css({'color' : '#222'});
			})
		}
		// contact end
	});

	$('.fix_nav li').on('click', function(){

		var idx = $(this).index();
		move(idx);
	});

	$(window).on('keydown',function(){

		if (event.key=='PageDown'||event.key=='ArrowDown') {

			event.preventDefault();
			move(now()+1);
		} else if (event.key=='PageUp'||event.key=='ArrowUp'){

			event.preventDefault();
			move(now()-1);
		}
	}); // scroll end

	//#home start

// 제이쿼리 끝
});