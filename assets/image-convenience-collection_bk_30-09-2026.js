const moneyFormatForCollection = document.currentScript.getAttribute('money-format') || "${{amount}}";
let baseUrl = 'https://sfycdn.speedsize.com/d9acbe11-c0cc-4d19-a1ce-748a0fd38b05/https://cdn.miadonna.com/products/website',
    defaultShape = 'Round+Cut',
    defaultPosition = '001',
    defaultHoverPosition = '002',
    defaultCaratWeight = '1.00ct';

String.prototype.removeValueWithRegex = function (valueToRemove) {
    let regex = new RegExp(valueToRemove.replace(/\s/g, "\\s"), "g");
    return this.replace(regex, "");
};
String.prototype.titleCase = function (needle = ' ') {
    return this.split(needle).map(word => word.trim().charAt(0).toUpperCase() + word.slice(1)).join(needle);
};

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function removeAttributes(element, ...attrs) {
    attrs.forEach(attr => element.removeAttribute(attr))
}

function updateQueryString(relativeUrl, key, value) {
    // Split the URL to handle the path and query string separately
    let [path, queryString] = relativeUrl.split('?');

    // Parse the query string into an object
    let params = new URLSearchParams(queryString);

    // Update the query parameter
    params.set(key, value);

    // Return the updated URL (relative path)
    return `${path}?${params.toString()}`;
}

function formatMoneyInCollection(cents, format) {
    if (typeof cents == 'string') {
        cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormatForCollection);

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
};

function updateCurrentUrlWithProductHandle(productHandle, base_url) {
    // Get the current URL
    const currentUrl = base_url || window.location.href;

    // Create a URL object
    const url = new URL(currentUrl);

    // Split the pathname into segments
    const segments = url.pathname.split('/');

    // Replace the last segment with the new product handle
    segments[segments.length - 1] = productHandle;

    // Update the pathname
    url.pathname = segments.join('/');

    return `${url.pathname}${url.search}`;
}

function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);

    img.src = url;
  });
}

function customImageAndVideoConventionCollections(type = 'image', url, url_alternate='', handle, position = '001', positionHover = '002', extension = 'webp', optionPrice = 0, optionCompareAtPrice = 0) {
    let productImageMain = document.getElementById(`${handle}-main`) || "", productImageHover = document.getElementById(`${handle}-hover`) || "", productCollectionMoney = document.getElementById(`${handle}-money`) || "", productCollectionCompareAtMoney = document.getElementById(`${handle}-compare-at-price-money`) || "", productCollectionSaleBadge = document.getElementById(`${handle}-sale-badge`) || "";
    if (type == 'image') {
        if(productImageMain == ''){
            productImageMain = document.querySelector(`[data-img-pid=${handle}-main]`) || '';
        }
        if(productImageHover == ''){
            productImageHover = document.querySelector(`[data-img-pid=${handle}-hover]`) || '';
        }
        let imageURL = `${baseUrl}/${url}-${position}-web.${extension}?width=600`;
        let imageHoverURL = `${baseUrl}/${url}-${positionHover}-web.${extension}?width=600`;

        let imageUrlAlternate = `${baseUrl}/${url_alternate}-${position}-web.${extension}?width=600`;
        let imageHoverURLAlternate = `${baseUrl}/${url_alternate}-${positionHover}-web.${extension}?width=600`;

        let mainErrorURL = productImageMain?.dataset?.onError != undefined ? `this.src='${baseUrl}/${productImageMain?.dataset?.onError}'` : '';
        let hoverErrorURL = productImageHover?.dataset?.onError != undefined ? `this.src='${baseUrl}/${productImageHover?.dataset?.onError}'` : '';

        if (productImageMain && productImageMain.querySelector('img')) {
            productImageMain.querySelector('img').setAttribute('src', imageURL.replaceAll('--','-'));
            productImageMain?.dataset?.onError != undefined && (productImageMain.querySelector('img').setAttribute('onerror', mainErrorURL));
            removeAttributes(productImageMain.querySelector('img'), 'data-src', 'data-srcset', 'srcset');
            checkImageExists(imageURL).then((exists) => {
                if(!exists){
                    productImageMain.querySelector('img').setAttribute('src', imageUrlAlternate.replaceAll('--','-'));
                }
            });
        }
        if (productImageHover && productImageHover.querySelector('img')) {
            productImageHover.querySelector('img').setAttribute('src', imageHoverURL.replaceAll('--','-'));
            if (window.innerWidth < 1025) {
                document.querySelectorAll('.product-wrap').forEach(function(productCard){
                    let productImageHover = productCard.querySelector('.product-image-hover'); 
                    if (!productImageHover) return;

                    let img = productImageHover.querySelector('img');
                    if (!img) return;

                    let currentSrc = img.src;
                    let activeSwatch = productCard.querySelector('.swatch.active');
                    if (!activeSwatch) return;

                    let label = activeSwatch.getAttribute('data-disclaimer');

                    let labelEl = productCard.querySelector('.list-dtllable');
                
                    if (!labelEl) return;
                    
                    if (!label) {
                        labelEl.style.display = 'none';
                    }
                    else{
                        if (currentSrc.includes('-002-')) {
                            labelEl.innerHTML = '<span>'+label+'</span>';
                            labelEl.style.display = 'block';
                        }
                    }
                });
            }
            productImageMain?.dataset?.onError != undefined && (productImageHover.querySelector('img').setAttribute('onerror', hoverErrorURL));
            removeAttributes(productImageHover.querySelector('img'), 'data-src', 'data-srcset', 'srcset');
            checkImageExists(imageHoverURL).then((exists) => {
                if(!exists){
                    productImageHover.querySelector('img').setAttribute('src', imageHoverURLAlternate.replaceAll('--','-'));
                }
            });
        }
        if (productCollectionMoney.getAttribute('data-collection-price')) {
            const productPrice = Number(productCollectionMoney.getAttribute('data-collection-price')) + Number(optionPrice);
            productCollectionMoney.innerText = formatMoneyInCollection(productPrice);

        }
        if (productCollectionCompareAtMoney) {
            if (productCollectionCompareAtMoney.getAttribute('data-collection-price')) {
                const productCompareAtPrice = Number(productCollectionCompareAtMoney.getAttribute('data-collection-price')) + Number(optionCompareAtPrice);
                productCollectionCompareAtMoney.innerText = formatMoneyInCollection(productCompareAtPrice);
                productCollectionCompareAtMoney.parentElement.style.display = productCompareAtPrice == 0 ? 'none' : '';
                productCollectionSaleBadge.style.display = productCompareAtPrice == 0 ? 'none' : '';
            }
        }

        if (document.getElementById(`${handle}-loader`)) {
          document.getElementById(`${handle}-loader`).classList.remove('loader__active')
        }
        $('.collection-matrix .product__thumbnail .thumbnail__loading-icon').removeClass('loader__active');
    }
}

