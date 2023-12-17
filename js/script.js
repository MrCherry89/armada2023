$(document).ready(function () {
  $(".slider").slick({
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          dots: false,
          arrows: false,
          infinite: false,
          variableWidth: true,
          slidesToShow: 1,
        },
      },
    ],
  });

  $(".second-slider").each(function (key, item) {
    console.log(item);
    var secondSlider = $(item);

    secondSlider.slick({
      dots: false,
      arrows: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: secondSlider
        .closest(".slider-wrap")
        .find(".slider-navigation .slick-prev"),
      nextArrow: secondSlider
        .closest(".slider-wrap")
        .find(".slider-navigation .slick-next"),
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            dots: false,
            arrows: true,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });

    secondSlider.on("touchstart touchmove mousemove mouseenter", function (e) {
      $(".slider").slick("slickSetOption", "swipe", false, false);
    });

    secondSlider.on("touchend mouseover mouseout", function (e) {
      $(".slider").slick("slickSetOption", "swipe", true, false);
    });
  });

  $(".company-life-slider").slick({
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: $(".company-life .top-info .slider-navigation .slick-prev"),
    nextArrow: $(".company-life .top-info .slider-navigation .slick-next"),
  });

  gsap.utils.toArray(".comparisonSection").forEach((section) => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".comparisonSection",
        start: "center center",
        end: () => "+=" + section.offsetWidth,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: "none" },
    });
    tl.fromTo(
      section.querySelector(".afterImage"),
      { xPercent: 100, x: 0 },
      { xPercent: 0 }
    ).fromTo(
      section.querySelector(".afterImage img"),
      { xPercent: -100, x: 0 },
      { xPercent: 0 },
      0
    );
  });

  $(".slider-info-wrap p .more").on("click", function (e) {
    e.preventDefault();
    $(this).closest("p").find(".hide-text").addClass("show");
    $(this).hide();
  });

  $(".calculate-form").validate({
    rules: {
      phone: {
        required: true,
      },
      name: {
        required: true,
      },
      email: {
        required: true,
      },
    },
  });

  $(".leave-form").validate({
    rules: {
      phone: {
        required: true,
      },
      name: {
        required: true,
      },
    },
  });

  $(".registration-form").validate({
    rules: {
      phone: {
        required: true,
      },
      name: {
        required: true,
      },
      number: {
        required: true,
      },
      email: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Введите ваше имя",
      },
      email: {
        required: "Введите вашу почту",
      },
      number: {
        required: "Введите номер договора",
      },
      phone: {
        required: "Введите ваш телефон",
      },
    },
  });

  $(function () {
    var tab = $("#tabs .tabs-items > div");
    tab.hide().filter(":first").show();

    $("#tabs .tabs-nav a")
      .click(function () {
        tab.hide();
        tab.filter(this.hash).show();
        $("#tabs .tabs-nav a").removeClass("active");
        $(this).addClass("active");
        return false;
      })
      .filter(":first")
      .click();
  });

  $("#leave-agree").on("change", function (e) {
    if ($("#leave-agree").prop("checked")) {
      $(".leave-form > .style2-btn").attr("disabled", false);
      $(".leave-form > .style2-btn").removeClass("btn-deactivate");
    } else {
      $(".leave-form > .style2-btn").attr("disabled", true);
      $(".leave-form > .style2-btn").addClass("btn-deactivate");
    }
  });

  $("#calculate-agree").on("change", function (e) {
    if ($("#calculate-agree").prop("checked")) {
      $(".get-quote").attr("disabled", false);
      $(".get-quote").removeClass("btn-deactivate");
    } else {
      $(".get-quote").attr("disabled", true);
      $(".get-quote").addClass("btn-deactivate");
    }
  });

  // var fileInput = document.querySelector(".input-file"),
  //   button = document.querySelector(".input-file-trigger"),
  //   the_return = document.querySelector(".file-return");

  // button.addEventListener("keydown", function (event) {
  //   if (event.keyCode == 13 || event.keyCode == 32) {
  //     fileInput.focus();
  //   }
  // });
  // button.addEventListener("click", function (event) {
  //   fileInput.focus();
  //   return false;
  // });
  // fileInput.addEventListener("change", function (event) {
  //   the_return.innerHTML = this.value;
  // });

  $(".calculate-form").on("submit", function (e) {
    e.preventDefault();

    if ($(".calculate-form").valid()) {
      formData = new FormData();
      name = $(".calculate-form input[name='name']").val();
      phone = $(".calculate-form input[name='phone']").val();

      formData.append("name", name);
      formData.append("phone", phone);
      $.each(
        $(".calculate-form input[name='attachment-file']")[0].files,
        function (key, input) {
          formData.append("file[]", input);
        }
      );

      $.ajax({
        type: "POST",
        url: "/ajax/feedback.php",
        data: formData,
        processData: false,
        dataType: "json",
        contentType: false,
        success: function (data) {
          $.magnificPopup.open({
            items: {
              src: "#sent-popup",
            },
            type: "inline",
          });
          $(".calculate-form").reset();
        },
        error: function (jqXHR, textStatus, error) {},
      });
    }
  });

  $(".accordion-list-item .item-heading").on("click", function (e) {
    e.preventDefault();
    if ($(this).find(".icon").hasClass("rotate")) {
      $(this).find(".icon").removeClass("rotate");
    } else {
      $(this)
        .closest(".accordion-list-item")
        .find(".icon")
        .removeClass("rotate");
      $(this).find(".icon").addClass("rotate");
    }
    $(this).closest(".accordion-list-item").removeClass("opened");
    $(this)
      .closest(".accordion-list-item")
      .find(".item-body")
      .removeClass("active");
    $(this)
      .closest(".accordion-list-item")
      .find(".item-body")
      .addClass("active");
    $(this).closest(".accordion-list-item").addClass("opened");
    $(this)
      .closest(".accordion-list-item")
      .find(".item-body:not(.active)")
      .slideUp();
    $(this).closest(".accordion-list-item:not(.opened)").removeClass("active");
    $(this).closest(".accordion-list-item").find(".item-body").slideToggle();
    $(this).closest(".accordion-list-item").toggleClass("active");
  });

  $(".calculate-form").on("submit", function (e) {
    e.preventDefault();
    if ($(".calculate-form").valid()) {
      $.magnificPopup.open({
        items: {
          src: "#sent-popup",
        },
        type: "inline",
      });
    }
  });

  $(".carousel").slick();

  $(".carousel2").slick();

  $(".carousel2").on("mousedown mouseup", function () {
    $(".carousel").slick("slickGoTo", 1);
  });

  $(".section_container .sections").on("click", function () {
    $(".section_container .sections").removeClass("active");
    $(this).addClass("active");
  });

  $(".section_container2 .sections2").on("click", function () {
    $(".section_container2 .sections2").removeClass("active");
    $(this).addClass("active");
  });

  $(".select-wrap select").select2({
    minimumResultsForSearch: 6,
  });

  $(".popup").magnificPopup({
    type: "inline",
    mainClass: "mfp-fade",
  });

  $(".phone-number-input").inputmask({
    mask: "+7 (999) 999 - 99 - 99",
  });

  $('input[type="file"]').change(function () {
    var value = $("input[type='file']").val();
    $(".js-value").text(value);
    $(".append").addClass("download");
  });

  $(".play").magnificPopup({
    type: "inline",
    mainClass: "mfp-fade",
    callbacks: {
      open: function () {
        var videoWrap = $(this)[0].content;
        var video = $(videoWrap).find("video");

        video.get(0).play();
      },
      close: function () {
        var videoWrap = $(this)[0].content;
        var video = $(videoWrap).find("video");
        video.get(0).pause();
        video.get(0).currentTime = 0;
      },
    },
  });

  $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
    disableOn: 700,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });

  $(".choose-us-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    speed: 1000,
    dots: false,
    prevArrow: $(".choose-us .navigation-wrap .slider-navigation .slick-prev"),
    nextArrow: $(".choose-us .navigation-wrap .slider-navigation .slick-next"),
  });

  $(".leave-request-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 1000,
    dots: false,
    prevArrow: $(".leave-request-slider-wrap .slider-navigation .slick-prev"),
    nextArrow: $(".leave-request-slider-wrap .slider-navigation .slick-next"),
  });

  $(".take-survey-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    speed: 1000,
    dots: false,
    prevArrow: $(".take-survey-slider-wrap .slider-navigation .slick-prev"),
    nextArrow: $(".take-survey-slider-wrap .slider-navigation .slick-next"),
  });

  $(".reliability-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    speed: 1000,
    dots: false,
    prevArrow: $(".reliability-slider-wrap .slider-navigation .slick-prev"),
    nextArrow: $(".reliability-slider-wrap .slider-navigation .slick-next"),
  });

  $(".floor-plan-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    speed: 1000,
    dots: false,
  });

  $(".rating-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
    speed: 1000,
    dots: false,
    responsive: [
      {
        breakpoint: 9999,
        settings: "unslick",
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  });

  $slickGreen = false;
  function greenSlider() {
    if ($(window).width() < 1025) {
      if (!$slickGreen) {
        $(".gallery-slider").slick({
          dots: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: false,
        });
        $slickGreen = true;
      }
    } else if ($(window).width() > 1025) {
      if ($slickGreen) {
        $(".gallery-slider").slick("unslick");
        $slickGreen = false;
      }
    }
  }

  greenSlider();

  $(window).on("resize", function () {
    greenSlider();
  });

  $slickGreen2 = false;
  function greenSlider2() {
    if ($(window).width() < 1025) {
      if (!$slickGreen2) {
        $(".customer-reviews-slider").slick({
          dots: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: true,
        });
        $slickGreen2 = true;
      }
    } else if ($(window).width() > 1025) {
      if ($slickGreen2) {
        $(".customer-reviews-slider").slick("unslick");
        $slickGreen2 = false;
      }
    }
  }

  greenSlider2();

  $(window).on("resize", function () {
    greenSlider2();
  });

  $slickGreen3 = false;
  function greenSlider3() {
    if ($(window).width() < 1441) {
      if (!$slickGreen3) {
        $(".popular-publications-slider").slick({
          dots: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          infinite: true,
        });
        $slickGreen3 = true;
      }
    } else if ($(window).width() > 1441) {
      if ($slickGreen3) {
        $(".popular-publications-slider").slick("unslick");
        $slickGreen3 = false;
      }
    }
  }

  greenSlider3();

  $(window).on("resize", function () {
    greenSlider3();
  });

  if (!$(".project-slider").hasClass("slick-initialized")) {
    $(".project-slider").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      fade: true,
      arrows: false,
      asNavFor: ".project-slider-thumbnails",
    });
  }

  if (!$(".project-slider-thumbnails").hasClass("slick-initialized")) {
    $(".project-slider-thumbnails").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      focusOnSelect: true,
      asNavFor: ".project-slider",
      nextArrow: $(".project-slider-thumbnails-wrap .arrow-next"),
      prevArrow: $(".project-slider-thumbnails-wrap .arrow-prev"),
      responsive: [
        {
          breakpoint: 1441,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
          },
        },
      ],
    });
  }

  $(".slider-content").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    infinite: true,
    fade: true,
    asNavFor: ".slider-thumb",
    arrows: true,
    nextArrow: $(".project-in-slider-wrap .arrow-next"),
    prevArrow: $(".project-in-slider-wrap .arrow-prev"),
  });
  $(".slider-thumb").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-content",
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".slider-content2").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    infinite: true,
    fade: true,
    asNavFor: ".slider-thumb2",
    arrows: true,
    nextArrow: $(".project-in-slider-wrap2 .arrow-next"),
    prevArrow: $(".project-in-slider-wrap2 .arrow-prev"),
  });
  $(".slider-thumb2").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-content2",
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(".slider-content3").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    infinite: true,
    fade: true,
    asNavFor: ".slider-thumb3",
    arrows: true,
    nextArrow: $(".project-in-slider-wrap3 .arrow-next"),
    prevArrow: $(".project-in-slider-wrap3 .arrow-prev"),
  });
  $(".slider-thumb3").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: ".slider-content3",
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  $(window).scroll(function () {
    var header = $(".header"),
      scroll = $(window).scrollTop();

    if (scroll >= 1) header.addClass("fixed");
    else header.removeClass("fixed");
  });

  $(".drop-menu").click(function (e) {
    e.stopPropagation();
    $(this).toggleClass("is-active");
    $(".menu-wrap").toggleClass("open");
    $("body, html").toggleClass("overflow");
  });

  var anmitaeOnHover = true;
  var timer;

  $(".images-wrap li").each(function () {
    var current = this;

    $(current).on("mouseenter", function () {
      if ($(current).hasClass("animated")) {
        clearTimeout(timer);
        $(current).parent().prepend(current);
        $(current).removeClass("animated");
        return;
      }

      if (anmitaeOnHover) {
        anmitaeOnHover = false;
        $(current).addClass("animated");

        timer = setTimeout(function () {
          $(current).removeClass("animated");
          $(current).parent().prepend(current);
        }, 1100);
      }
    });
  });

  $(".images-wrap").on("mouseleave", function () {
    anmitaeOnHover = true;
  });

  $(".filters-btn").on("click", function () {
    $(this).toggleClass("active");
    $(".filters-wrapper").toggleClass("open");
  });

  $(".apply-filter").on("click", function () {
    var list = $(".filter .checkbox-wrap input:checked");
    if (list.length > 0) {
      $(".filters-btn .counter").addClass("active").text(list.length);
    } else {
      $(".filters-btn .counter").removeClass("active").text("");
    }
  });

  $(".remove-filter").on("click", function () {
    $(".filter .checkbox-wrap input").prop("checked", false);
    $(".filters-btn .counter").removeClass("active").text("");
  });

  AOS.init();

  $(".footer-links .links .title").smoothScroll({
    speed: 1000,
  });

  $(".resault-info-item-wrap .more").on("click", function () {
    $(this)
      .closest(".resault-info-item-wrap")
      .find(".resault-info-item")
      .removeClass("hidden");
    $(this).hide();
  });

  $slickGreen = false;
  function employeesSlider() {
    if ($(window).width() < 1024) {
      if (!$slickGreen) {
        $(".employees-logos-slider").slick({
          dots: false,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        });
        $slickGreen = true;
      }
    } else if ($(window).width() > 1025) {
      if ($slickGreen) {
        $(".employees-logos-slider").slick("unslick");
        $slickGreen = false;
      }
    }
  }
  employeesSlider();
  $(window).on("resize", function () {
    employeesSlider();
  });

  $(".tab-menu li a").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".tab-menu").find("li").removeClass("active");
    $(this).closest("li").addClass("active");
    var index = $(this).closest("li").index();
    $(".tab-content-item").removeClass("active");
    $(".tab-content-item").eq(index).addClass("active");
  });

  $(window)
    .on("resize", function (e) {
      var initLib = $(".our-team-slider").data("init-slider");

      if (window.innerWidth < 1401) {
        if (initLib != 1) {
          $(".our-team-slider")
            .slick({
              arrows: false,
              dots: false,
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true,
            })
            .data({ "init-slider": 1 });
        }
      } else {
        if (initLib == 1) {
          $(".our-team-slider").slick("unslick").data({ "init-slider": 0 });
        }
      }
    })
    .trigger("resize");

  $(".tour-3d-info .info-items .info-item").on("click", function () {
    $(".tour-3d-wrap .panorama_container").removeClass("active");
    var index = $(this).index();
    $(this)
      .closest(".tour-3d-wrap")
      .find(".panorama_container")
      .eq(index)
      .addClass("active");
    $(".tour-3d-info .info-items .info-item").removeClass("active");
    $(this).addClass("active");
  });

  AOS.init({
    disable: function () {
      var maxWidth = 800;
      return window.innerWidth < maxWidth;
    },
  });
});
