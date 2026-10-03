/*let shapeSlider = document.querySelector(".shapes--slider");
if (shapeSlider) {
  var flkty = new Flickity(shapeSlider, {
    prevNextButtons: false,
    pageDots: false,
    contain: true,
    cellAlign: "left",
  });
}*/

(function () {
    const desktopQuery = window.matchMedia('(min-width: 768px)');

    function updateStickyProductInfo() {
      const section = document.querySelector('.product_section');
      const info = document.querySelector('.product__information');

      if (!section || !info) return;

      if (!desktopQuery.matches) {
        section.style.removeProperty('--sticky-info-top');
        return;
      }

      const headerOffset = 96;
      const bottomGap = 20;
      const infoHeight = info.offsetHeight;
      const viewportHeight = window.innerHeight;

      /*
        Bottom-trigger sticky:
        A negative top lets the right column scroll naturally until its
        bottom reaches the viewport, then native sticky keeps it pinned.
        The parent section boundary releases it when the image column ends.
      */
      const stickyTop = Math.min(headerOffset, viewportHeight - infoHeight - bottomGap);
      section.style.setProperty('--sticky-info-top', `${Math.round(stickyTop)}px`);
    }

    document.addEventListener('DOMContentLoaded', updateStickyProductInfo);
    window.addEventListener('load', updateStickyProductInfo);
    window.addEventListener('resize', updateStickyProductInfo);

    document.addEventListener('DOMContentLoaded', function () {
      const info = document.querySelector('.product__information');

      if (info && 'ResizeObserver' in window) {
        new ResizeObserver(updateStickyProductInfo).observe(info);
      }
    });

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', updateStickyProductInfo);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(updateStickyProductInfo);
    }
  })();

document.addEventListener("DOMContentLoaded", function () {
  let metalSlider = document.querySelector(".swiper.metal_slider");

  if (metalSlider) {
    const slides = metalSlider.querySelectorAll(".swiper-slide");

    var swiperMetal = new Swiper(metalSlider, {
      a11y: { enabled: false },
      slidesPerView: "auto", 
      spaceBetween: 15,
      mousewheel: {
        enabled: true,
        forceToAxis: true, 
      },
      scrollbar: {
        el: metalSlider.querySelector(".swiper-scrollbar-metal"),
        draggable: true,
        hide: false, 
        snapOnRelease: true,
      },
      freeMode: {
        enabled: true,
        momentum: true,
      },
      watchOverflow: true, 
    });

    setTimeout(() => {
      swiperMetal.update();
    }, 100);
  }
});

let shapeSlider = document.querySelector(".shapes-slider");

if (shapeSlider) {
  var swiperShape = new Swiper(shapeSlider, {
    a11y: { enabled: false },
    slidesPerView: 'auto',
    spaceBetween: 15,
    mousewheel: true,

    breakpoints: {
      320: {
        direction: "horizontal",
      },
      375: {
        direction: "horizontal",
      },
      768: {
        direction: "horizontal",
      }
    },

    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    }
  });
}

var elem = document.querySelector(".mobile-tgd-slider");
var flkty = new Flickity(elem, {
  prevNextButtons: true,
  pageDots: false,
  contain: true,
  cellAlign: "left",
  watchCSS: true,
});

$(".mobile-metal-slider").flickity({
  prevNextButtons: false,
  pageDots: false,
  contain: true,
  cellAlign: "left",
  watchCSS: true,
});