async function onLoadSwatchCollectionSelected() {
    const swatchCollectionSelectedActiveElements = Array.from(document.getElementsByClassName('swatch-collection-selected active'));
    if (swatchCollectionSelectedActiveElements?.length > 0) {
        swatchCollectionSelectedActiveElements.forEach(async function (element) {
            let productHandle = element?.dataset?.productHandle,
                metalCarat = element?.dataset?.metalCarat,
                shape = element?.dataset?.defaultShape?.length > 0 ? element?.dataset?.defaultShape : defaultShape,
                metal = element?.dataset?.defaultMetal?.length > 0 ? element?.dataset?.defaultMetal : element?.dataset?.metal,
                dataDefaultQuality = element?.dataset?.defaultQuality?.length > 0 ? element?.dataset?.defaultQuality : '',
                dataDefaultCarat = element?.dataset?.defaultCarat?.length > 0 ? element?.dataset?.defaultCarat : '',
                dataDefaultShape = element?.dataset?.defaultShape?.length > 0 ? element?.dataset?.defaultShape : defaultShape,
                dataDefaultPosition = element?.dataset?.defaultPosition?.length > 0 ? element?.dataset?.defaultPosition : defaultPosition,
                dataDefaultHoverPosition = element?.dataset?.defaultHoverPosition?.length > 0 ? element?.dataset?.defaultHoverPosition : defaultHoverPosition,
                defaultExtension = element?.dataset?.defaultExtension,
                optionPrice = element?.dataset?.optionPrice,
                optionCompareAtPrice = element?.dataset?.optionCompareAtPrice || 0,
                basicBuilder = element?.dataset?.basicBuilder,
                productVariants = element?.dataset?.productVariants,
                productVarinatOptionsWithValues = element?.innerText,
                attributesCenterStoneCount = element?.dataset?.attributesCenterStoneCount,
                materialsCount = element?.dataset?.materialsCount,
                metalsCount = element?.dataset?.metalsCount,
                sideStoneShapes = element?.dataset?.sideStoneShapes,
                sideStoneCount = element?.dataset?.sideStoneCount;

            if (getUrlParameter('filter.p.m.custom.shape') != undefined || getUrlParameter('filter.p.m.custom.metal') != undefined) {
                dataDefaultPosition = '001';
            }

            let img_url_arr = [];
            let img_url_arr_alternate = [];
            img_url_arr.push(productHandle);
            img_url_arr_alternate.push(productHandle);
            let queryParams = 'solid_metal';
            let queryParamsOption = 'Quality,Carat_Weight';
            let queryParamsOptionArr = queryParamsOption.split(',');
            let variantId = '';
            let optionValues = [];
            if (Number(basicBuilder) == 1 && Number(productVariants) > 1) {
                productVarinatOptionsWithValues = JSON.parse(productVarinatOptionsWithValues);
                if (productVarinatOptionsWithValues?.length > 0) {
                    const isMetalExistsInArray = productVarinatOptionsWithValues.some(obj => ['Metal', 'Metal Type', 'Material'].includes(obj.name) == true);
                    for (let i = 0; i < productVarinatOptionsWithValues?.length; i++) {
                        let optionName = productVarinatOptionsWithValues[i].name;
                        if (['Metal', 'Metal Type', 'Material'].includes(optionName) == true) {
                            optionValues.push(metalCarat);
                            let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                            metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                            queryParams = optionName.replace(' ', '_');
                            img_url_arr.push(metalValue);
                            img_url_arr_alternate.push(metalValue);
                        } else {
                            if (Number(metalsCount) > 0 && isMetalExistsInArray == false) {
                                optionValues.push(metalCarat);
                                let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                                metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                                img_url_arr.push(metalValue);
                                img_url_arr_alternate.push(metalValue);
                            }
                            if (productVarinatOptionsWithValues[i].values?.length > 0) {
                                optionValues.push(productVarinatOptionsWithValues[i].values[0]);
                                img_url_arr_alternate.push(productVarinatOptionsWithValues[i].values[0].replace('ctw', 'ct').split('-').map(e => e.trim()).join(''));
                                if(optionName.toLowerCase() != 'quality'){
                                    img_url_arr.push(productVarinatOptionsWithValues[i].values[0].replace('ctw', 'ct').split('-').map(e => e.trim()).join(''));
                                }
                            }
                        }
                    }
                } else if (Number(metalsCount) > 0) {
                    optionValues.push(metalCarat);
                    let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                    metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                    img_url_arr.push(metalValue);
                    img_url_arr_alternate.push(metalValue);
                }
            } else {
                if (metal?.length > 0) {
                    if (getUrlParameter('filter.p.m.custom.metal') != undefined && getUrlParameter('filter.p.m.custom.metal') != 'Two-Toned+Gold') {
                        metal = getUrlParameter('filter.p.m.custom.metal').replaceAll('+', ' ');
                        metal = metal.trim();
                    }
                    optionValues.push(metalCarat);
                    let metalValue = metal == 'Platinum' ? 'whitegold' : metal.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and').removeValueWithRegex('14k').removeValueWithRegex('18k');
                    metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                    img_url_arr.push(metalValue);
                    img_url_arr_alternate.push(metalValue);
                }

                if (Number(materialsCount) > 0) {
                    img_url_arr.push(`labgrowndiamond`);
                    img_url_arr_alternate.push(`labgrowndiamond`);
                }

                if (Number(attributesCenterStoneCount) > 0) {
                    img_url_arr.push(`${getUrlParameter('filter.p.m.custom.shape')?.length > 0 ? getUrlParameter('filter.p.m.custom.shape').replace('+', '') : shape.replace('+', '')}`);
                    img_url_arr.push(defaultCaratWeight);
                    img_url_arr_alternate.push(`${getUrlParameter('filter.p.m.custom.shape')?.length > 0 ? getUrlParameter('filter.p.m.custom.shape').replace('+', '') : shape.replace('+', '')}`);
                    img_url_arr_alternate.push(defaultCaratWeight);
                }

                if (Number(sideStoneCount) > 1) {
                    img_url_arr.push(`labgrowndiamond`);
                    img_url_arr.push(sideStoneShapes);
                    img_url_arr_alternate.push(`labgrowndiamond`);
                    img_url_arr_alternate.push(sideStoneShapes);
                }
            }

            if (optionValues?.length > 0) {
                const selectElement = document.getElementById(`variant-${productHandle}`);
                const matchingOption = Array.from(selectElement.options).find(option => option.text === optionValues.join(' / '));
                if (matchingOption) {
                    document.getElementById(`${productHandle}-money`) && (document.getElementById(`${productHandle}-money`).dataset.collectionPrice = matchingOption?.dataset?.variant_price || optionPrice);
                    if (document.getElementById(`${productHandle}-compare-at-price-money`)) {
                        document.getElementById(`${productHandle}-compare-at-price-money`).dataset.collectionPrice = matchingOption?.dataset?.variant_compare_at_price || optionCompareAtPrice;
                    }
                    variantId = matchingOption.value;
                    element.dataset.optionPrice = 0;
                    element.dataset.optionCompareAtPrice = 0;
                }
            }

            let queryShapeParams = 'shape', queryVariantParams = 'variant';
            if (document.getElementById(`${productHandle}-product-title`)) {
                let productTitle = document.getElementById(`${productHandle}-product-title`);
                if (productTitle.getAttribute('href')?.includes(queryParams) == true) {
                    productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryParams, metalCarat));
                } else {
                    productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryParams}=${metalCarat}` : `${productTitle.getAttribute('href')}?${queryParams}=${metalCarat}`);
                }
                if(dataDefaultQuality != ''){
                    if (productTitle.getAttribute('href')?.includes(queryParamsOptionArr[0]) == true) {
                        productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryParamsOptionArr[0], dataDefaultQuality));
                    } else {
                        productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryParamsOptionArr[0]}=${dataDefaultQuality}` : `${productTitle.getAttribute('href')}?$${queryParamsOptionArr[0]}=${dataDefaultQuality}`);
                    }
                }
                if(dataDefaultCarat != ''){
                    if (productTitle.getAttribute('href')?.includes(queryParamsOptionArr[1]) == true) {
                        productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryParamsOptionArr[1], dataDefaultCarat));
                    } else {
                        productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryParamsOptionArr[1]}=${dataDefaultCarat}` : `${productTitle.getAttribute('href')}?$${queryParamsOptionArr[1]}=${dataDefaultCarat}`);
                    }
                }
                if (productTitle.getAttribute('href')?.includes(queryShapeParams) == true) {
                    productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryShapeParams, dataDefaultShape));
                } else {
                    productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryShapeParams}=${dataDefaultShape.replace('+', ' ')}` : `${productTitle.getAttribute('href')}?${queryShapeParams}=${dataDefaultShape.replace('+', ' ')}`);
                }
                if (variantId?.length > 0) {
                    if (productTitle.getAttribute('href')?.includes(queryVariantParams) == true) {
                        productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryVariantParams, variantId));
                    } else {
                        productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryVariantParams}=${variantId}` : `${productTitle.getAttribute('href')}?${queryVariantParams}=${variantId}`);
                    }
                }
            }
            if (document.getElementById(`${productHandle}-image-url`)) {
                let productImageURL = document.getElementById(`${productHandle}-image-url`);
                 if (productImageURL.getAttribute('href')?.includes(queryParams) == true) {
                   var timestamp = Math.floor(Date.now() / 1000);
                    productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&t=${timestamp}` : `${productImageURL.getAttribute('href')}?t=${timestamp}`);
                 } else {
                      var timestamp = Math.floor(Date.now() / 1000);
                    productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&t=${timestamp}` : `${productImageURL.getAttribute('href')}?t=${timestamp}`);
                }  
                if (productImageURL.getAttribute('href')?.includes(queryParams) == true) {
                    productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryParams, metalCarat));
                } else {
                    productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryParams}=${metalCarat}` : `${productImageURL.getAttribute('href')}?${queryParams}=${metalCarat}`);
                }
                if(dataDefaultQuality != ''){
                    if (productImageURL.getAttribute('href')?.includes(queryParamsOptionArr[0]) == true) {
                        productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryParamsOptionArr[0], dataDefaultQuality));
                    } else {
                        productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryParamsOptionArr[0]}=${dataDefaultQuality}` : `${productImageURL.getAttribute('href')}?$${queryParamsOptionArr[0]}=${dataDefaultQuality}`);
                    }
                }
                if(dataDefaultCarat != ''){
                    if (productImageURL.getAttribute('href')?.includes(queryParamsOptionArr[1]) == true) {
                        productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryParamsOptionArr[1], dataDefaultCarat));
                    } else {
                        productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryParamsOptionArr[1]}=${dataDefaultCarat}` : `${productImageURL.getAttribute('href')}?$${queryParamsOptionArr[1]}=${dataDefaultCarat}`);
                    }
                }
                if (productImageURL.getAttribute('href')?.includes(queryShapeParams) == true) {console.log('shape if', dataDefaultShape);
                    productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryShapeParams, dataDefaultShape.replace('+', ' ')));
                } else {
                    productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryShapeParams}=${dataDefaultShape.replace('+', ' ')}` : `${productImageURL.getAttribute('href')}?${queryShapeParams}=${dataDefaultShape.replace('+', ' ')}`);
                }
                if (variantId?.length > 0) {
                    if (productImageURL.getAttribute('href')?.includes(queryVariantParams) == true) {
                        productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryVariantParams, variantId));
                    } else {
                        productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryVariantParams}=${variantId}` : `${productImageURL.getAttribute('href')}?${queryVariantParams}=${variantId}`);
                    }
                }
            }
            imageUrl = img_url_arr.join('-').removeValueWithRegex(' ').titleCase('-').toLocaleLowerCase();
            imageUrlAlternate = img_url_arr_alternate.join('-').removeValueWithRegex(' ').titleCase('-').toLocaleLowerCase();
            await customImageAndVideoConventionCollections('image', imageUrl, imageUrlAlternate, productHandle, dataDefaultPosition, dataDefaultHoverPosition, defaultExtension?.length > 0 ? defaultExtension : 'webp', optionPrice, optionCompareAtPrice);
        });
    }else{
      $('.collection-matrix .product__thumbnail .thumbnail__loading-icon').removeClass('loader__active');
    }
};
document.addEventListener("DOMContentLoaded", async () => await onLoadSwatchCollectionSelected());

