// Contact Popup JS
const ContactPopup = document.getElementById("ContactPopup");
const ContactPopupOverlay = document.querySelector(
  "#ContactPopup .fancybox-bg"
);
const phoneButton = document.querySelector('[data-icon="phone"]');
const closeButton = ContactPopup.querySelector(".popup__close");

phoneButton.addEventListener("click", () => {
  ContactPopup.classList.add("fancybox-is-open");
});

ContactPopupOverlay.addEventListener("click", () => {
  ContactPopup.classList.remove("fancybox-is-open");
});

closeButton.addEventListener("click", () => {
  ContactPopup.classList.remove("fancybox-is-open");
});

// Sidebar Accordion JS
$(".sidebar-block__has-menus .toggle-link").click(function () {
  const $parent = $(this).parent().parent();
  const $submenus = $(this).parent().siblings(".submenus");

  $parent.toggleClass("is-open");
  $submenus.slideToggle();
});

const $activeLink = $(".submenus a.active").parent().parent();
$activeLink
  .siblings(".sidebar-block__item-wrapper")
  .children("a")
  .trigger("click");
$activeLink
  .siblings(".sidebar-block__item-wrapper")
  .children("a")
  .toggleClass("is-active");

// Announcement Bar Slider JS
document.addEventListener("DOMContentLoaded", function () {
  
  var elem = document.querySelector(".announcement-bar__slider");

  if (!elem) return;

  var flkty = new Flickity(elem, {
    contain: true,
    draggable: true,
    wrapAround: true,
    pageDots: false,
    autoPlay: 5000,
    prevNextButtons: false,
    adaptiveHeight: true
  });

  function updateAccessibility() {
    flkty.cells.forEach(function (cell, index) {
      var isActive = index === flkty.selectedIndex;

      if (isActive) {
        cell.element.setAttribute("aria-hidden", "false");

        cell.element
          .querySelectorAll("a, button, input, select, textarea")
          .forEach(function (el) {
            el.removeAttribute("tabindex");
          });

      } else {
        cell.element.setAttribute("aria-hidden", "true");

        cell.element
          .querySelectorAll("a, button, input, select, textarea")
          .forEach(function (el) {
            el.setAttribute("tabindex", "-1");
          });
      }
    });
  }

  updateAccessibility();

  flkty.on("select", function () {
    updateAccessibility();
  });

  flkty.on("settle", function () {
    updateAccessibility();
  });
});

// Sub Footer Slider JS
$(".sub_footer-slider").flickity({
  contain: true,
  adaptiveHeight: true,
});

function subFooterSliderRender() {
  var flkty = new Flickity(".sub_footer-slider", {
    contain: true,
    adaptiveHeight: true,
  });
}

document.addEventListener("shopify:section:load", subFooterSliderRender);

