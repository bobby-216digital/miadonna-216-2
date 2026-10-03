/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function customEncodeURIComponent(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  }).replace(/%20/g, '+');
}




window.PXUTheme.jsCollection = {
  init: function($section) {

    // Add settings from schema to current object
    window.PXUTheme.jsCollection = $.extend(this, window.PXUTheme.getSectionData($section));
    
    window.PXUTheme.jsCollection.thumbnailSliders();
    window.PXUTheme.jsCollection.filterSidebar();
    
    var announcementBarHeight = $("#shopify-section-announcement-bar").height();
    var headerHeight = $("#shopify-section-header-centered").height();
    var totalHeight = announcementBarHeight + headerHeight;
    $(".filter__sidebar-container").css('top', 0);
    $(".filter__sidebar-overlay").css('top', 0);

    // $(window).scroll(function() {
    //   if ($(this).scrollTop() === 0) {
    //     var announcementBarHeight = $("#shopify-section-announcement-bar").height();
    //     var headerHeight = $("#shopify-section-header-centered").height();
    //     var totalHeight = announcementBarHeight + headerHeight;
    //     $(".filter__sidebar-container").css('top', totalHeight);
    //     $(".filter__sidebar-overlay").css('top', totalHeight);
    //   } else {
    //     var headerHeight = $("#mobile-header-sticky-wrapper").height();
    //     $(".filter__sidebar-container").css('top', 0);
    //     $(".filter__sidebar-overlay").css('top', 0);
    //   }
    // });

    // function to check if browser is IE
    var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);

    // Ensure product media libraries are present
    if (!isIE11) {
      window.Shopify.loadFeatures([
        {
          name: 'shopify-xr',
          version: '1.0',
        },
        {
          name: 'model-viewer-ui',
          version: '1.0',
        }
      ],)
    }

    if (this.enable_sorting == true) {
      $('#sort-by').parent('.custom-select').find(".sort_by").val($('#sort-by').parent('.custom-select').find(".sort_by").data('default-sort'));
      // console.log('default sort ==>', $('#sort-by').parent('.custom-select').find(".sort_by").data('default-sort'));
    }

    if (this.enable_filter == true || this.enable_sorting == true) {
      $('#tag_filter').on('change', function() {
        window.PXUTheme.jsCollection.filterURL();
      });
      $('#sort-by').on('click', function() {
        window.PXUTheme.jsCollection.filterURL();
      });
    }

    if ($('[data-option-filter]').length) {
      // Show enabled filter tags based on selected checkboxes
      $('[data-tag-filter-checkbox]:checked').each(function(){
        window.PXUTheme.jsCollection.multiTagFilter.showSelectedFilter($(this));
      })
    }

    // If breadcrumbs enabled and basic pagination is set, call breadcrumbs object
    if (this.enable_breadcrumb && this.pagination_type == 'basic_pagination') {
      window.PXUTheme.breadcrumbs.init(this.number_of_pages);
    }

    /* Collection sidebar filter */
    $('body').on('click', '[data-option-filter]', function(e) {
      e.preventDefault();

      $(this).find('input').prop('checked', true);

      window.PXUTheme.jsCollection.multiTagFilter.init($(this));
      window.PXUTheme.scrollToTop($('.collection__content'));
    });

    $('body').on('click', '[data-clear-filter]', function () {
      const $el = $(this).siblings('[data-option-filter]');
      const $productTagFilter = $('#tag_filter');

      $productTagFilter.find('option:eq(0)').prop('selected', true);
      window.PXUTheme.jsCollection.multiTagFilter.clearSelectedFilter($el);
      window.PXUTheme.scrollToTop($('.collection__content'));

    });
    
  },
  thumbnailSliders: function() {
    $(".product__thumbnail .thumbnail-slider .one-whole").each((_, slider) => {
      $(slider).removeClass('is-hidden');
    });
    
    $(".product__thumbnail .thumbnail-slider").each((_, slider) => {
      const $thumbnailSlider = $(slider);
      $thumbnailSlider.flickity({
        lazyLoad: 2,
        freeScroll: true,
        imagesLoaded: true,
        draggable: false,
        cellAlign: "left",
        wrapAround: false,
        pageDots: false,
        contain: true,
        prevNextButtons: true,
        initialIndex: 0,
      });

      // Resize flickity when the slider is settled
      $thumbnailSlider.on("settle.flickity", () =>
        $thumbnailSlider.flickity("resize")
      );
  
      $(window).on("load", () => $thumbnailSlider.flickity("resize"));
    });
  },
  filterSidebar: function() {
    let lastKnownScrollPosition = 0;
    const elem = document.querySelector(".collection__faceted-filters-wrapper");
    const rect = elem.getBoundingClientRect();
    document.addEventListener("scroll", function() {
      lastKnownScrollPosition = window.scrollY;
      if (lastKnownScrollPosition >= rect.top) {
        $('.collection__faceted-filters-wrapper').addClass('is-buttons-dropdown-overlay');
      } else {
        $('.collection__faceted-filters-wrapper').removeClass('is-buttons-dropdown-overlay');
      }
    });
    $('.filters-section--buttons-mobile-button').on('click', function(e) {
      $('.collection__content').toggleClass('is-overlay-active');
      $(this).next('.filters-section--buttons').toggleClass('is-buttons-dropdown-active');
      // $('.collection__faceted-filters-wrapper').toggleClass('is-buttons-dropdown-overlay-active');
    });
    $("body").on("click",function(event){
      if(!$(event.target).closest(".filters-section--buttons-mobile-button").length){
        $('.collection__content').removeClass('is-overlay-active');
        // $('.collection__faceted-filters-wrapper').removeClass('is-buttons-dropdown-overlay-active');
        $('.filters-section--buttons-mobile-button').next('.filters-section--buttons').removeClass('is-buttons-dropdown-active');
      }
    });
    const syncFilterSidebar = function() {
      const $sidebar = $("#filter-sidebar");
      if (!$sidebar.length) return;
      const isOpen = $sidebar.hasClass('is-sidebar-active');
      $(".filters-section--filter-button").attr('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        $sidebar.find('.filter-mobile-view-close').trigger('focus');
      } else if ($.contains($sidebar[0], document.activeElement) || document.activeElement === document.body) {
        $(".filters-section--filter-button:visible").first().trigger('focus');
      }
    };
    $(".filters-section--filter-button").on('click', function(e) {
      $('html').addClass('is-hide-scroll');
      $(".filter__sidebar-container").toggleClass('is-sidebar-active');
      syncFilterSidebar();
    });
    $(".filter__sidebar-overlay").on('click', function(e) {
      $('html').removeClass('is-hide-scroll');
      $(".filter__sidebar-container").toggleClass('is-sidebar-active');
      syncFilterSidebar();
    });
    $("#filter-sidebar").on('keydown', function(e) {
      if (!$(this).hasClass('is-sidebar-active')) return;
      if (e.key === 'Escape') {
        $(this).find('.filter-mobile-view-close').first().trigger('click');
        return;
      }
      if (e.key !== 'Tab') return;
      const $focusable = $(this).find('a[href], button, input, select, textarea, [tabindex="0"]').filter(':visible').filter(function() {
        return !this.disabled && $(this).css('visibility') !== 'hidden';
      });
      if (!$focusable.length) return;
      const first = $focusable[0];
      const last = $focusable[$focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
    // $(".mobile-setting-tabs-buttons .mobile-setting-tab-button").each((_, button) => {
    //   $(button).on('click', function(e) {
    //     var buttonID = $(button).attr('id');
    //     console.log(buttonID);
    //     $(".filter__sidebar-container .filter__list-item").each((_, item) => {
    //       $(item).removeClass('filter__list-open');
    //     });
    //     $('.filter__sidebar-container #' + buttonID + '-content').addClass('filter__list-open');
    //     $('html').addClass('is-hide-scroll');
    //     $(".filter__sidebar-container").toggleClass('is-sidebar-active');
    //   });
    // });
    $(".filter-mobile-view-close").on('click', function(e) {
      $('html').removeClass('is-hide-scroll');
      $(".filter__sidebar-container").toggleClass('is-sidebar-active');
      syncFilterSidebar();
    });
    $(".filter__sidebar-container .filter__list-label[aria-expanded]").each(function() {
      $(this).attr('aria-expanded', $(this).next().is(':visible') ? 'true' : 'false');
    });
    $(".filter__sidebar-container .filter__list-item").each((_, item) => {
      $(item).find('.filter__list-label').on('click', function(e) {
        if (this.hasAttribute('aria-expanded')) {
          $(this).attr('aria-expanded', $(this).next().is(':visible') ? 'false' : 'true');
        }
        // $(".filter__sidebar-container .filter__list-item").each((_, item) => {
        //   $(item).removeClass('filter__list-open');
        // });
        if ($(this).parent().hasClass("filter__list-open")) {
          setTimeout(() => {
            $(this).parent().toggleClass('filter__list-open');
          }, 400);
        } else {
            $(this).parent().toggleClass('filter__list-open');
        }
        $(this).next().slideToggle();
      });
    });
  },
  filterURL: function() {

    var selectedOptions = [],
        query = '',
        currentTags = '',
        siteUrl = 'https://' + $.url('hostname');

    // check if language has been translated. Length equals one when default language (eg: '/') and greater than 1 when language is translated (eg: '/fr')
    if (window.PXUTheme.routes.root_url.length > 1) {
      var url1 = $.url('1') ? '/' + $.url('1') + '/' : '';
      var url2 = $.url('2') ? $.url('2') + '/' : '';
      var url3 = $.url('3') ? $.url('3') + '/' : '';
      var path = url1 + url2 + url3;
    } else {
      var url1 = $.url('1') ? '/' + $.url('1') + '/' : '';
      var url2 = $.url('2') ? $.url('2') + '/' : '';
      var path = url1 + url2.replace('/','');
    }

    console.log(path);

    //Handle dropdowns if they exist
    if ($('#sort-by').length){
      // query = $('#sort-by').val();
      query = $('#sort-by').parent('.custom-select').find(".sort_by").val();
      // console.log(query);
    } else {
      query = url('?sort_by');
    }

    if ($('#tag_filter').length){

      if ($('#tag_filter').data('default-collection') != $('#tag_filter').val()){
        var urlTag = $('#tag_filter').val().substr($('#tag_filter').val().lastIndexOf('/') + 1);

        if (urlTag != 'all'){
          if ($.inArray( urlTag, selectedOptions ) > -1){
            //Do nothing
          } else {
            selectedOptions.unshift(urlTag);
          }
        }
      }
    }

    //Add all checkbox values to array
    $('[data-option-filter] input:checked').each(function () {
      selectedOptions.push($(this).val());
    });

    selectedOptions = $.makeArray(selectedOptions);

    //Loop through tags to create string to update page url
    $.each(selectedOptions, function(i, value){

      if (i != selectedOptions.length - 1) {
        currentTags += selectedOptions[i] + '+';
      } else {
        currentTags += selectedOptions[i];
      }

    });
    var existingParams = window.location.search.substring(1);
    query = existingParams ? existingParams + '&' : '?';

    window.PXUTheme.queryParameters.sort_by = $('#sort-by').parent('.custom-select').find(".sort_by").val();
    // console.log("query ==> ", query);
    // console.log(existingParams);
    if (existingParams.includes('sort_by=')) {
      var currentUrl = window.location.href;
      var url = new URL(currentUrl);
      url.searchParams.set("sort_by", window.PXUTheme.queryParameters.sort_by); // setting your param
      var newParams = url.search.substring(1);
      console.log(newParams);
      query = newParams;
      console.log("query ==> ", query);
    } else {
      query += 'sort_by=' + window.PXUTheme.queryParameters.sort_by;
    }

    // window.PXUTheme.queryParameters.sort_by = query;
    // query = '?' + $.param(window.PXUTheme.queryParameters);
    
    // console.log('query ==>', query);

    this.processUrl(path, currentTags, query);
  },
  processUrl: function (path, tags, query) {

    // var existingParams = window.location.search.substring(1);
    // query = existingParams ? existingParams + '&' + query : query;


      urlString = '';

    // Ensure the URL starts with '?'
    urlString = path + tags + (query.startsWith('?') ? query : '?' + query);

    // var query = query.replace(/\page=(\w+)&/, ''),
    
    // urlString = '';

    // urlString = path + tags + query;

    console.log('filterURL ==>', decodeURIComponent(urlString));

    this.updateView(decodeURIComponent(urlString));

  },
  updateView: function(filterURL) {
    $.ajax({
      type: 'GET',
      url: filterURL,
      beforeSend: function() {
        $('.collection-matrix').addClass('fadeOut animated loading-in-progress');
        $('.collection-matrix__wrapper .collection__loading-icon').fadeIn();
      },
      success: function(data) {
      },
      error: function(x, t, m) {
        console.log(x);
        console.log(t);
        console.log(m);
        location.replace(location.protocol + '//' + location.host + filterURL);

      },
      dataType: "html"
    }).then(function(data){

      const $breadcrumbContainer = $('.breadcrumb__container');
      const $collectionMatrix = $('.collection-matrix');
      const $collectionMain = $('[data-collection-main]');

      // Get and set new breadcrumb html
      const filteredBreadcrumb = $(data).find('.breadcrumb__container').html();
      $breadcrumbContainer.html(filteredBreadcrumb);

      // Remove loading animation
      $collectionMatrix.removeClass('fadeIn animated loading-in-progress');

      // Check for products
      const filteredData = $(data).find('.collection-matrix__wrapper');
      const filteredPageLinks = $(data).find('.container--pagination');
      const noProducts = $(data).find('.container--no-products-in-collection');

      if (filteredData.length) {
        // Add products to container
        $collectionMain.empty();
        $collectionMain.append(filteredData);
      } else {
        // Display no product message
        $collectionMain.empty();
        $collectionMain.append(noProducts);
      }

      $collectionMain.append(filteredPageLinks);

      window.history && window.history.pushState && window.history.pushState("", "", filterURL);

      // Initiate infinite scrolling on new products appended to collection grid
      if ($('[data-custom-pagination]').length) {
        window.PXUTheme.infiniteScroll.init();
      }

      window.PXUTheme.jsCollection.thumbnailSliders();

      $('.collection-matrix .product__thumbnail .thumbnail__loading-icon').addClass('loader__active');
      if (typeof onLoadSwatchCollectionSelected == "function") { onLoadSwatchCollectionSelected(); }
    });
  },
  multiTagFilter: {
    init: function ($el) {

      // Show filter and hide siblings
      this.showSelectedFilter($el);

      // Update url
      window.PXUTheme.jsCollection.filterURL();

      var urlIndex;
      if (window.PXUTheme.routes.root_url.length > 1) {
        urlIndex = 3
      } else {
        urlIndex = 2
      }

      // Hide filters if types or vendors is in URL (can't be combined)
      if ($.url(urlIndex) === 'types' || $.url(urlIndex) === 'vendors') {
        $('.block__tag-filter').remove();
      }

    },
    showSelectedFilter: function ($el) {
      const $sidebarToggleBlock = $el.parents('.sidebar-toggle-active');
      const $filterItem = $el.parents('.tag-filter__item');

      $filterItem.addClass('is-active');
      $filterItem.siblings(':not(.is-active)').addClass('is-hidden');
      $filterItem.find('[data-clear-filter]').removeClass('is-hidden');

      // If sidebar toggle is enabled, show filter in sidebar content
      if ($sidebarToggleBlock.length) {
        let $toggleBtn = $sidebarToggleBlock.find('[data-sidebar-block__toggle="closed"]');

        window.PXUTheme.jsSidebar.openSidebarBlock($toggleBtn);
      }

    },
    clearSelectedFilter: function ($el) {

      const $filterItem = $el.parents('.tag-filter__item');

      $filterItem.removeClass('is-active')
            .find('input').prop("checked", false);
      $filterItem.siblings()
            .removeClass('is-hidden');
      $filterItem.find('[data-clear-filter]')
            .addClass('is-hidden');

      //Update url
      window.PXUTheme.jsCollection.filterURL();
    }
  },
  unload: function($section) {
    $('#tag_filter, #sort-by').off();
    $('[data-option-filter]').off();
    $('[data-reset-filters]').off();
    $('[data-clear-filter]').off();
    window.PXUTheme.breadcrumbs.unload();
  }
}

/******/ })()
;

