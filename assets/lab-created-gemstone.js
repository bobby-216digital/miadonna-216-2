const moneyFormat = document.currentScript.getAttribute('money-format') || "${{amount}}";
const cartCurrencyIsoCode = document.currentScript.getAttribute('cart-currency-iso-code') || "";

var swiperShape = new Swiper(".vdb-gm-slider-shape", {
    slidesPerView: 6,
    spaceBetween: 10,
    mousewheel: true,
    breakpoints: {
        320: {
            direction: "horizontal",
            slidesPerView: 4,
        },
        768: {
            direction: "horizontal",
            slidesPerView: 6,
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 15,
        },
    },
    scrollbar: {
        el: '.swiper-scrollbar-shape',
        dragSize: 50,
        draggable: true
    },
});

var swiperColor = new Swiper(".vdb-gm-slider-color", {
    slidesPerView: 3,
    spaceBetween: 30,
    mousewheel: true,
    breakpoints: {
        320: {
            direction: "horizontal",
            slidesPerView: 3,
        },
        768: {
            direction: "horizontal",
            slidesPerView: 5,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
    },
    scrollbar: {
        el: '.swiper-scrollbar-color',
        dragSize: 50,
        draggable: true
    },
});



setTimeout(function () {
    // Determine which instances to process (wrap a single instance in an array if needed)
    const instancesToProcess = Array.isArray(swiperColor) ? swiperColor : [swiperColor];

    instancesToProcess.forEach(swiperInstance => {
        // Find the specific element within the current instance's container
        const activeStateElement = swiperInstance.el.querySelector('.swiper-slide.active-state');

        if (activeStateElement) {
            // Use jQuery's .index() method to get the relative index
            const originalIndex = $(activeStateElement).index();
            
            // CRITICAL FIX: Check if originalIndex is a valid number, 
            // not just if it's "truthy" (as index 0 is falsy)
            if (typeof originalIndex === 'number' && originalIndex > -1) {
                console.log(`Found active element with index: ${originalIndex}. Sliding Swiper instance.`);
                
                // Use the Swiper API to move the slide
                swiperInstance.slideTo(originalIndex); 
            } else {
                 console.log("Found active element, but jQuery returned an invalid index.");
            }
        } else {
            console.log("No element with '.swiper-slide.active-state' found for this instance.");
        }
    });
}, 100);
const $slider_carat = document.getElementById('slider_carat_mia');
const $slider_price = document.getElementById('slider_price_mia');

$slider_carat && $slider_carat.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_price && $slider_price.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);

/* Mobile View */
const $slider_carat_mobile = document.getElementById('slider_carat_mia_mobile');
const $slider_price_mobile = document.getElementById('slider_price_mia_mobile');

$slider_carat_mobile && $slider_carat_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_price_mobile && $slider_price_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
/* END */

$slider_price.formatTooltipValue = (value) => Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 });
$slider_price_mobile.formatTooltipValue = (value) => Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 });