$(document).ready(function () {
  $(".sub_footer-accordion-title").click(function (e) {
    e.preventDefault();
    var $accordionHeader = $(this);
    var $accordionItem = $accordionHeader.parent();
    var $accordionContent = $accordionItem.find(
      ".sub_footer-accordion-content"
    );

    if (!$accordionItem.hasClass("is-open")) {
      // Close any open accordion items
      if(!($(this).hasClass('pdp-accordion-el'))){
        $(".sub_footer-faq-item.is-open").removeClass("is-open");
        $(".sub_footer-accordion-content").slideUp();
      }

      // Open the clicked accordion item
      $accordionItem.addClass("is-open");
      $accordionContent.slideDown();
    } else {
      // Close the clicked accordion item
      $accordionItem.removeClass("is-open");
      $accordionContent.slideUp();
    }
  });
  // $(".tag_filter--slider").flickity({
  //   prevNextButtons: false,
  //   wrapAround: false,
  //   pageDots: false,
  //   initialIndex: 1,
  //   contain: true,
  //   freeScroll: true,
  //   cellAlign: "left",
  //   watchCSS: true,
  //   accessibility: true, //true by default
  //   autoPlay: false, // advance cells every 3 seconds
  // });
  $(".blog-slider").flickity({
    wrapAround: false,
    pageDots: false,
    initialIndex: 1,
    contain: false,
    freeScroll: true,
    accessibility: true, //true by default
    autoPlay: false, // advance cells every 3 seconds
  });
  var highestBox = 0;
  $(".about-img-slider img").each(function () {
    if ($(this).height() > highestBox) {
      highestBox = $(this).height();
    }
  });
  $(".about-img-slider img").height(highestBox);
  
   $(".about-img-slider").flickity({
    wrapAround: false,
    pageDots: false,
    initialIndex: 1,
    accessibility: true, //true by default
    autoPlay: false, // advance cells every 3 seconds
  });
  $(".history-tabs-buttons").flickity({
    wrapAround: true,
    pageDots: false,
    initialIndex: 1,
    accessibility: true, //true by default
    autoPlay: false, // advance cells every 3 seconds
  });
  $(".rotating-collection-block--slider").flickity({
    wrapAround: true,
    pageDots: false,
    initialIndex: 1,
    prevNextButtons: false,
    prevNextButtons: false,
    accessibility: true, //true by default
    autoPlay: 1500, // advance cells every 3 seconds
  });

if ($(window).width() >= 768) {
  var highestBox = 0;
  $(".same-height .title").each(function () {
    if ($(this).height() > highestBox) {
      highestBox = $(this).height();
    }
  });
  $(".same-height .title").height(highestBox);
  
  var highestBox = 0;
  $(".same-height").each(function () {
    if ($(this).height() > highestBox) {
      highestBox = $(this).height();
    }
  });
  $(".same-height").height(highestBox);
}
  $('.play-button').click(function(){
    $('.video-element-popup:first').show();
    $('html').addClass('slider-popup-open');
    $('.flickity-page-dots').hide();
    playAllYouTubeVideos();
  });
  $('.close-btn').click(function(){
    $('.video-element-popup').hide();
    $('html').removeClass('slider-popup-open');
    $('.flickity-page-dots').show();
    stopAllYouTubeVideos();
  });
  function stopAllYouTubeVideos() {
    var iframes = document.querySelector('.video-slideshow-section').querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
    });

    Array.prototype.forEach.call(iframes, iframe => {
      var player = new Vimeo.Player(iframe);
      player.pause();
    });
  }
  function playAllYouTubeVideos() {
    var iframes = document.querySelector('.video-slideshow-section').querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => {
      iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
    });

    Array.prototype.forEach.call(iframes, iframe => {
      var player = new Vimeo.Player(iframe);
      player.play();
    });
  }
  $(".tab-header").each(function () {
    var active,
      content,
      links = $(this).find("a");

    active = links.first().addClass("active");

    content = $(active.attr("href"));

    links.not(":first").each(function () {
      $($(this).attr("href")).hide();
    });

    $(this)
      .find("a")
      .click(function (e) {
        active.removeClass("active");

        content.hide();

        active = $(this);

        content = $($(this).attr("href"));

        active.addClass("active");
        content.addClass("active");

        content.show();

        return false;
      });
  });
});

$(document).ready(function () {
  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  $(".current-time").text(time);

  //  Initialize Swiper

const progressCircle = document.querySelector(".autoplay-progress svg");
// const progressCircle2 = document.querySelector(".autoplay-progress-new svg");
const progressContent = document.querySelector(".autoplay-progress span");
let swiper = new Swiper(".mySwiper", {
 spaceBetween:20,
 slidesPerView: 5,
 freeMode: true,
 // watchSlidesProgress: true,
 direction: "vertical",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }
  // on: {
  //   autoplayTimeLeft(s, time, progress) {
  //     progressCircle.style.setProperty("--progress", 1 - progress);
  //   }
  // }
});

let swiper3 = new Swiper(".mySwiper3");
  
let swiper2 = new Swiper(".mySwiper2", {
 spaceBetween: 10,
 slidesPerView: 1,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
 pagination: {
    el: '.swiper-pagination',
    type: 'progressbar'
 },
 thumbs: {
   swiper: swiper,
 },
 on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
    }
  }
});