async function getSwatchCollectionSelectedFun(handle, isBundleProduct = 'No') {
    let _this = document.querySelector(`.swatch-collection-selected.active[data-product-handle="${handle}"]`),
        shapeItemSelectedElement = document.querySelector(`.swatch-collection-shape-item-selected.shape-item.active[data-handle="${handle}"]`),
        metal = _this?.dataset?.metal,
        metalCarat = _this?.dataset?.metalCarat,
        shape = shapeItemSelectedElement?.dataset?.shape?.length > 0 ? shapeItemSelectedElement?.dataset?.shape : defaultShape,
        productHandle = _this?.dataset?.productHandle,
        dataDefaultQuality = _this?.dataset?.defaultQuality?.length > 0 ? _this?.dataset?.defaultQuality : '',
        dataDefaultCarat = _this?.dataset?.defaultCarat?.length > 0 ? _this?.dataset?.defaultCarat : '',
        dataDefaultPosition = _this?.dataset?.defaultPosition?.length > 0 ? _this?.dataset?.defaultPosition : defaultPosition,
        dataDefaultHoverPosition = _this?.dataset?.defaultHoverPosition?.length > 0 ? _this?.dataset?.defaultHoverPosition : defaultHoverPosition,
        extension = _this?.dataset?.defaultExtension,
        optionPrice = _this?.dataset?.optionPrice,
        optionCompareAtPrice = _this?.dataset?.optionCompareAtPrice || 0,
        basicBuilder = _this?.dataset?.basicBuilder,
        productVariants = _this?.dataset?.productVariants,
        productVarinatOptionsWithValues = _this?.innerText,
        attributesCenterStoneCount = _this?.dataset?.attributesCenterStoneCount,
        materialsCount = _this?.dataset?.materialsCount,
        metalsCount = _this?.dataset?.metalsCount,
        sideStoneShapes = _this?.dataset?.sideStoneShapes,
        sideStoneCount = _this?.dataset?.sideStoneCount,
        image_disclaimer = _this?.dataset?.disclaimer;
        
    let productCard = _this?.closest('.product-wrap');
    let labelEl = productCard.querySelector('.list-dtllable');
    let data_grid = _this?.closest('.plp-grid-new')?.getAttribute('collection-mobile-layout');
    if (image_disclaimer) {
        labelEl.innerHTML = `<span>${image_disclaimer}</span>`;
        //labelEl.style.display = 'block';
    } 

    let img_url_arr = [];
    let img_url_arr_alternate = [];    
    if (isBundleProduct == "Yes" && document.querySelector(`.shape-item.active[data-handle="${handle}"]`)) {
        img_url_arr.push(document.querySelector(`.shape-item.active[data-handle="${handle}"]`).dataset?.shapeHandle);
        img_url_arr_alternate.push(document.querySelector(`.shape-item.active[data-handle="${handle}"]`).dataset?.shapeHandle);
    } else {
        img_url_arr.push(productHandle);
        img_url_arr_alternate.push(productHandle);
    }

    let queryParams = 'solid_metal';
    let queryParamsOption = 'Quality,Carat_Weight';
    let queryParamsOptionArr = queryParamsOption.split(',');
    let variantId = '';
    let optionValues = [];
    if (Number(basicBuilder) == 1 && Number(productVariants) > 1) {
        productVarinatOptionsWithValues = JSON.parse(productVarinatOptionsWithValues);
        if (productVarinatOptionsWithValues?.length > 0) {
            const isMetalExistsInArray = productVarinatOptionsWithValues.some(obj => ['Metal', 'Metal Type', 'Material'].includes(obj.name) == true);
            for (let i = 0; i < productVarinatOptionsWithValues?.length; i++) {
                let optionName = productVarinatOptionsWithValues[i].name;
                if (['Metal', 'Metal Type', 'Material'].includes(optionName) == true) {
                    optionValues.push(metalCarat);
                    queryParams = optionName.replace(' ', '_');
                    let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                    metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                    img_url_arr.push(metalValue);
                    img_url_arr_alternate.push(metalValue);
                } else {
                    if (Number(metalsCount) > 0 && isMetalExistsInArray == false) {
                        optionValues.push(metalCarat);
                        let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                        metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                        img_url_arr.push(metalValue);
                        img_url_arr_alternate.push(metalValue);
                    }

                    if (productVarinatOptionsWithValues[i].values?.length > 0) {
                        optionValues.push(productVarinatOptionsWithValues[i].values[0]);
                        img_url_arr_alternate.push(productVarinatOptionsWithValues[i].values[0].replace('ctw', 'ct').split('-').map(e => e.trim()).join(''));
                        if(optionName.toLowerCase() != 'quality'){
                            img_url_arr.push(productVarinatOptionsWithValues[i].values[0].replace('ctw', 'ct').split('-').map(e => e.trim()).join(''));
                        }
                    }
                }
            }
        } else if (Number(metalsCount) > 0) {
            optionValues.push(metalCarat);
            let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
            metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
            img_url_arr.push(metalValue);
            img_url_arr_alternate.push(metalValue);
        }
    } else {
        if (metal?.length > 0) {
            optionValues.push(metalCarat);
            let metalValue = metal == 'Platinum' ? 'whitegold' : metal.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and').removeValueWithRegex('14k').removeValueWithRegex('18k');
            metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
            img_url_arr.push(metalValue);
            img_url_arr_alternate.push(metalValue);
        }

        if (Number(materialsCount) > 0) {
            img_url_arr.push(`labgrowndiamond`);
            img_url_arr_alternate.push(`labgrowndiamond`);
        }

        if (Number(attributesCenterStoneCount) > 0) {
            img_url_arr.push(`${getUrlParameter('filter.p.m.custom.shape')?.length > 0 ? shape.replace('+', '') : shape.replace('+', '')}`);
            img_url_arr.push(defaultCaratWeight);
            img_url_arr_alternate.push(`${getUrlParameter('filter.p.m.custom.shape')?.length > 0 ? shape.replace('+', '') : shape.replace('+', '')}`);
            img_url_arr_alternate.push(defaultCaratWeight);
        }

        if (Number(sideStoneCount) > 1) {
            img_url_arr.push(`labgrowndiamond`);
            img_url_arr.push(sideStoneShapes);
            img_url_arr_alternate.push(`labgrowndiamond`);
            img_url_arr_alternate.push(sideStoneShapes);
        }
    }

    if (optionValues?.length > 0) {
        const selectElement = document.getElementById(`variant-${productHandle}`);
        const matchingOption = Array.from(selectElement.options).find(option => option.text === optionValues.join(' / '));
        if (matchingOption) {
            document.getElementById(`${productHandle}-money`) && (document.getElementById(`${productHandle}-money`).dataset.collectionPrice = matchingOption?.dataset?.variant_price || optionPrice);
            if (document.getElementById(`${productHandle}-compare-at-price-money`)) {
                document.getElementById(`${productHandle}-compare-at-price-money`).dataset.collectionPrice = matchingOption?.dataset?.variant_compare_at_price || optionCompareAtPrice;
            }
            variantId = matchingOption.value;
            _this.dataset.optionPrice = 0;
            _this.dataset.optionCompareAtPrice = 0;
        }
    }

    let queryShapeParams = 'shape', queryVariantParams = 'variant';
    if (document.getElementById(`${productHandle}-product-title`)) {
        let productTitle = document.getElementById(`${productHandle}-product-title`);
        if (productTitle.getAttribute('href')?.includes(queryParams) == true) {
            productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryParams, metalCarat));
        } else {
            productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryParams}=${metalCarat}` : `${productTitle.getAttribute('href')}?${queryParams}=${metalCarat}`);
        }
        if(dataDefaultQuality != ''){
            if (productTitle.getAttribute('href')?.includes(queryParamsOptionArr[0]) == true) {
                productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryParamsOptionArr[0], dataDefaultQuality));
            } else {
                productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryParamsOptionArr[0]}=${dataDefaultQuality}` : `${productTitle.getAttribute('href')}?$${queryParamsOptionArr[0]}=${dataDefaultQuality}`);
            }
        }
        if(dataDefaultCarat != ''){
            if (productTitle.getAttribute('href')?.includes(queryParamsOptionArr[1]) == true) {
                productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryParamsOptionArr[1], dataDefaultCarat));
            } else {
                productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryParamsOptionArr[1]}=${dataDefaultCarat}` : `${productTitle.getAttribute('href')}?$${queryParamsOptionArr[1]}=${dataDefaultCarat}`);
            }
        }
        if (productTitle.getAttribute('href')?.includes(queryShapeParams) == true) {
            productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryShapeParams, shape.replace('+', ' ')));
        } else {
            productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryShapeParams}=${shape.replace('+', ' ')}` : `${productTitle.getAttribute('href')}?${queryShapeParams}=${shape.replace('+', ' ')}`);
        }
        if (variantId?.length > 0) {
            if (productTitle.getAttribute('href')?.includes(queryVariantParams) == true) {
                productTitle.setAttribute('href', updateQueryString(productTitle.getAttribute('href'), queryVariantParams, variantId));
            } else {
                productTitle.setAttribute('href', productTitle.getAttribute('href')?.includes('?') == true ? `${productTitle.getAttribute('href')}&${queryVariantParams}=${variantId}` : `${productTitle.getAttribute('href')}?${queryVariantParams}=${variantId}`);
            }
        }
    }
    if (document.getElementById(`${productHandle}-image-url`)) {
        let productImageURL = document.getElementById(`${productHandle}-image-url`);
        if (productImageURL.getAttribute('href')?.includes(queryParams) == true) {
            productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryParams, metalCarat));
        } else {
            productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryParams}=${metalCarat}` : `${productImageURL.getAttribute('href')}?${queryParams}=${metalCarat}`);
        }
        if(dataDefaultQuality != ''){
            if (productImageURL.getAttribute('href')?.includes(queryParamsOption) == true) {
                productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryParamsOption, dataDefaultQuality));
            } else {
                productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryParamsOption}=${dataDefaultQuality}` : `${productImageURL.getAttribute('href')}?$${queryParamsOption}=${dataDefaultQuality}`);
            }
        }
        if(dataDefaultCarat != ''){
            if (productImageURL.getAttribute('href')?.includes(queryParamsOption) == true) {
                productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryParamsOption, dataDefaultCarat));
            } else {
                productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryParamsOption}=${dataDefaultCarat}` : `${productImageURL.getAttribute('href')}?$${queryParamsOption}=${dataDefaultCarat}`);
            }
        }
        if (productImageURL.getAttribute('href')?.includes(queryShapeParams) == true) {
            productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryShapeParams, shape.replace('+', ' ')));
        } else {
            productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryShapeParams}=${shape.replace('+', ' ')}` : `${productImageURL.getAttribute('href')}?${queryShapeParams}=${shape.replace('+', ' ')}`);
        }
        if (variantId?.length > 0) {
            if (productImageURL.getAttribute('href')?.includes(queryVariantParams) == true) {
                productImageURL.setAttribute('href', updateQueryString(productImageURL.getAttribute('href'), queryVariantParams, variantId));
            } else {
                productImageURL.setAttribute('href', productImageURL.getAttribute('href')?.includes('?') == true ? `${productImageURL.getAttribute('href')}&${queryVariantParams}=${variantId}` : `${productImageURL.getAttribute('href')}?${queryVariantParams}=${variantId}`);
            }
        }
    }

    const wishlistEl = document.querySelector(`#wishlist-plp-${productHandle}`);
    if(wishlistEl){
        wishlistEl.setAttribute('variant-id', variantId);
    }

    imageUrl = img_url_arr.join('-').removeValueWithRegex(' ').titleCase('-').toLocaleLowerCase();
    imageUrlAlternate = img_url_arr_alternate.join('-').removeValueWithRegex(' ').titleCase('-').toLocaleLowerCase();
    await customImageAndVideoConventionCollections('image', imageUrl, imageUrlAlternate, productHandle, dataDefaultPosition, dataDefaultHoverPosition, extension?.length > 0 ? extension : 'webp', optionPrice, optionCompareAtPrice);
};

