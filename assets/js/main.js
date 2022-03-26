(function ($) {
  "use strict";

  $("a[href^='#']").click(function (e) {
    e.preventDefault();
  });

  /* ********************************************
        14. Background Youtube Video 
    ******************************************** */
  if ($(".youtube-bg").length) {
    $(".youtube-bg").YTPlayer({
      videoURL: "Sz_1tkcU0Co",
      containment: ".youtube-bg",
      mute: true,
      loop: true,
      startAt: 7,
      showControls: false,
      showYTLogo: false,
    });
  }

  $(document).ready(function () {
    /*------------------------------------------------------
            Navbar fix
        -------------------------------------------------------*/
    $(document).on(
      "click",
      ".navbar-area .navbar-nav li.menu-item-has-children>a",
      function (e) {
        e.preventDefault();
      }
    );
    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= 1) {
        $(".navbar-area").addClass("navbar-area-fixed");
      } else {
        $(".navbar-area").removeClass("navbar-area-fixed");
      }

      //back to top show/hide
      let ScrollTop = $(".back-to-top");
      if ($(window).scrollTop() > 1000) {
        ScrollTop.fadeIn(1000);
      } else {
        ScrollTop.fadeOut(1000);
      }
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          $("#dbtt_imagePreview").css(
            "background-image",
            "url(" + e.target.result + ")"
          );
          $("#dbtt_imagePreview").hide();
          $("#dbtt_imagePreview").fadeIn(650);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    $("#dbtt_imageUpload").change(function () {
      readURL(this);
    });

    /* -------------------------------------------------------------
            menu show Form
        ------------------------------------------------------------- */
    if ($(window).width() > 991) {
      if ($(".dropdown-menu-btn").length) {
        $(".dropdown-menu-btn").on("click", function () {
          $(".navbar-nav").fadeToggle("navbar-nav-show", "linear");
          $(".dropdown-menu-btn").toggleClass("open");
        });

        $("body").on("click", function (event) {
          if (
            !$(event.target).closest(".dropdown-menu-btn").length &&
            !$(event.target).closest(".navbar-nav").length
          ) {
            $(".navbar-nav").fadeOut("navbar-nav-show");
          }
          if (
            !$(event.target).closest(".dropdown-menu-btn").length &&
            !$(event.target).closest(".navbar-nav").length
          ) {
            $(".dropdown-menu-btn").removeClass("open");
          }
        });
      }
    }

    /*------------------------------------------------------
            wow js init
        -------------------------------------------------------*/
    new WOW().init();

    /*------------------------------------------------------
            select onput
        -------------------------------------------------------*/
    if ($(".select").length) {
      $(".select").niceSelect();
    }

    $(".dbtt-search-single-wrap select").on("change", function () {
      $(".current").addClass("new-current");
    });

    let $banner_slider = $(".banner-slider");
    $banner_slider.slick({
      slidesToShow: 1,
      dots: true,
      slidesToScroll: 1,
      speed: 400,
      loop: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 9000,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      appendDots: $(".banner-slider-dots"),
    });
    //active count list
    $(".banner-slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        let firstNumber = check_number(++nextSlide);
        $(".banner-slider-controls .slider-extra .text .first").text(
          firstNumber
        );
      }
    );
    let smBannerSlider = $(".banner-slider").slick("getSlick");
    let smBannerSliderCount = smBannerSlider.slideCount;
    $(".banner-slider-controls .slider-extra .text .last").text(
      check_number(smBannerSliderCount)
    );

    function check_number(num) {
      let IsInteger = /^[0-9]+$/.test(num);
      return IsInteger ? "0" + num : null;
    }

    /* -------------------------------------------------------------
            swiper-slider
        ------------------------------------------------------------- */
    new Swiper(".banner-slider-two", {
      mode: "horizontal",
      loop: true,
      autoHeight: true,
      speed: 950,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      nextButton: ".arrow-right",
      prevButton: ".arrow-left",
      coverflowEffect: {
        rotate: -10,
        stretch: 110,
        depth: 120,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-buttons-next",
        prevEl: ".swiper-buttons-prev",
      },
    });

    /* -----------------------------------------------------
            destination list slider
        ----------------------------------------------------- */
    let $d_list_slider = $(".destinations-list-slider");
    $d_list_slider.slick({
      slidesToShow: 3,
      dots: false,
      slidesToScroll: 1,
      speed: 400,
      loop: true,
      autoplay: false,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      appendArrows: $(".destinations-slider-controls .slider-nav"),
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "10px",
          },
        },
      ],
    });
    //active progress
    let $listProgressBar = $(".d-list-progress");
    let $listProgressBarLabel = $(".slider__label");
    $d_list_slider.on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        let calc = (nextSlide / (slick.slideCount - 1)) * 100;
        $listProgressBar
          .css("background-size", calc + "% 100%")
          .attr("aria-valuenow", calc);
        $listProgressBarLabel.text(calc + "% completed");
      }
    );
    //active count list
    $(".destinations-list-slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        let firstNumber = check_number(++nextSlide);
        $(".destinations-slider-controls .slider-extra .text .first").text(
          firstNumber
        );
      }
    );
    let smDestinationSlider = $(".destinations-list-slider").slick("getSlick");
    let smDestinationSliderCount = smDestinationSlider.slideCount;
    $(".destinations-slider-controls .slider-extra .text .last").text(
      check_number(smDestinationSliderCount)
    );

    function check_number(num) {
      let IsInteger = /^[0-9]+$/.test(num);
      return IsInteger ? "0" + num : null;
    }

    /* -----------------------------------------------------
            destination details main slider
        ----------------------------------------------------- */
    let $d_details_main_slider = $(".destinations-details-main-slider");
    $d_details_main_slider.slick({
      slidesToShow: 1,
      dots: false,
      slidesToScroll: 1,
      speed: 400,
      loop: true,
      fade: true,
      autoplay: false,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      appendArrows: $(".destinations-details-main-slider-controls .slider-nav"),
    });
    //active progress
    let $progressBar = $(".d-list-progress");
    let $progressBarLabel = $(".slider__label");
    $d_details_main_slider.on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        let calc = (nextSlide / (slick.slideCount - 1)) * 100;
        $progressBar
          .css("background-size", calc + "% 100%")
          .attr("aria-valuenow", calc);
        $progressBarLabel.text(calc + "% completed");
      }
    );
    //active count list
    $(".destinations-details-main-slider").on(
      "beforeChange",
      function (event, slick, currentSlide, nextSlide) {
        let firstNumber = check_number(++nextSlide);
        $(
          ".destinations-details-main-slider-controls .slider-extra .text .first"
        ).text(firstNumber);
      }
    );
    let smSlider = $(".destinations-details-main-slider").slick("getSlick");
    let smSliderCount = smSlider.slideCount;
    $(
      ".destinations-details-main-slider-controls .slider-extra .text .last"
    ).text(check_number(smSliderCount));

    function check_number(num) {
      let IsInteger = /^[0-9]+$/.test(num);
      return IsInteger ? "0" + num : null;
    }

    /* -----------------------------------------------------
            destination details main slider
        ----------------------------------------------------- */
    let $d_client_review_slider = $(".destinations-client-review-slider");
    $d_client_review_slider.slick({
      slidesToShow: 4,
      dots: false,
      autoplaySpeed: 15000,
      loop: true,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: "10px",
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPadding: "10px",
          },
        },
      ],
    });

    /* -----------------------------------------------------
            upcomming-card-slider
        ----------------------------------------------------- */
    let $upcomming_card_slider_1 = $(".upcomming-card-slider-1");
    $upcomming_card_slider_1.slick({
      slidesToShow: 4,
      dots: false,
      autoplay: true,
      autoplaySpeed: 7000,
      centerMode: true,
      centerPadding: "140px",
      loop: true,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1610,
          settings: {
            centerPadding: "100px",
          },
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerPadding: "80px",
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerPadding: "80px",
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerPadding: "140px",
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            centerPadding: "55px",
          },
        },
        {
          breakpoint: 321,
          settings: {
            slidesToShow: 1,
            centerPadding: "30px",
          },
        },
      ],
    });

    /* -----------------------------------------------------
            upcomming-card-slider-2
        ----------------------------------------------------- */
    let $upcomming_card_slider_2 = $(".upcomming-card-slider-2");
    $upcomming_card_slider_2.slick({
      slidesToShow: 3,
      dots: false,
      centerMode: true,
      centerPadding: "8px",
      autoplay: true,
      autoplaySpeed: 7000,
      loop: true,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });

    /* -----------------------------------------------------
            upcomming-card-slider-2
        ----------------------------------------------------- */
    let $upcomming_card_slider_3 = $(".upcomming-card-slider-3");
    $upcomming_card_slider_3.slick({
      slidesToShow: 4,
      dots: false,
      autoplay: true,
      autoplaySpeed: 6000,
      loop: true,
      centerMode: true,
      centerPadding: "8px",
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    /* -----------------------------------------------------
            upcomming-card-slider-2
        ----------------------------------------------------- */
    let $client_slider = $(".client-slider");
    $client_slider.slick({
      slidesToShow: 3,
      dots: false,
      autoplaySpeed: 25000,
      loop: true,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    /* -----------------------------------------------------
            upcomming-card-slider-2
        ----------------------------------------------------- */
    let $instagram_slider = $(".instagram-slider");
    $instagram_slider.slick({
      slidesToShow: 6,
      dots: false,
      arrows: false,
      autoplaySpeed: 15000,
      loop: true,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });

    /* -----------------------------------------------------
            blog-slider
        ----------------------------------------------------- */
    let $blog_slider = $(".blog-slider");
    $blog_slider.slick({
      slidesToShow: 2,
      dots: false,
      autoplaySpeed: 25000,
      loop: true,
      prevArrow:
        '<span class="slick-prev"><i class="la la-long-arrow-left"></i></span>',
      nextArrow:
        '<span class="slick-next"><i class="la la-long-arrow-right"></i></span>',
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    /* -----------------------------------------------------
            upcomming-card-slider
        ----------------------------------------------------- */
    if ($(".gallery-slider").length) {
      $(".gallery-slider").owlCarousel({
        items: 3,
        smartSpeed: 450,
        loop: true,
        autoplay: true,
        autoplayTimeout: 10000,
        nav: false,
        dots: false,
        smartSpeed: 1500,
        margin: 30,
        responsive: {
          0: {
            items: 2,
            margin: 20,
          },
          767: {
            items: 2,
            margin: 20,
          },
          768: {
            items: 3,
            margin: 20,
          },
        },
      });
    }

    /* -------------------------------------------------------------
            swiper-slider
        ------------------------------------------------------------- */
    let swiper = new Swiper(".client-slider-two", {
      mode: "horizontal",
      loop: true,
      speed: 950,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      nextButton: ".arrow-right",
      prevButton: ".arrow-left",
      coverflowEffect: {
        rotate: -10,
        stretch: 110,
        depth: 120,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-buttons-next",
        prevEl: ".swiper-buttons-prev",
      },
    });

    /*--------------------------------------------------------
            Jarallax Active Code
        --------------------------------------------------------*/
    if ($.fn.jarallax) {
      $(".jarallax").jarallax({
        speed: 0.5,
      });
    }

    /*--------------------------------------------------------
            search date picker 
        --------------------------------------------------------*/
    // let localToday = new Date();
    // localToday.setDate(tomorrow.getDate() + 1); // tomorrow
    if ($(".departing-date").length) {
      $(function () {
        $(".departing-date").datepicker({});
      });
    }
    if ($(".returning-date").length) {
      $(function () {
        $(".returning-date").datepicker({});
      });
    }

    /**---------------------------------------
     *  slider-product-sorting
     * -------------------------------------*/
    if ($(".slider-product-sorting").length) {
      $(function () {
        $(".slider-product-sorting").slider({
          range: true,
          min: 50,
          max: 2000,
          values: [50, 1560],
          slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
          },
        });
        $("#amount").val(
          "$" +
            $(".slider-product-sorting").slider("values", 0) +
            " - $" +
            $(".slider-product-sorting").slider("values", 1)
        );
      });
    }

    /* --------------------------------------------------
            Gallery 
        ---------------------------------------------------- */
    let $galleryFilterArea = $(".gallery-filter-area"),
      $galleryFilterMenu = $(".gallery-filter-menu");
    /*Filter*/
    $galleryFilterMenu.on("click", "button, a", function () {
      let $this = $(this),
        $filterValue = $this.attr("data-filter");
      $galleryFilterMenu.find("button, a").removeClass("active");
      $this.addClass("active");
      $galleryFilterArea.isotope({
        filter: $filterValue,
      });
    });
    /*Grid*/
    $galleryFilterArea.each(function () {
      $(".gallery-filter-area .popup-thumb").magnificPopup({
        type: "image",
        mainClass: "mfp-zoom-in",
        gallery: {
          enabled: true,
        },
        zoom: {
          enabled: true,
          duration: 300, // don't foget to change the duration also in CSS
          opener: function (element) {
            return element.find("img");
          },
        },
      });
      let $this = $(this),
        $galleryFilterItem = ".tp-gallery-item";
      $this.imagesLoaded(function () {
        $this.isotope({
          itemSelector: $galleryFilterItem,
          percentPosition: true,
          masonry: {
            columnWidth: ".gallery-sizer",
          },
        });
      });
    });

    /*--------------------------------------------------------
            magnific popup 
        --------------------------------------------------------*/
    $(".video-play-btn").magnificPopup({
      type: "video",
      removalDelay: 260,
      mainClass: "mfp-zoom-in",
    });

    /*------------------------------
            counter js 
        -------------------------------*/
    if ($(".count-num").length) {
      $(".count-num").counterUp({
        delay: 10,
        time: 5000,
      });
    }

    /*------------------------------------------------------
            Search Popup
        -------------------------------------------------------*/
    let searchBodyOvrelay = $("#body-overlay");
    let searchPopup = $("#search-popup");

    $(document).on("click", "#body-overlay", function (e) {
      e.preventDefault();
      searchBodyOvrelay.removeClass("active");
      searchPopup.removeClass("active");
    });
    $(document).on("click", ".search", function (e) {
      e.preventDefault();
      searchPopup.addClass("active");
      searchBodyOvrelay.addClass("active");
    });

    /*--------------------------------------------
            signUp Popup
        ---------------------------------------------*/
    let singBodyOvrelay = $("#body-overlay");
    let singupPopup = $("#signUp-popup");

    $(document).on("click", "#body-overlay", function (e) {
      e.preventDefault();
      singBodyOvrelay.removeClass("active");
      singupPopup.removeClass("active");
    });
    $(document).on("click", ".signUp-btn", function (e) {
      e.preventDefault();
      singupPopup.addClass("active");
      singBodyOvrelay.addClass("active");
    });
  });

  $(window).on("load", function () {
    /*--------------------------------
            preloader
        ---------------------------------*/
    let preLoder = $("#preloader");
    preLoder.fadeOut(1000);

    /*--------------------------------
            Cancel Preloader
        ---------------------------------*/
    $(document).on("click", ".cancel-preloader a", function (e) {
      e.preventDefault();
      console.log("cancel");
      $("#preloader").fadeOut(2000);
    });
  });

  /*------------------------------------------------------
        back to top
    -------------------------------------------------------*/
  $(document).on("click", ".back-to-top", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      2000
    );
  });

  /* -------------------------------------------------------------
        inner linking js
    ------------------------------------------------------------- */
  if ($('.scroll-down a[href^="#"]').length) {
    $('.scroll-down a[href^="#"]')
      .not("#scrollUp")
      .on("click", function (e) {
        e.preventDefault();
        let target = this.hash;
        let $target = $(target);
        $("html, body").stop().animate(
          {
            scrollTop: $target.offset().top,
          },
          900,
          "swing"
        );
      });
  }
})(jQuery);