swiper3.controller.control = swiper2;
swiper2.controller.control = swiper3;


  // $('.swiper-nav-div .swiper-slide').click(function (){
  //   var id= $(this).data('id')-1;
  //   $('.mySwiper3 .swiper-slide').removeClass('swiper-slide-active');
  //   $('.mySwiper3').find('.'+id).addClass('swiper-slide-active');
  //   $('.mySwiper2 .swiper-slide').removeClass('swiper-slide-active');
  //   $('.mySwiper2').find('.'+id).addClass('swiper-slide-active');
  //   $('.mySwiper .swiper-slide').removeClass('swiper-slide-active');
  //   $('.mySwiper').find('.'+id).addClass('swiper-slide-active');

  //    swiper3.slideTo(id);
  //    swiper3.update();
    
  // });
  
  // $(".counter").each(function () {
  //   var $this = $(this),
  //     countTo = $this.attr("data-countto");
  //   countDuration = parseInt($this.attr("data-duration"));
  //    console.log($this, 'this', countDuration, '==', countTo); 
  //    $({ counter: $this.text() }).animate(
  //     {
  //       counter: countTo
  //     },
  //     {
  //       duration: countDuration,
  //       easing: "linear",
  //       step: function () {
  //         $this.text(Math.floor(this.counter));
  //       },
  //       complete: function () {
  //         $this.text(this.counter);
  //       }
  //     }
  //   );
  // });
});

var mobileTgd = document.querySelector(".mobile-tgd-slider");
if (mobileTgd) {
  var flkty = new Flickity(mobileTgd, {
    prevNextButtons: true,
    pageDots: false,
    contain: true,
    cellAlign: "left",
    watchCSS: true,
  });
}

let tagFilterSlider = document.querySelector(".tag_filter--slider");

if (tagFilterSlider) {
  var swiperMetal = new Swiper(tagFilterSlider, {
    mousewheel: true,
    breakpoints: {
      320: {
        direction: "horizontal",
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        direction: "horizontal",
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 8,
        spaceBetween: 10,
      },
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      dragSize: 50,
      draggable: true
    },
  });
}

function isFAQPageSchemaPresent() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  console.log('Schema All:',scripts);
  for (const script of scripts) {
    try {
      const schemaData = JSON.parse(script.textContent.trim());
      console.log('Schema:',schemaData["@type"]);
      if (schemaData["@type"] === "FAQPage") {
        return true; // Found a valid FAQPage schema
      }
    } catch (error) {
      // Handle potential parsing errors gracefully (optional)
    }
  }
  return false; // No valid FAQPage schema found
}

// Example usage
if (isFAQPageSchemaPresent()) {
  console.log("FAQPage schema is present on the page.");
} else {
  // Function to create a Question schema object (unchanged)
function createQuestion(questionText, answerText) {
  return {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": questionText,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": answerText
    }
  };
}


  // Schema doesn't exist, create a new one
  
// Identify all FAQ sections on the page (replace with your selector)
const faqSections = document.querySelectorAll('.faq-accordion-items');
let mainEntity = [];
// Loop through each FAQ section (unchanged)
faqSections.forEach(section => {
  // Find questions and answers within the section (unchanged)
  const questions = section.querySelectorAll('.faq-accordion-items .faq-accordion-item dt button');
  const answers = section.querySelectorAll('.faq-accordion-items .faq-accordion-item .content');
  // Loop through questions and answers in the section (unchanged)
  questions.forEach((question, index) => {
    const questionSchema = createQuestion(question.textContent.trim(), answers[index].textContent.trim());
    // Add the question schema object to the mainEntity array
    mainEntity.push(questionSchema);
    //document.querySelector('script[type="application/ld+json"]').querySelector('.mainEntity').appendChild(questionSchema);
  });
  
});
  if(mainEntity.length > 0){
    const schemaScript2 = document.createElement('script');
    schemaScript2.type = 'application/ld+json';
    schemaScript2.textContent = `{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": ${JSON.stringify(mainEntity)}}`;
    document.head.appendChild(schemaScript2);
  }
}

Fancybox.bind('[data-fancybox="product-gallery"]', {
  // Your custom options for a specific gallery
  mainClass: 'product-gallery-fancybox custom-product-gallery-popup',
  on: {
    close: (fancybox) => {
      ignorePopState = true;
      console.log(ignorePopState);
    },
  },
});
