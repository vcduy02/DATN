
(function($) {
  "use strict";
  $(document).ready(function() {
      jQuery('.home-banner--slide').slick({
          infinite: true,
          speed: 300,
          autoplay: true,
          autoplaySpeed: 2000,
          centerMode: false,
          centerPadding: '0px',
          arrows: true,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: '<span type="button" class="slick-prev"><span></span></span>',
          nextArrow: '<span type="button" class="slick-next"><span></span></span>',
      });

      
      jQuery('.home-flashsale--slide').slick({
          infinite: false,
          speed: 300,
          slidesToShow: 5,
          arrows: true,
          dots: false,
           prevArrow: '<span type="button" class="slick-prev"><span></span></span>',
          nextArrow: '<span type="button" class="slick-next"><span></span></span>',
          variableWidth: true,
         
          
          
      });

      jQuery('.home-product-hot--slide').slick({
          infinite: false,
          speed: 300,
          slidesToShow: 5,
          arrows: true,
          dots: false,
           prevArrow: '<span type="button" class="slick-prev"><span></span></span>',
          nextArrow: '<span type="button" class="slick-next"><span></span></span>',
        
          
      });

      jQuery('.product-media__stage').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          dots: false,
          fade: false,
          asNavFor: '.product-media__nav',
          prevArrow: '<span type="button" class="slick-prev"><span></span></span>',
          nextArrow: '<span type="button" class="slick-next"><span></span></span>',
          infinite: false,
          lazyLoad: 'ondemand',
      });
      jQuery('.product-media__nav').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          asNavFor: '.product-media__stage',
          arrows: false,
          dots: false,
          centerMode: false,
          focusOnSelect: true,
          vertical: true,
          infinite: false,
          lazyLoad: 'ondemand',

      });

      

      if(jQuery('[data-countdown]').length){
          $('[data-countdown]').each(function() {
              var $this = $(this), finalDate = $(this).data('countdown');
              $this.countdown(finalDate, function(event) {
                  var fomat ='<div class="box-count box-days"><div class="number">%D</div><div class="text">NGÀY</div></div><div class="box-count box-hours"><div class="number">%H</div><div class="text">GIỜ </div></div><div class="box-count box-min"><div class="number">%M</div><div class="text">PHÚT</div></div><div class="box-count box-secs"><div class="number">%S</div><div class="text">GIÂY</div></div>';
                  $this.html(event.strftime(fomat));
             });
          });
      }

      if(jQuery('[data-countdown-style2]').length){
          $('[data-countdown-style2]').each(function() {
              var $this = $(this), finalDate = $(this).data('countdown-style2');
              $this.countdown(finalDate, function(event) {
                  var fomat ='<span class="box-count">%D:%H:%M:%S</span>';
                  $this.html(event.strftime(fomat));
             });
          });
      }

      $(".menu-items > li").hover(function() {
          $(".header-menu--bg").addClass('active');
      }).mouseleave(function() {
          
         
          setTimeout(function() {
             

          }, 1000);

      });

      $(".menu-items").mouseleave(function(){
          $(".header-menu--bg").removeClass('active');
      });

      $(document).on('click', '.minicart', function (e) {
          e.stopPropagation();
      });

      $(document).on('click', '.minicart .close', function (e) {
          $('.header-cart').removeClass('open');
          return false;
      });

      
      jQuery('.btn-number').on( 'click', function(e) {

          e.preventDefault();
          
          var fieldName = jQuery(this).attr('data-field');
          var type      = jQuery(this).attr('data-type');
          var input = jQuery("#"+fieldName+"");
          var currentVal = parseInt(input.val() , 10);
          if (!isNaN(currentVal)) {
              if(type == 'minus') {
                  
                  if(currentVal > 1) {
                      input.val(currentVal - 1).change();
                  } 

              } else if(type == 'plus') {

                  input.val(currentVal + 1).change();
              }
          } else {
              input.val(0);
          }
      });
      

  }); 

})(jQuery);