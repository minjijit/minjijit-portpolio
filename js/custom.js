$(function(){

  // 기본변수
  const $win  = $(window);
  const winH  = $win.height();
  
  const $part1 = $('#part1');
  const $imgs  = $('.movimg .img');
  const $texts = $('.opentext .txt');
  
  let lastScrollTop = 0;
  let autoMoving = false;

  var ht =$(window).height();
  $('section').height(ht);
  
  $(window).resize(function(){
      var ht = $(window).height();
      $('section').height(ht);
  });
  
  
  function onepage(){
    $('section').mousewheel(function(event,delta){
      if ($(this).is('#part4')) {
      return;
      }
      if(autoMoving) return;

      if(delta > 0){
          var prev = $(this).prev().offset().top;
          $('html, body').stop().animate({'scrollTop':prev},600,'linear');
      }else if (delta <0){
          var next = $(this).next().offset().top;
          $('html, body').stop().animate({'scrollTop':next},600,'linear');
      }
    });
  }

  let win_top;
  let part4top;
  let st2_top;
  let st3_top;
  let st_end;
  let st6_top;
  
$win.on('scroll', function() {
    
    
    win_top = $(window).scrollTop();
    
    // console.log(win_top);
    
    if (!$('.wedex1').length || !$('.wedex2').length || !$('#part5').length) return;
    
     
    part4top = $('#part4top').offset().top;
    st2_top = $('.wedex1').offset().top;
    st3_top = $('.wedex2').offset().top;
    part4_top = $('#part4').offset().top;   
    st_end = $('#part5').offset().top;
    st6_top = $('#part6').offset().top;
    

  
  const start = $part1.offset().top;
  const end   = start + $part1.height() - winH;

  if (win_top >= start && win_top <= end) {

  const progress = (win_top - start) / (end - start);


  let imgIdx = 0;
  let txtIdx = 0;

  if (progress < 0.33) {
    imgIdx = 0;
    txtIdx = 0;

  } else if (progress < 0.66) {
    imgIdx = 1;
    txtIdx = 1;

  } else {
    imgIdx = 2;
    txtIdx = 1;
  }
  $imgs.removeClass('on');
  $imgs.eq(imgIdx).addClass('on');
  
  $texts.removeClass('on out');  // 기존 txt 상태 초기화
$texts.each(function(i){
  if(i < txtIdx){
    $(this).addClass('out');  // 현재 인덱스 이전은 out
  } else if(i === txtIdx){
    $(this).addClass('on');   // 현재 인덱스는 on
  }
});
  }
    
  
  
  var ht =$(window).height();
  
  if(win_top >=ht*0 && win_top <ht*1){

  }
  if(win_top >=ht*1 && win_top <ht*2){

  }
  if(win_top >=ht*2 && win_top <ht*3){
    $('.title, .ab1').addClass('on');   
    $('.ab2').addClass('on');   

  }
  if(win_top >=ht*3 && win_top <ht*4){
    $('.p3-1').addClass('on');   
    $('#p3-2').addClass('on');
  }
  if(win_top >= st_end - (ht / 2)){
   
    $('.p5-1').addClass('on');   
    $('.p5-2').addClass('on');
  }
  lastScrollTop = win_top;
  
  
  
  
    if(win_top >= (ht*4)+100){
        $('.wedex1').css('top',230);
        // $('.wedex1').css('opacity',0.5);
      }else{
        $('.wedex1').css('top',0);
        // $('.wedex1').css('opacity',1);
    }

    if(win_top >= (ht*4)+600){
        $('.wedex2').css('top',230);
      
        $('.wedex1').css('opacity',0.2);
        
        
    }else{
        $('.wedex2').css('top',0);
      
        $('.wedex1').css('opacity',1);
       
    }
    
    if(win_top >= (ht*5)+850){
         $('.wedex1, .wedex2,#part4top').css('position','relative');
    }else{
         $('.wedex1, .wedex2,#part4top').css('position','sticky');
    }
    const part6Top = $('#part6').offset().top;

    if(win_top >= part6Top - (ht * 0.6)){
      $('#part6').addClass('on');
    }
  });   
  
    
  var check = false;
  var isMoving = false;
  $('section').mousewheel(function(event,delta){
      win_top = $(window).scrollTop();
      st6_top = $('#part6').offset().top;
      var ht =$(window).height();
      
      
      if ($(this).is('#part4') && delta < 0) { // part4에서 휠 내릴 때
        isMoving = true;
        $('html, body').stop().animate({ 'scrollTop': $('#part5').offset().top }, 600, function() { isMoving = false; });
        return;
        }
        if ($(this).is('#part5') && delta > 0) { // part5에서 휠 올릴 때
        isMoving = true;
        
        
        $('html, body').stop().animate({ 'scrollTop': $('#part4').offset().top }, 600, function() { isMoving = false; });
        return;
    }
      if ( $(this).is('#part5') ||  $(this).is('#part7')){
        check = true;
      }
      if ($(this).is('#part5')) {
        return;
      }
      if(win_top < st6_top && $(this).is('#part6')){
        if(check == true){
          var next = $('#part6').offset().top;
          $('html, body').stop().animate({'scrollTop':next},600,'linear');
          check = false;
        }
        
      }else{
        if(delta > 0){
            var prev = $(this).prev().offset().top;
            $('html, body').stop().animate({'scrollTop':prev},600,'linear');
        }else if (delta <0){
            var next = $(this).next().offset().top;
            $('html, body').stop().animate({'scrollTop':next},600,'linear');
        }
      }
            
    });


$('.p6scroll').on('wheel', function(e){
  e.preventDefault();          // 페이지 세로 스크롤 막기
  e.stopPropagation();         // 상위 스크롤 이벤트 차단
  this.scrollLeft += e.originalEvent.deltaY;
  });
  let isDown = false;
  let startX;
  let scrollLeft;

$('.p6scroll')
  .on('mousedown', function(e){
    isDown = true;
    startX = e.pageX - this.offsetLeft;
    scrollLeft = this.scrollLeft;
  })
  .on('mouseleave mouseup', function(){
    isDown = false;
  })
  .on('mousemove', function(e){
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - this.offsetLeft;
    const walk = (x - startX) * 1.2;
    this.scrollLeft = scrollLeft - walk;
  });
  
  (function(){

  const $scroll = $('.p6scroll');
  const $target = $('#part7');

  let atEnd = false;      // 가로 끝에 도달했는지
  let readyToMove = false;
  let isMoving = false;

  if(!$scroll.length || !$target.length) return;

  // 가로 스크롤 감지
  $scroll.on('scroll', function(){

    const maxScroll = this.scrollWidth - this.clientWidth;

    // 끝에 도달
    if(this.scrollLeft >= maxScroll - 10){
      atEnd = true;
    }else{
      atEnd = false;
      readyToMove = false; // 다시 왼쪽 가면 리셋
    }

  });

  // 휠 한 번 더 감지
  $scroll.on('wheel', function(e){

    if(!atEnd || isMoving) return;

    // 아래 방향 휠만
    if(e.originalEvent.deltaY > 0){
      e.preventDefault();
      e.stopPropagation();

      readyToMove = true;

      if(readyToMove){
        isMoving = true;

        $('html, body').stop().animate({
          scrollTop: $target.offset().top
        }, 1400, 'swing', function(){
          isMoving = false;
        });
      }
    }

  });

})();

$('.p6-2 img').on('click', function() {
    const $img = $(this);
    const $container = $img.closest('.p6scroll');
    const $track = $img.parent();

    // 이미 active 상태면 제거 (작아짐)
    if($img.hasClass('active')) {
        $img.removeClass('active');
        // 모든 사진 원래 opacity로
        $track.find('img').css('opacity', 1);
        return;
    }

    // 다른 이미지 active 제거
    $track.find('img').removeClass('active');

    // 클릭한 이미지 active 추가 (커짐)
    $img.addClass('active');

    // 클릭한 이미지 제외 나머지 opacity 0.5
    $track.find('img').css('opacity', 0.5);
    $img.css('opacity', 1);

    const containerWidth = $container.innerWidth();
    const containerScrollWidth = $container[0].scrollWidth;

    let scrollLeft;

    if ($img.index() <= 1) {
        // 1, 2번째 → 왼쪽 맞춤
        scrollLeft = 0;
    } else {
        // 3번째 이상 → 선택 이미지가 오른쪽에 딱 붙게
        scrollLeft =
            $img.position().left +
            $img.outerWidth(true) -
            containerWidth;
    }

// 범위 제한
scrollLeft = Math.max(0, Math.min(scrollLeft, containerScrollWidth - containerWidth));

$container.stop().animate({ scrollLeft }, 400);
});
  document.addEventListener('scroll', function () {
    const part8 = document.querySelector('#part8');
    const part8Top = part8.getBoundingClientRect().top;
    const winH = window.innerHeight;

    if (part8Top < winH * 0.8) {
      part8.classList.add('on');
    } 
  });
  let openingDone = false;
  let part7Done = false;

  $(window).on('scroll', function(){

    const winTop = $(window).scrollTop();
    const winH = $(window).height();

      // part7 → part8
      if(!part7Done){
    const part7Top = $('#part7').offset().top;

      if(winTop >= part7Top && winTop < part7Top + winH){
        part7Done = true;
        autoMoving = true;

        setTimeout(function(){
          $('html, body').stop().animate({
            scrollTop: $('#part8').offset().top
          }, 800, function(){
            autoMoving = false;
          });
        }, 800);
      }
    }
  });
  $(window).on('load', function(){
    const openingTop = $('#opening').offset().top;
    const winTop = $(window).scrollTop();
    const winH = $(window).height();

    if(!openingDone && winTop >= openingTop && winTop < openingTop + winH){
      openingDone = true;
      autoMoving = true;

      setTimeout(function(){
        $('html, body').stop().animate({
          scrollTop: $('#part1').offset().top
        }, 800, function(){
          autoMoving = false;
        });
      }, 1000);
    }
  });
let isAutoScrolling = false;

function moveScroll(targetTop){
  if(isAutoScrolling) return;

  isAutoScrolling = true;

  $('html, body')
    .stop(true)
    .animate(
      { scrollTop: targetTop },
      800,
      'swing',
      function(){
        isAutoScrolling = false;
      }
    );
}

/* 모든 #id 링크 공통 처리 */
  $('a[href^="#"]').on('click', function(e){
    const href = $(this).attr('href');

    // 그냥 # 이거나 없는 경우 제외
    if(href === '#' || !href) return;

    const $target = $(href);
    if(!$target.length) return;

    e.preventDefault();
    moveScroll($target.offset().top);
  });

  /* 로고 클릭 → 맨 위 */
  $('.logo').on('click', function(e){
    e.preventDefault();
    moveScroll(0);
  });
  const $scroll = $('.p6scroll');

    setTimeout(()=>{
      $scroll.animate({ scrollLeft: 100 }, 400)
            .animate({ scrollLeft: 0 }, 400);
    }, 800);

});

  

