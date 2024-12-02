$(document).ready(function(){
  // header sub_menu sticky
  
  // container_top
  var hd_oH = $('.hd_area').outerHeight();
  $('.main_page').css('margin-top',hd_oH);
  
  // 메인 인트로 bxslider
  var visual_slide = $('.visual').bxSlider({
    auto:true,
    controls:false,
    pager:false
  });
  var visual_txt_slide = $('.visual_txt').bxSlider({
    auto:true,
    controls:false
  })
  
  $('.bx-pager').on('click',function(){
    var vs_txt_idx = visual_txt_slide.getCurrentSlide();
    visual_slide.goToSlide(vs_txt_idx);
  })  
  
  // 메인 인트로 우측 box height fix
  $(window).on('resize',function(){
    var mv_H = $('.main_intro').height();
    $('.visual_cnt').css('height',mv_H*0.9);
  }).resize();
  
  // 메인 work
  $('.main_work_area li').on({
    mouseenter:function(){
      $(this).addClass('over');
    },
    mouseleave:function(){
      $(this).removeClass('over');
    }
  });
  
  // 메인 global more
  $('.main_global .map').on({
    mouseenter:function(){
      $(this).addClass('over');
    },
    mouseleave:function(){
      $(this).removeClass('over');
    }
  });
  
  // 서브페이지 박스 width 설정
  var subList = [];
  var sumResult = 0;
  for(var i = 0; i < $('.sub_area ul li').length; i++){
    subList[i] = $('.sub_area ul li').eq(i).outerWidth();
    // 서브메뉴 li의 width값을 for문으로 반복해 배열완성
    sumResult += subList[i];
    // sumResult 값에 subList 배열 값을 반복으로 더하며 값을 대입.
  }
  $('.sub_area ul').css('width',sumResult+1);  
  
  // 서브페이지 탭 적용
  $('.sub_area ul li a').on('click',function(e){
    e.preventDefault();
    var subTab = $('.sub_area ul li a').index($(this));
    $('.sub_area ul li a').removeClass('active').eq(subTab).addClass('active');
    $('.section').eq(subTab).addClass('on').siblings().removeClass('on');
    $(window).scrollTop(0);
  })
  
  // 서브메뉴 sticky 효과
  $(window).on('scroll',function(){
    var wsT = $(this).scrollTop();
    var ht_oH = $('.hd_title').outerHeight();
    
    wsT>ht_oH? $('.hd_sub').addClass('fix'):$('.hd_sub').removeClass('fix');
  });
  
  // ir 페이지 탭 적용
  $('.ir_tab a').on('click',function(e){
    e.preventDefault();
    var irTab = $('.ir_tab a').index($(this));
    $('.ir_tab a').removeClass('active').eq(irTab).addClass('active');
    $('.ir_cnt').eq(irTab).addClass('on').siblings().removeClass('on');
  })
  
  // 재무정보 select
//  function financeStatusSel(){
//	if($("#financeStatus").val() != null){
//		location.href = "/investInfo/financeStatus.do?year=" + $("#financeStatus").val();
//  }
  
})