async function changeBundleProduct(handle, bundleHandle, isBundleProduct) {
    if (bundleHandle != null) {
        await fetch(`/products/${bundleHandle}.js`)
        .then(response => response.json())
        .then(async product => {
            if (document.getElementById(`${handle}-product-title`)) {
                const productTitleElement = document.getElementById(`${handle}-product-title`);
                // productTitleElement.innerHTML = product.title;
                const newURL = updateCurrentUrlWithProductHandle(bundleHandle, `${window.location.origin}${productTitleElement.getAttribute('href')}`);
                productTitleElement.setAttribute('href', newURL);
            }
            if (document.getElementById(`${handle}-image-url`)) {
                const productImageURLElement = document.getElementById(`${handle}-image-url`);
                const newURL = updateCurrentUrlWithProductHandle(bundleHandle, `${window.location.origin}${productImageURLElement.getAttribute('href')}`);
                productImageURLElement.setAttribute('href', newURL);
            }
    
            const selectedMetal = document.querySelector(`.swatch-collection-selected.active[data-product-handle="${handle}"]`).dataset.metalCarat;
            const selectedVariant = product.variants.find(e => e.option1 == selectedMetal) || {};
            let selectedExtraCollPrice = (Number(document.querySelector(`.swatch-collection-selected.active[data-product-handle="${handle}"]`).dataset.collectionProductPrice) * 100);
            if(isNaN(selectedExtraCollPrice)){selectedExtraCollPrice=0;}
            if (Object.keys(selectedVariant)?.length > 0) {
                if (document.getElementById(`${handle}-money`)) {
                    const mainPriceElement = document.getElementById(`${handle}-money`);
                    let _mainPrice = (selectedVariant?.price + selectedExtraCollPrice);
                    mainPriceElement.setAttribute('data-collection-price', _mainPrice);
                    mainPriceElement.innerHTML = formatMoneyInCollection(_mainPrice);
                }
                if (document.getElementById(`${handle}-compare-at-price-money`)) {
                    const compareAtPriceElement = document.getElementById(`${handle}-compare-at-price-money`);
                    compareAtPriceElement.parentElement.style.display = !selectedVariant?.compare_at_price ? 'none' : '';
                    let _compareAtPrice = (selectedVariant?.compare_at_price + selectedExtraCollPrice);
                    compareAtPriceElement.setAttribute('data-collection-price', _compareAtPrice);
                    compareAtPriceElement.innerHTML = formatMoneyInCollection(_compareAtPrice);
    
                    if (document.getElementById(`${handle}-sale-badge`)) {
                        document.getElementById(`${handle}-sale-badge`).style.display = !selectedVariant?.compare_at_price ? 'none' : '';
                    }
                }
    
                if (product.variants?.length > 0 && document.getElementById(`variant-${handle}`)) {
                    const selectElement = document.getElementById(`variant-${handle}`);
    
                    // Clear all existing options
                    selectElement.innerHTML = '';
                    product.variants.forEach(function (item) {
                        // Create a new <option> element
                        const newOption = document.createElement('option');
                        newOption.text = item?.title;
                        newOption.value = item?.title;
    
                        // Set the data attribute
                        newOption.setAttribute(`data-variant_price`, (item?.price + selectedExtraCollPrice));
                        item?.compare_at_price && (newOption.setAttribute(`data-variant_compare_at_price`, (item?.compare_at_price + selectedExtraCollPrice)));
    
                        // Add the new option to the <select> element
                        selectElement.appendChild(newOption);
                    });
                }
            }
            await getSwatchCollectionSelectedFun(handle, isBundleProduct);
        })
        .catch(error => console.error('Error loading section:', error));
    }
};