function productImagesPopup(e) {
  document.querySelector("body").classList.add("images-popup-open");
  const tabs = {
    images: {
      button: document.getElementById("product-images"),
      content: document.getElementById("product-images-content"),
    },
    instagram: {
      button: document.getElementById("product-instagram"),
      content: document.getElementById("product-instagram-content"),
    },
    video: {
      button: document.getElementById("product-videos"),
      content: document.getElementById("product-videos-content"),
    },
  };

  for (const tab of Object.values(tabs)) {
    tab.button.style.display = "none";
    tab.content.style.display = "none";
    if (tab.button.nextElementSibling) {
      tab.button.nextElementSibling.style.display = "none";
    }
  }

  if (e === "images") {
    tabs.images.button.style.display = "block";
    tabs.images.content.style.display = "block";
  } else if (e === "video") {
    tabs.video.button.style.display = "block";
    tabs.video.content.style.display = "block";
    tabs.video.button.classList.add("button-active");
    tabs.video.content.classList.add("tab-active");
  } else if (e === "all") {
    tabs.images.button.classList.add("button-active");
    tabs.images.button.style.removeProperty("display");
    tabs.images.content.classList.add("tab-active");
    tabs.images.content.style.removeProperty("display");
    if (tabs.images.button.nextElementSibling) {
      tabs.images.button.nextElementSibling.style.removeProperty("display");
    }
    for (const tab of [tabs.instagram, tabs.video]) {
      tab.button.style.removeProperty("display");
      tab.content.style.removeProperty("display");
      tab.button.classList.remove("button-active");
      tab.content.classList.remove("tab-active");
      if (tab.button.nextElementSibling) {
        tab.button.nextElementSibling.style.removeProperty("display");
      }
      var isEmpty =
        document
          .getElementById("product-instagram-content")
          .querySelector(".fs-timeline").innerHTML === "";
      if (isEmpty) {
        document.getElementById("product-instagram").style.display = "none";
        document.querySelector(".instagram-slash").style.display = "none";
      }
    }
  }

  const popupWrapper = document.getElementById("product-images-popup");
  popupWrapper.style.display = "block";
  popupWrapper.style.opacity = "1";
  popupWrapper.style.visibility = "visible";
  popupWrapper.style.zIndex = "99992";
}

function productImagesClosePopup() {
  document.querySelector("body").classList.remove("images-popup-open");
  var popupWrapper = document.getElementById("product-images-popup");
  popupWrapper.style.display = "none";
  popupWrapper.style.opacity = "0";
  popupWrapper.style.visibility = "hidden";
  popupWrapper.style.zIndex = "-99999999999";
}

function openPopup(popupId) {
  const popupWrapper = document.getElementById(popupId);
  popupWrapper.style.display = "block";
  popupWrapper.style.opacity = "1";
  popupWrapper.style.visibility = "visible";
  popupWrapper.style.zIndex = "99992";
}

function mdClosePopup(popupId) {
  const popupWrapper = document.getElementById(popupId);
  popupWrapper.style.display = "none";
  popupWrapper.style.opacity = "0";
  popupWrapper.style.visibility = "hidden";
  popupWrapper.style.zIndex = "-99999999999";
}

function openPopupdis(popupId) {
  const popupWrapper = document.getElementById(popupId);
  popupWrapper.style.display = "block";
  popupWrapper.style.opacity = "1";
  popupWrapper.style.visibility = "visible";
  popupWrapper.style.zIndex = "99992";
}

function closePopupdis(popupId) {
  const popupWrapper = document.getElementById(popupId);
  popupWrapper.style.display = "none";
  popupWrapper.style.opacity = "0";
  popupWrapper.style.visibility = "hidden";
  popupWrapper.style.zIndex = "-99999999999";
}

// Usage
function disabledPopup() {
  openPopupdis("disabled-popup");
}

function disabledClosePopup() {
  closePopupdis("disabled-popup");
}

function shippingPopup() {
  openPopup("shipping-popup");
}

function shippinClosePopup() {
  mdClosePopup("shipping-popup");
}

function productHelpPopup() {
  openPopup("product-help-popup");
}

function productHelpClosePopup() {
  mdClosePopup("product-help-popup");
}

function productHintPopup() {
  openPopup("product-hint-popup");
}

function productHintClosePopup() {
  mdClosePopup("product-hint-popup");
}

function productReturnPopup() {
  openPopup("product-return-popup");
}

function productReturnClosePopup() {
  mdClosePopup("product-return-popup");
}

