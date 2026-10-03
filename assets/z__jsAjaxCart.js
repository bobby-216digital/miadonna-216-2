/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  window.PXUTheme.jsAjaxCart = {
    init: function ($section) {
      // Add settings from schema to current object
      window.PXUTheme.jsAjaxCart = $.extend(
        this,
        window.PXUTheme.getSectionData($section)
      );

      if (isScreenSizeLarge() || this.cart_action == "drawer") {
        this.initializeAjaxCart();
      } else {
        this.initializeAjaxCartOnMobile();
      }

      if (this.cart_action == "drawer") {
        this.ajaxCartDrawer = $("[data-ajax-cart-drawer]");

        $(document).on("click", "[data-ajax-cart-trigger]", async function (e) {
          e.preventDefault();

          let cartRawResponse = await fetch('/cart.js', { });
          let cart_json = await cartRawResponse.json();
          if (Object.keys(cart_json.items)?.length > 0) {
            var dataLayerItems = [];
            cart_json.items.forEach(function(item) {
                let metal = "", stoneShape = "", sideStone = "", centerStone = "", size = "", engravingText = "";
                if (item.properties['Metal']) {
                  metal = item.properties['Metal'];
                }
                if (item.properties['Stone Shape']) {
                  stoneShape = item.properties['Stone Shape'];
                }
                if (item.properties['Side Stone']) {
                  sideStone = item.properties['Side Stone'];
                }
                if (item.properties['Stone']) {
                  centerStone = item.properties['Stone'];
                }
                if (item.properties['Size']) {
                  size = item.properties['Size'];
                }
                if (item.properties['Engraving Text']) {
                  engravingText = item.properties['Engraving Text'];
                }
                dataLayerItems.push({
                    item_id: item.product_id,
                    item_name: item.product_title,
                    price: (item.price/100),
                    item_brand: item.vendor,
                    item_category: item.product_type,
                    metal_type: metal,
                    stone_shape: stoneShape,
                    center_stone: centerStone,
                    side_stone: sideStone,
                    ring_size: size,
                    engraving: engravingText,
                    item_variant: item.variant_title,
                    item_list_name: item.variant_title,
                    item_list_id: item.variant_id,
                    quantity: item.quantity
                });
            });
            if (dataLayerItems?.length > 0) {
              dataLayer.push({
                  event: "pr_view_cart",
                  ecommerce: {
                      currency: Shopify.currency.active,
                      items: dataLayerItems
                  }
              });
            }
          }
          
          window.PXUTheme.jsAjaxCart.showDrawer();

          return false;
        });
      } else if (this.cart_action == "mini_cart") {
        this.showMiniCartOnHover();
      }

      $(document).on("click", ".ajax-submit", function (e) {
        e.preventDefault();
        const $addToCartForm = $(this).closest("form");

        // setTimeout(function () {
          window.PXUTheme.jsAjaxCart.addToCart($addToCartForm);
        // }, 500);
        
        // if (!$('.ajax-cart__product').hasClass('free-product')) {
        //   window.PXUTheme.jsAjaxCart.insertTreeToCart();
        // }
        return false;

      });

      $(document).on("click", "[data-ajax-cart-delete]", function (e) {
        e.preventDefault();
        
        const lineID = $(this).parents("[data-line-item]").data("line-item");
        window.PXUTheme.jsAjaxCart.removeFromCart(lineID);

        if (window.PXUTheme.jsCart) {
          window.PXUTheme.jsCart.removeFromCart(lineID);
        }

        return false;
      });

      $(document).on("click", "[data-ajax-cart-close]", function (e) {
        e.preventDefault();
        window.PXUTheme.jsAjaxCart.hideDrawer();
        window.PXUTheme.jsAjaxCart.hideMiniCart();

        return false;
      });

      $(document).on("keydown", "[data-ajax-cart-drawer].is-visible", function (e) {
        if (e.key === "Escape") {
          window.PXUTheme.jsAjaxCart.hideDrawer();
          return;
        }
        if (e.key !== "Tab") return;
        const $focusable = $(this).find('a[href], button, input, select, textarea, [tabindex="0"]').filter(":visible").filter(function () {
          return !this.disabled;
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
    },

    insertTreeToCart: function () {
      const productId = $('#free-product-id').attr('data-variant-id'); // Replace with the correct product variant ID
      const quantity = 1;

      // If the product is not in the cart, add it
      $.ajax({
        url: "/cart/add.js",
        dataType: "json",
        cache: false,
        type: "post",
        data: {
          id: productId,
          quantity: quantity,
        },
        success: function (product) {
          // Update the cart view
          window.PXUTheme.jsAjaxCart.updateView();
        },
        error: function (error) {
          // Handle errors here
          console.error("Error:", error);
        },
      });
    },

    removeTreeFromCart: function () {
      const productId = $('.ajax-cart__product.free-product').attr('data-line-item'); // Replace with the correct product variant ID
     
      console.log(productId)
      $.ajax({
        type: "POST",
        url: "/cart/change.js",
 
        data: "quantity=0&line=1",
        dataType: "json",
        success: function (cart) {
          $('.ajax-cart__product.free-product').remove();
          window.PXUTheme.jsAjaxCart.updateView();
        },
        error: function (XMLHttpRequest, textStatus) {
          var response = eval("(" + XMLHttpRequest.responseText + ")");
          response = response.description;
          console.error("Error removing item from cart:", response);
        
          // Add additional error handling logic as needed
        },
      });
    },
    relatedSliders: function () {
      const $thumbnailSlider = $(".theme-ajax-cart .related-products--slider");
      $thumbnailSlider.flickity({
        lazyLoad: 2,
        freeScroll: false,
        imagesLoaded: true,
        draggable: true,
        cellAlign: "left",
        wrapAround: false,
        pageDots: true,
        contain: true,
        groupCells: 2,
        prevNextButtons: false,
      });

      // Resize flickity when the slider is settled
      $thumbnailSlider.on("settle.flickity", () =>
        $thumbnailSlider.flickity("resize")
      );

      $(window).on("load", () => $thumbnailSlider.flickity("resize"));
    },
    showMiniCartOnHover: function () {
      const $el = $("[data-ajax-cart-trigger]");

      $el.hover(
        function () {
          if (
            window.PXUTheme.theme_settings.header_layout == "centered" &&
            $(".header-sticky-wrapper").hasClass("is-sticky")
          ) {
            $(".header-sticky-wrapper [data-ajax-cart-trigger]").addClass(
              "show-mini-cart"
            );
          } else {
            $el.addClass("show-mini-cart");
          }
        },
        function () {
          $el.removeClass("show-mini-cart");
        }
      );
    },
    hideMiniCart: function () {
      if (this.cart_action != "mini_cart") return false;
      const $el = $("[data-ajax-cart-close]").parents(
        "[data-ajax-cart-trigger]"
      );
      $el.removeClass("show-mini-cart");
    },
    toggleMiniCart: function () {
      const $el = $(".mobile-header [data-ajax-cart-trigger]");

      // Removes url to the cart page so user is not redirected
      $el.attr("href", "#");

      $el.off("touchstart").on("touchstart", function (e) {
        // If user clicks inside the element, do nothing
        if (e.target.closest("[data-ajax-cart-mini_cart]")) {
          return;
        }

        // Loads content into ajaxCart container for mobile header
        window.PXUTheme.jsAjaxCart.initializeAjaxCartOnMobile();

        // If user clicks outside the element, toggle the mini cart
        $el.toggleClass("show-mini-cart");
      });
    },
    showDrawer: function () {
      if (this.cart_action != "drawer") return false;
      if (!this.ajaxCartDrawer.hasClass("is-visible")) {
        this.drawerReturnFocus = document.activeElement;
      }
      $("html").addClass("show-cartdrawer");
      this.ajaxCartDrawer.addClass("is-visible");
      $(".ajax-cart__overlay").addClass("is-visible");
      $("html").css("overflow", "hidden");
      this.ajaxCartDrawer.find(".ajax-cart__close-icon").filter(":visible").first().trigger("focus");

      setTimeout(function () {
        window.PXUTheme.jsAjaxCart.relatedSliders();
      }, 300);
    },
    hideDrawer: function () {
      if (this.cart_action != "drawer") return false;
      const focusWasInDrawer = this.ajaxCartDrawer.toArray().some(function (el) {
        return $.contains(el, document.activeElement);
      });
      $("html").removeClass("show-cartdrawer");
      this.ajaxCartDrawer.removeClass("is-visible");
      $(".ajax-cart__overlay").removeClass("is-visible");
      $("html").css("overflow", "");
      if (focusWasInDrawer && this.drawerReturnFocus && document.contains(this.drawerReturnFocus)) {
        $(this.drawerReturnFocus).trigger("focus");
      }
      this.drawerReturnFocus = null;
    },
    removeFromCart: function (lineID, callback) {
      $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=0&line=" + lineID,
        dataType: "json",
        success: function (cart) {
          // if (cart.item_count == 1) {
          //   setTimeout(function () {
          //     window.PXUTheme.jsAjaxCart.removeTreeFromCart();
          //   }, 500);
          // }
          window.PXUTheme.jsAjaxCart.updateView();
        },
        error: function (XMLHttpRequest, textStatus) {
          var response = eval("(" + XMLHttpRequest.responseText + ")");
          response = response.description;
        },
      });
    },
    initializeAjaxCart: function () {
      window.PXUTheme.asyncView
        .load(
          window.PXUTheme.routes.cart_url, // template name
          "ajax" // view name (suffix)
        )
        .done(({ html, options }) => {
          $("[data-ajax-cart-content]").html(html.content);

          // Converting the currencies
          if (window.PXUTheme.currencyConverter) {
            window.PXUTheme.currencyConverter.convertCurrencies();
          }
        })
        .fail(() => {
          // some error handling
        });
    },
    initializeAjaxCartOnMobile: function () {
      this.toggleMiniCart();

      window.PXUTheme.asyncView
        .load(
          window.PXUTheme.routes.cart_url, // template name
          "ajax" // view name (suffix)
        )
        .done(({ html, options }) => {
          $(".mobile-header [data-ajax-cart-content]").html(html.content);
        })
        .fail(() => {
          // some error handling
        });
    },
    isJsonOrString: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },
    createImageOnFiles: async function(url){
      var formData = new FormData();
      formData.append("action", "create_image_in_files");
      formData.append("shop", Shopify.shop);
      formData.append("image_url", url);
      
      var requestOptions = { method: 'POST', body: formData };
      return fetch("/apps/vdb-maidonna-inventory-app/frontend.php", requestOptions)
      .then(response => response.text())
      .then(result => {
          if (window.PXUTheme.jsAjaxCart.isJsonOrString(result) == true) {
              var resultArray = JSON.parse(result);
              if (resultArray?.status == 'success' && resultArray?.data?.length > 0) {
                return resultArray?.data;
              }
          }
          return '';
      }).catch(error => console.log('error', error));
    },
    addToCart: async function ($addToCartForm) {
      const ringSizeDropdown = $addToCartForm.find('#ring_sizes');
      if(ringSizeDropdown && ringSizeDropdown.val() == ''){
        document.getElementById("ring_error").innerHTML = "Please Select Ring Size";
				ringSizeDropdown.focus();
        return false;
      }
      else{
        document.getElementById("ring_error").innerHTML = "";
      }
      
      const engraving_opt = $addToCartForm.find('[name="engraving"]:checked');
      if(engraving_opt && engraving_opt.val() == 'Yes'){
        const engraving_input = $addToCartForm.find('[name="engraving_name1"]');
        const engraving_font = $addToCartForm.find('[name="engraving_font"]');
        if(engraving_font && engraving_font.val() == ''){
          $addToCartForm.find("#font_error").html('Please Select Font Type');
          return false;
        }
        else{
          $addToCartForm.find("#font_error").html('');
        }
        if(engraving_input && engraving_input.val() == ''){
          $addToCartForm.find("#name_error1").html('Please Enter Engraving Name');
          return false;
        }
        else{
          $addToCartForm.find("#name_error1").html('');
        }
      }

      const $addToCartBtn = $addToCartForm.find(".button--add-to-cart");

      $addToCartForm.removeClass("shopify-product-form--unselected-error");

      const addToCartBtnText = $addToCartBtn.html();

      if ($addToCartBtn[0].hasAttribute("data-options-unselected")) {
        const cartWarning = `<p class="cart-warning__message animated bounceIn">${window.PXUTheme.translation.select_variant}</p>`;

        $(".warning").remove();

        $addToCartForm
          .addClass("shopify-product-form--unselected-error")
          .find(".cart-warning")
          .html(cartWarning);

        $addToCartBtn.removeAttr("disabled").removeClass("disabled");

        $addToCartBtn.find(".icon").removeClass("zoomOut").addClass("zoomIn");

        $addToCartBtn
          //.find("span:not(.icon)")
          .text(addToCartBtnText)
          .text($addToCartBtn.data("label"))
          .removeClass("zoomOut")
          .addClass("zoomIn");
      } else {
        $addToCartBtn.attr("disabled", "disabled").addClass("disabled");
        $addToCartBtn.text('Processing...');
        let _main_product = "";
        if(document.getElementById('custom-product-image--section')){
          if(document.getElementById('custom-product-image--section').querySelector('.product-gallery__image.first-image a')){
						_main_product = document.getElementById('custom-product-image--section').querySelector('.product-gallery__image.first-image a').getAttribute('href');
					}
					else{
						_main_product = document.getElementById('custom-product-image--section').querySelector('.product-gallery__image.first-image').getAttribute('href');
					}
        }
				if (_main_product.includes('no-image.png')) {
          var shopify_cdn_image =  "";
				}else{
          var shopify_cdn_image = await window.PXUTheme.jsAjaxCart.createImageOnFiles(_main_product) || "";
				}
        if(shopify_cdn_image != ''){
          const main_product_property = document.getElementById('main_product_property');
          if(main_product_property){
            main_product_property.value = shopify_cdn_image;
          }
        }

        $.ajax({
          url: "/cart/add.js",
          dataType: "json",
          cache: false,
          type: "post",
          data: $addToCartForm.serialize(),
          beforeSend: function () {
            //$addToCartBtn.attr("disabled", "disabled").addClass("disabled");

            $addToCartBtn
              .find("span")
              .removeClass("fadeInDown")
              .addClass("animated zoomOut");
          },
          success: function (product) {
            const newGroupId = Array.from(Array(30), () => Math.floor(Math.random() * 36).toString(36)).join("");
            if(document.getElementById('main__groupId')){
              document.getElementById('main__groupId').value = newGroupId;
            }
            if(document.getElementById('engraving_groupid_property')){
              document.getElementById('engraving_groupid_property').value = newGroupId;
            }
            let $el = $("[data-ajax-cart-trigger]");

            $addToCartBtn.removeAttr("disabled").removeClass("disabled");
            $addToCartBtn.find(".checkmark").addClass("checkmark-active");

            $addToCartBtn.html(addToCartBtnText);

            /*function addedToCart() {
              if (!isScreenSizeLarge()) {
                $el = $(".mobile-header [data-ajax-cart-trigger]");
                window.PXUTheme.scrollToTop($el);
              } else {
                $el = $("[data-ajax-cart-trigger]");
              }

              $el.addClass("show-mini-cart");

              $addToCartBtn.find("span").removeClass("fadeInDown");
            }

            window.setTimeout(function () {
              $addToCartBtn.removeAttr("disabled").removeClass("disabled");

              $addToCartBtn.find(".checkmark").removeClass("checkmark-active");

              $addToCartBtn
                .find(".text, .icon")
                .removeClass("zoomOut")
                .addClass("fadeInDown");

              $addToCartBtn.on(
                "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                addedToCart
              );
            }, 1000);

            window.PXUTheme.jsAjaxCart.showDrawer();
            window.PXUTheme.jsAjaxCart.updateView();*/

            open_group_cart_drawer();

            if (window.PXUTheme.jsCart) {
              $.ajax({
                dataType: "json",
                async: false,
                cache: false,
                dataType: "html",
                url: "/cart",
                success: function (html) {
                  const cartForm = $(html).find(".cart__form");
                  $(".cart__form").replaceWith(cartForm);
                },
              });
            }
          },
          error: function (XMLHttpRequest) {
            let response = eval("(" + XMLHttpRequest.responseText + ")");
            response = response.description;

            const cartWarning = `<p class="cart-warning__message animated bounceIn">${response.replace(
              "All 1 ",
              "All "
            )}</p>`;

            $(".warning").remove();

            $addToCartForm.find(".cart-warning").html(cartWarning);

            $addToCartBtn.removeAttr("disabled").removeClass("disabled");
            $addToCartBtn.html(addToCartBtnText);

            $addToCartBtn
              .find(".icon")
              .removeClass("zoomOut")
              .addClass("zoomIn");

            $addToCartBtn
              .find("span:not(.icon)")
              //.text($addToCartBtn.data("label"))
              .removeClass("zoomOut")
              .addClass("zoomIn");
          },
        });
      }
    },
    updateView: function () {
      window.PXUTheme.asyncView
        .load(
          window.PXUTheme.routes.cart_url, // template name
          "ajax" // view name (suffix)
        )
        .done(({ html, options }) => {
       
          if (options.item_count > 0) {
            const itemList = $(html.content).find(".ajax-cart__list");
            const cartDetails = $(html.content).find(
              ".ajax-cart__details-wrapper"
            );

            $(".ajax-cart__list").replaceWith(itemList);
            $(".ajax-cart__details-wrapper").replaceWith(cartDetails);
            $(".ajax-cart__empty-cart-message").addClass("is-hidden");
            $(".ajax-cart__form").removeClass("is-hidden");
            $("[data-ajax-cart-trigger]").addClass("has-cart-count");
            $('[data-bind="itemCount"]').text(options.item_count);

            $("html").css("overflow", "hidden");
            window.PXUTheme.jsAjaxCart.relatedSliders();
          } else {
            $(".ajax-cart__empty-cart-message").removeClass("is-hidden");
            $(".ajax-cart__form").addClass("is-hidden");
            $("[data-ajax-cart-trigger]").removeClass("has-cart-count");
            $('[data-bind="itemCount"]').text("0");
          }

          if (window.PXUTheme.currencyConverter) {
            window.PXUTheme.currencyConverter.convertCurrencies();
          }
        })
      
        .fail(() => {
          // some error handling
        });
    },
//      LoyaltyPoint: async function (price) {

//   try {

    
//       async function updatePDPPoints() {
//         try {
//           if (!window.MageSDK) return;

//           let earningRate = 0.05; // Fallback
//           let earningRulesData = null;

//           if (typeof window.MageSDK.getEarningRules === 'function') {
//             earningRulesData = await window.MageSDK.getEarningRules();
//           } else if (typeof window.MageSDK.getShopEarningRules === 'function') {
//             earningRulesData = await window.MageSDK.getShopEarningRules();
//           } else if (typeof window.MageSDK.getShopConfig === 'function') {
//             const config = await window.MageSDK.getShopConfig();
//             earningRulesData = config?.earningRules || config?.data?.earningRules;
//           }

//           // Convert to Array safely
//           let rulesList = [];
//           if (Array.isArray(earningRulesData)) {
//             rulesList = earningRulesData;
//           } else if (Array.isArray(earningRulesData?.data)) {
//             rulesList = earningRulesData.data;
//           } else if (typeof earningRulesData === 'object' && earningRulesData !== null) {
//             rulesList = Object.values(earningRulesData.data || earningRulesData);
//           }

//           // Filter active purchase rule
//           const activeRules = rulesList.filter(function(r) { 
//             return r && typeof r === 'object' && r.isActive === true; 
//           });

//           const purchaseRule = activeRules.find(function (r) {
//             return r.action === 'purchase' || r.category === 'purchase';
//           }) || activeRules[0] || rulesList[0];

//           if (purchaseRule) {
//             // Store-credit mode: pointsToGive is in cents (100 = $1.00 per perSpend)
//             const points = Number(purchaseRule.basePoints || purchaseRule.points || purchaseRule.pointsToGive || 100);
//             const spend = Number(purchaseRule.perSpend || purchaseRule.amount || 20);

//             if (spend > 0) {
//               earningRate = points / spend / 100;
//             }
//           }

//           // Calculate total store credit (dollars)
//           const diamondPrice = Number(price);
//           const totalPoints = Math.floor(diamondPrice * earningRate * 100) / 100;
//           const formattedPoints = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPoints);

//           // 3. Update Mage Loyalty App Block dynamically
//           var mageCalcContainer = document.getElementById('mage-product-points-page-calculator');
          
//           if (mageCalcContainer) {
//             // Update item price on container
//             mageCalcContainer.setAttribute('data-product-price', diamondPrice);

//             // Read customer login state
//             var isLoggedIn = mageCalcContainer.getAttribute('data-customer-logged-in') === 'true';

//             // Get dynamic template attribute from container
//             var templateAttr = isLoggedIn 
//               ? mageCalcContainer.getAttribute('data-custom-message') 
//               : mageCalcContainer.getAttribute('data-logged-out-message');

//             // Fallback if template is missing
//             if (!templateAttr) {
//               templateAttr = isLoggedIn 
//                 ? "Earn {store_credit} in store credit with this purchase!" 
//                 : "Log in or Sign up to earn {store_credit} in store credit";
//             }

//             // Replace {store_credit} / {points} placeholder dynamically
//             var finalMessage = templateAttr
//               .replace('{store_credit}', `<strong>${formattedPoints}</strong>`)
//               .replace('{points}', `<strong>${formattedPoints}</strong>`);
//             // Update visible message span
//             setTimeout(() => {
//             var messageEl = mageCalcContainer.querySelector('.mage-product-points-calculator__message');
//             if(mageCalcContainer){
//             if (messageEl) {
//               messageEl.innerHTML = finalMessage;
//             }else{
//               mageCalcContainer.innerHTML = `<a href="/pages/miadonna-rewards" target="_blank" rel="noopener noreferrer" class="mage-product-points-calculator mage-product-points-calculator--badge mage-block mage-product-points-calculator--clickable" style="text-decoration: none; color: inherit;"><div class="mage-product-points-calculator__badge"><span class="mage-product-points-calculator__message mage-product-points-calculator__message--badge">${finalMessage}</span></div></a>`;
//             }
//             }  
//             }, 1000);
            
//           }

//           // Generic element fallback
//           var genericDisplay = document.querySelector('.mage-loyalty-points-value, #mage-points-display, [data-mage-points]');
//           if (genericDisplay) {
//             genericDisplay.textContent = formattedPoints;
//           }

//         } catch (err) {
//           console.error('Error updating dynamic MageLoyalty message:', err);
//         }
//       }


//       if (window.MageSDK) {
//         await updatePDPPoints();
//       } else {
//         document.addEventListener('mage-sdk-loaded', updatePDPPoints);
//       }
    
//   } catch (error) {

//     console.error(
//       'Error updating Mage Loyalty Points:',
//       error
//     );

//     return false;
//   }
// },
LoyaltyPoint: async function (price,variantId = '46562823799887') {
  try {
    if(variantId.length <=0){
      variantId = '46562823799887';
    }
    async function updatePDPPoints() {
      try {
        if (!window.MageSDK) return;

          var mageCalcContainer = document.getElementById(
          'mage-product-points-page-calculator'
        );

       var productId = '';

if (mageCalcContainer) {
  productId = mageCalcContainer.getAttribute('data-product-id') || '';
}

        // Get PDP price
        const diamondPrice = Number(price);

        if (!diamondPrice || diamondPrice <= 0) {
          console.warn('Invalid product price:', price);
          return;
        }

        // API payload
        const payload = {
          buyerCountryCode: "US",
          cartLines: [
            {
              variantId: variantId,
              productId: productId,
              totalAmount: diamondPrice,
              quantity: 1,
              hasDiscounts: false
            }
          ],
          hasCartDiscountCode: false,
          presentmentCurrencyCode: "USD"
        };

        // Calculate cart points
        const response = await fetch(
          "/apps/storefront/calculate-cart-points",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );

        // Only process successful HTTP 200 response
        if (response.status !== 200) {
          // console.error(
          //   'Calculate cart points API failed:',
          //   response.status
          // );
          return;
        }

        const result = await response.json();

        // console.log('Calculate cart points response:', result);

        // Check successful API response
        if (!result.success || !result.data) {
          console.error('Invalid calculate cart points response:', result);
          return;
        }

        // Use API response directly
        const formattedPoints = result.data.formatted;

        // console.log('Formatted Points:', formattedPoints);

        // Mage Loyalty App Block
      

        if (mageCalcContainer) {

          // Update product price
          mageCalcContainer.setAttribute(
            'data-product-price',
            diamondPrice
          );

          // Read customer login state
          var isLoggedIn =
            mageCalcContainer.getAttribute('data-customer-logged-in') === 'true';

          // Get dynamic message template
          var templateAttr = isLoggedIn
            ? mageCalcContainer.getAttribute('data-custom-message')
            : mageCalcContainer.getAttribute('data-logged-out-message');

          // Fallback message
          if (!templateAttr) {
            templateAttr = isLoggedIn
              ? "Earn {store_credit} in store credit with this purchase!"
              : "Log in or Sign up to earn {store_credit} in store credit";
          }

          // Replace API value in message
          var finalMessage = templateAttr
            .replace(
              '{store_credit}',
              `<strong>${formattedPoints}</strong>`
            )
            .replace(
              '{points}',
              `<strong>${formattedPoints}</strong>`
            );

          // Update visible message
          setTimeout(() => {

            var messageEl = mageCalcContainer.querySelector(
              '.mage-product-points-calculator__message'
            );

            if (messageEl) {

              messageEl.innerHTML = finalMessage;

            } else {
              return false; // set this to solve the duplicate store credit message
              mageCalcContainer.innerHTML = `
                <a
                  href="/pages/miadonna-rewards"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mage-product-points-calculator mage-product-points-calculator--badge mage-block mage-product-points-calculator--clickable"
                  style="text-decoration: none; color: inherit;"
                >
                  <div class="mage-product-points-calculator__badge">
                    <span class="mage-product-points-calculator__message mage-product-points-calculator__message--badge">
                      ${finalMessage}
                    </span>
                  </div>
                </a>
              `;

            }

          }, 1000);
        }

        // Generic points display fallback
        var genericDisplay = document.querySelector(
          '.mage-loyalty-points-value, #mage-points-display, [data-mage-points]'
        );

        if (genericDisplay) {
          genericDisplay.textContent = formattedPoints;
        }

      } catch (err) {
        console.error(
          'Error updating dynamic Mage Loyalty message:',
          err
        );
      }
    }

    // Mage SDK already loaded
    if (window.MageSDK) {
      await updatePDPPoints();
    } else {

      // Wait for Mage SDK to load
      document.addEventListener(
        'mage-sdk-loaded',
        updatePDPPoints,
        { once: true }
      );

    }

  } catch (error) {

    console.error(
      'Error updating Mage Loyalty Points:',
      error
    );

    return false;
  }
},
    unload: function ($section) {
      // Clear event listeners in theme editor
      $(".ajax-submit").off();
      $("[data-ajax-cart-delete]").off();
    },
  };

  /******/
})();
