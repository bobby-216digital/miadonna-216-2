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

function removeAttributes(element, ...attrs) {
    attrs.forEach(attr => element.removeAttribute(attr))
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
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
    const productImageMain = document.getElementById(`${handle}-main`) || "";
    if (type == 'image') {
        let imageURL = `${baseUrl}/${url}-${position}-web.${extension}?width=600`;
        let imageUrlAlternate = `${baseUrl}/${url_alternate}-${position}-web.${extension}?width=600`;

        let mainErrorURL = productImageMain?.dataset?.onError != undefined ? `this.src='${baseUrl}/${productImageMain?.dataset?.onError}'` : '';
        
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
            if (Number(basicBuilder) == 1 && Number(productVariants) > 1) {
                productVarinatOptionsWithValues = JSON.parse(productVarinatOptionsWithValues);
                if (productVarinatOptionsWithValues?.length > 0) {
                    const isMetalExistsInArray = productVarinatOptionsWithValues.some(obj => ['Metal', 'Metal Type', 'Material'].includes(obj.name) == true);
                    for (let i = 0; i < productVarinatOptionsWithValues?.length; i++) {
                        let optionName = productVarinatOptionsWithValues[i].name;
                        if (['Metal', 'Metal Type', 'Material'].includes(optionName) == true) {
                            let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                            metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                            queryParams = optionName.replace(' ', '_');
                            img_url_arr.push(metalValue);
                            img_url_arr_alternate.push(metalValue);
                        } else {
                            if (Number(metalsCount) > 0 && isMetalExistsInArray == false) {
                                let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                                metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                                img_url_arr.push(metalValue);
                                img_url_arr_alternate.push(metalValue);
                            }
                            if (productVarinatOptionsWithValues[i].values?.length > 0) {
                                img_url_arr_alternate.push(productVarinatOptionsWithValues[i].values[0].replace('ctw', 'ct').split('-').map(e => e.trim()).join(''));
                                if(optionName.toLowerCase() != 'quality'){
                                    img_url_arr.push(productVarinatOptionsWithValues[i].values[0].replace('ctw', 'ct').split('-').map(e => e.trim()).join(''));
                                }
                            }
                        }
                    }
                } else if (Number(metalsCount) > 0) {
                    let metalValue = metalCarat == 'Platinum' ? 'whitegold' : metalCarat.removeValueWithRegex('-').removeValueWithRegex('14K').removeValueWithRegex('18K').removeValueWithRegex('and');
                    metalValue.replace('ctw', 'ct').split('-').map(e => e.trim()).join('');
                    img_url_arr.push(metalValue);
                    img_url_arr_alternate.push(metalValue);
                }
            } else {
                if (metal?.length > 0) {
                    if (getUrlParameter('filter.p.m.custom.metal') != undefined) {
                        metal = getUrlParameter('filter.p.m.custom.metal').replaceAll('+', ' ');
                        metal = metal.trim();
                    }
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

            imageUrl = img_url_arr.join('-').removeValueWithRegex(' ').titleCase('-').toLocaleLowerCase();
            imageUrlAlternate = img_url_arr_alternate.join('-').removeValueWithRegex(' ').titleCase('-').toLocaleLowerCase();
            await customImageAndVideoConventionCollections('image', imageUrl, imageUrlAlternate, productHandle, dataDefaultPosition, dataDefaultHoverPosition, defaultExtension?.length > 0 ? defaultExtension : 'webp', optionPrice, optionCompareAtPrice);
        });
    }else{
      $('.collection-matrix .product__thumbnail .thumbnail__loading-icon').removeClass('loader__active');
    }
};
document.addEventListener("DOMContentLoaded", async () => await onLoadSwatchCollectionSelected());