function productPaymentPopup() {
  openPopup("product-payment-popup");
}

function productPaymentClosePopup() {
  mdClosePopup("product-payment-popup");
}

function ringSizerPopup() {
  openPopup("ring-sizer-popup");
}

function ringSizerClosePopup() {
  mdClosePopup("ring-sizer-popup");
}

$(document).keyup(function (e) {
  if (e.key === "Escape") {
    productImagesClosePopup();
    shippinClosePopup();
    productHelpClosePopup();
    productHintClosePopup();
    ringSizerClosePopup();
  }
});

function productVideoButtons(elm) {
  const videos = {
    threeSixty: {
      element: document.getElementById("threeSixty_video"),
      button: document.querySelector(".threeSixty_video-button"),
    },
    vimeo: {
      element: document.getElementById("vimeo_video"),
      button: document.querySelector(".vimeo_video-button"),
    },
  };

  for (const video of Object.values(videos)) {
    video.element.classList.remove("video-active");
    video.button.classList.remove("video-button-active");
  }

  const selectedVideo = videos[elm];
  selectedVideo.element.classList.add("video-active");
  selectedVideo.button.classList.add("video-button-active");

  if (elm == "threeSixty") {
    var iframe = document.querySelector("#vimeo_video").querySelector("iframe");
    var player = new Vimeo.Player(iframe);
    player.pause();
  }

  if (elm == "vimeo") {
    var iframe = document.querySelector("#vimeo_video").querySelector("iframe");
    var player = new Vimeo.Player(iframe);
    player.play();
  }
}

function productImages(elm) {
  const blocksElement = {
    images: {
      element: document.getElementById("product-image--section"),
      button: document.querySelector(".product-image--button"),
    },
    video: {
      element: document.getElementById("product-video--section"),
      button: document.querySelector(".product-video--button"),
    },
  };

  if (!blocksElement.video.element) {
    const selectedVideo = blocksElement[elm];
    selectedVideo.element &&
      selectedVideo.element.classList.add("block-active");
    selectedVideo.button &&
      selectedVideo.button.classList.add("block-button-active");
    return;
  } else {
    document
      .querySelector(".product-gallery--background")
      .classList.remove("has-image-conversion");
    for (const block of Object.values(blocksElement)) {
      block.element && block.element.classList.remove("block-active");
      block.button && block.button.classList.remove("block-button-active");
    }

    const selectedVideo = blocksElement[elm];
    selectedVideo.element &&
      selectedVideo.element.classList.add("block-active");
    selectedVideo.button &&
      selectedVideo.button.classList.add("block-button-active");

    if (document.getElementById("custom-product-image--section")) {
      document.getElementById("custom-product-image--section").style.display =
        elm == "video" ? "none" : "";
    }

    // Uncomment and modify the following code to work with a carousel
    if (elm == "images") {
      document
        .querySelector(".product-gallery--background")
        .classList.add("has-image-conversion");
      // Initialize Flickity carousel
      var carousel = document.querySelector(".product-gallery__main");
      var flkty = new Flickity(carousel);

      // Resize the carousel (if necessary)
      flkty.resize();

      var iframe = document
        .querySelector("#product-vimeo_video")
        .querySelector("iframe");
      var player = new Vimeo.Player(iframe);
      player.pause();
    }

    // Uncomment and modify the following code to work with a carousel
    if (elm == "video") {
      var iframe = document
        .querySelector("#product-vimeo_video")
        .querySelector("iframe");
      var player = new Vimeo.Player(iframe);
      player.play();
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".product-tgd-wrapper");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href");
      let targetElement;

      // Determine if it's mobile or desktop
      if (window.innerWidth < 768) {
        targetElement = document.querySelector(targetId + "-mobile"); // Mobile section ID
      } else {
        targetElement = document.querySelector(targetId + "-desktop"); // Desktop section ID
      }

      if (targetElement) {
        const offset = targetElement.offsetTop;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });
});