// Select single element
function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// Select multiple elements
function qsa(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

// Get children as array
function getChildren(element) {
    return element ? Array.from(element.children) : [];
}

// Check class
function hasClass(el, className) {
    return el.classList.contains(className);
}

// Add class
function addClass(el, className) {
    el.classList.add(className);
}

// Remove class
function removeClass(el, className) {
    el.classList.remove(className);
}

// Filter elements
function filterElements(elements, callback) {
    return elements.filter(callback);
}

// Prepend multiple elements
function prependElements(parent, elements) {
    elements.reverse().forEach(el => parent.prepend(el));
}

// Element exists check
function exists(el) {
    return el !== null && el !== undefined;
}

// ======================
// Feature Logic
// ======================

function moveActiveFiltersToTop(containerSelector, activeClass) {
    const container = qs(containerSelector);
    if (!exists(container)) return;

    const children = getChildren(container);
    if (children.length === 0) return;

    const activeItems = filterElements(children, el => hasClass(el, activeClass));
    if (activeItems.length === 0) return;

    prependElements(container, activeItems);
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
document.addEventListener("DOMContentLoaded", function () {
  if(window.innerWidth >= 1300){
    var video_elemet = document.querySelectorAll(".plp-banner-video-desktop");
  }
  else{
    var video_elemet = document.querySelectorAll(".plp-banner-video-mobile");
  }

  if(video_elemet){
    video_elemet.forEach((video) => {
      const sources = video.querySelectorAll("source");
      sources.forEach(source => {
        if (source.dataset.src) {
          source.src = source.dataset.src;
        }
      });
      video.load();
      video.play();
    });
  }

      moveActiveFiltersToTop('.collection-matrix', 'active-filter');

});