async function swatchCollectionSelectedFun(e, type, isBundleProduct = 'No') {
    let _this = e, handle = _this?.dataset.handle;
    if (type == 'metal') {
        const metalColor = _this?.dataset?.metalColor;
        const ctwFraction = _this?.dataset?.ctwFraction!=''?_this?.dataset?.ctwFraction:'1 - 7';
        Array.from(document.querySelectorAll(`.swatch[data-handle="${handle}"]`)).forEach(e => e.classList.remove('active'));
        Array.from(document.querySelectorAll(`.swatch-collection-selected[data-product-handle="${handle}"]`)).forEach(e => e.classList.remove('active'));
        if (document.querySelector(`.swatch-collection-selected.${metalColor}[data-product-handle="${handle}"]`)) {
            document.querySelector(`.swatch-collection-selected.${metalColor}[data-product-handle="${handle}"]`).classList.add('active');
            if(document.querySelector(`.plp-carat-value[data-handle="${handle}"]`)){
                document.querySelector(`.plp-carat-value[data-handle="${handle}"]`).innerHTML = ctwFraction;
            }
        }

        const hiddenMetalElement = document.querySelector(`.swatch-collection-selected.active[data-product-handle="${handle}"]`);
        document.getElementById(`metal-text-${handle}`) && (document.getElementById(`metal-text-${handle}`).innerText = hiddenMetalElement?.dataset?.metal);
    } else if (type == 'shape') {
        let is_multi_carat = _this?.dataset.multiCarat, multi_text_text = '';
        if(is_multi_carat == 'yes'){
            multi_text_text = '(multiple carat weights available)';
        }
        document.getElementById(`shape-text-${handle}`) && (document.getElementById(`shape-text-${handle}`).innerText = _this?.dataset?.shape.replace(' Cut', '')+ ' '+ multi_text_text);
        Array.from(document.querySelectorAll(`.shape-item[data-handle="${handle}"]`)).forEach(e => e.classList.remove('active'));
    }
    _this.classList.add('active');
    const pressedGroup = type == 'metal' ? `.swatch[data-handle="${handle}"]` : `.shape-item[data-handle="${handle}"]`;
    Array.from(document.querySelectorAll(pressedGroup)).forEach(el => {
        if (el.hasAttribute('aria-pressed')) el.setAttribute('aria-pressed', el.classList.contains('active') ? 'true' : 'false');
    });
    if (type == 'shape' && isBundleProduct == "Yes" && document.querySelector(`.shape-item.active[data-handle="${handle}"]`)) {
        const bundleHandle = document.querySelector(`.shape-item.active[data-handle="${handle}"]`).dataset?.shapeHandle;
        await changeBundleProduct(handle, bundleHandle, isBundleProduct);
    } else {
        await getSwatchCollectionSelectedFun(handle, isBundleProduct);
    }
};