let ajaxCallDiamondListRunning = 'No', myCustomController = null, isQueryParams = 'No', totalResultIndex = 0;
window.GEMSTONE_DIAMOND = function () {
    return {
        config: {},
        callMinAndMaxDiamondList: async function () {
            /*var formData = new FormData();
            formData.append("action", "fetch_min_max_gemstone_products");
            formData.append("shop", Shopify.shop);
            var requestOptions = { method: 'POST', body: formData };

            window.GEMSTONE_DIAMOND.showElements('.vdb-load-more-div');
            fetch("/apps/vdb-maidonna-inventory-app/frontend.php", requestOptions)
            .then(response => response.text())
            .then(async result => {
                var resultArray = JSON.parse(result);
                if (resultArray?.status == 'success' && Object.keys(resultArray?.data)?.length > 0) {
                    if (window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle')===undefined) {
                        if (resultArray?.data?.carat_min?.length > 0) {
                            defaultCaratMin = '1'; //resultArray?.data?.carat_min;
                            $slider_carat.min = resultArray?.data?.carat_min;
                            $slider_carat_mobile.min = resultArray?.data?.carat_min;
                        }

                        if (resultArray?.data?.carat_max?.length > 0) {
                            defaultCaratMax = resultArray?.data?.carat_max;
                            $slider_carat.max = resultArray?.data?.carat_max;
                            $slider_carat_mobile.max = resultArray?.data?.carat_max;
                        }

                        if (window.GEMSTONE_DIAMOND.getUrlParameter('min_carat') !== undefined && window.GEMSTONE_DIAMOND.getUrlParameter('max_carat') !== undefined) {
                            $slider_carat.value1 = parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('min_carat')).toFixed(2);
                            $slider_carat.value2 = parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('max_carat')).toFixed(2);

                            $slider_carat_mobile.value1 = parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('min_carat')).toFixed(2);
                            $slider_carat_mobile.value2 = parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('max_carat')).toFixed(2);
                        }
                        
                        if (window.GEMSTONE_DIAMOND.getUrlParameter('min_carat') === undefined) {
                            $slider_carat.setAttribute('value1', '1');
                        }
                    }

                    if (resultArray?.data?.price_min?.length > 0) {
                        defaultPriceMin = resultArray?.data?.price_min;
                        $slider_price.min = resultArray?.data?.price_min;
                        $slider_price_mobile.min = resultArray?.data?.price_min;
                    }

                    if (resultArray?.data?.price_max?.length > 0) {
                        defaultPriceMax = resultArray?.data?.price_max;
                        $slider_price.max = resultArray?.data?.price_max;
                        $slider_price_mobile.max = resultArray?.data?.price_max;
                    }

                    if (window.GEMSTONE_DIAMOND.getUrlParameter('min_price') !== undefined && window.GEMSTONE_DIAMOND.getUrlParameter('min_price') !== undefined) {
                        $slider_price.value1 = parseInt(window.GEMSTONE_DIAMOND.getUrlParameter('min_price'));
                        $slider_price.value2 = parseInt(window.GEMSTONE_DIAMOND.getUrlParameter('max_price'));

                        $slider_price_mobile.value1 = parseInt(window.GEMSTONE_DIAMOND.getUrlParameter('min_price'));
                        $slider_price_mobile.value2 = parseInt(window.GEMSTONE_DIAMOND.getUrlParameter('max_price'));
                    }
                }
                await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
            })
            .catch(error => console.log('error', error));*/
            await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
        },
        callBeforeGMDiamond: async function () {
            if (myCustomController !== null) {
                myCustomController.abort();
            }
            totalResultIndex = 0;
            window.GEMSTONE_DIAMOND.config.page_number = 1;
            ajaxCallDiamondListRunning = 'No';
            document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
            document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '';
            document.querySelector("#table-id tbody").innerHTML = "";
            window.GEMSTONE_DIAMOND.hideElements('.vdb-container--pagination'); // window.GEMSTONE_DIAMOND.hideElements('.vdb-see-more-div');
            await window.GEMSTONE_DIAMOND?.callDiamondList();
        },
        callDiamondList: async function () {
            if (ajaxCallDiamondListRunning == 'No') {
                ajaxCallDiamondListRunning = 'Yes';
                /*const slider_carat = document.getElementById('slider_carat_mia');
                const slider_price = document.getElementById('slider_price_mia');*/

                sliderCaratValue1 = '';
                sliderCaratValue2 = '';
                if (defaultCaratMin?.length > 0 && defaultCaratMax?.length > 0) {
                    /*if (isQueryParams == 'Yes') {
                        window.GEMSTONE_DIAMOND.getUrlParameter('min_carat') !== undefined && (sliderCaratValue1 = parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('min_carat')).toFixed(2));
                        window.GEMSTONE_DIAMOND.getUrlParameter('max_carat') !== undefined && (sliderCaratValue2 = parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('max_carat')).toFixed(2));
                    } else {
                        sliderCaratValue1 = $slider_carat?.value1;
                        sliderCaratValue2 = $slider_carat?.value2;
                    }
                    sliderCaratValue1 = window.GEMSTONE_DIAMOND.getUrlParameter('min_carat') !== undefined ? parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('min_carat')).toFixed(2) : $slider_carat?.value1;
                    sliderCaratValue2 = window.GEMSTONE_DIAMOND.getUrlParameter('max_carat') !== undefined ? parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('max_carat')).toFixed(2) : $slider_carat?.value2;
                    */
                    sliderCaratValue1 =  $slider_carat?.value1;
                    sliderCaratValue2 =  $slider_carat?.value2;
                }
                const page_number = window.GEMSTONE_DIAMOND?.config.page_number;

                myCustomController = new AbortController();
                const myCustomSignal = myCustomController.signal;

                let selected_color = window.GEMSTONE_DIAMOND.config.colorValues;
                selected_color = selected_color.toLowerCase();
                selected_color = selected_color.replaceAll(' ', '-');
                selected_color = selected_color.replaceAll('+', '-');
                if(document.querySelector('.comoon-color-opt.active-state')){
                    document.querySelector('.comoon-color-opt.active-state').classList.remove('active-state');
                }
                if(document.querySelector('#color-opt-'+selected_color)){
                    document.querySelector('#color-opt-'+selected_color).classList.add('active-state');
                }
                if(document.querySelector('.comoon-color-opt-mob.active-state')){
                    document.querySelector('.comoon-color-opt-mob.active-state').classList.remove('active-state');
                }
                if(document.querySelector('#color-opt-mob-'+selected_color)){
                    document.querySelector('#color-opt-mob-'+selected_color).classList.add('active-state');
                }

                let form_color_value = window.GEMSTONE_DIAMOND.config.colorValues;
                form_color_value = form_color_value.replaceAll('+', ' ');

                var formData = new FormData();
                formData.append("action", "fetch_gemstone_products");
                formData.append("shop", Shopify.shop);
                formData.append("page_number", page_number);
                formData.append("shape", window.GEMSTONE_DIAMOND.config.shapeValue);
                formData.append("color", form_color_value);
                formData.append("color_data", colorData);

                formData.append("min_price", $slider_price ? $slider_price?.value1 : '');
                formData.append("max_price", $slider_price ? $slider_price?.value2 : '');
                formData.append("min_carat", sliderCaratValue1);
                formData.append("max_carat", sliderCaratValue2);
                formData.append("sorting_field", window.GEMSTONE_DIAMOND.config.sortingField);
                formData.append("sorting_seq", window.GEMSTONE_DIAMOND.config.sortingSeq);

                const jsonData = window.GEMSTONE_DIAMOND.formDataToJson(formData, ['action', 'shop', 'sorting_field', 'sorting_seq', 'color_data']); // , 'page_number'
                if (Object.keys(jsonData)?.length > 0) {
                    const url = new URL(window.location);
                    Object.keys(jsonData).forEach(key => jsonData[key]?.length > 0 && url.searchParams.set(key, jsonData[key]));
                    history.replaceState(null, '', url);

                    // Object.entries(jsonData).map(([key, value]) => window.GEMSTONE_DIAMOND.updateQueryStringParam(key, value));
                   /* 
                    const jsonString = window.GEMSTONE_DIAMOND.objectToQueryParams(jsonData);
                    top.window.history.pushState({}, '', `?${jsonString}`); // push search params on current URL
                   */
                }

                var requestOptions = { signal: myCustomSignal, method: 'POST', body: formData };

                window.GEMSTONE_DIAMOND.showElements('.vdb-load-more-div');
                fetch("/apps/vdb-maidonna-inventory-app/frontend.php", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        isQueryParams = 'No';
                        window.GEMSTONE_DIAMOND.hideElements('.vdb-load-more-div');
                        document.getElementById('vdb-lb-filter-container').style.display = document.querySelector('.vdb-set_tab_view.active').dataset.view == 'grid' ? '' : 'none';
                        if (window.GEMSTONE_DIAMOND.isJsonOrString(result) == true) {
                            var resultArray = JSON.parse(result);
                            if (resultArray?.status == 'success' && resultArray?.data?.length > 0) {
                                ajaxCallDiamondListRunning = 'No';
                                // window.GEMSTONE_DIAMOND.config.page_number = (parseInt(page_number) + 1);
                                document.getElementById('search_diamond_count').innerHTML = `${resultArray?.total_count} RESULTS`;

                                let removeRingSearchParams = window.location.search;
                                for (x = 0; x < (resultArray?.data?.length); x++) {
                                    const diamondsArray = resultArray?.data[x];
                                    let videoURL = diamondsArray?.video_url?.length > 0 ? diamondsArray?.video_url : '';
                                    let svgURL = diamondsArray?.shape?.length > 0 ? `/apps/vdb-maidonna-inventory-app/public/icons/icon-shape-${window.GEMSTONE_DIAMOND.handleize(diamondsArray?.shape)}-cut.svg` : '/apps/vdb-maidonna-inventory-app/images/no-image.png';
                                    if(window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined){
                                      staticHandle = window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle');
                                    } else {
                                      staticHandle = diamondsArray?.shopify_handle;
                                    }

                                    let productURL = '';
                                    if (window.GEMSTONE_DIAMOND.getUrlParameter('stone-handle')!==undefined) {
                                        const removeStoneParam = window.GEMSTONE_DIAMOND.removeURLParameter(window.location.search, 'stone-handle');
                                        productURL = `stone-handle=${diamondsArray?.shopify_handle}&${removeStoneParam.replace('?','')}`;
                                    } else {
                                        ['page','gem_color','min_price','max_price'].forEach(function (item) {
                                            removeRingSearchParams = window.GEMSTONE_DIAMOND.removeURLParameter(removeRingSearchParams, item);
                                        });
                                        productURL = `stone-handle=${diamondsArray?.shopify_handle}&${removeRingSearchParams.replace('?','')}`;
                                    }

                                    if(window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined){
                                        if (window.GEMSTONE_DIAMOND.getUrlParameter('metal-filter') == undefined) {
                                            productURL += `&metal-filter=close`;    
                                        }
                                    } else {
                                        productURL = `stone-handle=${diamondsArray?.shopify_handle}`;
                                    }

                                    let mainImageURL = diamondsArray?.image_url?.length > 0 ? diamondsArray?.image_url : `/apps/vdb-maidonna-inventory-app/public/no-images/${window.GEMSTONE_DIAMOND.handleize(diamondsArray?.shape)}-loose.jpg`;
                                    let mainErrorSrc = `this.src='/apps/vdb-maidonna-inventory-app/public/no-images/${window.GEMSTONE_DIAMOND.handleize(diamondsArray?.shape)}-loose.jpg'`; // let errorSrc = "this.src='/apps/vdb-maidonna-inventory-app/images/no-image.png'";
                                    let imageURL = (document.querySelector('.vdb-set_tab_view.active').dataset.view == 'grid') ? mainImageURL : '';
                                    let errorSrc =  (document.querySelector('.vdb-set_tab_view.active').dataset.view == 'grid') ? mainErrorSrc : '';
                                  
                                    /* var htmlGrid = `<li class="list--item one-fourth one-fourth large-down--one-third medium-down--one-half small-down--one-half column has-padding-bottom"><div class="card-wrapper"><div class="product__card"><a href="/products/${staticHandle}?${productURL}"><div class="card__inner"><div class="card__media"><img class="grid-item-filter-image" src="${imageURL}" onerror="${errorSrc}" width="100%" height="100%" data-grid-img="${mainImageURL}" data-grid-img-error="${mainErrorSrc}"></div></div><div class="card__content"><div class="card__information"><h6>${diamondsArray?.title}</h6><p>${window.GEMSTONE_DIAMOND.formatMoney(parseFloat(window.GEMSTONE_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}</p></div></div></a></div></div></li>`;
                                    if (page_number == 1 && x == (resultArray?.data?.length-1)) {
                                        htmlGrid += '<div class="grid-banner column has-padding-bottom"><img class="is-hidden-mobile-only" src="https://cdn.shopify.com/s/files/1/1164/4258/files/grid-banner.jpg?v=1686061158" width="100%" height="100%"><img class="is-hidden-desktop-only" src="https://cdn.shopify.com/s/files/1/1164/4258/files/mobile-listing-banner.jpg?v=1686139820" width="100%" height="100%"></div>';
                                    }
                                    document.getElementById('vdb-lb-search-result-wrapper').innerHTML += htmlGrid; */

                                    const dynamic_id = `pro-data-${diamondsArray.vdb_stock_id}`;
                                    var htmlList = `<tr class="vdb-lb-view-btn" id="${dynamic_id}-list" data-id="${dynamic_id}" data-video="${videoURL}" data-display="true">
                                        <td class="shape">
                                            <textarea id="product-${diamondsArray?.shopify_variant_id}" style="display:none;">${JSON.stringify(diamondsArray)}</textarea>
                                            <div class="shape-icon-container">
                                                <img src="${svgURL}" alt="" onerror="${errorSrc}">
                                            </div>
                                            <span>${diamondsArray?.shape}</span>
                                        </td>
                                        <td class="">${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'}</td>
                                        <td class="">${diamondsArray?.gem_type?.length > 0 ? diamondsArray?.gem_type : '-'}</td>
                                        <td><span>${window.GEMSTONE_DIAMOND.formatMoney(parseFloat(window.GEMSTONE_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}</span></td>
                                        <td class="view-column large-down--hide"><span class="btn-view">View <i class="icon-down-arrow"></i></span></td>
                                    </tr>
                                    <tr id="${dynamic_id}" class="vdb-card vdb-active-content">
                                        <td style="padding: 0px;" colspan="5">
                                            <section class="product__details-container" style="opacity:1;visibility:visible;">
                                                <div class="product__details-layout">
                                                    <div class="product__close-button is-hidden-desktop-only">
                                                        <span class="close-btn vdb-lb-view-btn icon-close" data-id="${dynamic_id}" data-video="" data-display="false"></span>
                                                    </div>
                                                    ${/*<div class="product__image is-hidden-mobile-only" ${videoURL?.length > 0 ? "" : 'style="background-image: url(' + mainImageURL + ');"'}>
                                                        ${videoURL?.length > 0 ? '<iframe class="'+dynamic_id+'-video-desk" src="" style="width:350px; height:350px;" frameborder="0" allow="autoplay"></iframe>' : ""}
                                                    </div>*/''}
                                                    <div class="product__image is-hidden-mobile-only product-image-frame">
                                                        <div class="product__image_inner" style="background-image: url(${mainImageURL});"></div>
                                                        ${videoURL?.length > 0 ? '<a href="javascript:;" class="play-button"><span class="icon header__icon" data-icon="search"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="30" height="30" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" ><path d="M 18.841 90 c -0.755 0 -1.513 -0.171 -2.215 -0.518 c -1.706 -0.843 -2.785 -2.58 -2.785 -4.482 V 5 c 0 -1.902 1.079 -3.64 2.785 -4.482 c 1.707 -0.842 3.742 -0.645 5.252 0.51 l 52.318 40 c 1.237 0.946 1.963 2.415 1.963 3.972 s -0.726 3.026 -1.963 3.972 l -52.318 40 C 20.989 89.651 19.918 90 18.841 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g></svg></span></a>' : ""}
                                                        ${videoURL?.length > 0 ? '<iframe class="'+dynamic_id+'-video-desk" src="" style="opacity:0;" frameborder="0" allow="autoplay"></iframe>' : ""}
                                                    </div>
                                                    <div class="product__details">
														<div class="product-info-footer only-mobile">
															<div class="footer-buttons">
																${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') === undefined ? `<div class="view-column">
																	<a href="javascript:;" class="add-to-cart vdb-add-to-cart" data-id="${diamondsArray?.shopify_variant_id}">
																		<span class="btn-view">Add to cart</span>
																	</a>
																</div>`:""}
																<div class="view-column">
																	<a href="/products/${staticHandle}?${productURL}${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined ? '': '#ring-products-section'}" class="add-to-ring">
																		<span class="btn-view">${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined ? 'select': 'Add to ring'}</span>
																	</a>
																</div>
															</div>
														</div>
                                                        <div class="product-info-header">
                                                            <div class="product__title">
                                                                <h6>${diamondsArray?.carat} Carat ${diamondsArray?.shape} Cut${diamondsArray?.color?.length > 0 ? diamondsArray?.color+' ' : ""} Lab-Created ${diamondsArray?.gem_type?.length > 0 ? diamondsArray?.gem_type : ""}</h6>
                                                            </div>
                                                            ${/*<div class="product__price">
                                                                <span>${window.GEMSTONE_DIAMOND.formatMoney(parseFloat(window.GEMSTONE_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}</span>
                                                            </div>*/''}
                                                            <div class="product__close-button large-down--hide">
                                                                <div class="view-column">
                                                                    <span class="btn-view vdb-lb-view-btn" data-id="${dynamic_id}" data-video="" data-display="false">Close <i class="icon-down-arrow"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p class="product-need-help"><a href="javascript:;" class="open-contact-us-popup">Need help? Talk to an expert.</a></p>
                                                        <section>
                                                            ${/*<div class="product__image is-hidden-desktop-only"" ${videoURL?.length > 0 ? "" : 'style="background-image: url(' + mainImageURL + ');"'}>
                                                                ${videoURL?.length > 0 ? '<iframe class="'+dynamic_id+'-video-mob" src="" frameborder="0" allow="autoplay"></iframe>' : ""}
                                                            </div>*/''}
                                                            <div class="products__specs-wrapper">
                                                                <div class="products__specs">
																<ul class="products__specs-list products-specs-list-for-desktop">
                                                                        <li>
                                                                            <span>Price:</span>
                                                                            <span style="word-break: break-all;">${window.GEMSTONE_DIAMOND.formatMoney(parseFloat(window.GEMSTONE_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}</span>
                                                                        </li>
                                                                        ${diamondsArray?.gem_type?.length > 0 ? `<li>
                                                                            <span>Color:</span>
                                                                            <span>${diamondsArray?.gem_type?.length > 0 ? diamondsArray?.gem_type : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.shopify_sku?.length > 0 ? `<li>
                                                                            <span>SKU:</span>
                                                                            <span style="word-break: break-all;">${diamondsArray?.shopify_sku?.length > 0 ? diamondsArray?.shopify_sku : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.shape?.length > 0 ? `<li>
                                                                            <span>Shape:</span>
                                                                            <span>${diamondsArray?.shape?.length > 0 ? diamondsArray?.shape : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.carat?.length > 0 ? `<li>
                                                                            <span>Carat:</span>
                                                                            <span>${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.measurements?.length > 0 ? `<li>
                                                                            <span>Measurement:</span>
                                                                            <span>${diamondsArray?.measurements?.length > 0 ? diamondsArray?.measurements+' mm' : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.lab?.length > 0 ? `<li class="vdb-cert-popup">
                                                                            <span class="${diamondsArray?.cert_url?.length > 0 ? 'vdb-lb-open-cert-popup' : ''}" data-cert-url="${diamondsArray?.cert_url}">Certificate:</span>
                                                                            <span>${diamondsArray?.lab?.length > 0 ? diamondsArray?.lab : '-'}</span>
                                                                        </li>` : ""}
																		${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') === undefined ? `<li class="products__view-more products-view-more-desktop">
																			<a href="/products/${staticHandle}?${productURL}">View more details</a>
                                                                        </li>` : ""}
                                                                    </ul>
																	<ul class="products__specs-list products-specs-list-for-mobile">
                                                                        <li>
                                                                            <span>Price:</span>
                                                                            <span style="word-break: break-all;">${window.GEMSTONE_DIAMOND.formatMoney(parseFloat(window.GEMSTONE_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}</span>
                                                                        </li>
                                                                        ${diamondsArray?.shopify_sku?.length > 0 ? `<li>
                                                                            <span>SKU:</span>
                                                                            <span style="word-break: break-all;">${diamondsArray?.shopify_sku?.length > 0 ? diamondsArray?.shopify_sku : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.carat?.length > 0 ? `<li>
                                                                            <span>Carat:</span>
                                                                            <span>${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.gem_type?.length > 0 ? `<li>
                                                                            <span>Color:</span>
                                                                            <span>${diamondsArray?.gem_type?.length > 0 ? diamondsArray?.gem_type : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.shape?.length > 0 ? `<li>
                                                                            <span>Shape:</span>
                                                                            <span>${diamondsArray?.shape?.length > 0 ? diamondsArray?.shape : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.measurements?.length > 0 ? `<li>
                                                                            <span>Measurement:</span>
                                                                            <span>${diamondsArray?.measurements?.length > 0 ? diamondsArray?.measurements+' mm' : '-'}</span>
                                                                        </li>` : ""}
                                                                        ${diamondsArray?.lab?.length > 0 ? `<li class="vdb-cert-popup">
                                                                            <span class="${diamondsArray?.cert_url?.length > 0 ? 'vdb-lb-open-cert-popup' : ''}" data-cert-url="${diamondsArray?.cert_url}">Certificate:</span>
                                                                            <span>${diamondsArray?.lab?.length > 0 ? diamondsArray?.lab : '-'}</span>
                                                                        </li>` : ""}
																		${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') === undefined ? `<li class="products__view-more products-view-more-mobile">
																			<a href="/products/${staticHandle}?${productURL}">View more details</a>
                                                                        </li>` : ""}
                                                                    </ul>
                                                                    ${/* ${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') === undefined ? `<div class="products__view-more">
                                                                        <a href="/products/${staticHandle}?${productURL}">View more details</a>
                                                                    </div>`:""}*/ ''}
                                                                </div>
                                                                ${/* <div class="products__additional-details">
                                                                    <p class="medium-down--hide">WHAT MAKES OUR LAB CREATED GEMSTONES BETTER</p>
                                                                    <p class="description medium-down--hide">MiaDonna’s selection of lab grown gemstones are the best on the market. Stunning Lab-Grown Sapphires, Rubies, Emeralds, Alexandrites, and more are identical to the highest quality earth-mined gems but 90% less the price!They are created using the most scientifically advanced processes to produce beautiful, precision-cut, gemstones in a wide variety of colors, sizes and shapes.</p>
                                                                    <p><a href="javascript:;" class="open-contact-us-popup">Need help? Talk to an expert.</a></p>
                                                                </div>*/ ''}
                                                            </div>
                                                        </section>
                                                        <div class="product-info-footer only-desk">
                                                            <div class="footer-buttons">
                                                                ${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') === undefined ? `<div class="view-column">
                                                                    <a href="javascript:;" class="add-to-cart vdb-add-to-cart" data-id="${diamondsArray?.shopify_variant_id}">
                                                                        <span class="btn-view">Add to cart</span>
                                                                    </a>
                                                                </div>`:""}
                                                                <div class="view-column">
                                                                    <a href="/products/${staticHandle}?${productURL}${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined ? '': '#ring-products-section'}" class="add-to-ring">
                                                                        <span class="btn-view">${window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined ? 'select': 'Add to ring'}</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </td>
                                    </tr>`;
                                    /* if (page_number == 1 && x == (resultArray?.data?.length-1)) {
                                        htmlList += '<tr><td colspan="5" style="padding: 0;"><div class="listing-banner"><img class="is-hidden-mobile-only" src="https://cdn.shopify.com/s/files/1/1164/4258/files/listing-banner.jpg?v=1686061157" width="100%" height="100%"><img class="is-hidden-desktop-only" src="https://cdn.shopify.com/s/files/1/1164/4258/files/mobile-listing-banner.jpg?v=1686139820" width="100%" height="100%"></div></td></tr>';
                                    } */
                                    document.querySelector("#table-id tbody").innerHTML += htmlList;

                                    totalResultIndex++;
                                }

                                /* if (totalResultIndex < parseInt(resultArray?.total_count)) {
                                    window.GEMSTONE_DIAMOND.showElements('.vdb-see-more-div');    
                                } */

                                if (resultArray?.page_count > 1 && document.getElementsByClassName('vdb-pagination-section')?.length > 0) {
                                    let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section');
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                        vdbPaginationSectionElements[i].innerHTML = window.GEMSTONE_DIAMOND.initPaginationHTML(resultArray?.current_page,resultArray?.page_count);
                                    }
                                    window.GEMSTONE_DIAMOND.initPaginationButtonEvent();
                                    window.GEMSTONE_DIAMOND.showElements('.vdb-container--pagination');
                                }

                                window.GEMSTONE_DIAMOND.initViewButton();
                                window.GEMSTONE_DIAMOND.initOpenCertPopup();
                                window.GEMSTONE_DIAMOND.initClearFilters();
                                window.GEMSTONE_DIAMOND.initAddToCartButton();
                                window.GEMSTONE_DIAMOND.openContactPopup();
                                window.GEMSTONE_DIAMOND.initShowAndHideIframe();
                            } else {
                                if (window.GEMSTONE_DIAMOND.config.page_number == 1) {
                                    document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                                    /*document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '<div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div>';
                                    document.querySelector("#table-id tbody").innerHTML = '<tr><td colspan="5" style="text-align: center;"><div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div></td></tr>';*/
                                    document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                                    document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="5" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                                } /*else if (window.GEMSTONE_DIAMOND.config.page_number > 1) {
                                    // document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                                    document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                                    document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="5" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                                }*/
                                // document.getElementById('vdb-lb-filter-container').style.display = 'none';
                            }
                        } else {
                            if (window.GEMSTONE_DIAMOND.config.page_number == 1) {
                                document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                                /*document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '<div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div>';
                                document.querySelector("#table-id tbody").innerHTML = '<tr><td colspan="5" style="text-align: center;"><div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div></td></tr>';*/
                                document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                                document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="5" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                            } /*else if (window.GEMSTONE_DIAMOND.config.page_number > 1) {
                                // document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                                document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                                document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="5" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                            }*/
                            // document.getElementById('vdb-lb-filter-container').style.display = 'none';
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        },
        initViewButton: function () {
            if (document.getElementsByClassName('vdb-lb-view-btn')?.length > 0) {
                let vdbLBViewButtonElements = document.getElementsByClassName('vdb-lb-view-btn');
                vdbLBViewButtonElements = Array.prototype.slice.call(vdbLBViewButtonElements);
                if (vdbLBViewButtonElements?.length > 0) {
                    for (let i = 0; i < vdbLBViewButtonElements.length; i++) {
                        const element = vdbLBViewButtonElements[i];
                        element.addEventListener('click', async function (e) {
                            const tdId = this.dataset.id;
                            const tdDisplay = this.dataset.display;
                            const tdVideo = this.dataset.video;

                            vdbLBViewButtonElements.forEach(i => document.querySelector('#' + i.dataset.id + '-list').classList.remove('hide'));
                            vdbLBViewButtonElements.forEach(i => document.querySelector('#' + i.dataset.id).classList.add('vdb-active-content'));
                            vdbLBViewButtonElements.forEach(i => document.querySelectorAll('.' + i.dataset.id + '-video-desk') && (document.querySelectorAll('.' + i.dataset.id + '-video-desk').forEach(e => e.src = '')));
                            vdbLBViewButtonElements.forEach(i => document.querySelectorAll('.' + i.dataset.id + '-video-mob') && (document.querySelectorAll('.' + i.dataset.id + '-video-mob').forEach(e => e.src = '')));
                            if (tdDisplay == "true") {
                                document.querySelector('#' + tdId+'-list').classList.add('hide');
                                document.querySelector('#' + tdId).classList.remove('vdb-active-content');
                                /* if (window.innerWidth <= 799) {
                                    document.querySelectorAll('.' + tdId + '-video-mob').forEach(e => e.src = tdVideo);    
                                } else { */
                                    document.querySelectorAll('.' + tdId + '-video-desk').forEach(e => e.src = tdVideo);
                                /* } */
                                }
                            window.GEMSTONE_DIAMOND.initShowAndHideIframe();
                        });
                    }
                }
            }
        },
        initOpenCertPopup: function () {
            if (document.getElementsByClassName('vdb-lb-open-cert-popup')?.length > 0) {
                let vdbLBOpenCertPopupElements = document.getElementsByClassName('vdb-lb-open-cert-popup');
                vdbLBOpenCertPopupElements = Array.prototype.slice.call(vdbLBOpenCertPopupElements);
                for (let i = 0; i < vdbLBOpenCertPopupElements.length; i++) {
                    vdbLBOpenCertPopupElements[i].addEventListener('click', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        var save_cert_data = this.dataset.certUrl;
                        window.open(save_cert_data, '_blank').focus();

                        /*var save_cert_data_arr = save_cert_data.split('.');
                        var ext = save_cert_data_arr.pop().toLowerCase();

                        var myCertFrame = document.getElementById('myCertFrame');
                        var myCertImg = document.getElementById('myCertImg');

                        myCertFrame.style.display = 'none';
                        myCertImg.style.display = 'none';
                        if (save_cert_data !== '') {
                            if (ext === 'pdf') {
                                // myCertFrame.src = 'https://docs.google.com/gview?url=' + save_cert_data + '&embedded=true';
                                myCertFrame.src = save_cert_data;
                                myCertFrame.style.display = 'block';
                                document.getElementById('certificate-popup').style.display = 'block';
                            } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
                                myCertImg.src = save_cert_data;
                                myCertImg.style.display = 'block';
                                document.getElementById('certificate-popup').style.display = 'block';
                            } else {
                                myCertFrame.src = save_cert_data;
                                myCertFrame.style.display = 'block';
                                document.getElementById('certificate-popup').style.display = 'block';
                            }
                        }
                         document.querySelector('html').classList.add('certi-overflow-hidden');*/
                    });
                }
            }
        },
        initClearFilters: function () {
            if (document.getElementsByClassName('vdb-lb-clear-all-filters')?.length > 0) {
                let vdbLBClearAllFiltersElements = document.getElementsByClassName('vdb-lb-clear-all-filters');
                vdbLBClearAllFiltersElements = Array.prototype.slice.call(vdbLBClearAllFiltersElements);
                for (let i = 0; i < vdbLBClearAllFiltersElements.length; i++) {
                    vdbLBClearAllFiltersElements[i].addEventListener('click', async function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                
                        window.GEMSTONE_DIAMOND.hideElements('.vdb-container--pagination'); // window.GEMSTONE_DIAMOND.hideElements('.vdb-see-more-div');
                
                        let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
                        vdbListItemAShapeStyleElements.forEach(i => i.dataset.shapeValue == defaultShape ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                
                        let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
                        vdbListItemAColorStyleElements.forEach(i => i.dataset.colorValue == defaultColor ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                
                        $slider_carat && ($slider_carat.value1 = defaultCaratMin);
                        $slider_carat && ($slider_carat.value2 = defaultCaratMax);
                
                        $slider_carat_mobile && ($slider_carat_mobile.value1 = defaultCaratMin);
                        $slider_carat_mobile && ($slider_carat_mobile.value2 = defaultCaratMax);
                
                        $slider_price && ($slider_price.value1 = defaultPriceMin);
                        $slider_price && ($slider_price.value2 = defaultPriceMax);
                
                        $slider_price_mobile && ($slider_price_mobile.value1 = defaultPriceMin);
                        $slider_price_mobile && ($slider_price_mobile.value2 = defaultPriceMax);
                
                        window.GEMSTONE_DIAMOND.config.shapeValue = defaultShape;
                        window.GEMSTONE_DIAMOND.config.colorValues = defaultColor;
                        window.GEMSTONE_DIAMOND.config.page_number = 1;
                        totalResultIndex = 0;
                
                        let vdbLBSortingGridElements = document.getElementsByClassName('vdb-lb-sorting-grid');
                        vdbLBSortingGridElements = Array.prototype.slice.call(vdbLBSortingGridElements);
                        vdbLBSortingGridElements.forEach(e => e.dataset.sorting_field=='carat' && e.dataset.sorting_seq=='ASC' ? e.classList.add('active') : e.classList.remove('active'));
                        window.GEMSTONE_DIAMOND.config.sortingField = 'carat';
                        window.GEMSTONE_DIAMOND.config.sortingSeq = 'ASC';
                        document.getElementById('sort-by-span').innerText = `${'LOWEST CARAT'.toLocaleUpperCase()}`;
                        document.getElementById('sort-by-list-wrapper').classList.remove('sort-by-active');
                
                        if (swiperShape[0]) {
                            swiperShape[0].slideTo(0);
                            swiperShape[1].slideTo(0);
                        }
                
                        if (swiperColor[0]) {
                            swiperColor[0].slideTo(0);
                            swiperColor[1].slideTo(0);
                        }
                        await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
                    });
                }
            }
        },
        formatMoney: function (cents, format) {
            if (typeof cents == 'string') {
                cents = cents.replace('.', '');
            }
            var value = '';
            var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
            var formatString = (format || moneyFormat);

            function defaultOption(opt, def) {
                return (typeof opt == 'undefined' ? def : opt);
            }

            function formatWithDelimiters(number, precision, thousands, decimal) {
                precision = defaultOption(precision, 2);
                thousands = defaultOption(thousands, ',');
                decimal = defaultOption(decimal, '.');
                if (isNaN(number) || number == null) {
                    return 0;
                }
                number = (number / 100.0).toFixed(precision);
                var parts = number.split('.'),
                    dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                    cents = parts[1] ? (decimal + parts[1]) : '';
                return dollars + cents;
            }
            switch (formatString.match(placeholderRegex)[1]) {
                case 'amount':
                    value = formatWithDelimiters(cents, 2);
                    break;
                case 'amount_no_decimals':
                    value = formatWithDelimiters(cents, 0);
                    break;
                case 'amount_with_comma_separator':
                    value = formatWithDelimiters(cents, 2, '.', ',');
                    break;
                case 'amount_no_decimals_with_comma_separator':
                    value = formatWithDelimiters(cents, 0, '.', ',');
                    break;
            }
            return formatString.replace(placeholderRegex, value);
        },
        showElements: function (element) {
            document.querySelectorAll(element).forEach((element) => element.style.display = 'block');
        },
        hideElements: function (element) {
            document.querySelectorAll(element).forEach((element) => element.style.display = 'none');
        },
        isJsonOrString: function (str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        },
        formDataToJson: function(formData, removeFromArray) {
            let jsonData = {};
            formData.forEach((value, key) => {
                if (!removeFromArray.includes(key)) {
                    // Check if the value is a File object (e.g., for file inputs)
                    if (value instanceof File) {
                        (jsonData[key] = value.name); // You can modify this to handle files differently if needed.
                    } else {
                        if (key == 'page_number') {
                            (jsonData['page'] = value);
                        } else {
                            (jsonData[key] = value);
                        }
                    }
                }
            });
            return jsonData;
        },
        objectToQueryParams: function(obj) {
            return Object.entries(obj).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
        },
        getUrlParameter: function(sParam) {
            var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        },
        updateQueryStringParam: function(key, value) {
            var baseUrl = [location.protocol, '//', location.host, location.pathname].join(''), urlQueryString = document.location.search, newParam = (value ? (key + '=' + value) : ''), params = newParam?.length > 0 && ('?' + newParam);

            // If the "search" string exists, then build params from it
            if (urlQueryString) {
                keyRegex = new RegExp('([\?&])' + key + '[^&]*');

                // If param exists already, update it
                if (urlQueryString.match(keyRegex) !== null) {
                    params = urlQueryString.replace(keyRegex, "$1" + newParam);
                } else { // Otherwise, add it to end of query string
                    params = newParam?.length > 0 && (urlQueryString + '&' + newParam);
                }
            }
            
            var outputString = params.toString().replace(/&+/g, '&');
            outputString = outputString.replace('?&','?');
            outputString = outputString.charAt(outputString.length - 1) === '&' ? outputString.slice(0, -1) : outputString;
            params && (window.history.replaceState({}, "", outputString));
        },
        handleize: function (str) {
            str = str.toLowerCase();
        
            var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];
            
            // For the old browsers
            for (var i = 0; i < toReplace.length; ++i) {
                str = str.replace(toReplace[i], "");
            }
        
            str = str.replace(/\W+/g, "-");
        
            if (str.charAt(str.length - 1) == "-") {
                str = str.replace(/-+\z/, "");
            }
        
            if (str.charAt(0) == "-") {
                str = str.replace(/\A-+/, "");
            }
        
            return str
        },
        initAddToCartButton: function() {
            if (document.getElementsByClassName('vdb-add-to-cart')?.length > 0) {
                let vdbAddToCartElements = document.getElementsByClassName('vdb-add-to-cart');
                vdbAddToCartElements = Array.prototype.slice.call(vdbAddToCartElements);
                for (let i = 0; i < vdbAddToCartElements.length; i++) {
                    vdbAddToCartElements[i].addEventListener('click', async function() {
                        let variantId = this.dataset.id;
                        let productObj = JSON.parse(document.querySelector(`#product-${variantId}`).innerHTML) || {};
    
                        let properties = {};
                        if (Object.keys(productObj)?.length > 0) {
                          properties['Material'] = "Lab Created Gemstone";
                          if (productObj?.shape?.length > 0) {
                            properties['shape'] = productObj?.shape+' Cut';
                          }
                          if (productObj?.cut?.length > 0) {
                            properties['cut'] = productObj?.cut;
                          }
                          if (productObj?.carat?.length > 0) {
                            properties['carat'] = productObj?.carat+'ct';
                          }
                          if (productObj?.color?.length > 0) {
                            properties['color'] = productObj?.color;
                          }
                          if (productObj?.clarity?.length > 0) {
                            properties['clarity'] = productObj?.clarity;
                          }
                          if (productObj?.lab?.length > 0) {
                            properties['lab'] = productObj?.lab;
                          }
                          if (productObj?.cert_num?.length > 0) {
                            properties['Cert Number'] = productObj?.cert_num;
                          }
                          if (productObj?.vdb_stock_num?.length > 0) {
                            properties['sku'] = productObj?.vdb_stock_num;
                          }
                          if (productObj?.shopify_product_vendor?.length > 0) {
                            properties['_vendor_name'] = productObj?.shopify_product_vendor;
                          }
                        }
                        this.innerHTML = '<span class="btn-view">Processing...</span>';
		                this.disabled = true;
                        await window.GEMSTONE_DIAMOND.addToCart(this, variantId, 1, properties);
                    });
                }
            }
        }, 
        addToCart: async function(_this, variant_id, quantity = "1", properties = {}) {
            var formData = new FormData();
            formData.append("id", variant_id);
            formData.append("quantity", quantity);
            Object.entries(properties).forEach(entry => {
                const [key, value] = entry;
                formData.append("properties[" + key + "]", value);
            });
    
            let rawResponse = await fetch("/cart/add.js", {
                method: "POST",
                body: formData,
            });
            let cart = await rawResponse.json();
            await freeProductAddToCart();
            open_group_cart_drawer();

            _this.innerHTML = '<span class="btn-view">Add to cart</span>';
            _this.disabled = false;
        },
        openContactPopup: function() {
            if (document.getElementsByClassName('open-contact-us-popup')?.length > 0) {
                let openContactUsPopupElements = document.getElementsByClassName('open-contact-us-popup');
                openContactUsPopupElements = Array.prototype.slice.call(openContactUsPopupElements);
                for (let i = 0; i < openContactUsPopupElements.length; i++) {
                    openContactUsPopupElements[i].addEventListener('click', async function() {
                        /* if (window.innerWidth < 768) { */
                            ContactPopup.classList.add("fancybox-is-open");
                        /* } else {
                            window.location.href = '/pages/contact-us';
                        } */
                    });
                }
            }

            if (document.getElementsByClassName('close--contact-us-popup')?.length > 0) {
                let closeContactUsPopupElements = document.getElementsByClassName('close--contact-us-popup');
                closeContactUsPopupElements = Array.prototype.slice.call(closeContactUsPopupElements);
                for (let i = 0; i < closeContactUsPopupElements.length; i++) {
                    closeContactUsPopupElements[i].addEventListener('click', async function() {
                        ContactPopup.classList.remove("fancybox-is-open");
                    });
                }
            }
        },
        priceInShopCurrency: function(vdb_dollar_price) {
            return (vdb_dollar_price);
            /*var shop_currency = cartCurrencyIsoCode;	//USD, GBP
            var currency_rate = 1;
    
            //Currency variable is coming from - https://cdn.shopify.com/s/javascripts/currencies.js
            if (Currency != undefined && Currency.rates != undefined && Currency.rates[shop_currency] != undefined) {
                if (shop_currency != 'USD') {
                    currency_rate = Currency.rates[shop_currency];
                }
            }
            return (vdb_dollar_price / currency_rate).toFixed(2);*/
        },
        shopCurrencyToDollar: function(shop_price) {
            var shop_currency = cartCurrencyIsoCode;	//USD, GBP
            var currency_rate = 1;
    
            //Currency variable is coming from - https://cdn.shopify.com/s/javascripts/currencies.js
            if (Currency != undefined && Currency.rates != undefined && Currency.rates[shop_currency] != undefined) {
                if (shop_currency != 'USD') {
                    currency_rate = Currency.rates[shop_currency];
                }
            }
            return ( shop_price * currency_rate).toFixed(2);
        },
        removeURLParameter: function(url, parameter) {
            //prefer to use l.search if you have a location/link object
            var urlparts = url.split('?');   
            if (urlparts.length >= 2) {
                var prefix = encodeURIComponent(parameter) + '=';
                var pars = urlparts[1].split(/[&;]/g);
        
                //reverse iteration as may be destructive
                for (var i = pars.length; i-- > 0;) {    
                    //idiom for string.startsWith
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                        pars.splice(i, 1);
                    }
                }
                return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
            }
            return url;
        },
        loadGridImages: function(){
            if (document.getElementsByClassName('grid-item-filter-image')?.length > 0) {
                let gridItemFilterImageElements = document.getElementsByClassName('grid-item-filter-image');
                gridItemFilterImageElements = Array.prototype.slice.call(gridItemFilterImageElements);
                for (let i = 0; i < gridItemFilterImageElements.length; i++) {
                    const element = gridItemFilterImageElements[i];
                    const imageURL = element.dataset.gridImg || "";
                    const errorURL = element.dataset.gridImgError || "";
                    const isImageURL = element.getAttribute('src');
                    if (imageURL?.length > 0 && isImageURL?.length == 0) {
                        element.setAttribute('src', imageURL);
                        element.setAttribute('onerror', errorURL);
                    }
                    element.dataset.gridImg = "";
                }
            }
        },
        initPaginationButtonEvent: function () {
            if (document.getElementsByClassName('pagination-button__load-number')?.length > 0) {
                let paginationButtonLoadNumberElements = document.getElementsByClassName('pagination-button__load-number');
                paginationButtonLoadNumberElements = Array.prototype.slice.call(paginationButtonLoadNumberElements);
                for (let i = 0; i < paginationButtonLoadNumberElements.length; i++) {
                    paginationButtonLoadNumberElements[i].addEventListener('click', async function() {
                        const page_number = this.dataset.current_page;
                        window.GEMSTONE_DIAMOND.config.page_number = (parseInt(page_number));

                        if (myCustomController !== null) {
                            myCustomController.abort();
                        }
                        
                        ajaxCallDiamondListRunning = 'No';
                        document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                        document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '';
                        document.querySelector("#table-id tbody").innerHTML = "";
                        window.GEMSTONE_DIAMOND.hideElements('.vdb-container--pagination');
                        inactiveListView();

                        const targetOffset = document.getElementById('collection-results-filters').getBoundingClientRect().top + window.scrollY - 30;
                        window.scrollTo({
                            top: targetOffset,
                            behavior: 'smooth'
                        });

                        await window.GEMSTONE_DIAMOND?.callDiamondList();
                    });
                }
            }
        },
        initPaginationHTML(current_page,page_count,adjacents = 2){
            current_page = parseInt(current_page);
            page_count = parseInt(page_count);
            adjacents = parseInt(adjacents);
        
            var out = '<ul class="pagination-list">';
        
            // previous
            if(current_page==1) {
                //out+='<li class="disabled"><a href="javascript:;"><span class="vdb-rb-icon vdb-rb-icon-detail_page_match_arrow_left_white"></span></a></li>';
            }else{
                // out+='<li><a class="pagination-link pagination-button__load-number" data-current_page="'+(current_page-1)+'" href="javascript:;"><span class="vdb-rb-icon vdb-rb-icon-detail_page_match_arrow_left_white"></span></a></li>';
            }
        
            // first
            if(current_page>(adjacents+1)) {
                out+='<li><a class="pagination-link pagination-button__load-number" data-current_page="1" href="javascript:;">1</a></li>';
            }
        
            // interval
            if(current_page>(adjacents+2)) {
                out+='<li class="disabled"><a class="pagination-ellipsis" href="javascript:;">...</a></li>';
            }
        
            // pages
            let pmin = (current_page>adjacents) ? (current_page-adjacents) : 1;
            let pmax = (current_page<(page_count-adjacents)) ? (current_page+adjacents) : page_count;
            for(let i=pmin; i<=pmax; i++) {
                if(i==current_page) {
                    out+='<li class="pagination-link is-current"><a href="javascript:;">'+i+'</a></li>';
                }else{
                    out+='<li><a class="pagination-link pagination-button__load-number" data-current_page="'+i+'" href="javascript:;">'+i+'</a></li>';
                }
            }
        
            // interval
            if(current_page<(page_count-adjacents-1)) {
                out+='<li class="disabled"><a href="javascript:;">...</a></li>';
            }
        
            // last
            if(current_page<(page_count-adjacents)) {
                out+='<li><a class="pagination-link pagination-button__load-number" data-current_page="'+page_count+'" href="javascript:;">'+page_count+'</a></li>';
            }
        
            // next
            if(current_page<page_count) {
                // out+='<li><a class="pagination-link pagination-button__load-number" data-current_page="'+(current_page+1)+'" href="javascript:;"><span class="vdb-rb-icon  vdb-rb-icon-detail_page_match_arrow_right_white"></span></a></li>';
            }else{
                //out+='<li class="disabled"><a href="javascript:;"><span class="vdb-rb-icon  vdb-rb-icon-detail_page_match_arrow_right_white"></span></a></li>';
            }
            out+= '</ul>';
        
            return out;
        },
        initShowAndHideIframe: function () {
            let productImageFrameElements = document.getElementsByClassName('product-image-frame');
            productImageFrameElements = Array.prototype.slice.call(productImageFrameElements);

            for (let element of productImageFrameElements) {
                element.querySelector('iframe') && (element.querySelector('iframe').style.opacity = 0);
                element.querySelector('iframe') && (element.querySelector('iframe').classList.remove('video-active'));
                element.querySelector('.play-button') && (element.querySelector('.play-button').style.display = 'flex');
                element.querySelector('.product__image_inner') && (element.querySelector('.product__image_inner').style.display = '');

                element.addEventListener('click', function(event) {
                    productImageFrameElements.forEach(e => {
                        e.querySelector('iframe') && (e.querySelector('iframe').style.opacity = 0);
                        e.querySelector('iframe') && (e.querySelector('iframe').classList.remove('video-active'));
                        e.querySelector('.product__image_inner') && (e.querySelector('.product__image_inner').style.display = '');
                        e.querySelector('.play-button') && (e.querySelector('.play-button').style.display = 'flex');
                    });
                    
                    if (this.querySelector('iframe')) {
                        this.querySelector('iframe').style.opacity = 9999999;
                        this.querySelector('iframe').classList.add('video-active');
                        this.querySelector('.play-button') && (this.querySelector('.play-button').style.display = 'none');
                        this.querySelector('.product__image_inner') && (this.querySelector('.product__image_inner').style.display = 'none');
                    }
                });
            }
        }
    };
}();

if (window.GEMSTONE_DIAMOND.getUrlParameter('supported_shapes')) {
    let supportedShapesURL = window.GEMSTONE_DIAMOND.getUrlParameter('supported_shapes').split(',');
    supportedShapesURL = Array.prototype.slice.call(supportedShapesURL);
    if (supportedShapesURL?.length < 6) {
        let swiperScrollbarShapeElements = document.getElementsByClassName('swiper-scrollbar-shape');
        swiperScrollbarShapeElements = Array.prototype.slice.call(swiperScrollbarShapeElements);
        swiperScrollbarShapeElements.map(e => e.remove());
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    let selectDefaultShape = '';
    if (window.GEMSTONE_DIAMOND.getUrlParameter('supported_shapes')) {
        let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
        vdbListItemAShapeStyleElements = Array.prototype.slice.call(vdbListItemAShapeStyleElements);
        if (vdbListItemAShapeStyleElements?.length > 0) {
            for (let i = 0; i < vdbListItemAShapeStyleElements.length; i++) {
                const element = vdbListItemAShapeStyleElements[i];
                let supportedShapes = window.GEMSTONE_DIAMOND.getUrlParameter('supported_shapes').split(',');
                supportedShapes = Array.prototype.slice.call(supportedShapes);
                supportedShapes = supportedShapes.map(e => e.replace('Cut', '').trim());
                if (supportedShapes.includes(element.dataset.shapeValue) == false) {
                    document.querySelectorAll('.' + element.dataset.module).forEach(e => e.classList.add('hide'));
                } else {
                    document.querySelectorAll('.' + element.dataset.module).forEach(e => e.classList.add('visible-shape'));
                }
            }
        }

        if (window.GEMSTONE_DIAMOND.getUrlParameter('shape') == undefined) {
            if (document.getElementsByClassName('visible-shape')?.length > 0) {
                let visibleShapeElements = document.getElementsByClassName('visible-shape');
                visibleShapeElements = Array.prototype.slice.call(visibleShapeElements);
                for (let i = 0; i < visibleShapeElements.length; i++) {
                    if (i==0) {
                        selectDefaultShape = visibleShapeElements[i].childNodes[1].dataset.shapeValue;
                        document.querySelectorAll('.' + visibleShapeElements[i].childNodes[1].dataset.module).forEach(e => e.classList.add('active-state'));
                    }
                }
            }
        } else {
            selectDefaultShape = window.GEMSTONE_DIAMOND.getUrlParameter('shape') !== undefined ? window.GEMSTONE_DIAMOND.getUrlParameter('shape').replace('Cut', '').replace('+', ' ').trim() : defaultShape;
        }
    } else {
        selectDefaultShape = window.GEMSTONE_DIAMOND.getUrlParameter('shape') !== undefined ? window.GEMSTONE_DIAMOND.getUrlParameter('shape').replace('Cut', '').replace('+', ' ').trim() : defaultShape;
    }

    if (window.GEMSTONE_DIAMOND.getUrlParameter('shape') !== undefined) {
        let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
        vdbListItemAShapeStyleElements = Array.prototype.slice.call(vdbListItemAShapeStyleElements);
        if (vdbListItemAShapeStyleElements?.length > 0) {
            const queryShape = window.GEMSTONE_DIAMOND.getUrlParameter('shape').replace('Cut', '').replace('+', ' ').trim();
            for (let i = 0; i < vdbListItemAShapeStyleElements.length; i++) {
                const element = vdbListItemAShapeStyleElements[i];
                if(element.dataset.shapeValue == queryShape){
                    document.querySelectorAll('.' + element.dataset.module).forEach(e => e.classList.add('active-state'));
                } else {
                    document.querySelectorAll('.' + element.dataset.module).forEach(e => e.classList.remove('active-state'));
                }
            }
        }
    }

    let isQueryParamsExists = new URL(window.location.href);
    window.GEMSTONE_DIAMOND.config = {
        page_number: parseInt(window.GEMSTONE_DIAMOND.getUrlParameter('page')) || 1,
        shapeValue: isQueryParamsExists?.searchParams?.size > 0 && window.GEMSTONE_DIAMOND.getUrlParameter('shape') == undefined ? '' : selectDefaultShape,
        colorValues: window.GEMSTONE_DIAMOND.getUrlParameter('color') !== undefined ? window.GEMSTONE_DIAMOND.getUrlParameter('color') : defaultColor,
        sortingField: 'carat',
        sortingSeq: 'ASC'
    };
    await window.GEMSTONE_DIAMOND?.callDiamondList(); // await window.GEMSTONE_DIAMOND?.callMinAndMaxDiamondList();

    if (document.getElementsByClassName('vdb-main-advance-filter-web')?.length > 0) {
        document.getElementById('vdb-lb-advanced-filter-desk-view').classList.remove('hide');
    } else {
        document.getElementById('vdb-lb-advanced-filter-desk-view').classList.add('hide');
    }

    if(window.GEMSTONE_DIAMOND.getUrlParameter('ring-handle') !== undefined){
        document.querySelector('[data-view="grid"]').style.display = 'none';
    }
    window.GEMSTONE_DIAMOND.initClearFilters();
});

if (document.getElementsByClassName('vdb-set_tab_view')?.length > 0) {
    let vdbSetTabViewElements = document.getElementsByClassName('vdb-set_tab_view');
    vdbSetTabViewElements = Array.prototype.slice.call(vdbSetTabViewElements);
    if (vdbSetTabViewElements?.length > 0) {
        for (let i = 0; i < vdbSetTabViewElements.length; i++) {
            const element = vdbSetTabViewElements[i];
            element.addEventListener('click', function (e) {
                var tab_id = this.dataset.tab;

                vdbSetTabViewElements.forEach(e => e.classList.remove('active'));
                document.querySelectorAll(".vdb-tab-content").forEach(content => content.classList.remove("vdb-current"));

                this.classList.add('active');
                document.getElementById(tab_id).classList.add("vdb-current");
                document.getElementById('vdb-lb-filter-container').style.display = this.dataset.view == 'grid' ? '' : 'none';
                window.GEMSTONE_DIAMOND.loadGridImages();
            });
        }
    }
}

if (document.getElementsByClassName('vdb-list-item-a-shape-style')?.length > 0) {
    let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
    vdbListItemAShapeStyleElements = Array.prototype.slice.call(vdbListItemAShapeStyleElements);
    if (vdbListItemAShapeStyleElements?.length > 0) {
        for (let i = 0; i < vdbListItemAShapeStyleElements.length; i++) {
            const element = vdbListItemAShapeStyleElements[i];
            element.addEventListener('click', async function (e) {
                const module_class = this.dataset.module, shape_value = this.dataset.shapeValue;
                vdbListItemAShapeStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                (window.GEMSTONE_DIAMOND.config.shapeValue != shape_value && (document.querySelectorAll('.' + module_class).forEach(e => e.classList.toggle('active-state'))));
                window.GEMSTONE_DIAMOND.config.shapeValue = (window.GEMSTONE_DIAMOND.config.shapeValue != shape_value ? shape_value : '');

                await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
            });
        }
    }
}

if (document.getElementsByClassName('vdb-list-item-a-color-style')?.length > 0) {
    let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
    vdbListItemAColorStyleElements = Array.prototype.slice.call(vdbListItemAColorStyleElements);
    if (vdbListItemAColorStyleElements?.length > 0) {
        for (let i = 0; i < vdbListItemAColorStyleElements.length; i++) {
            const element = vdbListItemAColorStyleElements[i];
            element.addEventListener('click', async function (e) {
                const module_class = this.dataset.module, color_value = this.dataset.colorValue;
                vdbListItemAColorStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                (window.GEMSTONE_DIAMOND.config.colorValues != color_value && (document.querySelectorAll('.' + module_class).forEach(e => e.classList.toggle('active-state'))));
                window.GEMSTONE_DIAMOND.config.colorValues = (window.GEMSTONE_DIAMOND.config.colorValues != color_value ? color_value : '');

                await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
            });
        }
    }
}

/* Desktop View JS */
let handleGlobalSliderEventsForDesk = async function () {
    if (myCustomController !== null) {
        myCustomController.abort();
    }

    /* if ($slider_carat_mobile) {
        $slider_carat_mobile.value1 = window.GEMSTONE_DIAMOND.getUrlParameter('min_carat') !== undefined ? parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('min_carat')).toFixed(2) : $slider_carat.value1;
        $slider_carat_mobile.value2 = window.GEMSTONE_DIAMOND.getUrlParameter('max_carat') !== undefined ? parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('max_carat')).toFixed(2) : $slider_carat.value2;
    } */

    if ($slider_price_mobile) {
        $slider_price_mobile.value1 = $slider_price.value1;
        $slider_price_mobile.value2 = $slider_price.value2;
    }

    await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
}

document.getElementById('slider_carat_mia') && (document.getElementById('slider_carat_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('slider_price_mia') && (document.getElementById('slider_price_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
/* END */

let handleGlobalSliderEventsForMobile = async function () {
    if (myCustomController !== null) {
        myCustomController.abort();
    }

    /* if ($slider_carat) {
        $slider_carat.value1 = window.GEMSTONE_DIAMOND.getUrlParameter('min_carat') !== undefined ? parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('min_carat')).toFixed(2) : $slider_carat_mobile.value1;
        $slider_carat.value2 = window.GEMSTONE_DIAMOND.getUrlParameter('max_carat') !== undefined ? parseFloat(window.GEMSTONE_DIAMOND.getUrlParameter('max_carat')).toFixed(2) : $slider_carat_mobile.value2;
    } */

    if ($slider_price) {
        $slider_price.value1 = $slider_price_mobile.value1;
        $slider_price.value2 = $slider_price_mobile.value2;
    }

    await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
}

/* Mobile View JS */
document.getElementById('slider_carat_mia_mobile') && (document.getElementById('slider_carat_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('slider_price_mia_mobile') && (document.getElementById('slider_price_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
/* END */

if (document.getElementById('vdb-lb-advanced-filter-desk-view')) {
    const vdbLBAdvancedFilterElement = document.getElementById('vdb-lb-advanced-filter-desk-view'), vdbMainAdvanceFilterWebElements = document.getElementsByClassName('vdb-main-advance-filter-web');
    var deskOriginalText = vdbLBAdvancedFilterElement.textContent;
    var deskNewText = "View Basic Filters";
    vdbLBAdvancedFilterElement.addEventListener('click', () => {
        // Toggle the text
        vdbLBAdvancedFilterElement.textContent = (vdbLBAdvancedFilterElement.textContent === deskOriginalText) ? deskNewText : deskOriginalText;
        vdbMainAdvanceFilterWebElements.forEach(e => e.classList.toggle('hide'));
    });
}

function calculateSidebarHeight() {
    window.addEventListener('scroll', function() {
    if (window.scrollY === 0) {
      var announcementBarHeight = document.querySelector("#shopify-section-announcement-bar").clientHeight;
      var headerHeight = document.querySelector("#shopify-section-header-centered").clientHeight;
      var totalHeight = announcementBarHeight + headerHeight;
      document.querySelector(".filter__sidebar-container").style.top = totalHeight + 'px';
      document.querySelector(".filter__sidebar-overlay").style.top = totalHeight + 'px';
    } else {
      var headerHeight = document.querySelector("#shopify-section-header-centered").clientHeight;
      document.querySelector(".filter__sidebar-container").style.top = headerHeight + 'px';
      document.querySelector(".filter__sidebar-overlay").style.top = headerHeight + 'px';
    }
  });
}

/* window.addEventListener('scroll', async function () {
    var searchResultWrapper = document.getElementById("vdb-lb-search-result-wrapper");
    var tableId = document.getElementById("table-id");

    calculateSidebarHeight();
    if (searchResultWrapper.offsetHeight > 0 && window.scrollY + window.innerHeight >= searchResultWrapper.offsetHeight) {
        await window.GEMSTONE_DIAMOND?.callDiamondList();
    } else if (tableId.querySelector("tbody").innerHTML !== '' && window.scrollY + window.innerHeight >= tableId.parentElement.offsetHeight && tableId.parentElement.offsetHeight > 0) {
        await window.GEMSTONE_DIAMOND?.callDiamondList();
    }
}); */

function inactiveListView() {
    let vdbLBViewButtonElements = document.getElementsByClassName('vdb-lb-view-btn');
    vdbLBViewButtonElements = Array.prototype.slice.call(vdbLBViewButtonElements);
    for (let i = 0; i < vdbLBViewButtonElements.length; i++) {
        const tdId = vdbLBViewButtonElements[i].dataset.id;
        document.querySelector('#' + tdId + '-list').classList.remove('hide');
        document.querySelector('#' + tdId).classList.add('vdb-active-content');
        document.querySelectorAll('.' + tdId + '-video-desk') && (document.querySelectorAll('.' + tdId + '-video-desk').forEach(e => e.src = ''));
        document.querySelectorAll('.' + tdId + '-video-mob') && (document.querySelectorAll('.' + tdId + '-video-mob').forEach(e => e.src = ''));
    }
}

if (document.getElementsByClassName('pagination-button__load-more')?.length > 0) {
    let paginationButtonLoadMoreElements = document.getElementsByClassName('pagination-button__load-more');
    paginationButtonLoadMoreElements = Array.prototype.slice.call(paginationButtonLoadMoreElements);
    for (let i = 0; i < paginationButtonLoadMoreElements.length; i++) {
        paginationButtonLoadMoreElements[i].addEventListener('click', async function() {
            inactiveListView();
            window.GEMSTONE_DIAMOND.hideElements('.vdb-see-more-div');
            await window.GEMSTONE_DIAMOND?.callDiamondList();
        });
    }
}

if (document.getElementsByClassName('vdb-lb-sorting-th')?.length > 0) {
    let sortingThElements = document.getElementsByClassName('vdb-lb-sorting-th');
    sortingThElements = Array.prototype.slice.call(sortingThElements);
    for (let i = 0; i < sortingThElements.length; i++) {
        sortingThElements[i].addEventListener('click', async function() {
            for (var j = 0; j < sortingThElements.length; j++) {
                sortingThElements[j].classList.add('vdb-sorting_both');
                sortingThElements[j].classList.remove('vdb-sorting_asc');
                sortingThElements[j].classList.remove('vdb-sorting_desc');
            }

            const clickedElement = this;
            const thSortingField = clickedElement.getAttribute('data-sorting_field');
            const hiddenSortingField = window.GEMSTONE_DIAMOND.config.sortingField;
            const hiddenSortingSeq = window.GEMSTONE_DIAMOND.config.sortingSeq;
            if (hiddenSortingField == thSortingField) {
                if (hiddenSortingSeq == 'ASC') {
                    window.GEMSTONE_DIAMOND.config.sortingSeq = 'DESC';
                    clickedElement.classList.add('vdb-sorting_desc');
                    clickedElement.classList.remove('vdb-sorting_both');
                    clickedElement.classList.remove('vdb-sorting_asc');
                } else {
                    window.GEMSTONE_DIAMOND.config.sortingSeq = 'ASC';
                    clickedElement.classList.add('vdb-sorting_asc');
                    clickedElement.classList.remove('vdb-sorting_both');
                    clickedElement.classList.remove('vdb-sorting_desc');
                }
            } else {
                window.GEMSTONE_DIAMOND.config.sortingSeq = 'ASC';
                clickedElement.classList.add('vdb-sorting_asc');
                clickedElement.classList.remove('vdb-sorting_both');
                clickedElement.classList.remove('vdb-sorting_desc');
            }
            window.GEMSTONE_DIAMOND.config.sortingField = thSortingField;
            await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
        });
    }
}

if (document.getElementsByClassName('vdb-lb-close-cert-popup')) {
    const vdbLBCloseCertPopupElement =  document.getElementsByClassName('vdb-lb-close-cert-popup');
    for (let i = 0; i < vdbLBCloseCertPopupElement.length; i++) {
        vdbLBCloseCertPopupElement[i].addEventListener('click', function() {
            const myCertFrame = document.getElementById('myCertFrame');
            const myCertImg = document.getElementById('myCertImg');

            myCertFrame.style.display = 'none';
            myCertImg.style.display = 'none';

            myCertImg.src = '';
            myCertFrame.src = '';
            document.getElementById('certificate-popup').style.display = 'none';
            document.querySelector('html').classList.remove('certi-overflow-hidden');
        });
    }
}

if (document.getElementById('vdb-lb-advanced-filter-mobile-view-open')) {
    const vdbLBAdvancedFilterElement = document.getElementById('vdb-lb-advanced-filter-mobile-view-open'), vdbLBMainAdvanceFilterMobileElements = document.getElementsByClassName('vdb-lb-main-advance-filter-mobile');
    var originalText = vdbLBAdvancedFilterElement.textContent;
    var newText = "View Basic Filters";
    vdbLBAdvancedFilterElement.addEventListener('click', () => {
        // Toggle the text
        vdbLBAdvancedFilterElement.textContent = (vdbLBAdvancedFilterElement.textContent === originalText) ? newText : originalText;
        vdbLBMainAdvanceFilterMobileElements.forEach(e => e.classList.toggle('sidebar-active'));
    });
}

if (document.getElementsByClassName('vdb-lb-advanced-filter-mobile-view-close')) {
    const vdbLBAdvancedFilterElements = document.getElementsByClassName('vdb-lb-advanced-filter-mobile-view-close'), vdbLBAdvancedFilterElement = document.getElementById('vdb-lb-advanced-filter-mobile-view-open'), vdbLBMainAdvanceFilterMobileElements = document.getElementsByClassName('vdb-lb-main-advance-filter-mobile');
    for (let i = 0; i < vdbLBAdvancedFilterElements?.length; i++) {
        vdbLBAdvancedFilterElements[i].addEventListener('click', () => {
            vdbLBAdvancedFilterElement.textContent = "View More Filters";
            vdbLBMainAdvanceFilterMobileElements.forEach(e => e.classList.toggle('sidebar-active'));
        });
    }
}

if (document.getElementsByClassName('filter__list-icon')?.length > 0) {
    let filterListIconElements = document.getElementsByClassName('filter__list-icon');
    filterListIconElements = Array.prototype.slice.call(filterListIconElements);

    let activeLi = '';
    for (let i = 0; i < filterListIconElements?.length; i++) {
        filterListIconElements[i].addEventListener('click', function (event) {
            if (activeLi?.length > 0 && activeLi != this.dataset.li) {
                let filterListOpenElements = document.getElementsByClassName('filter__list-open');
                filterListOpenElements = Array.prototype.slice.call(filterListOpenElements);
                filterListOpenElements.forEach(e => e.classList.remove('filter__list-open'));

                let mobileTooltipActiveElements = document.getElementsByClassName('mobile-tooltip-active');
                mobileTooltipActiveElements = Array.prototype.slice.call(mobileTooltipActiveElements);
                mobileTooltipActiveElements.map(e => e.classList.remove('mobile-tooltip-active'));
            }
            document.querySelector(`.filter__list-${this.dataset.li}`).classList.toggle('filter__list-open');
            activeLi = this.dataset.li;
        });
    }
}

if (document.getElementById('sort-by-filter')) {
    const sortByFilterElement = document.getElementById('sort-by-filter');
    sortByFilterElement.addEventListener('click', function() {
        document.getElementById('sort-by-list-wrapper').classList.toggle('sort-by-active');
    });
}

if (document.getElementsByClassName('vdb-lb-sorting-grid')?.length > 0) {
    let vdbLBSortingGridElements = document.getElementsByClassName('vdb-lb-sorting-grid');
    vdbLBSortingGridElements = Array.prototype.slice.call(vdbLBSortingGridElements);
    for (let i = 0; i < vdbLBSortingGridElements?.length; i++) {
        vdbLBSortingGridElements[i].addEventListener('click', async function() {
            const sortingField = this.dataset.sorting_field;
            const sortingSeq = this.dataset.sorting_seq;

            vdbLBSortingGridElements.forEach(e => e.classList.remove('active'));
            this.classList.add('active');

            document.getElementById('sort-by-span').innerText = `${sortingSeq=='ASC'?'LOWEST':'HIGHEST'} ${sortingField.toLocaleUpperCase()}`;
            document.getElementById('sort-by-list-wrapper').classList.remove('sort-by-active');

            window.GEMSTONE_DIAMOND.config.sortingField = sortingField;
            window.GEMSTONE_DIAMOND.config.sortingSeq = sortingSeq;
            await window.GEMSTONE_DIAMOND?.callBeforeGMDiamond();
        });
    }
}

if (document.getElementsByClassName('mobile-tooltip')?.length > 0) {
    let mobileTooltipElements =  document.getElementsByClassName('mobile-tooltip');
    mobileTooltipElements = Array.prototype.slice.call(mobileTooltipElements);

    let activeTooltip = '';
    for (let i = 0; i < mobileTooltipElements.length; i++) {
        mobileTooltipElements[i].addEventListener('click', function() {
            if (activeTooltip?.length > 0 && activeTooltip != this.dataset.mbTooltip) {
                let mobileTooltipActiveElements = document.getElementsByClassName('mobile-tooltip-active');
                mobileTooltipActiveElements = Array.prototype.slice.call(mobileTooltipActiveElements);
                mobileTooltipActiveElements.map(e => e.classList.remove('mobile-tooltip-active'));
            }
            this.querySelector('.tooltiptext').classList.toggle('mobile-tooltip-active');
            activeTooltip = this.dataset.mbTooltip;
        });
    }
}

document.addEventListener("click", (evt) => {
    let targetElement = evt.target; // clicked element
    const btn_sort_by_filter = document.getElementById("sort-by-filter");
    do {
        if (targetElement == btn_sort_by_filter) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    document.getElementById('sort-by-list-wrapper').classList.remove('sort-by-active');
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
        document.querySelector('.vdb-lb-close-cert-popup').click();
    }
});