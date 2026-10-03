const moneyFormat = document.currentScript.getAttribute('money-format') || "${{amount}}";
const cartCurrencyIsoCode = document.currentScript.getAttribute('cart-currency-iso-code') || "";


const $slider_carat = document.getElementById('slider_carat_mia');
const $slider_price = document.getElementById('slider_price_mia');
const $slider_clarity = document.getElementById('slider_clarity_mia');
const $slider_cut = document.getElementById('slider_cut_mia');
const $slider_ratio = document.getElementById('slider_ratio_mia');
const $slider_table = document.getElementById('slider_table_mia');
const $slider_depth = document.getElementById('slider_depth_mia');
const $slider_color = document.getElementById('slider_color_mia');
let isProgrammaticChange = false;
let isProgrammaticPriceChange = false;
$slider_carat && $slider_carat.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_price && $slider_price.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_ratio && $slider_ratio.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_table && $slider_table.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_depth && $slider_depth.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_color && $slider_color.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_cut && $slider_cut.addCSS(`.mark-value{ text-transform: uppercase; }`);

/* Mobile View */
const $slider_carat_mobile = document.getElementById('slider_carat_mia_mobile');
const $slider_price_mobile = document.getElementById('slider_price_mia_mobile');
const $slider_clarity_mobile = document.getElementById('slider_clarity_mia_mobile');
const $slider_cut_mobile = document.getElementById('slider_cut_mia_mobile');
const $slider_ratio_mobile = document.getElementById('slider_ratio_mia_mobile');
const $slider_table_mobile = document.getElementById('slider_table_mia_mobile');
const $slider_depth_mobile = document.getElementById('slider_depth_mia_mobile');
const $slider_color_mobile = document.getElementById('slider_color_mia_mobile');

$slider_carat_mobile && $slider_carat_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_price_mobile && $slider_price_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_ratio_mobile && $slider_ratio_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_table_mobile && $slider_table_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_depth_mobile && $slider_depth_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_color_mobile && $slider_color_mobile.addCSS(`.tooltip::after{ transform: translate(22%, 23%) rotate(45deg); }`);
$slider_cut_mobile && $slider_cut_mobile.addCSS(`.mark-value{ text-transform: uppercase; }`);
/* END */

$slider_price.formatTooltipValue = (value) => Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 });
$slider_price_mobile.formatTooltipValue = (value) => Number(value).toLocaleString('en-US', { minimumFractionDigits: 2 });

let ajaxCallDiamondListRunning = 'No', myCustomController = null, isQueryParams = 'No', totalResultIndex = 0;
let ajaxPaginationClick = 'No';

updateRangeFilterText({
  sliderId: "slider_carat_mia_mobile",
  labelSelector: ".carat-filter-name",
  unit: "ct",
    beforeunit : '',
  decimals : 2,
  roundvalue : false
});
// updateRangeFilterText({
//   sliderId: "slider_color_mia_mobile",
//   labelSelector: ".color-filter-name",
//   unit: ""
// });
updateRangeFilterText({
  sliderId: "slider_price_mia_mobile",
  labelSelector: ".price-filter-name",
  unit: "",
  beforeunit : "$"
});
// updateRangeFilterText({
//   sliderId: "slider_clarity_mia_mobile",
//   labelSelector: ".clarity-filter-name",
//   unit: "",
//   beforeunit : ""
// });
// updateRangeFilterText({
//   sliderId: "slider_cut_mia_mobile",
//   labelSelector: ".cut-filter-name",
//   unit: "",
//   beforeunit : ""
// });
updateRangeFilterText({
  sliderId: "slider_ratio_mia",
  labelSelector: ".ratio-filter-name",
  unit: "",
  beforeunit : ""
});
updateRangeFilterText({
  sliderId: "slider_table_mia_mobile",
  labelSelector: ".table-filter-name",
  unit: "%",
  beforeunit : ""
});
updateRangeFilterText({
  sliderId: "slider_depth_mia_mobile",
  labelSelector: ".depth-filter-name",
  unit: "%",
  beforeunit : ""
});
//detailDiamondLListDrawer();
window.LB_GROWN_DIAMOND = function () {
    return {
        config: {},
        callMinAndMaxDiamondList: async function () {
            /*var formData = new FormData();
            formData.append("action", "fetch_min_max_labgrown_products");
            formData.append("shop", Shopify.shop);
            var requestOptions = { method: 'POST', body: formData };

            window.LB_GROWN_DIAMOND.showElements('.vdb-load-more-div');
            fetch("/apps/vdb-maidonna-inventory-app/frontend.php", requestOptions)
            .then(response => response.text())
            .then(async result => {
                var resultArray = JSON.parse(result);
                if (resultArray?.status == 'success' && Object.keys(resultArray?.data)?.length > 0) {
                    if (window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle')===undefined) {
                        if (window.LB_GROWN_DIAMOND.getUrlParameter('min_carat') !== undefined && window.LB_GROWN_DIAMOND.getUrlParameter('max_carat') !== undefined) {
                            $slider_carat.value1 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('min_carat')).toFixed(2);
                            $slider_carat.value2 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('max_carat')).toFixed(2);

                            $slider_carat_mobile.value1 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('min_carat')).toFixed(2);
                            $slider_carat_mobile.value2 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('max_carat')).toFixed(2);
                        }
                        
                        if (window.LB_GROWN_DIAMOND.getUrlParameter('min_carat') === undefined) {
                            $slider_carat.setAttribute('value1', '1');
                        }

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

                    if (window.LB_GROWN_DIAMOND.getUrlParameter('min_price') !== undefined && window.LB_GROWN_DIAMOND.getUrlParameter('min_price') !== undefined) {
                        $slider_price.value1 = parseInt(window.LB_GROWN_DIAMOND.getUrlParameter('min_price'));
                        $slider_price.value2 = parseInt(window.LB_GROWN_DIAMOND.getUrlParameter('max_price'));

                        $slider_price_mobile.value1 = parseInt(window.LB_GROWN_DIAMOND.getUrlParameter('min_price'));
                        $slider_price_mobile.value2 = parseInt(window.LB_GROWN_DIAMOND.getUrlParameter('max_price'));
                    }
                }
                await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
            })
            .catch(error => console.log('error', error));*/

            /* if (window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle')===undefined) {
                if (window.LB_GROWN_DIAMOND.getUrlParameter('min_carat') !== undefined && window.LB_GROWN_DIAMOND.getUrlParameter('max_carat') !== undefined) {
                    $slider_carat.value1 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('min_carat')).toFixed(2);
                    $slider_carat.value2 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('max_carat')).toFixed(2);

                    $slider_carat_mobile.value1 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('min_carat')).toFixed(2);
                    $slider_carat_mobile.value2 = parseFloat(window.LB_GROWN_DIAMOND.getUrlParameter('max_carat')).toFixed(2);
                }
            } */
            await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
        },
        callBeforeLGDiamond: async function () {
            
            if (myCustomController !== null) {
                myCustomController.abort();
            }
            //document.querySelector(".diamond-loader").classList.remove('hide');
            totalResultIndex = 0;
            window.LB_GROWN_DIAMOND.config.page_number = 1;
            ajaxCallDiamondListRunning = 'No';
            document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
            document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '';
            document.querySelector("#table-id tbody").innerHTML = "";
            window.LB_GROWN_DIAMOND.hideElements('.vdb-container--pagination'); // window.LB_GROWN_DIAMOND.hideElements('.vdb-see-more-div');
            await window.LB_GROWN_DIAMOND?.callDiamondList();
        },
        callDiamondList: async function () {
           if (ajaxCallDiamondListRunning == 'No') {
                ajaxCallDiamondListRunning = 'Yes';
               var rows = [];
                sliderCaratValue1 = '';
                sliderCaratValue2 = '';
                if (defaultCaratMin?.length > 0 && defaultCaratMax?.length > 0) {
                    sliderCaratValue1 = $slider_carat?.value1;
                    sliderCaratValue2 = $slider_carat?.value2;
                }
                const page_number = window.LB_GROWN_DIAMOND?.config.page_number;
               
                var certifiedcount =          window.LB_GROWN_DIAMOND.config.certifiedByValue.split(",").length;
                var  firstcertified = window.LB_GROWN_DIAMOND.config.certifiedByValue.split(",")[0];
                if(certifiedcount >  0){
                        var certifiedcount = certifiedcount - 1;
                }else{
                    if(window.LB_GROWN_DIAMOND.config.certifiedByValue.split(",").length > 1){
                        var  firstcertified = window.LB_GROWN_DIAMOND.config.certifiedByValue.split(",")[1];
                    }
                } 
                   var certifiedcountmore = certifiedcount;
                if(certifiedcount ==  0){
                    certifiedcount = '';
                     certifiedcountmore = '';
                }else{
                    var certifiedcount = '+ '+certifiedcount;
                      var certifiedcountmore = '+ '+certifiedcountmore+' more';
                }
                updateSelectFilterText({
                        mainId: ".certified-filter-selected",
                        labelSelector: ".certified-filter-name",
                        text: firstcertified,
                        count: certifiedcountmore
                });

                var fluorescencecount =  window.LB_GROWN_DIAMOND.config.fluorescenceValue.split(",").length;
                var  firstfluorescence = window.LB_GROWN_DIAMOND.config.fluorescenceValue.split(",")[0];
                if(fluorescencecount >  0){
                        var fluorescencecount = fluorescencecount - 1;
                }else{
                    if(window.LB_GROWN_DIAMOND.config.fluorescenceValue.split(",").length > 1){
                        var  firstfluorescence = window.LB_GROWN_DIAMOND.config.fluorescenceValue.split(",")[1];
                    }
                } 
                var fluorescencecountText = fluorescencecount;
                if(fluorescencecount ==  0){
                    fluorescencecount = '';
                    fluorescencecountText = '';
                }else{
                    var fluorescencecount = '+ '+fluorescencecount;
                    var fluorescencecountText = '+ '+fluorescencecountText+' more';
                }
                updateSelectFilterText({
                        mainId: ".fluorescence-filter-selected",
                        labelSelector: ".fluorescence-filter-name",
                        text: firstfluorescence,
                        count: fluorescencecountText
                });
                

                var polishcount =  window.LB_GROWN_DIAMOND.config.polishValue.split(",").length;
                var  firstpolish = window.LB_GROWN_DIAMOND.config.polishValue.split(",")[0];
                if(polishcount >  0){
                        var polishcount = polishcount - 1;
                }else{
                    if(window.LB_GROWN_DIAMOND.config.polishValue.split(",").length > 1){
                        var  firstpolish = window.LB_GROWN_DIAMOND.config.polishValue.split(",")[1];
                    }
                } 
                   var polishcountmore = polishcount;
                if(polishcount ==  0){
                    polishcount = '';
                     polishcountmore = '';
                }else{
                    var polishcount = '+ '+polishcount;
                      var polishcountmore = '+ '+polishcountmore+' more';
                }
                updateSelectFilterText({
                        mainId: ".polish-filter-selected",
                        labelSelector: ".polish-filter-name",
                        text: firstpolish,
                        count: polishcountmore
                });

                var symmetrycount =  window.LB_GROWN_DIAMOND.config.symmetryValue.split(",").length;
                var  firstsymmetry = window.LB_GROWN_DIAMOND.config.symmetryValue.split(",")[0];
                if(symmetrycount >  0){
                        var symmetrycount = symmetrycount - 1;
                }else{
                    if(window.LB_GROWN_DIAMOND.config.symmetryValue.split(",").length > 1){
                        var  firstsymmetry = window.LB_GROWN_DIAMOND.config.symmetryValue.split(",")[1];
                    }
                } 
                var symmetrycountmore = symmetrycount;
                if(symmetrycount ==  0){
                    symmetrycount = '';
                      symmetrycountmore = '';
                }else{
                    var symmetrycount = '+ '+symmetrycount;
                      var symmetrycountmore = '+ '+symmetrycountmore+' more';
                }
                updateSelectFilterText({
                        mainId: ".symmetry-filter-selected",
                        labelSelector: ".symmetry-filter-name",
                        text: firstsymmetry,
                        count: symmetrycountmore
                });
                myCustomController = new AbortController();
                const myCustomSignal = myCustomController.signal;
                var formData = new FormData();
                formData.append("action", "fetch_labgrown_products");
                formData.append("shop", Shopify.shop);
                formData.append("page_number", page_number);
                formData.append("shape", window.LB_GROWN_DIAMOND.config.shapeValue);
                formData.append("shape_data", shapeData);
                formData.append("fancy_color", window.LB_GROWN_DIAMOND.config.fancyValues);

                formData.append("color", window.LB_GROWN_DIAMOND.config.colorValues);
                formData.append("color_data", colorData);

                formData.append("clarity", window.LB_GROWN_DIAMOND.config.clarityValues);
                formData.append("clarity_data", clarityData);

                formData.append("cut", window.LB_GROWN_DIAMOND.config.cutValues);
                formData.append("cut_data", cutData);

                formData.append("polish", window.LB_GROWN_DIAMOND.config.polishValue);
                formData.append("polish_data", polishData);

                formData.append("symmetry", window.LB_GROWN_DIAMOND.config.symmetryValue);
                formData.append("symmetry_data", symmetryData);
                
                formData.append("fluor", window.LB_GROWN_DIAMOND.config.fluorescenceValue);
                formData.append("fluor_data", fluorescenceData);
                formData.append("lab", window.LB_GROWN_DIAMOND.config.certifiedByValue);
                formData.append("lab_data", certifiedByData);

                formData.append("sustainability", window.LB_GROWN_DIAMOND.config.sustainabilityValue);
                formData.append("sustainability_data", sustainabilityData);

                 //formData.append("quality", window.LB_GROWN_DIAMOND.config.qualityValue);
                formData.append("quality", '');
                formData.append("quality_data", qualityData);

                formData.append("vendor", window.LB_GROWN_DIAMOND.config.vendorValue);

                formData.append("min_price", $slider_price ? Math.round($slider_price?.value1) : '');
                formData.append("max_price", $slider_price ? Math.round($slider_price?.value2) : '');
                formData.append("min_carat", sliderCaratValue1);
                formData.append("max_carat", sliderCaratValue2);
                formData.append("min_l_w_ratio", $slider_ratio ? $slider_ratio?.value1 : '');
                formData.append("max_l_w_ratio", $slider_ratio ? $slider_ratio?.value2 : '');
                formData.append("min_table", $slider_table ? $slider_table?.value1 : '');
                formData.append("max_table", $slider_table ? $slider_table?.value2 : '');
                formData.append("min_depth", $slider_depth ? $slider_depth?.value1 : '');
                formData.append("max_depth", $slider_depth ? $slider_depth?.value2 : '');
                formData.append("sorting_field", window.LB_GROWN_DIAMOND.config.sortingField);
                formData.append("sorting_seq", window.LB_GROWN_DIAMOND.config.sortingSeq);
                formData.append("pageSize", 200);


                const jsonData = window.LB_GROWN_DIAMOND.formDataToJson(formData, ['action', 'shop', 'sorting_field', 'sorting_seq', 'clarity_data', 'cut_data', 'polish_data', 'symmetry_data', 'fluor_data', 'lab_data', 'lab_data', 'sustainability_data', 'quality_data', 'shape_data', 'color_data', 'vendor']); // , 'page_number'
                if (Object.keys(jsonData)?.length > 0) {
                    const url = new URL(window.location);
                    //Object.keys(jsonData).forEach(key => jsonData[key]?.length > 0 && url.searchParams.set(key, jsonData[key]));
                    Object.keys(jsonData).forEach(key => url.searchParams.set(key, jsonData[key]));
                    history.replaceState(null, '', url);

                    // Object.entries(jsonData).map(([key, value]) => window.LB_GROWN_DIAMOND.updateQueryStringParam(key, value));
                   /*
                   const jsonString = window.LB_GROWN_DIAMOND.objectToQueryParams(jsonData);
                   top.window.history.pushState({}, '', `?${jsonString}`); // push search params on current URL
                   */
                }

                var requestOptions = { signal: myCustomSignal, method: 'POST', body: formData };

               // window.LB_GROWN_DIAMOND.showElementsLoader('.vdb-load-more-div');
               if(ajaxPaginationClick != 'Yes') {

                window.LB_GROWN_DIAMOND.showElementsLoader('.diamond-loader');
               }

                  var   fancyHTMLSelected = '';
                        var fancyValues = '';
                        if(window.LB_GROWN_DIAMOND.config?.fancyValues.length > 0){
                            fancyValues =  window.LB_GROWN_DIAMOND.config?.fancyValues.toLowerCase();
                            var fancySvgURL = `https://www.miadonna.com/cdn/shop/t/495/assets/icon-fancy-${fancyValues}.svg`;
                         
                            fancyHTMLSelected = `<span class="fancy-svg active"><img src="${fancySvgURL}" alt="${fancyValues}"></span>`;
                        }
                          updateSelectFilterText({
                                        mainId: ".fancy-filter-selected",
                                        labelSelector: ".fancy-filter-name",
                                        text: fancyHTMLSelected,
                                        count: ''
                                });


                                var selectedshape = window.LB_GROWN_DIAMOND.config.shapeValue;
                                   
                                  var firstshape = window.LB_GROWN_DIAMOND.config.shapeValue; 
                                  var shapeSelectedDataArr = selectedshape?.split(","); 
                                
                                  var shapeDataArr = shapeData.split(",");
                                    var shapesvgURL = '';
                                    var selectedshapesvgURL = '';
                                    var shapesvgURLHTML = '';
                                    var shapesvgURLHTMLSelected = '';
                                    var shapeNameLHTMLSelected = '';
                                        let count = 0;
                                        let selectedcount = 0;
                                        let Otherselectedcount = 0;
                                        var shapecount = 5; 
                                        if(firstshape.length <=0){
                                            shapecount = 5;
                                        }else{
                                             shapecount = 5;
                                        }
                                        if(shapeSelectedDataArr.length >=5){
                                            shapecount = 0;
                                        }else{
                                            if(shapeSelectedDataArr != ''){
                                                shapecount = shapecount-shapeSelectedDataArr.length;
                                            }
                                        }


                                        for (let c = 0; c < shapeSelectedDataArr?.length; c++) {
                                            if(selectedcount>=4){
                                                Otherselectedcount++;
                                                continue;
                                            }
                                           
                                            const selectedshapeName = shapeSelectedDataArr[c];
                                            if ((shapeSelectedDataArr?.length || !shapeSelectedDataArr?.includes(selectedshapeName)) && selectedshapeName.length > 0) {
                                                    selectedshapesvgURL= selectedshapeName
                                                    ? `/apps/vdb-maidonna-inventory-app/public/icons/icon-shape-${window.LB_GROWN_DIAMOND.handleize(selectedshapeName)}-cut.svg`
                                                    : '/apps/vdb-maidonna-inventory-app/images/no-image.png';
                                                    shapesvgURLHTMLSelected +=`<span class="shap-svg active"> <img src="${selectedshapesvgURL}" width="20" height="20" alt="" /></span>`; 
                                                    if(shapeNameLHTMLSelected!=''){
                                                     shapeNameLHTMLSelected +=`, ${selectedshapeName}`;  
                                                     }else{
                                                        shapeNameLHTMLSelected +=`${selectedshapeName}`;  
                                                     }
                                                    selectedcount++;
                                            }
                                        }
                                         shapesvgURLHTMLSelectedText = shapesvgURLHTMLSelected;
                                        if(Otherselectedcount >0){
                                            shapesvgURLHTMLSelected +=`<span class="shap-svg"> + ${Otherselectedcount}  </span>`;
                                            shapesvgURLHTMLSelectedText +=`<span class="shap-svg"> + ${Otherselectedcount} more </span>`;
                                        
                                        }
                                       
                                         updateSelectFilterText({
                                        mainId: ".shape-filter-selected",
                                        labelSelector: ".shape-filter-name",
                                        text: shapesvgURLHTMLSelectedText,
                                        count: ''
                                });
                                        for (let b = 0; b < shapeDataArr?.length && count < shapecount; b++) {
                                        const shapeName = shapeDataArr[b];
                                        

                                        // if (shapeName !== firstshape) {
                                            // if (in_array(shapeSelectedDataArr, shapeName)) {
                                            if (!shapeSelectedDataArr?.length || !shapeSelectedDataArr?.includes(shapeName)) {
                                                shapesvgURL= shapeName
                                                ? `/apps/vdb-maidonna-inventory-app/public/icons/icon-shape-${window.LB_GROWN_DIAMOND.handleize(shapeName)}-cut.svg`
                                                : '/apps/vdb-maidonna-inventory-app/images/no-image.png';
                                                shapesvgURLHTML +=`<span class="shap-svg"> <img src="${shapesvgURL}" alt="${shapeName}" /></span>`;
                                                count++;
                                            }
                                        }
                                       // var ColorValue = `${$slider_color.value1},${$slider_color.value2}` : '';
                                       var ColorValue = `${$slider_color.value1},${$slider_color.value2}`;
                                                            var colorcount = getFilterdataCount(
                                       ColorValue,
                                        colorData
                                    );
                                    var colorcountmore  = '';
                                var  firstColor = ColorValue.split(",")[0];
                                  if(colorcount >  0){
                                    var colorcount = (colorcount - 1);
                                    var colorcountmore = (colorcount)+' more';
                                    
                                  }else{
                                    if(ColorValue.split(",").length > 1){
                                        var  firstColor = ColorValue.split(",")[1];
                                    }
                                  } 
                                  
                                  if(colorcount ==  0){
                                    colorcount = '';
                                     colorcountmore = '';
                                  }else{
                                       var colorcount = '+ '+colorcount;
                                       var  colorcountmore ='+ '+colorcountmore
                                  }
                                 
                                updateSelectFilterText({
                                        mainId: ".color-filter-selected",
                                        labelSelector: ".color-filter-name",
                                        text: firstColor,
                                        count: colorcountmore
                                });
                                   var claritycount = getFilterdataCount(
                                        window.LB_GROWN_DIAMOND.config.clarityValues,
                                        clarityData
                                    );
                                   const firstClarity = window.LB_GROWN_DIAMOND.config.clarityValues.split(",")[0];
                                  var claritycount = claritycount - 1;
                                     var claritycountmore = claritycount;
                                  if(claritycount ==  0){
                                    claritycount = '';
                                    claritycountmore = '';
                                  }else{
                                       var claritycount = '+ '+claritycount;
                                    var claritycountmore = '+ '+claritycountmore+' more';
                                  }
                                   updateSelectFilterText({
                                        mainId: ".clarity-filter-selected",
                                        labelSelector: ".clarity-filter-name",
                                        text: firstClarity,
                                        count: claritycountmore
                                });
                                    
                                  var cutcount = getFilterdataCount(
                                       window.LB_GROWN_DIAMOND.config.cutValues,
                                        cutData
                                    );
                                    const firstCut = window.LB_GROWN_DIAMOND.config.cutValues.split(",")[0];
                                  var cutcount = cutcount - 1;
                                    var cutcountmore = cutcount;
                                  if(cutcount ==  0){
                                    cutcount = '';
                                     cutcountmore = '';
                                  }else{
                                       var cutcount = '+ '+cutcount;
                                         var cutcountmore = '+ '+cutcountmore+' more';
                                  }

                                    updateSelectFilterText({
                                        mainId: ".cut-filter-selected",
                                        labelSelector: ".cut-filter-name",
                                        text: firstCut,
                                        count: cutcountmore
                                });

                                var diamondfilterhtmlList = "";
                                  if(firstshape.length <=0){
                                  diamondfilterhtmlList += `<div role="listitem"><button
                                                        class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                        type="button"
                                                    data-filter="shapes"

                                                        aria-label="Filter by shape."
                                                    >
                                                        <span class="filter-label">Shape:</span>

                                                        <span class="filter-value">${firstshape}</span>
                                                        <span class="shape-icons" aria-hidden="true">

                                                            ${shapesvgURLHTML}

                                                        </span>
                                                              <span class="dmd-rightarrow" aria-hidden="true">
                                                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                        </svg>
                                                        </span>
                                                    </button></div>`;
                                        }else{
                                            //  diamondfilterhtmlList += `<button
                                            //             class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                            //             type="button"
                                            //         data-filter="shapes"
                                            //             role="listitem"
                                            //             aria-label="Filter by shape. Currently selected: Round"
                                            //         >
                                            //             <span class="filter-label">Shape:</span>
                                                        
                                            //             <span class="filter-value">${firstshape}</span>
                                            //             <span class="shape-icons" aria-hidden="true">
                                            //                 <span class="shap-svg active ">
                                                          
                                            //                <img src="${svgURL}" onerror="${errorSrc}">
                                            //                 </span>
                                            //                 ${shapesvgURLHTMLSelected}
                                            //                 ${shapesvgURLHTML}
                                                           
                                            //             </span>
                                            //                   <span class="dmd-rightarrow" aria-hidden="true">
                                            //             <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            //             <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                            //             </svg>
                                            //             </span>
                                            //         </button>`;
                                                      diamondfilterhtmlList += `<div role="listitem"><button
                                                        class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                        type="button"
                                                    data-filter="shapes"
                                                        aria-label="Filter by shape. Currently selected:  ${shapeNameLHTMLSelected}"
                                                    >
                                                        <span class="filter-label">Shape:</span>

                                                        <span class="shape-icons" aria-hidden="true">

                                                            ${shapesvgURLHTMLSelected}
                                                            ${shapesvgURLHTML}

                                                        </span>
                                                              <span class="dmd-rightarrow" aria-hidden="true">
                                                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                        </svg>
                                                        </span>
                                                    </button></div>`;
                                        }
                                         diamondfilterhtmlList += `<div role="listitem"><button
                                                            class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                            type="button"
                                                            data-filter="carat"
                                                            aria-label="Filter by carat. Range ${sliderCaratValue1} ct - ${sliderCaratValue2} ct"
                                                        >
                                                            <span class="filter-label">Carat:</span>
                                                            <span class="filter-value">${sliderCaratValue1} ct - ${sliderCaratValue2} ct</span>
                                                            <span class="dmd-rightarrow" aria-hidden="true">
                                                             <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                   <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                            </svg>
                                                            </span>
                                                        </button></div>`;
                                             diamondfilterhtmlList += `<div role="listitem"><button
                                                            class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                            type="button"
                                                            data-filter="color"
                                                            aria-label="Filter by color. Selected ${firstColor} ${colorcount}"
                                                        >
                                                                <span class="filter-label">Color:</span>
                                                                <span class="filter-value"> ${firstColor} ${colorcount}</span>
                                                                <span class="dmd-rightarrow" aria-hidden="true">
                                                                 <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                   <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                                </svg>
                                                                </span>
                                                            </button></div>`;
                                           diamondfilterhtmlList += `<div role="listitem"><button
                                                                class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                                type="button"
                                                                data-filter="price"
                                                                aria-label="Filter by price. Range $${Math.round($slider_price?.value1)?.toLocaleString('en-US')} - $${Math.round($slider_price?.value2)?.toLocaleString('en-US') }"
                                                            >
                                                                <span class="filter-label">Price:</span>
                                                                <span class="filter-value">$${Math.round($slider_price?.value1)?.toLocaleString('en-US')} - $${Math.round($slider_price?.value2)?.toLocaleString('en-US') }</span>
                                                                <span class="dmd-rightarrow" aria-hidden="true">
                                                                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                   <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                                </svg>
                                                                </span>
                                                                </button></div>`;
                                            diamondfilterhtmlList += `<div role="listitem"><button
                                                                        class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                                        type="button"
                                                                        data-filter="clarity"
                                                                        aria-label="Filter by clarity. Selected ${firstClarity} ${claritycount} "
                                                                    >
                                                                        <span class="filter-label">Clarity:</span>
                                                                        <span class="filter-value">${firstClarity} ${claritycount} </span>
                                                                        <span class="dmd-rightarrow" aria-hidden="true">
                                                                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                                        </svg>
                                                                        </span>
                                                                    </button></div>`;
                                                diamondfilterhtmlList += `<div role="listitem"><button
                                                                                class="filter-pill vdb-lb-advanced-filter-mobile-view-open"
                                                                                type="button"
                                                                                data-filter="cut"
                                                                                aria-label="Filter by cut. Selected ${firstCut} ${cutcount}"
                                                                            >
                                                                                <span class="filter-label">Cut:</span>
                                                                                <span class="filter-value">  ${firstCut} ${cutcount} </span>
                                                                                <span class="dmd-rightarrow" aria-hidden="true">
                                                                                <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                                            </svg>
                                                                                </span>
                                                                            </button></div>`;

                                            diamondfilterhtmlList += `<div role="listitem"><button
                                                                        class="filter-pill filter-pill--all vdb-lb-advanced-filter-mobile-view-open"
                                                                        data-id=""
                                                                        type="button"
                                                                        aria-label="Open all filters"
                                                                    >
                                                                        ALL FILTERS
                                                                        <span class="dmd-rightarrow" aria-hidden="true">
                                                                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.64453 5.83594C6.85547 6.04688 6.85547 6.43359 6.64453 6.64453L1.01953 12.2695C0.808594 12.4805 0.421875 12.4805 0.210938 12.2695C0 12.0586 0 11.6719 0.210938 11.4609L5.44922 6.22266L0.210938 1.01953C0 0.808594 0 0.421875 0.210938 0.210938C0.421875 0 0.808594 0 1.01953 0.210938L6.64453 5.83594Z" fill="#731B34"></path>
                                                                        </svg>
                                                                        </span>
                                                                    </button></div>`;
                                 document.querySelectorAll(".dmd-filter-js").forEach(filter => {
                                     filter.innerHTML = diamondfilterhtmlList   ;
                                });
                                 
                
                fetch("/apps/vdb-maidonna-inventory-app/frontend.php", requestOptions)
                    .then(response => response.text())
                    .then( result => {
                     
                        
                       var htmlList = '';
                        isQueryParams = 'No';
                         if(ajaxPaginationClick != 'Yes') {

                        window.LB_GROWN_DIAMOND.hideElementsLoader('.diamond-loader');
                         }
                           if(ajaxPaginationClick == 'Yes') {
                            ajaxPaginationClick = 'No';
                           }
                        //return false;
                         let svgURL = '';
                           let errorSrc = '';
                        document.getElementById('vdb-lb-filter-container').style.display = document.querySelector('.vdb-set_tab_view.active').dataset.view == 'grid' ? '' : 'none';
                        if (window.LB_GROWN_DIAMOND.isJsonOrString(result) == true) {
                            var resultArray = JSON.parse(result);
                            if (resultArray?.status == 'success' && resultArray?.data?.length > 0) {
                                ajaxCallDiamondListRunning = 'No';
                                // window.LB_GROWN_DIAMOND.config.page_number = (parseInt(page_number) + 1);
                                // document.getElementById('search_diamond_count').innerHTML = `${resultArray?.total_count} RESULTS`;
                                document.getElementById('search_diamond_count').innerHTML = `${Number(resultArray?.total_count || 0).toLocaleString('en-US')} RESULTS`;
                                let removeRingSearchParams = window.location.search;
                                for (x = 0; x < (resultArray?.data?.length); x++) {
                                    const diamondsArray = resultArray?.data[x];
                                    let videoURL = diamondsArray?.video_url?.length > 0 ? diamondsArray?.video_url : '';
                                     svgURL = diamondsArray?.shape?.length > 0 ? `/apps/vdb-maidonna-inventory-app/public/icons/icon-shape-${window.LB_GROWN_DIAMOND.handleize(diamondsArray?.shape)}-cut.svg` : '/apps/vdb-maidonna-inventory-app/images/no-image.png';
                                    if(window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined){
                                      staticHandle = window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle');
                                       staticHandle1 = diamondsArray?.shopify_handle;
                                    } else {
                                      staticHandle = diamondsArray?.shopify_handle;
                                       staticHandle1 = diamondsArray?.shopify_handle;
                                    }

                                    let productURL = '';
                                    if (window.LB_GROWN_DIAMOND.getUrlParameter('stone-handle')!==undefined) {
                                        const removeStoneParam = window.LB_GROWN_DIAMOND.removeURLParameter(window.location.search, 'stone-handle');
                                        productURL = `stone-handle=${diamondsArray?.shopify_handle}&${removeStoneParam.replace('?','')}`;
                                    } else {
                                        ['page','color','clarity','cut','polish','symmetry','fluor','lab','sustainability','min_price','max_price','min_l_w_ratio','max_l_w_ratio','min_table','max_table','min_depth','max_depth'].forEach(function (item) {
                                            removeRingSearchParams = window.LB_GROWN_DIAMOND.removeURLParameter(removeRingSearchParams, item);
                                        });
                                        productURL = `stone-handle=${diamondsArray?.shopify_handle}&${removeRingSearchParams.replace('?','')}`;
                                    }

                                    if(window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined){
                                        if (window.LB_GROWN_DIAMOND.getUrlParameter('metal-filter') == undefined) {
                                            productURL += `&metal-filter=close`;    
                                        }
                                    } else {
                                        productURL = `stone-handle=${diamondsArray?.shopify_handle}`;
                                    }
                                   var removeRingSearchParams1 = '';
                                      ['shape'].forEach(function (item) {
                                            removeRingSearchParams1 = window.LB_GROWN_DIAMOND.removeURLParameterNew(productURL, 'shape');
                                        });
                                    //     if(removeRingSearchParams1 !=''){
                                    //         console.log(removeRingSearchParams1);
                                    //    productURL = removeRingSearchParams1;
                                    //    }
                                  //  productURL.searchParams.delete('shape');
                                   //let params = = new URLSearchParams(productURL);
                                    // params.delete('shape');
                                    // productURL = params;
                                    // console.log(params);
                                    //productURL += `&shape=${diamondsArray?.shape}`;
                                     productURL = `shape=${diamondsArray?.shape}&${removeRingSearchParams1.replace('?','')}`
                                    let productTitle = [];
                                    if (diamondsArray?.carat) { productTitle.push(`${diamondsArray?.carat} Carat`); }
                                    if (diamondsArray?.shape) { productTitle.push(`${diamondsArray?.shape} Cut`); }
                                    if (diamondsArray?.color) { productTitle.push(`${diamondsArray?.color}`); }
                                    if (diamondsArray?.clarity) { productTitle.push(`${diamondsArray?.clarity}`); }

                                    var ringurl = '';
                                    if (window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined) {
                                        var ringurl = `/products/${staticHandle}?${productURL}&dyo=diamond_journey${
                                            window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined
                                                ? ''
                                                : '#ring-products-section'
                                        }`;
                                         var timestamp = Math.floor(Date.now() / 1000);
                                          ringurl += `&t=${timestamp}`;
                                    } else {
                                        var timestamp = Math.floor(Date.now() / 1000);
                                        var ringurl = `/collections/lab-grown-diamond-engagement-rings/?viewdiamond=yes&shape=${diamondsArray?.shape} Cut&filter.p.m.custom.shape=${diamondsArray?.shape} Cut&stone-handle=${staticHandle1}&dyo=diamond_journey`;
                                        ringurl += `&t=${timestamp}`;
                                        ringurl += `#ring-products-section`;
                                    }
                          
                                    let mainImageURL = diamondsArray?.image_url?.length > 0 ? diamondsArray?.image_url : `/apps/vdb-maidonna-inventory-app/public/no-images/${window.LB_GROWN_DIAMOND.handleize(diamondsArray?.shape)}-loose.jpg`;
                                    let mainErrorSrc = `this.src='/apps/vdb-maidonna-inventory-app/public/no-images/${window.LB_GROWN_DIAMOND.handleize(diamondsArray?.shape)}-loose.jpg'`; // let errorSrc = "this.src='/apps/vdb-maidonna-inventory-app/images/no-image.png'";
                                    let imageURL = (document.querySelector('.vdb-set_tab_view.active').dataset.view == 'grid') ? mainImageURL : '';
                                     errorSrc =  (document.querySelector('.vdb-set_tab_view.active').dataset.view == 'grid') ? mainErrorSrc : '';
                                    
                                    htmlList = '';
                                    // ${videoURL?.length > 0 ? "" : 'style="background-image: url(' + mainImageURL + ');"'}
                                    const dynamic_id = `pro-data-${diamondsArray.vdb_stock_id}`;
                                      htmlList += `<tr class="vdb-lb-view-btn open-filter-btn" id="${dynamic_id}-list" data-producthandle="${staticHandle1}"  data-href="/products/${staticHandle}?${productURL}&dyo=diamond_journey${window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined ? '': '#ring-products-section'}" data-id="${dynamic_id}" data-video="${videoURL}" data-display="true">
                                        <td class="shape">
                                            <textarea id="product-${diamondsArray?.shopify_variant_id}" style="display:none;">${JSON.stringify(diamondsArray)}</textarea>
                                            <div class="shape-icon-container">
                            
                                                <img src="${svgURL}" onerror="${errorSrc}"  width="18"  height="18" alt="${diamondsArray?.shape}" >
                                            </div>
                                            <span>${diamondsArray?.shape}</span>
                                        </td>
                                        <td class="">${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'}</td>
                                        <td class="">${diamondsArray?.cut?.length > 0 ? diamondsArray?.cut : '-'}</td>
                                        <td class="">${window?.LB_GROWN_DIAMOND?.config?.fancyValues?.length > 0 && diamondsArray?.fancy_color?.length > 0 ? diamondsArray?.fancy_color : diamondsArray?.color?.length > 0 ? diamondsArray?.color : '-'}</td>
                                        <td class="">${diamondsArray?.clarity?.length > 0 ? diamondsArray?.clarity : '-'}</td>
                                        <td><span>${diamondsArray?.price?.length > 0 ? window.LB_GROWN_DIAMOND.formatMoney(parseFloat(window.LB_GROWN_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100) : "-"}</span></td>
                                        <!--<td class="view-column">
                                            <input type="radio" class="lab-diamond-compare-radio">
                                            <span class="btn-view">View <i class="icon-down-arrow"></i></span>
                                        </td>-->
                                        </tr>
                                        <tr class="vdb-card vdb-active-content" id="${dynamic_id}" data-href="/products/${staticHandle}?${productURL}&dyo=diamond_journey${window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined ? '': '#ring-products-section'}" data-id="${dynamic_id}" data-video="${videoURL}" data-display="true">
                                        <td style="padding: 0px;" colspan="7">
                                        <div class="filter__sidebar-content">
                                            <header>
                                            <h2 id="filter-title">${diamondsArray?.title}</h2>
                                            <button type="close" class="icon-close filter-mobile-view-close dmd-detail-filter-close"
                                                aria-label="close Filter">
                                                <svg width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16.6523 17.9551L9.17578 10.4219L1.64258 17.9551C1.30273 18.2949 0.736328 18.2949 0.339844 17.9551C0 17.5586 0 16.9922 0.339844 16.6523L7.87305 9.11914L0.396484 1.64258C0 1.30273 0 0.736328 0.396484 0.339844C0.736328 0 1.30273 0 1.64258 0.339844L9.17578 7.87305L16.6523 0.339844C16.9922 0 17.5586 0 17.9551 0.339844C18.2949 0.736328 18.2949 1.30273 17.9551 1.64258L10.4219 9.11914L17.9551 16.6523C18.2949 16.9922 18.2949 17.5586 17.9551 17.9551C17.5586 18.2949 16.9922 18.2949 16.6523 17.9551Z" fill="#001514"/>
                                                </svg>
                                            </button>
                                            </header>

                                        <div class="drawer-body">
                                        <div class="price-wrapper" role="group" aria-label="Product price and financing options">
                                            <span class="dmdprice final_price" data-final-price="${diamondsArray?.price}" aria-label="Price: ${window.LB_GROWN_DIAMOND.formatMoney(parseFloat(window.LB_GROWN_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)} dollars">
                                            ${window.LB_GROWN_DIAMOND.formatMoney(parseFloat(window.LB_GROWN_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}
                                            </span>


                                        </div>

                                <div class="dmd-filter-slid-row">

                                    <div class="slider-section" role="region" aria-label="Product image carousel" aria-roledescription="carousel">
                                     
                                    <div class="product-slider">
                                    <a href="${mainImageURL}" class="product-gallery__link" data-fancybox="${dynamic_id}" >
                                        <div>
                                        <img class="slide-img"
                                            src="${mainImageURL}" width="340"
                                            height="280" alt="Round brilliant lab grown diamond front view" loading="lazy" />
                                        </div>
                                      </a>  
                                        <div>
                                         <div class="product__image_inner" style="background-image: url(${mainImageURL});"></div>
                                    
                                    ${videoURL?.length > 0 ? '<iframe class="'+dynamic_id+'-video-desk" src="" width="340" height="280"  frameborder="0" allow="autoplay"></iframe>' : ""}
                                    
                                        </div>
                                    </div>
                                    </div>
                                                <div class="specs-section">

                                                <div class="specs-grid">

                                                    <div class="spec-card" tabindex="0" role="group" aria-label="Carat ${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'}">

                                                    <span class="icon " data-icon="dmd-color">
                                        
                                        <svg width="37" height="19" viewBox="0 0 37 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3582 13.7678C11.3581 13.7678 11.358 13.768 11.3581 13.7681L11.5208 13.9082C11.5248 13.9116 11.5307 13.9111 11.5341 13.9072C11.5373 13.9035 11.5428 13.9029 11.5468 13.9058L17.9157 18.5573C17.9796 18.604 18.0664 18.604 18.1304 18.5573L35.7067 5.72087C35.713 5.71626 35.7206 5.71377 35.7284 5.71377C35.7643 5.71377 35.7791 5.66785 35.75 5.64693L28.1892 0.208027C28.1843 0.204458 28.1773 0.205632 28.1738 0.210622C28.1676 0.219361 28.1538 0.21504 28.1538 0.204336C28.1538 0.198274 28.1489 0.193359 28.1428 0.193359H7.90416C7.8981 0.193359 7.89318 0.198274 7.89318 0.204336C7.89318 0.21504 7.87939 0.219361 7.87321 0.210622C7.86968 0.205632 7.86275 0.204458 7.85779 0.208027L0.297019 5.64693C0.267935 5.66785 0.282735 5.71377 0.318562 5.71377C0.326384 5.71377 0.334004 5.71626 0.340321 5.72087L11.3583 13.7675C11.3584 13.7676 11.3584 13.7678 11.3582 13.7678Z" fill="white"></path>
                                        <path d="M11.3582 13.7678C11.3581 13.7678 11.358 13.768 11.3581 13.7681L11.5208 13.9082C11.5248 13.9116 11.5307 13.9111 11.5341 13.9072C11.5373 13.9035 11.5428 13.9029 11.5468 13.9058L17.9157 18.5573C17.9796 18.604 18.0664 18.604 18.1304 18.5573L35.7067 5.72087C35.713 5.71626 35.7206 5.71377 35.7284 5.71377C35.7643 5.71377 35.7791 5.66785 35.75 5.64693L28.1892 0.208027C28.1843 0.204458 28.1773 0.205632 28.1738 0.210622C28.1676 0.219361 28.1538 0.21504 28.1538 0.204336C28.1538 0.198274 28.1489 0.193359 28.1428 0.193359H7.90416C7.8981 0.193359 7.89318 0.198274 7.89318 0.204336C7.89318 0.21504 7.87939 0.219361 7.87321 0.210622C7.86968 0.205632 7.86275 0.204458 7.85779 0.208027L0.297019 5.64693C0.267935 5.66785 0.282735 5.71377 0.318562 5.71377C0.326384 5.71377 0.334004 5.71626 0.340321 5.72087L11.3583 13.7675C11.3584 13.7676 11.3584 13.7678 11.3582 13.7678Z" fill="white"></path>
                                        <mask id="path-3-outside-1_3883_7368" maskUnits="userSpaceOnUse" x="-0.795898" y="-0.71875" width="37" height="20" fill="black">
                                        <rect fill="white" x="-0.795898" y="-0.71875" width="37" height="20"></rect>
                                        <path d="M11.3582 13.8557C11.3581 13.8557 11.358 13.8559 11.3581 13.856L11.5208 13.9961C11.5248 13.9995 11.5307 13.999 11.5341 13.9951C11.5373 13.9914 11.5428 13.9908 11.5468 13.9937L17.9157 18.6452C17.9796 18.6919 18.0664 18.6919 18.1304 18.6452L35.7067 5.80876C35.713 5.80415 35.7206 5.80166 35.7284 5.80166C35.7643 5.80166 35.7791 5.75575 35.75 5.73482L28.1892 0.295918C28.1843 0.292349 28.1773 0.293523 28.1738 0.298513C28.1676 0.307252 28.1538 0.302931 28.1538 0.292227C28.1538 0.286164 28.1489 0.28125 28.1428 0.28125H7.90416C7.8981 0.28125 7.89319 0.286164 7.89319 0.292226C7.89319 0.302931 7.87939 0.307252 7.87321 0.298513C7.86968 0.293523 7.86275 0.292349 7.85779 0.295918L0.297019 5.73482C0.267935 5.75574 0.282735 5.80166 0.318562 5.80166C0.326384 5.80166 0.334004 5.80415 0.340321 5.80876L11.3583 13.8554C11.3584 13.8555 11.3584 13.8557 11.3582 13.8557ZM11.4156 13.7847C11.4153 13.7847 11.415 13.7846 11.4147 13.7844L2.49595 6.12173C2.36786 6.01168 2.44569 5.80166 2.61456 5.80166H5.33478C5.38962 5.80166 5.44154 5.82639 5.4761 5.86897L11.7237 13.5661C11.858 13.7316 11.6472 13.9535 11.475 13.8278L11.4164 13.7849C11.4161 13.7848 11.4159 13.7847 11.4156 13.7847ZM2.58326 5.71066C2.41748 5.71066 2.33801 5.5071 2.45994 5.39478L5.69754 2.41226C5.82649 2.29346 6.03235 2.40777 5.99968 2.58004L5.43408 5.56256C5.41779 5.64847 5.3427 5.71066 5.25526 5.71066H2.58326ZM12.2006 5.71066C12.0881 5.71066 12.0026 5.60966 12.0211 5.49872L12.5787 2.15354C12.601 2.01983 12.7564 1.95653 12.8658 2.03661L17.4346 5.38179C17.5766 5.48575 17.5031 5.71066 17.3271 5.71066H12.2006ZM17.7498 5.80166C17.8635 5.80166 17.9494 5.90483 17.9288 6.01669L16.3946 14.3356C16.3625 14.5095 16.1264 14.5401 16.051 14.3802L12.1264 6.06133C12.0695 5.9406 12.1575 5.80166 12.291 5.80166H17.7498ZM11.8938 5.71066H6.32137C6.13356 5.71066 6.0688 5.46075 6.23298 5.36954L12.2035 2.05265C12.3368 1.97863 12.4965 2.09136 12.4715 2.2417L11.893 5.70976C11.893 5.71023 11.8933 5.71066 11.8938 5.71066ZM11.7875 5.80166C11.858 5.80166 11.9221 5.84231 11.9521 5.90601L15.863 14.1951C15.9468 14.3728 15.7287 14.5389 15.5797 14.4108L5.9384 6.12169C5.81037 6.01162 5.88821 5.80166 6.05706 5.80166H11.7875ZM12.894 14.864L7.07714 7.69689C6.93731 7.5246 7.16887 7.29952 7.33712 7.44417L16.263 15.1183C16.2681 15.1227 16.2756 15.1221 16.28 15.1172C16.2857 15.1106 16.2962 15.1121 16.3 15.12L17.6019 17.8794C17.6823 18.0499 17.4822 18.2153 17.3299 18.104L12.8959 14.8657C12.8952 14.8652 12.8946 14.8646 12.894 14.864ZM16.3591 15.0324C16.3588 15.0324 16.3586 15.0321 16.3587 15.0318L17.839 7.00578C17.8758 6.8063 18.1621 6.80746 18.1972 7.00723L19.6333 15.1628C19.6336 15.1646 19.6354 15.1659 19.6373 15.1655C19.64 15.165 19.6422 15.1679 19.641 15.1704L18.1891 18.2144C18.1231 18.3529 17.9257 18.3525 17.8602 18.2137L16.3596 15.0327C16.3595 15.0325 16.3593 15.0324 16.3591 15.0324ZM24.3704 5.71066C24.2825 5.71066 24.2072 5.6479 24.1914 5.56148L23.5839 2.24935C23.5561 2.09809 23.7169 1.98273 23.8513 2.05741L29.8131 5.36954C29.9773 5.46075 29.9125 5.71066 29.7247 5.71066H24.3704ZM29.9894 5.80166C30.1582 5.80166 30.2361 6.01152 30.1081 6.12163L20.4981 14.3922C20.3489 14.5207 20.1304 14.3537 20.2151 14.1759L24.1593 5.90533C24.1895 5.842 24.2534 5.80166 24.3236 5.80166H29.9894ZM24.1259 5.71066H18.719C18.543 5.71066 18.4695 5.48574 18.6115 5.38178L23.1864 2.03255C23.2948 1.95324 23.4487 2.01451 23.473 2.14657L24.1266 5.70976C24.1267 5.71023 24.1264 5.71066 24.1259 5.71066ZM23.8202 5.80166C23.954 5.80166 24.042 5.94123 23.9844 6.06202L19.9488 14.5243C19.8726 14.6842 19.636 14.652 19.6053 14.4776L18.1153 6.01524C18.0956 5.90381 18.1814 5.80166 18.2945 5.80166H23.8202ZM18.1412 18.5243C18.1413 18.5243 18.1414 18.5242 18.1414 18.5241L19.7293 15.1944C19.7402 15.1716 19.7557 15.1513 19.7748 15.1348L28.7036 7.45042C28.8718 7.30564 29.1035 7.53074 28.9636 7.70307L23.1661 14.8466C23.1562 14.8588 23.1448 14.8696 23.1321 14.8789L18.1411 18.5238C18.1409 18.524 18.141 18.5243 18.1412 18.5243ZM23.4393 14.6552C23.439 14.6549 23.439 14.6545 23.4392 14.6542L30.57 5.86897C30.6046 5.82639 30.6565 5.80166 30.7113 5.80166H33.4956C33.6648 5.80166 33.7424 6.01227 33.6138 6.1221L25.0095 13.4679C25.003 13.4735 25.0022 13.4833 25.0078 13.4898C25.0137 13.4967 25.0124 13.5071 25.0051 13.5125L23.4402 14.6553C23.4399 14.6555 23.4395 14.6554 23.4393 14.6552ZM30.1494 2.64557C30.1221 2.4755 30.3244 2.36614 30.4517 2.48216L33.6472 5.39411C33.7701 5.5061 33.6909 5.71066 33.5246 5.71066H30.797C30.7076 5.71066 30.6315 5.64577 30.6173 5.55752L30.1494 2.64557ZM25.6465 13.043C25.6466 13.043 25.6466 13.043 25.6467 13.0429L34.0773 5.84525C34.1102 5.81712 34.1522 5.80166 34.1955 5.80166H35.003C35.1791 5.80166 35.2525 6.02681 35.1103 6.13066L25.6464 13.0425C25.6461 13.0427 25.6463 13.043 25.6465 13.043ZM35.1015 5.38089C35.2449 5.48411 35.1719 5.71066 34.9952 5.71066H34.1998C34.1544 5.71066 34.1107 5.69373 34.0772 5.66318L28.7663 0.823645L35.1015 5.38089ZM28.0651 0.372256C28.1105 0.372256 28.1542 0.389191 28.1877 0.419744L29.1591 1.30502C29.3073 1.44014 29.16 1.6806 28.9723 1.60986L26.6233 0.724585C26.4339 0.653183 26.485 0.372256 26.6875 0.372256H28.0651ZM29.9667 2.08216C29.9667 2.08208 29.9668 2.08207 29.9668 2.08215L30.4842 5.30065C30.5083 5.45064 30.3489 5.56242 30.2161 5.48865L23.7838 1.91545C23.6677 1.85097 23.6575 1.6879 23.7647 1.60947L25.3669 0.436813C25.4165 0.40051 25.4811 0.391694 25.5386 0.413371L29.9666 2.08222C29.9666 2.08224 29.9667 2.08221 29.9667 2.08216ZM25.299 0.372256C25.2993 0.372256 25.2994 0.372624 25.2991 0.372794L23.5119 1.68126C23.4674 1.71384 23.4105 1.72448 23.3573 1.7102L19.7023 0.730068C19.4967 0.674949 19.5366 0.372256 19.7494 0.372256H25.299ZM23.346 1.80196C23.3463 1.80196 23.3464 1.80231 23.3462 1.80247L18.1315 5.621C18.0675 5.66788 17.9804 5.66788 17.9164 5.621L13.0073 2.02623C12.884 1.93597 12.9201 1.74318 13.0677 1.70359L17.9759 0.386729C18.0068 0.37844 18.0393 0.37844 18.0702 0.386727L23.3459 1.80195C23.346 1.80195 23.346 1.80196 23.346 1.80196ZM16.2969 0.372256C16.5097 0.372256 16.5496 0.674939 16.3441 0.730066L12.6897 1.71019C12.6365 1.72448 12.5796 1.71384 12.5351 1.68125L11.1963 0.701127C11.0543 0.59717 11.1279 0.372256 11.3038 0.372256H16.2969ZM12.2824 1.60945C12.3895 1.6879 12.3793 1.85093 12.2633 1.9154L5.84568 5.48017C5.7108 5.55509 5.54973 5.43874 5.57847 5.28715L6.19199 2.05172C6.20401 1.98832 6.24871 1.93603 6.30946 1.91427L10.5097 0.410286C10.5665 0.389919 10.6298 0.399103 10.6786 0.434802L12.2824 1.60945ZM7.85912 0.420404C7.89273 0.389443 7.93675 0.372256 7.98245 0.372256H9.29802C9.50218 0.372256 9.5516 0.656763 9.3594 0.725616L7.20678 1.49676C7.02003 1.56367 6.87617 1.32596 7.02208 1.19155L7.85912 0.420404ZM7.30984 0.802713L2.03462 5.66251C2.00101 5.69347 1.95699 5.71066 1.9113 5.71066H1.05099C0.874225 5.71066 0.80121 5.4841 0.944709 5.38089L7.30984 0.802713ZM1.91582 5.80166C1.95934 5.80166 2.00142 5.81726 2.03443 5.84562L10.4832 13.104L0.934886 6.13066C0.792681 6.02681 0.866142 5.80166 1.04223 5.80166H1.91582Z"></path>
                                        </mask>
                                        <path d="M11.3582 13.8557C11.3581 13.8557 11.358 13.8559 11.3581 13.856L11.5208 13.9961C11.5248 13.9995 11.5307 13.999 11.5341 13.9951C11.5373 13.9914 11.5428 13.9908 11.5468 13.9937L17.9157 18.6452C17.9796 18.6919 18.0664 18.6919 18.1304 18.6452L35.7067 5.80876C35.713 5.80415 35.7206 5.80166 35.7284 5.80166C35.7643 5.80166 35.7791 5.75575 35.75 5.73482L28.1892 0.295918C28.1843 0.292349 28.1773 0.293523 28.1738 0.298513C28.1676 0.307252 28.1538 0.302931 28.1538 0.292227C28.1538 0.286164 28.1489 0.28125 28.1428 0.28125H7.90416C7.8981 0.28125 7.89319 0.286164 7.89319 0.292226C7.89319 0.302931 7.87939 0.307252 7.87321 0.298513C7.86968 0.293523 7.86275 0.292349 7.85779 0.295918L0.297019 5.73482C0.267935 5.75574 0.282735 5.80166 0.318562 5.80166C0.326384 5.80166 0.334004 5.80415 0.340321 5.80876L11.3583 13.8554C11.3584 13.8555 11.3584 13.8557 11.3582 13.8557ZM11.4156 13.7847C11.4153 13.7847 11.415 13.7846 11.4147 13.7844L2.49595 6.12173C2.36786 6.01168 2.44569 5.80166 2.61456 5.80166H5.33478C5.38962 5.80166 5.44154 5.82639 5.4761 5.86897L11.7237 13.5661C11.858 13.7316 11.6472 13.9535 11.475 13.8278L11.4164 13.7849C11.4161 13.7848 11.4159 13.7847 11.4156 13.7847ZM2.58326 5.71066C2.41748 5.71066 2.33801 5.5071 2.45994 5.39478L5.69754 2.41226C5.82649 2.29346 6.03235 2.40777 5.99968 2.58004L5.43408 5.56256C5.41779 5.64847 5.3427 5.71066 5.25526 5.71066H2.58326ZM12.2006 5.71066C12.0881 5.71066 12.0026 5.60966 12.0211 5.49872L12.5787 2.15354C12.601 2.01983 12.7564 1.95653 12.8658 2.03661L17.4346 5.38179C17.5766 5.48575 17.5031 5.71066 17.3271 5.71066H12.2006ZM17.7498 5.80166C17.8635 5.80166 17.9494 5.90483 17.9288 6.01669L16.3946 14.3356C16.3625 14.5095 16.1264 14.5401 16.051 14.3802L12.1264 6.06133C12.0695 5.9406 12.1575 5.80166 12.291 5.80166H17.7498ZM11.8938 5.71066H6.32137C6.13356 5.71066 6.0688 5.46075 6.23298 5.36954L12.2035 2.05265C12.3368 1.97863 12.4965 2.09136 12.4715 2.2417L11.893 5.70976C11.893 5.71023 11.8933 5.71066 11.8938 5.71066ZM11.7875 5.80166C11.858 5.80166 11.9221 5.84231 11.9521 5.90601L15.863 14.1951C15.9468 14.3728 15.7287 14.5389 15.5797 14.4108L5.9384 6.12169C5.81037 6.01162 5.88821 5.80166 6.05706 5.80166H11.7875ZM12.894 14.864L7.07714 7.69689C6.93731 7.5246 7.16887 7.29952 7.33712 7.44417L16.263 15.1183C16.2681 15.1227 16.2756 15.1221 16.28 15.1172C16.2857 15.1106 16.2962 15.1121 16.3 15.12L17.6019 17.8794C17.6823 18.0499 17.4822 18.2153 17.3299 18.104L12.8959 14.8657C12.8952 14.8652 12.8946 14.8646 12.894 14.864ZM16.3591 15.0324C16.3588 15.0324 16.3586 15.0321 16.3587 15.0318L17.839 7.00578C17.8758 6.8063 18.1621 6.80746 18.1972 7.00723L19.6333 15.1628C19.6336 15.1646 19.6354 15.1659 19.6373 15.1655C19.64 15.165 19.6422 15.1679 19.641 15.1704L18.1891 18.2144C18.1231 18.3529 17.9257 18.3525 17.8602 18.2137L16.3596 15.0327C16.3595 15.0325 16.3593 15.0324 16.3591 15.0324ZM24.3704 5.71066C24.2825 5.71066 24.2072 5.6479 24.1914 5.56148L23.5839 2.24935C23.5561 2.09809 23.7169 1.98273 23.8513 2.05741L29.8131 5.36954C29.9773 5.46075 29.9125 5.71066 29.7247 5.71066H24.3704ZM29.9894 5.80166C30.1582 5.80166 30.2361 6.01152 30.1081 6.12163L20.4981 14.3922C20.3489 14.5207 20.1304 14.3537 20.2151 14.1759L24.1593 5.90533C24.1895 5.842 24.2534 5.80166 24.3236 5.80166H29.9894ZM24.1259 5.71066H18.719C18.543 5.71066 18.4695 5.48574 18.6115 5.38178L23.1864 2.03255C23.2948 1.95324 23.4487 2.01451 23.473 2.14657L24.1266 5.70976C24.1267 5.71023 24.1264 5.71066 24.1259 5.71066ZM23.8202 5.80166C23.954 5.80166 24.042 5.94123 23.9844 6.06202L19.9488 14.5243C19.8726 14.6842 19.636 14.652 19.6053 14.4776L18.1153 6.01524C18.0956 5.90381 18.1814 5.80166 18.2945 5.80166H23.8202ZM18.1412 18.5243C18.1413 18.5243 18.1414 18.5242 18.1414 18.5241L19.7293 15.1944C19.7402 15.1716 19.7557 15.1513 19.7748 15.1348L28.7036 7.45042C28.8718 7.30564 29.1035 7.53074 28.9636 7.70307L23.1661 14.8466C23.1562 14.8588 23.1448 14.8696 23.1321 14.8789L18.1411 18.5238C18.1409 18.524 18.141 18.5243 18.1412 18.5243ZM23.4393 14.6552C23.439 14.6549 23.439 14.6545 23.4392 14.6542L30.57 5.86897C30.6046 5.82639 30.6565 5.80166 30.7113 5.80166H33.4956C33.6648 5.80166 33.7424 6.01227 33.6138 6.1221L25.0095 13.4679C25.003 13.4735 25.0022 13.4833 25.0078 13.4898C25.0137 13.4967 25.0124 13.5071 25.0051 13.5125L23.4402 14.6553C23.4399 14.6555 23.4395 14.6554 23.4393 14.6552ZM30.1494 2.64557C30.1221 2.4755 30.3244 2.36614 30.4517 2.48216L33.6472 5.39411C33.7701 5.5061 33.6909 5.71066 33.5246 5.71066H30.797C30.7076 5.71066 30.6315 5.64577 30.6173 5.55752L30.1494 2.64557ZM25.6465 13.043C25.6466 13.043 25.6466 13.043 25.6467 13.0429L34.0773 5.84525C34.1102 5.81712 34.1522 5.80166 34.1955 5.80166H35.003C35.1791 5.80166 35.2525 6.02681 35.1103 6.13066L25.6464 13.0425C25.6461 13.0427 25.6463 13.043 25.6465 13.043ZM35.1015 5.38089C35.2449 5.48411 35.1719 5.71066 34.9952 5.71066H34.1998C34.1544 5.71066 34.1107 5.69373 34.0772 5.66318L28.7663 0.823645L35.1015 5.38089ZM28.0651 0.372256C28.1105 0.372256 28.1542 0.389191 28.1877 0.419744L29.1591 1.30502C29.3073 1.44014 29.16 1.6806 28.9723 1.60986L26.6233 0.724585C26.4339 0.653183 26.485 0.372256 26.6875 0.372256H28.0651ZM29.9667 2.08216C29.9667 2.08208 29.9668 2.08207 29.9668 2.08215L30.4842 5.30065C30.5083 5.45064 30.3489 5.56242 30.2161 5.48865L23.7838 1.91545C23.6677 1.85097 23.6575 1.6879 23.7647 1.60947L25.3669 0.436813C25.4165 0.40051 25.4811 0.391694 25.5386 0.413371L29.9666 2.08222C29.9666 2.08224 29.9667 2.08221 29.9667 2.08216ZM25.299 0.372256C25.2993 0.372256 25.2994 0.372624 25.2991 0.372794L23.5119 1.68126C23.4674 1.71384 23.4105 1.72448 23.3573 1.7102L19.7023 0.730068C19.4967 0.674949 19.5366 0.372256 19.7494 0.372256H25.299ZM23.346 1.80196C23.3463 1.80196 23.3464 1.80231 23.3462 1.80247L18.1315 5.621C18.0675 5.66788 17.9804 5.66788 17.9164 5.621L13.0073 2.02623C12.884 1.93597 12.9201 1.74318 13.0677 1.70359L17.9759 0.386729C18.0068 0.37844 18.0393 0.37844 18.0702 0.386727L23.3459 1.80195C23.346 1.80195 23.346 1.80196 23.346 1.80196ZM16.2969 0.372256C16.5097 0.372256 16.5496 0.674939 16.3441 0.730066L12.6897 1.71019C12.6365 1.72448 12.5796 1.71384 12.5351 1.68125L11.1963 0.701127C11.0543 0.59717 11.1279 0.372256 11.3038 0.372256H16.2969ZM12.2824 1.60945C12.3895 1.6879 12.3793 1.85093 12.2633 1.9154L5.84568 5.48017C5.7108 5.55509 5.54973 5.43874 5.57847 5.28715L6.19199 2.05172C6.20401 1.98832 6.24871 1.93603 6.30946 1.91427L10.5097 0.410286C10.5665 0.389919 10.6298 0.399103 10.6786 0.434802L12.2824 1.60945ZM7.85912 0.420404C7.89273 0.389443 7.93675 0.372256 7.98245 0.372256H9.29802C9.50218 0.372256 9.5516 0.656763 9.3594 0.725616L7.20678 1.49676C7.02003 1.56367 6.87617 1.32596 7.02208 1.19155L7.85912 0.420404ZM7.30984 0.802713L2.03462 5.66251C2.00101 5.69347 1.95699 5.71066 1.9113 5.71066H1.05099C0.874225 5.71066 0.80121 5.4841 0.944709 5.38089L7.30984 0.802713ZM1.91582 5.80166C1.95934 5.80166 2.00142 5.81726 2.03443 5.84562L10.4832 13.104L0.934886 6.13066C0.792681 6.02681 0.866142 5.80166 1.04223 5.80166H1.91582Z" fill="black"></path>
                                        <path d="M11.3582 13.8557C11.3581 13.8557 11.358 13.8559 11.3581 13.856L11.5208 13.9961C11.5248 13.9995 11.5307 13.999 11.5341 13.9951C11.5373 13.9914 11.5428 13.9908 11.5468 13.9937L17.9157 18.6452C17.9796 18.6919 18.0664 18.6919 18.1304 18.6452L35.7067 5.80876C35.713 5.80415 35.7206 5.80166 35.7284 5.80166C35.7643 5.80166 35.7791 5.75575 35.75 5.73482L28.1892 0.295918C28.1843 0.292349 28.1773 0.293523 28.1738 0.298513C28.1676 0.307252 28.1538 0.302931 28.1538 0.292227C28.1538 0.286164 28.1489 0.28125 28.1428 0.28125H7.90416C7.8981 0.28125 7.89319 0.286164 7.89319 0.292226C7.89319 0.302931 7.87939 0.307252 7.87321 0.298513C7.86968 0.293523 7.86275 0.292349 7.85779 0.295918L0.297019 5.73482C0.267935 5.75574 0.282735 5.80166 0.318562 5.80166C0.326384 5.80166 0.334004 5.80415 0.340321 5.80876L11.3583 13.8554C11.3584 13.8555 11.3584 13.8557 11.3582 13.8557ZM11.4156 13.7847C11.4153 13.7847 11.415 13.7846 11.4147 13.7844L2.49595 6.12173C2.36786 6.01168 2.44569 5.80166 2.61456 5.80166H5.33478C5.38962 5.80166 5.44154 5.82639 5.4761 5.86897L11.7237 13.5661C11.858 13.7316 11.6472 13.9535 11.475 13.8278L11.4164 13.7849C11.4161 13.7848 11.4159 13.7847 11.4156 13.7847ZM2.58326 5.71066C2.41748 5.71066 2.33801 5.5071 2.45994 5.39478L5.69754 2.41226C5.82649 2.29346 6.03235 2.40777 5.99968 2.58004L5.43408 5.56256C5.41779 5.64847 5.3427 5.71066 5.25526 5.71066H2.58326ZM12.2006 5.71066C12.0881 5.71066 12.0026 5.60966 12.0211 5.49872L12.5787 2.15354C12.601 2.01983 12.7564 1.95653 12.8658 2.03661L17.4346 5.38179C17.5766 5.48575 17.5031 5.71066 17.3271 5.71066H12.2006ZM17.7498 5.80166C17.8635 5.80166 17.9494 5.90483 17.9288 6.01669L16.3946 14.3356C16.3625 14.5095 16.1264 14.5401 16.051 14.3802L12.1264 6.06133C12.0695 5.9406 12.1575 5.80166 12.291 5.80166H17.7498ZM11.8938 5.71066H6.32137C6.13356 5.71066 6.0688 5.46075 6.23298 5.36954L12.2035 2.05265C12.3368 1.97863 12.4965 2.09136 12.4715 2.2417L11.893 5.70976C11.893 5.71023 11.8933 5.71066 11.8938 5.71066ZM11.7875 5.80166C11.858 5.80166 11.9221 5.84231 11.9521 5.90601L15.863 14.1951C15.9468 14.3728 15.7287 14.5389 15.5797 14.4108L5.9384 6.12169C5.81037 6.01162 5.88821 5.80166 6.05706 5.80166H11.7875ZM12.894 14.864L7.07714 7.69689C6.93731 7.5246 7.16887 7.29952 7.33712 7.44417L16.263 15.1183C16.2681 15.1227 16.2756 15.1221 16.28 15.1172C16.2857 15.1106 16.2962 15.1121 16.3 15.12L17.6019 17.8794C17.6823 18.0499 17.4822 18.2153 17.3299 18.104L12.8959 14.8657C12.8952 14.8652 12.8946 14.8646 12.894 14.864ZM16.3591 15.0324C16.3588 15.0324 16.3586 15.0321 16.3587 15.0318L17.839 7.00578C17.8758 6.8063 18.1621 6.80746 18.1972 7.00723L19.6333 15.1628C19.6336 15.1646 19.6354 15.1659 19.6373 15.1655C19.64 15.165 19.6422 15.1679 19.641 15.1704L18.1891 18.2144C18.1231 18.3529 17.9257 18.3525 17.8602 18.2137L16.3596 15.0327C16.3595 15.0325 16.3593 15.0324 16.3591 15.0324ZM24.3704 5.71066C24.2825 5.71066 24.2072 5.6479 24.1914 5.56148L23.5839 2.24935C23.5561 2.09809 23.7169 1.98273 23.8513 2.05741L29.8131 5.36954C29.9773 5.46075 29.9125 5.71066 29.7247 5.71066H24.3704ZM29.9894 5.80166C30.1582 5.80166 30.2361 6.01152 30.1081 6.12163L20.4981 14.3922C20.3489 14.5207 20.1304 14.3537 20.2151 14.1759L24.1593 5.90533C24.1895 5.842 24.2534 5.80166 24.3236 5.80166H29.9894ZM24.1259 5.71066H18.719C18.543 5.71066 18.4695 5.48574 18.6115 5.38178L23.1864 2.03255C23.2948 1.95324 23.4487 2.01451 23.473 2.14657L24.1266 5.70976C24.1267 5.71023 24.1264 5.71066 24.1259 5.71066ZM23.8202 5.80166C23.954 5.80166 24.042 5.94123 23.9844 6.06202L19.9488 14.5243C19.8726 14.6842 19.636 14.652 19.6053 14.4776L18.1153 6.01524C18.0956 5.90381 18.1814 5.80166 18.2945 5.80166H23.8202ZM18.1412 18.5243C18.1413 18.5243 18.1414 18.5242 18.1414 18.5241L19.7293 15.1944C19.7402 15.1716 19.7557 15.1513 19.7748 15.1348L28.7036 7.45042C28.8718 7.30564 29.1035 7.53074 28.9636 7.70307L23.1661 14.8466C23.1562 14.8588 23.1448 14.8696 23.1321 14.8789L18.1411 18.5238C18.1409 18.524 18.141 18.5243 18.1412 18.5243ZM23.4393 14.6552C23.439 14.6549 23.439 14.6545 23.4392 14.6542L30.57 5.86897C30.6046 5.82639 30.6565 5.80166 30.7113 5.80166H33.4956C33.6648 5.80166 33.7424 6.01227 33.6138 6.1221L25.0095 13.4679C25.003 13.4735 25.0022 13.4833 25.0078 13.4898C25.0137 13.4967 25.0124 13.5071 25.0051 13.5125L23.4402 14.6553C23.4399 14.6555 23.4395 14.6554 23.4393 14.6552ZM30.1494 2.64557C30.1221 2.4755 30.3244 2.36614 30.4517 2.48216L33.6472 5.39411C33.7701 5.5061 33.6909 5.71066 33.5246 5.71066H30.797C30.7076 5.71066 30.6315 5.64577 30.6173 5.55752L30.1494 2.64557ZM25.6465 13.043C25.6466 13.043 25.6466 13.043 25.6467 13.0429L34.0773 5.84525C34.1102 5.81712 34.1522 5.80166 34.1955 5.80166H35.003C35.1791 5.80166 35.2525 6.02681 35.1103 6.13066L25.6464 13.0425C25.6461 13.0427 25.6463 13.043 25.6465 13.043ZM35.1015 5.38089C35.2449 5.48411 35.1719 5.71066 34.9952 5.71066H34.1998C34.1544 5.71066 34.1107 5.69373 34.0772 5.66318L28.7663 0.823645L35.1015 5.38089ZM28.0651 0.372256C28.1105 0.372256 28.1542 0.389191 28.1877 0.419744L29.1591 1.30502C29.3073 1.44014 29.16 1.6806 28.9723 1.60986L26.6233 0.724585C26.4339 0.653183 26.485 0.372256 26.6875 0.372256H28.0651ZM29.9667 2.08216C29.9667 2.08208 29.9668 2.08207 29.9668 2.08215L30.4842 5.30065C30.5083 5.45064 30.3489 5.56242 30.2161 5.48865L23.7838 1.91545C23.6677 1.85097 23.6575 1.6879 23.7647 1.60947L25.3669 0.436813C25.4165 0.40051 25.4811 0.391694 25.5386 0.413371L29.9666 2.08222C29.9666 2.08224 29.9667 2.08221 29.9667 2.08216ZM25.299 0.372256C25.2993 0.372256 25.2994 0.372624 25.2991 0.372794L23.5119 1.68126C23.4674 1.71384 23.4105 1.72448 23.3573 1.7102L19.7023 0.730068C19.4967 0.674949 19.5366 0.372256 19.7494 0.372256H25.299ZM23.346 1.80196C23.3463 1.80196 23.3464 1.80231 23.3462 1.80247L18.1315 5.621C18.0675 5.66788 17.9804 5.66788 17.9164 5.621L13.0073 2.02623C12.884 1.93597 12.9201 1.74318 13.0677 1.70359L17.9759 0.386729C18.0068 0.37844 18.0393 0.37844 18.0702 0.386727L23.3459 1.80195C23.346 1.80195 23.346 1.80196 23.346 1.80196ZM16.2969 0.372256C16.5097 0.372256 16.5496 0.674939 16.3441 0.730066L12.6897 1.71019C12.6365 1.72448 12.5796 1.71384 12.5351 1.68125L11.1963 0.701127C11.0543 0.59717 11.1279 0.372256 11.3038 0.372256H16.2969ZM12.2824 1.60945C12.3895 1.6879 12.3793 1.85093 12.2633 1.9154L5.84568 5.48017C5.7108 5.55509 5.54973 5.43874 5.57847 5.28715L6.19199 2.05172C6.20401 1.98832 6.24871 1.93603 6.30946 1.91427L10.5097 0.410286C10.5665 0.389919 10.6298 0.399103 10.6786 0.434802L12.2824 1.60945ZM7.85912 0.420404C7.89273 0.389443 7.93675 0.372256 7.98245 0.372256H9.29802C9.50218 0.372256 9.5516 0.656763 9.3594 0.725616L7.20678 1.49676C7.02003 1.56367 6.87617 1.32596 7.02208 1.19155L7.85912 0.420404ZM7.30984 0.802713L2.03462 5.66251C2.00101 5.69347 1.95699 5.71066 1.9113 5.71066H1.05099C0.874225 5.71066 0.80121 5.4841 0.944709 5.38089L7.30984 0.802713ZM1.91582 5.80166C1.95934 5.80166 2.00142 5.81726 2.03443 5.84562L10.4832 13.104L0.934886 6.13066C0.792681 6.02681 0.866142 5.80166 1.04223 5.80166H1.91582Z" stroke="black" stroke-width="0.561866" mask="url(#path-3-outside-1_3883_7368)"></path>
                                        </svg>


                                        
                                        </span>
                                                    <div class="spec-title">Carat</div>
                                                    <div class="spec-value">${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'}</div>
                                                    </div>

                                                    <div class="spec-card" tabindex="0" role="group" aria-label="Color ${window?.LB_GROWN_DIAMOND?.config?.fancyValues?.length > 0 && diamondsArray?.fancy_color?.length > 0 ? diamondsArray?.fancy_color : diamondsArray?.color?.length > 0 ? diamondsArray?.color : '-'}">

                                                    <span class="icon " data-icon="dmd-color">
                                        
                                        <svg width="37" height="19" viewBox="0 0 37 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.3582 13.7678C11.3581 13.7678 11.358 13.768 11.3581 13.7681L11.5208 13.9082C11.5248 13.9116 11.5307 13.9111 11.5341 13.9072C11.5373 13.9035 11.5428 13.9029 11.5468 13.9058L17.9157 18.5573C17.9796 18.604 18.0664 18.604 18.1304 18.5573L35.7067 5.72087C35.713 5.71626 35.7206 5.71377 35.7284 5.71377C35.7643 5.71377 35.7791 5.66785 35.75 5.64693L28.1892 0.208027C28.1843 0.204458 28.1773 0.205632 28.1738 0.210622C28.1676 0.219361 28.1538 0.21504 28.1538 0.204336C28.1538 0.198274 28.1489 0.193359 28.1428 0.193359H7.90416C7.8981 0.193359 7.89318 0.198274 7.89318 0.204336C7.89318 0.21504 7.87939 0.219361 7.87321 0.210622C7.86968 0.205632 7.86275 0.204458 7.85779 0.208027L0.297019 5.64693C0.267935 5.66785 0.282735 5.71377 0.318562 5.71377C0.326384 5.71377 0.334004 5.71626 0.340321 5.72087L11.3583 13.7675C11.3584 13.7676 11.3584 13.7678 11.3582 13.7678Z" fill="white"></path>
                                        <path d="M11.3582 13.7678C11.3581 13.7678 11.358 13.768 11.3581 13.7681L11.5208 13.9082C11.5248 13.9116 11.5307 13.9111 11.5341 13.9072C11.5373 13.9035 11.5428 13.9029 11.5468 13.9058L17.9157 18.5573C17.9796 18.604 18.0664 18.604 18.1304 18.5573L35.7067 5.72087C35.713 5.71626 35.7206 5.71377 35.7284 5.71377C35.7643 5.71377 35.7791 5.66785 35.75 5.64693L28.1892 0.208027C28.1843 0.204458 28.1773 0.205632 28.1738 0.210622C28.1676 0.219361 28.1538 0.21504 28.1538 0.204336C28.1538 0.198274 28.1489 0.193359 28.1428 0.193359H7.90416C7.8981 0.193359 7.89318 0.198274 7.89318 0.204336C7.89318 0.21504 7.87939 0.219361 7.87321 0.210622C7.86968 0.205632 7.86275 0.204458 7.85779 0.208027L0.297019 5.64693C0.267935 5.66785 0.282735 5.71377 0.318562 5.71377C0.326384 5.71377 0.334004 5.71626 0.340321 5.72087L11.3583 13.7675C11.3584 13.7676 11.3584 13.7678 11.3582 13.7678Z" fill="white"></path>
                                        <mask id="path-3-outside-1_3883_7368" maskUnits="userSpaceOnUse" x="-0.795898" y="-0.71875" width="37" height="20" fill="black">
                                        <rect fill="white" x="-0.795898" y="-0.71875" width="37" height="20"></rect>
                                        <path d="M11.3582 13.8557C11.3581 13.8557 11.358 13.8559 11.3581 13.856L11.5208 13.9961C11.5248 13.9995 11.5307 13.999 11.5341 13.9951C11.5373 13.9914 11.5428 13.9908 11.5468 13.9937L17.9157 18.6452C17.9796 18.6919 18.0664 18.6919 18.1304 18.6452L35.7067 5.80876C35.713 5.80415 35.7206 5.80166 35.7284 5.80166C35.7643 5.80166 35.7791 5.75575 35.75 5.73482L28.1892 0.295918C28.1843 0.292349 28.1773 0.293523 28.1738 0.298513C28.1676 0.307252 28.1538 0.302931 28.1538 0.292227C28.1538 0.286164 28.1489 0.28125 28.1428 0.28125H7.90416C7.8981 0.28125 7.89319 0.286164 7.89319 0.292226C7.89319 0.302931 7.87939 0.307252 7.87321 0.298513C7.86968 0.293523 7.86275 0.292349 7.85779 0.295918L0.297019 5.73482C0.267935 5.75574 0.282735 5.80166 0.318562 5.80166C0.326384 5.80166 0.334004 5.80415 0.340321 5.80876L11.3583 13.8554C11.3584 13.8555 11.3584 13.8557 11.3582 13.8557ZM11.4156 13.7847C11.4153 13.7847 11.415 13.7846 11.4147 13.7844L2.49595 6.12173C2.36786 6.01168 2.44569 5.80166 2.61456 5.80166H5.33478C5.38962 5.80166 5.44154 5.82639 5.4761 5.86897L11.7237 13.5661C11.858 13.7316 11.6472 13.9535 11.475 13.8278L11.4164 13.7849C11.4161 13.7848 11.4159 13.7847 11.4156 13.7847ZM2.58326 5.71066C2.41748 5.71066 2.33801 5.5071 2.45994 5.39478L5.69754 2.41226C5.82649 2.29346 6.03235 2.40777 5.99968 2.58004L5.43408 5.56256C5.41779 5.64847 5.3427 5.71066 5.25526 5.71066H2.58326ZM12.2006 5.71066C12.0881 5.71066 12.0026 5.60966 12.0211 5.49872L12.5787 2.15354C12.601 2.01983 12.7564 1.95653 12.8658 2.03661L17.4346 5.38179C17.5766 5.48575 17.5031 5.71066 17.3271 5.71066H12.2006ZM17.7498 5.80166C17.8635 5.80166 17.9494 5.90483 17.9288 6.01669L16.3946 14.3356C16.3625 14.5095 16.1264 14.5401 16.051 14.3802L12.1264 6.06133C12.0695 5.9406 12.1575 5.80166 12.291 5.80166H17.7498ZM11.8938 5.71066H6.32137C6.13356 5.71066 6.0688 5.46075 6.23298 5.36954L12.2035 2.05265C12.3368 1.97863 12.4965 2.09136 12.4715 2.2417L11.893 5.70976C11.893 5.71023 11.8933 5.71066 11.8938 5.71066ZM11.7875 5.80166C11.858 5.80166 11.9221 5.84231 11.9521 5.90601L15.863 14.1951C15.9468 14.3728 15.7287 14.5389 15.5797 14.4108L5.9384 6.12169C5.81037 6.01162 5.88821 5.80166 6.05706 5.80166H11.7875ZM12.894 14.864L7.07714 7.69689C6.93731 7.5246 7.16887 7.29952 7.33712 7.44417L16.263 15.1183C16.2681 15.1227 16.2756 15.1221 16.28 15.1172C16.2857 15.1106 16.2962 15.1121 16.3 15.12L17.6019 17.8794C17.6823 18.0499 17.4822 18.2153 17.3299 18.104L12.8959 14.8657C12.8952 14.8652 12.8946 14.8646 12.894 14.864ZM16.3591 15.0324C16.3588 15.0324 16.3586 15.0321 16.3587 15.0318L17.839 7.00578C17.8758 6.8063 18.1621 6.80746 18.1972 7.00723L19.6333 15.1628C19.6336 15.1646 19.6354 15.1659 19.6373 15.1655C19.64 15.165 19.6422 15.1679 19.641 15.1704L18.1891 18.2144C18.1231 18.3529 17.9257 18.3525 17.8602 18.2137L16.3596 15.0327C16.3595 15.0325 16.3593 15.0324 16.3591 15.0324ZM24.3704 5.71066C24.2825 5.71066 24.2072 5.6479 24.1914 5.56148L23.5839 2.24935C23.5561 2.09809 23.7169 1.98273 23.8513 2.05741L29.8131 5.36954C29.9773 5.46075 29.9125 5.71066 29.7247 5.71066H24.3704ZM29.9894 5.80166C30.1582 5.80166 30.2361 6.01152 30.1081 6.12163L20.4981 14.3922C20.3489 14.5207 20.1304 14.3537 20.2151 14.1759L24.1593 5.90533C24.1895 5.842 24.2534 5.80166 24.3236 5.80166H29.9894ZM24.1259 5.71066H18.719C18.543 5.71066 18.4695 5.48574 18.6115 5.38178L23.1864 2.03255C23.2948 1.95324 23.4487 2.01451 23.473 2.14657L24.1266 5.70976C24.1267 5.71023 24.1264 5.71066 24.1259 5.71066ZM23.8202 5.80166C23.954 5.80166 24.042 5.94123 23.9844 6.06202L19.9488 14.5243C19.8726 14.6842 19.636 14.652 19.6053 14.4776L18.1153 6.01524C18.0956 5.90381 18.1814 5.80166 18.2945 5.80166H23.8202ZM18.1412 18.5243C18.1413 18.5243 18.1414 18.5242 18.1414 18.5241L19.7293 15.1944C19.7402 15.1716 19.7557 15.1513 19.7748 15.1348L28.7036 7.45042C28.8718 7.30564 29.1035 7.53074 28.9636 7.70307L23.1661 14.8466C23.1562 14.8588 23.1448 14.8696 23.1321 14.8789L18.1411 18.5238C18.1409 18.524 18.141 18.5243 18.1412 18.5243ZM23.4393 14.6552C23.439 14.6549 23.439 14.6545 23.4392 14.6542L30.57 5.86897C30.6046 5.82639 30.6565 5.80166 30.7113 5.80166H33.4956C33.6648 5.80166 33.7424 6.01227 33.6138 6.1221L25.0095 13.4679C25.003 13.4735 25.0022 13.4833 25.0078 13.4898C25.0137 13.4967 25.0124 13.5071 25.0051 13.5125L23.4402 14.6553C23.4399 14.6555 23.4395 14.6554 23.4393 14.6552ZM30.1494 2.64557C30.1221 2.4755 30.3244 2.36614 30.4517 2.48216L33.6472 5.39411C33.7701 5.5061 33.6909 5.71066 33.5246 5.71066H30.797C30.7076 5.71066 30.6315 5.64577 30.6173 5.55752L30.1494 2.64557ZM25.6465 13.043C25.6466 13.043 25.6466 13.043 25.6467 13.0429L34.0773 5.84525C34.1102 5.81712 34.1522 5.80166 34.1955 5.80166H35.003C35.1791 5.80166 35.2525 6.02681 35.1103 6.13066L25.6464 13.0425C25.6461 13.0427 25.6463 13.043 25.6465 13.043ZM35.1015 5.38089C35.2449 5.48411 35.1719 5.71066 34.9952 5.71066H34.1998C34.1544 5.71066 34.1107 5.69373 34.0772 5.66318L28.7663 0.823645L35.1015 5.38089ZM28.0651 0.372256C28.1105 0.372256 28.1542 0.389191 28.1877 0.419744L29.1591 1.30502C29.3073 1.44014 29.16 1.6806 28.9723 1.60986L26.6233 0.724585C26.4339 0.653183 26.485 0.372256 26.6875 0.372256H28.0651ZM29.9667 2.08216C29.9667 2.08208 29.9668 2.08207 29.9668 2.08215L30.4842 5.30065C30.5083 5.45064 30.3489 5.56242 30.2161 5.48865L23.7838 1.91545C23.6677 1.85097 23.6575 1.6879 23.7647 1.60947L25.3669 0.436813C25.4165 0.40051 25.4811 0.391694 25.5386 0.413371L29.9666 2.08222C29.9666 2.08224 29.9667 2.08221 29.9667 2.08216ZM25.299 0.372256C25.2993 0.372256 25.2994 0.372624 25.2991 0.372794L23.5119 1.68126C23.4674 1.71384 23.4105 1.72448 23.3573 1.7102L19.7023 0.730068C19.4967 0.674949 19.5366 0.372256 19.7494 0.372256H25.299ZM23.346 1.80196C23.3463 1.80196 23.3464 1.80231 23.3462 1.80247L18.1315 5.621C18.0675 5.66788 17.9804 5.66788 17.9164 5.621L13.0073 2.02623C12.884 1.93597 12.9201 1.74318 13.0677 1.70359L17.9759 0.386729C18.0068 0.37844 18.0393 0.37844 18.0702 0.386727L23.3459 1.80195C23.346 1.80195 23.346 1.80196 23.346 1.80196ZM16.2969 0.372256C16.5097 0.372256 16.5496 0.674939 16.3441 0.730066L12.6897 1.71019C12.6365 1.72448 12.5796 1.71384 12.5351 1.68125L11.1963 0.701127C11.0543 0.59717 11.1279 0.372256 11.3038 0.372256H16.2969ZM12.2824 1.60945C12.3895 1.6879 12.3793 1.85093 12.2633 1.9154L5.84568 5.48017C5.7108 5.55509 5.54973 5.43874 5.57847 5.28715L6.19199 2.05172C6.20401 1.98832 6.24871 1.93603 6.30946 1.91427L10.5097 0.410286C10.5665 0.389919 10.6298 0.399103 10.6786 0.434802L12.2824 1.60945ZM7.85912 0.420404C7.89273 0.389443 7.93675 0.372256 7.98245 0.372256H9.29802C9.50218 0.372256 9.5516 0.656763 9.3594 0.725616L7.20678 1.49676C7.02003 1.56367 6.87617 1.32596 7.02208 1.19155L7.85912 0.420404ZM7.30984 0.802713L2.03462 5.66251C2.00101 5.69347 1.95699 5.71066 1.9113 5.71066H1.05099C0.874225 5.71066 0.80121 5.4841 0.944709 5.38089L7.30984 0.802713ZM1.91582 5.80166C1.95934 5.80166 2.00142 5.81726 2.03443 5.84562L10.4832 13.104L0.934886 6.13066C0.792681 6.02681 0.866142 5.80166 1.04223 5.80166H1.91582Z"></path>
                                        </mask>
                                        <path d="M11.3582 13.8557C11.3581 13.8557 11.358 13.8559 11.3581 13.856L11.5208 13.9961C11.5248 13.9995 11.5307 13.999 11.5341 13.9951C11.5373 13.9914 11.5428 13.9908 11.5468 13.9937L17.9157 18.6452C17.9796 18.6919 18.0664 18.6919 18.1304 18.6452L35.7067 5.80876C35.713 5.80415 35.7206 5.80166 35.7284 5.80166C35.7643 5.80166 35.7791 5.75575 35.75 5.73482L28.1892 0.295918C28.1843 0.292349 28.1773 0.293523 28.1738 0.298513C28.1676 0.307252 28.1538 0.302931 28.1538 0.292227C28.1538 0.286164 28.1489 0.28125 28.1428 0.28125H7.90416C7.8981 0.28125 7.89319 0.286164 7.89319 0.292226C7.89319 0.302931 7.87939 0.307252 7.87321 0.298513C7.86968 0.293523 7.86275 0.292349 7.85779 0.295918L0.297019 5.73482C0.267935 5.75574 0.282735 5.80166 0.318562 5.80166C0.326384 5.80166 0.334004 5.80415 0.340321 5.80876L11.3583 13.8554C11.3584 13.8555 11.3584 13.8557 11.3582 13.8557ZM11.4156 13.7847C11.4153 13.7847 11.415 13.7846 11.4147 13.7844L2.49595 6.12173C2.36786 6.01168 2.44569 5.80166 2.61456 5.80166H5.33478C5.38962 5.80166 5.44154 5.82639 5.4761 5.86897L11.7237 13.5661C11.858 13.7316 11.6472 13.9535 11.475 13.8278L11.4164 13.7849C11.4161 13.7848 11.4159 13.7847 11.4156 13.7847ZM2.58326 5.71066C2.41748 5.71066 2.33801 5.5071 2.45994 5.39478L5.69754 2.41226C5.82649 2.29346 6.03235 2.40777 5.99968 2.58004L5.43408 5.56256C5.41779 5.64847 5.3427 5.71066 5.25526 5.71066H2.58326ZM12.2006 5.71066C12.0881 5.71066 12.0026 5.60966 12.0211 5.49872L12.5787 2.15354C12.601 2.01983 12.7564 1.95653 12.8658 2.03661L17.4346 5.38179C17.5766 5.48575 17.5031 5.71066 17.3271 5.71066H12.2006ZM17.7498 5.80166C17.8635 5.80166 17.9494 5.90483 17.9288 6.01669L16.3946 14.3356C16.3625 14.5095 16.1264 14.5401 16.051 14.3802L12.1264 6.06133C12.0695 5.9406 12.1575 5.80166 12.291 5.80166H17.7498ZM11.8938 5.71066H6.32137C6.13356 5.71066 6.0688 5.46075 6.23298 5.36954L12.2035 2.05265C12.3368 1.97863 12.4965 2.09136 12.4715 2.2417L11.893 5.70976C11.893 5.71023 11.8933 5.71066 11.8938 5.71066ZM11.7875 5.80166C11.858 5.80166 11.9221 5.84231 11.9521 5.90601L15.863 14.1951C15.9468 14.3728 15.7287 14.5389 15.5797 14.4108L5.9384 6.12169C5.81037 6.01162 5.88821 5.80166 6.05706 5.80166H11.7875ZM12.894 14.864L7.07714 7.69689C6.93731 7.5246 7.16887 7.29952 7.33712 7.44417L16.263 15.1183C16.2681 15.1227 16.2756 15.1221 16.28 15.1172C16.2857 15.1106 16.2962 15.1121 16.3 15.12L17.6019 17.8794C17.6823 18.0499 17.4822 18.2153 17.3299 18.104L12.8959 14.8657C12.8952 14.8652 12.8946 14.8646 12.894 14.864ZM16.3591 15.0324C16.3588 15.0324 16.3586 15.0321 16.3587 15.0318L17.839 7.00578C17.8758 6.8063 18.1621 6.80746 18.1972 7.00723L19.6333 15.1628C19.6336 15.1646 19.6354 15.1659 19.6373 15.1655C19.64 15.165 19.6422 15.1679 19.641 15.1704L18.1891 18.2144C18.1231 18.3529 17.9257 18.3525 17.8602 18.2137L16.3596 15.0327C16.3595 15.0325 16.3593 15.0324 16.3591 15.0324ZM24.3704 5.71066C24.2825 5.71066 24.2072 5.6479 24.1914 5.56148L23.5839 2.24935C23.5561 2.09809 23.7169 1.98273 23.8513 2.05741L29.8131 5.36954C29.9773 5.46075 29.9125 5.71066 29.7247 5.71066H24.3704ZM29.9894 5.80166C30.1582 5.80166 30.2361 6.01152 30.1081 6.12163L20.4981 14.3922C20.3489 14.5207 20.1304 14.3537 20.2151 14.1759L24.1593 5.90533C24.1895 5.842 24.2534 5.80166 24.3236 5.80166H29.9894ZM24.1259 5.71066H18.719C18.543 5.71066 18.4695 5.48574 18.6115 5.38178L23.1864 2.03255C23.2948 1.95324 23.4487 2.01451 23.473 2.14657L24.1266 5.70976C24.1267 5.71023 24.1264 5.71066 24.1259 5.71066ZM23.8202 5.80166C23.954 5.80166 24.042 5.94123 23.9844 6.06202L19.9488 14.5243C19.8726 14.6842 19.636 14.652 19.6053 14.4776L18.1153 6.01524C18.0956 5.90381 18.1814 5.80166 18.2945 5.80166H23.8202ZM18.1412 18.5243C18.1413 18.5243 18.1414 18.5242 18.1414 18.5241L19.7293 15.1944C19.7402 15.1716 19.7557 15.1513 19.7748 15.1348L28.7036 7.45042C28.8718 7.30564 29.1035 7.53074 28.9636 7.70307L23.1661 14.8466C23.1562 14.8588 23.1448 14.8696 23.1321 14.8789L18.1411 18.5238C18.1409 18.524 18.141 18.5243 18.1412 18.5243ZM23.4393 14.6552C23.439 14.6549 23.439 14.6545 23.4392 14.6542L30.57 5.86897C30.6046 5.82639 30.6565 5.80166 30.7113 5.80166H33.4956C33.6648 5.80166 33.7424 6.01227 33.6138 6.1221L25.0095 13.4679C25.003 13.4735 25.0022 13.4833 25.0078 13.4898C25.0137 13.4967 25.0124 13.5071 25.0051 13.5125L23.4402 14.6553C23.4399 14.6555 23.4395 14.6554 23.4393 14.6552ZM30.1494 2.64557C30.1221 2.4755 30.3244 2.36614 30.4517 2.48216L33.6472 5.39411C33.7701 5.5061 33.6909 5.71066 33.5246 5.71066H30.797C30.7076 5.71066 30.6315 5.64577 30.6173 5.55752L30.1494 2.64557ZM25.6465 13.043C25.6466 13.043 25.6466 13.043 25.6467 13.0429L34.0773 5.84525C34.1102 5.81712 34.1522 5.80166 34.1955 5.80166H35.003C35.1791 5.80166 35.2525 6.02681 35.1103 6.13066L25.6464 13.0425C25.6461 13.0427 25.6463 13.043 25.6465 13.043ZM35.1015 5.38089C35.2449 5.48411 35.1719 5.71066 34.9952 5.71066H34.1998C34.1544 5.71066 34.1107 5.69373 34.0772 5.66318L28.7663 0.823645L35.1015 5.38089ZM28.0651 0.372256C28.1105 0.372256 28.1542 0.389191 28.1877 0.419744L29.1591 1.30502C29.3073 1.44014 29.16 1.6806 28.9723 1.60986L26.6233 0.724585C26.4339 0.653183 26.485 0.372256 26.6875 0.372256H28.0651ZM29.9667 2.08216C29.9667 2.08208 29.9668 2.08207 29.9668 2.08215L30.4842 5.30065C30.5083 5.45064 30.3489 5.56242 30.2161 5.48865L23.7838 1.91545C23.6677 1.85097 23.6575 1.6879 23.7647 1.60947L25.3669 0.436813C25.4165 0.40051 25.4811 0.391694 25.5386 0.413371L29.9666 2.08222C29.9666 2.08224 29.9667 2.08221 29.9667 2.08216ZM25.299 0.372256C25.2993 0.372256 25.2994 0.372624 25.2991 0.372794L23.5119 1.68126C23.4674 1.71384 23.4105 1.72448 23.3573 1.7102L19.7023 0.730068C19.4967 0.674949 19.5366 0.372256 19.7494 0.372256H25.299ZM23.346 1.80196C23.3463 1.80196 23.3464 1.80231 23.3462 1.80247L18.1315 5.621C18.0675 5.66788 17.9804 5.66788 17.9164 5.621L13.0073 2.02623C12.884 1.93597 12.9201 1.74318 13.0677 1.70359L17.9759 0.386729C18.0068 0.37844 18.0393 0.37844 18.0702 0.386727L23.3459 1.80195C23.346 1.80195 23.346 1.80196 23.346 1.80196ZM16.2969 0.372256C16.5097 0.372256 16.5496 0.674939 16.3441 0.730066L12.6897 1.71019C12.6365 1.72448 12.5796 1.71384 12.5351 1.68125L11.1963 0.701127C11.0543 0.59717 11.1279 0.372256 11.3038 0.372256H16.2969ZM12.2824 1.60945C12.3895 1.6879 12.3793 1.85093 12.2633 1.9154L5.84568 5.48017C5.7108 5.55509 5.54973 5.43874 5.57847 5.28715L6.19199 2.05172C6.20401 1.98832 6.24871 1.93603 6.30946 1.91427L10.5097 0.410286C10.5665 0.389919 10.6298 0.399103 10.6786 0.434802L12.2824 1.60945ZM7.85912 0.420404C7.89273 0.389443 7.93675 0.372256 7.98245 0.372256H9.29802C9.50218 0.372256 9.5516 0.656763 9.3594 0.725616L7.20678 1.49676C7.02003 1.56367 6.87617 1.32596 7.02208 1.19155L7.85912 0.420404ZM7.30984 0.802713L2.03462 5.66251C2.00101 5.69347 1.95699 5.71066 1.9113 5.71066H1.05099C0.874225 5.71066 0.80121 5.4841 0.944709 5.38089L7.30984 0.802713ZM1.91582 5.80166C1.95934 5.80166 2.00142 5.81726 2.03443 5.84562L10.4832 13.104L0.934886 6.13066C0.792681 6.02681 0.866142 5.80166 1.04223 5.80166H1.91582Z" fill="black"></path>
                                        <path d="M11.3582 13.8557C11.3581 13.8557 11.358 13.8559 11.3581 13.856L11.5208 13.9961C11.5248 13.9995 11.5307 13.999 11.5341 13.9951C11.5373 13.9914 11.5428 13.9908 11.5468 13.9937L17.9157 18.6452C17.9796 18.6919 18.0664 18.6919 18.1304 18.6452L35.7067 5.80876C35.713 5.80415 35.7206 5.80166 35.7284 5.80166C35.7643 5.80166 35.7791 5.75575 35.75 5.73482L28.1892 0.295918C28.1843 0.292349 28.1773 0.293523 28.1738 0.298513C28.1676 0.307252 28.1538 0.302931 28.1538 0.292227C28.1538 0.286164 28.1489 0.28125 28.1428 0.28125H7.90416C7.8981 0.28125 7.89319 0.286164 7.89319 0.292226C7.89319 0.302931 7.87939 0.307252 7.87321 0.298513C7.86968 0.293523 7.86275 0.292349 7.85779 0.295918L0.297019 5.73482C0.267935 5.75574 0.282735 5.80166 0.318562 5.80166C0.326384 5.80166 0.334004 5.80415 0.340321 5.80876L11.3583 13.8554C11.3584 13.8555 11.3584 13.8557 11.3582 13.8557ZM11.4156 13.7847C11.4153 13.7847 11.415 13.7846 11.4147 13.7844L2.49595 6.12173C2.36786 6.01168 2.44569 5.80166 2.61456 5.80166H5.33478C5.38962 5.80166 5.44154 5.82639 5.4761 5.86897L11.7237 13.5661C11.858 13.7316 11.6472 13.9535 11.475 13.8278L11.4164 13.7849C11.4161 13.7848 11.4159 13.7847 11.4156 13.7847ZM2.58326 5.71066C2.41748 5.71066 2.33801 5.5071 2.45994 5.39478L5.69754 2.41226C5.82649 2.29346 6.03235 2.40777 5.99968 2.58004L5.43408 5.56256C5.41779 5.64847 5.3427 5.71066 5.25526 5.71066H2.58326ZM12.2006 5.71066C12.0881 5.71066 12.0026 5.60966 12.0211 5.49872L12.5787 2.15354C12.601 2.01983 12.7564 1.95653 12.8658 2.03661L17.4346 5.38179C17.5766 5.48575 17.5031 5.71066 17.3271 5.71066H12.2006ZM17.7498 5.80166C17.8635 5.80166 17.9494 5.90483 17.9288 6.01669L16.3946 14.3356C16.3625 14.5095 16.1264 14.5401 16.051 14.3802L12.1264 6.06133C12.0695 5.9406 12.1575 5.80166 12.291 5.80166H17.7498ZM11.8938 5.71066H6.32137C6.13356 5.71066 6.0688 5.46075 6.23298 5.36954L12.2035 2.05265C12.3368 1.97863 12.4965 2.09136 12.4715 2.2417L11.893 5.70976C11.893 5.71023 11.8933 5.71066 11.8938 5.71066ZM11.7875 5.80166C11.858 5.80166 11.9221 5.84231 11.9521 5.90601L15.863 14.1951C15.9468 14.3728 15.7287 14.5389 15.5797 14.4108L5.9384 6.12169C5.81037 6.01162 5.88821 5.80166 6.05706 5.80166H11.7875ZM12.894 14.864L7.07714 7.69689C6.93731 7.5246 7.16887 7.29952 7.33712 7.44417L16.263 15.1183C16.2681 15.1227 16.2756 15.1221 16.28 15.1172C16.2857 15.1106 16.2962 15.1121 16.3 15.12L17.6019 17.8794C17.6823 18.0499 17.4822 18.2153 17.3299 18.104L12.8959 14.8657C12.8952 14.8652 12.8946 14.8646 12.894 14.864ZM16.3591 15.0324C16.3588 15.0324 16.3586 15.0321 16.3587 15.0318L17.839 7.00578C17.8758 6.8063 18.1621 6.80746 18.1972 7.00723L19.6333 15.1628C19.6336 15.1646 19.6354 15.1659 19.6373 15.1655C19.64 15.165 19.6422 15.1679 19.641 15.1704L18.1891 18.2144C18.1231 18.3529 17.9257 18.3525 17.8602 18.2137L16.3596 15.0327C16.3595 15.0325 16.3593 15.0324 16.3591 15.0324ZM24.3704 5.71066C24.2825 5.71066 24.2072 5.6479 24.1914 5.56148L23.5839 2.24935C23.5561 2.09809 23.7169 1.98273 23.8513 2.05741L29.8131 5.36954C29.9773 5.46075 29.9125 5.71066 29.7247 5.71066H24.3704ZM29.9894 5.80166C30.1582 5.80166 30.2361 6.01152 30.1081 6.12163L20.4981 14.3922C20.3489 14.5207 20.1304 14.3537 20.2151 14.1759L24.1593 5.90533C24.1895 5.842 24.2534 5.80166 24.3236 5.80166H29.9894ZM24.1259 5.71066H18.719C18.543 5.71066 18.4695 5.48574 18.6115 5.38178L23.1864 2.03255C23.2948 1.95324 23.4487 2.01451 23.473 2.14657L24.1266 5.70976C24.1267 5.71023 24.1264 5.71066 24.1259 5.71066ZM23.8202 5.80166C23.954 5.80166 24.042 5.94123 23.9844 6.06202L19.9488 14.5243C19.8726 14.6842 19.636 14.652 19.6053 14.4776L18.1153 6.01524C18.0956 5.90381 18.1814 5.80166 18.2945 5.80166H23.8202ZM18.1412 18.5243C18.1413 18.5243 18.1414 18.5242 18.1414 18.5241L19.7293 15.1944C19.7402 15.1716 19.7557 15.1513 19.7748 15.1348L28.7036 7.45042C28.8718 7.30564 29.1035 7.53074 28.9636 7.70307L23.1661 14.8466C23.1562 14.8588 23.1448 14.8696 23.1321 14.8789L18.1411 18.5238C18.1409 18.524 18.141 18.5243 18.1412 18.5243ZM23.4393 14.6552C23.439 14.6549 23.439 14.6545 23.4392 14.6542L30.57 5.86897C30.6046 5.82639 30.6565 5.80166 30.7113 5.80166H33.4956C33.6648 5.80166 33.7424 6.01227 33.6138 6.1221L25.0095 13.4679C25.003 13.4735 25.0022 13.4833 25.0078 13.4898C25.0137 13.4967 25.0124 13.5071 25.0051 13.5125L23.4402 14.6553C23.4399 14.6555 23.4395 14.6554 23.4393 14.6552ZM30.1494 2.64557C30.1221 2.4755 30.3244 2.36614 30.4517 2.48216L33.6472 5.39411C33.7701 5.5061 33.6909 5.71066 33.5246 5.71066H30.797C30.7076 5.71066 30.6315 5.64577 30.6173 5.55752L30.1494 2.64557ZM25.6465 13.043C25.6466 13.043 25.6466 13.043 25.6467 13.0429L34.0773 5.84525C34.1102 5.81712 34.1522 5.80166 34.1955 5.80166H35.003C35.1791 5.80166 35.2525 6.02681 35.1103 6.13066L25.6464 13.0425C25.6461 13.0427 25.6463 13.043 25.6465 13.043ZM35.1015 5.38089C35.2449 5.48411 35.1719 5.71066 34.9952 5.71066H34.1998C34.1544 5.71066 34.1107 5.69373 34.0772 5.66318L28.7663 0.823645L35.1015 5.38089ZM28.0651 0.372256C28.1105 0.372256 28.1542 0.389191 28.1877 0.419744L29.1591 1.30502C29.3073 1.44014 29.16 1.6806 28.9723 1.60986L26.6233 0.724585C26.4339 0.653183 26.485 0.372256 26.6875 0.372256H28.0651ZM29.9667 2.08216C29.9667 2.08208 29.9668 2.08207 29.9668 2.08215L30.4842 5.30065C30.5083 5.45064 30.3489 5.56242 30.2161 5.48865L23.7838 1.91545C23.6677 1.85097 23.6575 1.6879 23.7647 1.60947L25.3669 0.436813C25.4165 0.40051 25.4811 0.391694 25.5386 0.413371L29.9666 2.08222C29.9666 2.08224 29.9667 2.08221 29.9667 2.08216ZM25.299 0.372256C25.2993 0.372256 25.2994 0.372624 25.2991 0.372794L23.5119 1.68126C23.4674 1.71384 23.4105 1.72448 23.3573 1.7102L19.7023 0.730068C19.4967 0.674949 19.5366 0.372256 19.7494 0.372256H25.299ZM23.346 1.80196C23.3463 1.80196 23.3464 1.80231 23.3462 1.80247L18.1315 5.621C18.0675 5.66788 17.9804 5.66788 17.9164 5.621L13.0073 2.02623C12.884 1.93597 12.9201 1.74318 13.0677 1.70359L17.9759 0.386729C18.0068 0.37844 18.0393 0.37844 18.0702 0.386727L23.3459 1.80195C23.346 1.80195 23.346 1.80196 23.346 1.80196ZM16.2969 0.372256C16.5097 0.372256 16.5496 0.674939 16.3441 0.730066L12.6897 1.71019C12.6365 1.72448 12.5796 1.71384 12.5351 1.68125L11.1963 0.701127C11.0543 0.59717 11.1279 0.372256 11.3038 0.372256H16.2969ZM12.2824 1.60945C12.3895 1.6879 12.3793 1.85093 12.2633 1.9154L5.84568 5.48017C5.7108 5.55509 5.54973 5.43874 5.57847 5.28715L6.19199 2.05172C6.20401 1.98832 6.24871 1.93603 6.30946 1.91427L10.5097 0.410286C10.5665 0.389919 10.6298 0.399103 10.6786 0.434802L12.2824 1.60945ZM7.85912 0.420404C7.89273 0.389443 7.93675 0.372256 7.98245 0.372256H9.29802C9.50218 0.372256 9.5516 0.656763 9.3594 0.725616L7.20678 1.49676C7.02003 1.56367 6.87617 1.32596 7.02208 1.19155L7.85912 0.420404ZM7.30984 0.802713L2.03462 5.66251C2.00101 5.69347 1.95699 5.71066 1.9113 5.71066H1.05099C0.874225 5.71066 0.80121 5.4841 0.944709 5.38089L7.30984 0.802713ZM1.91582 5.80166C1.95934 5.80166 2.00142 5.81726 2.03443 5.84562L10.4832 13.104L0.934886 6.13066C0.792681 6.02681 0.866142 5.80166 1.04223 5.80166H1.91582Z" stroke="black" stroke-width="0.561866" mask="url(#path-3-outside-1_3883_7368)"></path>
                                        </svg>


                                        
                                        </span>
                                                    <div class="spec-title">Color</div>
                                                    <div class="spec-value">${window?.LB_GROWN_DIAMOND?.config?.fancyValues?.length > 0 && diamondsArray?.fancy_color?.length > 0 ? diamondsArray?.fancy_color : diamondsArray?.color?.length > 0 ? diamondsArray?.color : '-'}</div>
                                                    </div>

                                                    <div class="spec-card" tabindex="0" role="group" aria-label="Clarity ${diamondsArray?.clarity?.length > 0 ? diamondsArray?.clarity : '-'}">

                                                    <span class="icon " data-icon="dmd-clarity">
                                        
                                            
                                                            <svg width="77" height="41" viewBox="0 0 77 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M38.499 39.6477V0.598511H60.3571L76.009 12.8619L38.499 39.6477Z" fill="#D8D5DC"/>
                                                            <mask id="path-2-outside-1_5581_7750" maskUnits="userSpaceOnUse" x="-0.564453" y="-0.400024" width="78" height="41" fill="black">
                                                            <rect fill="white" x="-0.564453" y="-0.400024" width="78" height="41"/>
                                                            <path d="M24.2578 29.5915C24.2575 29.5915 24.2574 29.5919 24.2576 29.5921L24.6052 29.8913C24.6136 29.8985 24.6263 29.8976 24.6335 29.8892C24.6404 29.8813 24.6522 29.88 24.6606 29.8862L38.263 39.8206C38.3995 39.9204 38.5849 39.9204 38.7215 39.8206L76.2599 12.4053C76.2734 12.3955 76.2897 12.3902 76.3064 12.3902C76.3829 12.3902 76.4145 12.2921 76.3524 12.2474L60.2045 0.631302C60.1939 0.62368 60.1791 0.626188 60.1716 0.636845C60.1584 0.655509 60.1289 0.646281 60.1289 0.623419C60.1289 0.610472 60.1185 0.599976 60.1055 0.599976H16.8809C16.8679 0.599976 16.8575 0.610471 16.8575 0.623419C16.8575 0.64628 16.828 0.655509 16.8148 0.636844C16.8073 0.626188 16.7924 0.62368 16.7819 0.631302L0.633994 12.2474C0.571878 12.2921 0.603488 12.3902 0.680006 12.3902C0.696711 12.3902 0.712985 12.3955 0.726476 12.4053L24.258 29.5909C24.2583 29.5911 24.2582 29.5915 24.2578 29.5915ZM24.3804 29.4399C24.3797 29.4399 24.3791 29.4396 24.3786 29.4392L5.33035 13.0737C5.05678 12.8387 5.223 12.3902 5.58367 12.3902H11.3934C11.5105 12.3902 11.6214 12.443 11.6952 12.5339L25.0384 28.973C25.3254 29.3265 24.875 29.8004 24.5073 29.5319L24.3821 29.4404C24.3816 29.4401 24.381 29.4399 24.3804 29.4399ZM5.51681 12.1958C5.16276 12.1958 4.99303 11.761 5.25343 11.5212L12.1681 5.15126C12.4435 4.89754 12.8832 5.14168 12.8134 5.50959L11.6054 11.8795C11.5706 12.063 11.4103 12.1958 11.2235 12.1958H5.51681ZM26.0569 12.1958C25.8167 12.1958 25.634 11.9801 25.6735 11.7431L26.8645 4.59871C26.9121 4.31314 27.244 4.17795 27.4776 4.34898L37.2355 11.4934C37.5388 11.7154 37.3817 12.1958 37.0059 12.1958H26.0569ZM37.9086 12.3902C38.1516 12.3902 38.335 12.6105 38.2909 12.8494L35.0143 30.6164C34.9458 30.9877 34.4415 31.0533 34.2804 30.7118L25.8986 12.9447C25.7769 12.6869 25.965 12.3902 26.2501 12.3902H37.9086ZM25.4017 12.1958H13.5005C13.0993 12.1958 12.961 11.662 13.3117 11.4673L26.0633 4.38323C26.3478 4.22514 26.689 4.46591 26.6355 4.78699L25.4001 12.1939C25.4 12.1949 25.4007 12.1958 25.4017 12.1958ZM25.1748 12.3902C25.3252 12.3902 25.4621 12.477 25.5263 12.613L33.8789 30.3165C34.0579 30.6959 33.592 31.0506 33.2739 30.7771L12.6825 13.0737C12.4091 12.8386 12.5753 12.3902 12.936 12.3902H25.1748ZM27.5378 31.745L15.1146 16.4379C14.8159 16.0699 15.3105 15.5892 15.6698 15.8981L34.7333 32.2882C34.744 32.2974 34.7602 32.2963 34.7695 32.2857C34.7817 32.2717 34.8042 32.2749 34.8121 32.2917L37.5927 38.1851C37.7645 38.5493 37.3371 38.9024 37.0119 38.6649L27.542 31.7486C27.5405 31.7475 27.5391 31.7463 27.5378 31.745ZM34.9386 32.1046C34.9379 32.1046 34.9374 32.104 34.9375 32.1034L38.0991 14.9618C38.1777 14.5358 38.7891 14.5383 38.8643 14.9649L41.9312 32.3831C41.9319 32.3871 41.9357 32.3897 41.9398 32.389C41.9456 32.3879 41.9503 32.394 41.9477 32.3994L38.847 38.9005C38.7058 39.1963 38.2844 39.1954 38.1445 38.899L34.9395 32.1052C34.9393 32.1048 34.939 32.1046 34.9386 32.1046ZM52.0485 12.1958C51.8609 12.1958 51.7 12.0618 51.6662 11.8772L50.3687 4.80334C50.3095 4.48028 50.6528 4.23389 50.9399 4.3934L63.6728 11.4673C64.0235 11.6621 63.8851 12.1958 63.484 12.1958H52.0485ZM64.0493 12.3902C64.4098 12.3902 64.5761 12.8384 64.3029 13.0735L43.7784 30.7374C43.4597 31.0117 42.993 30.655 43.174 30.2755L51.5976 12.6116C51.6621 12.4763 51.7987 12.3902 51.9485 12.3902H64.0493ZM51.5263 12.1958H39.9787C39.6028 12.1958 39.4458 11.7154 39.749 11.4934L49.5199 4.34029C49.7513 4.17091 50.0801 4.30177 50.1319 4.58381L51.5279 12.1939C51.5281 12.1949 51.5274 12.1958 51.5263 12.1958ZM50.8734 12.3902C51.1592 12.3902 51.3473 12.6882 51.2242 12.9462L42.6052 31.0196C42.4423 31.3611 41.9371 31.2923 41.8715 30.9196L38.6892 12.8463C38.6473 12.6083 38.8303 12.3902 39.072 12.3902H50.8734ZM38.7446 39.5624C38.7448 39.5624 38.745 39.5623 38.745 39.5621L42.1363 32.4506C42.1596 32.4019 42.1927 32.3585 42.2336 32.3233L61.3031 15.9115C61.6624 15.6023 62.1572 16.083 61.8585 16.4511L49.4765 31.7078C49.4554 31.7338 49.431 31.757 49.4039 31.7767L38.7443 39.5614C38.7439 39.5617 38.7441 39.5624 38.7446 39.5624ZM50.0599 31.299C50.0593 31.2984 50.0593 31.2975 50.0598 31.2969L65.2893 12.5339C65.3631 12.443 65.474 12.3902 65.5911 12.3902H71.5376C71.8989 12.3902 72.0648 12.84 71.79 13.0745L53.4136 28.7633C53.3997 28.7752 53.398 28.7961 53.4099 28.8101C53.4224 28.8248 53.4198 28.847 53.4042 28.8584L50.0619 31.2991C50.0613 31.2996 50.0604 31.2995 50.0599 31.299ZM64.391 5.64956C64.3326 5.28632 64.7647 5.05276 65.0366 5.30056L71.8614 11.5197C72.1239 11.7589 71.9547 12.1958 71.5996 12.1958H65.7741C65.5833 12.1958 65.4206 12.0572 65.3903 11.8687L64.391 5.64956ZM54.774 27.8558C54.7741 27.8558 54.7742 27.8557 54.7743 27.8556L72.78 12.4832C72.8503 12.4232 72.9398 12.3902 73.0324 12.3902H74.757C75.133 12.3902 75.2899 12.871 74.9862 13.0928L54.7736 27.8548C54.7732 27.8551 54.7734 27.8558 54.774 27.8558ZM74.9673 11.4915C75.2738 11.712 75.1178 12.1958 74.7403 12.1958H73.0415C72.9446 12.1958 72.8513 12.1596 72.7797 12.0944L61.437 1.75839L74.9673 11.4915ZM59.9395 0.794341C60.0364 0.794341 60.1298 0.83051 60.2014 0.895763L62.2759 2.78648C62.5925 3.07506 62.2778 3.58863 61.877 3.43754L56.8602 1.54683C56.4556 1.39433 56.5649 0.794341 56.9973 0.794341H59.9395ZM64.0007 4.44626C64.0007 4.44609 64.0009 4.44607 64.001 4.44624L65.106 11.3201C65.1575 11.6405 64.817 11.8792 64.5334 11.7216L50.7957 4.09021C50.5478 3.95249 50.5261 3.60421 50.7549 3.43671L54.1768 0.932218C54.2827 0.854685 54.4206 0.835855 54.5435 0.882152L64.0005 4.44639C64.0006 4.44642 64.0007 4.44636 64.0007 4.44626ZM54.0317 0.794341C54.0323 0.794341 54.0326 0.795127 54.0321 0.79549L50.2151 3.59003C50.12 3.65962 49.9985 3.68235 49.8848 3.65184L42.0786 1.55854C41.6396 1.44082 41.7248 0.794341 42.1793 0.794341H54.0317ZM49.8607 3.84782C49.8613 3.84782 49.8616 3.84857 49.8611 3.84892L38.7238 12.0043C38.5871 12.1044 38.4012 12.1044 38.2645 12.0043L27.7799 4.32681C27.5166 4.13404 27.5937 3.72228 27.9088 3.63772L38.3915 0.825252C38.4575 0.807549 38.527 0.807547 38.593 0.825248L49.8606 3.84779C49.8606 3.84781 49.8607 3.84782 49.8607 3.84782ZM34.8057 0.794341C35.2601 0.794341 35.3453 1.44079 34.9064 1.55853L27.1017 3.65183C26.9879 3.68234 26.8664 3.65961 26.7713 3.59002L23.9121 1.49673C23.6089 1.2747 23.7659 0.794341 24.1418 0.794341H34.8057ZM26.2317 3.43666C26.4605 3.60421 26.4387 3.95241 26.1908 4.0901L12.4845 11.7035C12.1964 11.8635 11.8524 11.615 11.9138 11.2913L13.2241 4.38125C13.2498 4.24584 13.3453 4.13415 13.475 4.08769L22.4455 0.875563C22.567 0.832064 22.7022 0.85168 22.8063 0.927922L26.2317 3.43666ZM16.7847 0.897173C16.8565 0.831049 16.9505 0.794341 17.0481 0.794341H19.8578C20.2938 0.794341 20.3994 1.40198 19.9889 1.54903L15.3915 3.196C14.9926 3.33889 14.6854 2.83122 14.997 2.54414L16.7847 0.897173ZM15.6116 1.71369L4.34506 12.093C4.27329 12.1591 4.17926 12.1958 4.08167 12.1958H2.24428C1.86676 12.1958 1.71082 11.7119 2.01729 11.4915L15.6116 1.71369ZM4.09133 12.3902C4.18428 12.3902 4.27415 12.4235 4.34465 12.484L22.3891 27.986L1.99631 13.0928C1.6926 12.871 1.84949 12.3902 2.22558 12.3902H4.09133Z"/>
                                                            </mask>
                                                            <path d="M24.2578 29.5915C24.2575 29.5915 24.2574 29.5919 24.2576 29.5921L24.6052 29.8913C24.6136 29.8985 24.6263 29.8976 24.6335 29.8892C24.6404 29.8813 24.6522 29.88 24.6606 29.8862L38.263 39.8206C38.3995 39.9204 38.5849 39.9204 38.7215 39.8206L76.2599 12.4053C76.2734 12.3955 76.2897 12.3902 76.3064 12.3902C76.3829 12.3902 76.4145 12.2921 76.3524 12.2474L60.2045 0.631302C60.1939 0.62368 60.1791 0.626188 60.1716 0.636845C60.1584 0.655509 60.1289 0.646281 60.1289 0.623419C60.1289 0.610472 60.1185 0.599976 60.1055 0.599976H16.8809C16.8679 0.599976 16.8575 0.610471 16.8575 0.623419C16.8575 0.64628 16.828 0.655509 16.8148 0.636844C16.8073 0.626188 16.7924 0.62368 16.7819 0.631302L0.633994 12.2474C0.571878 12.2921 0.603488 12.3902 0.680006 12.3902C0.696711 12.3902 0.712985 12.3955 0.726476 12.4053L24.258 29.5909C24.2583 29.5911 24.2582 29.5915 24.2578 29.5915ZM24.3804 29.4399C24.3797 29.4399 24.3791 29.4396 24.3786 29.4392L5.33035 13.0737C5.05678 12.8387 5.223 12.3902 5.58367 12.3902H11.3934C11.5105 12.3902 11.6214 12.443 11.6952 12.5339L25.0384 28.973C25.3254 29.3265 24.875 29.8004 24.5073 29.5319L24.3821 29.4404C24.3816 29.4401 24.381 29.4399 24.3804 29.4399ZM5.51681 12.1958C5.16276 12.1958 4.99303 11.761 5.25343 11.5212L12.1681 5.15126C12.4435 4.89754 12.8832 5.14168 12.8134 5.50959L11.6054 11.8795C11.5706 12.063 11.4103 12.1958 11.2235 12.1958H5.51681ZM26.0569 12.1958C25.8167 12.1958 25.634 11.9801 25.6735 11.7431L26.8645 4.59871C26.9121 4.31314 27.244 4.17795 27.4776 4.34898L37.2355 11.4934C37.5388 11.7154 37.3817 12.1958 37.0059 12.1958H26.0569ZM37.9086 12.3902C38.1516 12.3902 38.335 12.6105 38.2909 12.8494L35.0143 30.6164C34.9458 30.9877 34.4415 31.0533 34.2804 30.7118L25.8986 12.9447C25.7769 12.6869 25.965 12.3902 26.2501 12.3902H37.9086ZM25.4017 12.1958H13.5005C13.0993 12.1958 12.961 11.662 13.3117 11.4673L26.0633 4.38323C26.3478 4.22514 26.689 4.46591 26.6355 4.78699L25.4001 12.1939C25.4 12.1949 25.4007 12.1958 25.4017 12.1958ZM25.1748 12.3902C25.3252 12.3902 25.4621 12.477 25.5263 12.613L33.8789 30.3165C34.0579 30.6959 33.592 31.0506 33.2739 30.7771L12.6825 13.0737C12.4091 12.8386 12.5753 12.3902 12.936 12.3902H25.1748ZM27.5378 31.745L15.1146 16.4379C14.8159 16.0699 15.3105 15.5892 15.6698 15.8981L34.7333 32.2882C34.744 32.2974 34.7602 32.2963 34.7695 32.2857C34.7817 32.2717 34.8042 32.2749 34.8121 32.2917L37.5927 38.1851C37.7645 38.5493 37.3371 38.9024 37.0119 38.6649L27.542 31.7486C27.5405 31.7475 27.5391 31.7463 27.5378 31.745ZM34.9386 32.1046C34.9379 32.1046 34.9374 32.104 34.9375 32.1034L38.0991 14.9618C38.1777 14.5358 38.7891 14.5383 38.8643 14.9649L41.9312 32.3831C41.9319 32.3871 41.9357 32.3897 41.9398 32.389C41.9456 32.3879 41.9503 32.394 41.9477 32.3994L38.847 38.9005C38.7058 39.1963 38.2844 39.1954 38.1445 38.899L34.9395 32.1052C34.9393 32.1048 34.939 32.1046 34.9386 32.1046ZM52.0485 12.1958C51.8609 12.1958 51.7 12.0618 51.6662 11.8772L50.3687 4.80334C50.3095 4.48028 50.6528 4.23389 50.9399 4.3934L63.6728 11.4673C64.0235 11.6621 63.8851 12.1958 63.484 12.1958H52.0485ZM64.0493 12.3902C64.4098 12.3902 64.5761 12.8384 64.3029 13.0735L43.7784 30.7374C43.4597 31.0117 42.993 30.655 43.174 30.2755L51.5976 12.6116C51.6621 12.4763 51.7987 12.3902 51.9485 12.3902H64.0493ZM51.5263 12.1958H39.9787C39.6028 12.1958 39.4458 11.7154 39.749 11.4934L49.5199 4.34029C49.7513 4.17091 50.0801 4.30177 50.1319 4.58381L51.5279 12.1939C51.5281 12.1949 51.5274 12.1958 51.5263 12.1958ZM50.8734 12.3902C51.1592 12.3902 51.3473 12.6882 51.2242 12.9462L42.6052 31.0196C42.4423 31.3611 41.9371 31.2923 41.8715 30.9196L38.6892 12.8463C38.6473 12.6083 38.8303 12.3902 39.072 12.3902H50.8734ZM38.7446 39.5624C38.7448 39.5624 38.745 39.5623 38.745 39.5621L42.1363 32.4506C42.1596 32.4019 42.1927 32.3585 42.2336 32.3233L61.3031 15.9115C61.6624 15.6023 62.1572 16.083 61.8585 16.4511L49.4765 31.7078C49.4554 31.7338 49.431 31.757 49.4039 31.7767L38.7443 39.5614C38.7439 39.5617 38.7441 39.5624 38.7446 39.5624ZM50.0599 31.299C50.0593 31.2984 50.0593 31.2975 50.0598 31.2969L65.2893 12.5339C65.3631 12.443 65.474 12.3902 65.5911 12.3902H71.5376C71.8989 12.3902 72.0648 12.84 71.79 13.0745L53.4136 28.7633C53.3997 28.7752 53.398 28.7961 53.4099 28.8101C53.4224 28.8248 53.4198 28.847 53.4042 28.8584L50.0619 31.2991C50.0613 31.2996 50.0604 31.2995 50.0599 31.299ZM64.391 5.64956C64.3326 5.28632 64.7647 5.05276 65.0366 5.30056L71.8614 11.5197C72.1239 11.7589 71.9547 12.1958 71.5996 12.1958H65.7741C65.5833 12.1958 65.4206 12.0572 65.3903 11.8687L64.391 5.64956ZM54.774 27.8558C54.7741 27.8558 54.7742 27.8557 54.7743 27.8556L72.78 12.4832C72.8503 12.4232 72.9398 12.3902 73.0324 12.3902H74.757C75.133 12.3902 75.2899 12.871 74.9862 13.0928L54.7736 27.8548C54.7732 27.8551 54.7734 27.8558 54.774 27.8558ZM74.9673 11.4915C75.2738 11.712 75.1178 12.1958 74.7403 12.1958H73.0415C72.9446 12.1958 72.8513 12.1596 72.7797 12.0944L61.437 1.75839L74.9673 11.4915ZM59.9395 0.794341C60.0364 0.794341 60.1298 0.83051 60.2014 0.895763L62.2759 2.78648C62.5925 3.07506 62.2778 3.58863 61.877 3.43754L56.8602 1.54683C56.4556 1.39433 56.5649 0.794341 56.9973 0.794341H59.9395ZM64.0007 4.44626C64.0007 4.44609 64.0009 4.44607 64.001 4.44624L65.106 11.3201C65.1575 11.6405 64.817 11.8792 64.5334 11.7216L50.7957 4.09021C50.5478 3.95249 50.5261 3.60421 50.7549 3.43671L54.1768 0.932218C54.2827 0.854685 54.4206 0.835855 54.5435 0.882152L64.0005 4.44639C64.0006 4.44642 64.0007 4.44636 64.0007 4.44626ZM54.0317 0.794341C54.0323 0.794341 54.0326 0.795127 54.0321 0.79549L50.2151 3.59003C50.12 3.65962 49.9985 3.68235 49.8848 3.65184L42.0786 1.55854C41.6396 1.44082 41.7248 0.794341 42.1793 0.794341H54.0317ZM49.8607 3.84782C49.8613 3.84782 49.8616 3.84857 49.8611 3.84892L38.7238 12.0043C38.5871 12.1044 38.4012 12.1044 38.2645 12.0043L27.7799 4.32681C27.5166 4.13404 27.5937 3.72228 27.9088 3.63772L38.3915 0.825252C38.4575 0.807549 38.527 0.807547 38.593 0.825248L49.8606 3.84779C49.8606 3.84781 49.8607 3.84782 49.8607 3.84782ZM34.8057 0.794341C35.2601 0.794341 35.3453 1.44079 34.9064 1.55853L27.1017 3.65183C26.9879 3.68234 26.8664 3.65961 26.7713 3.59002L23.9121 1.49673C23.6089 1.2747 23.7659 0.794341 24.1418 0.794341H34.8057ZM26.2317 3.43666C26.4605 3.60421 26.4387 3.95241 26.1908 4.0901L12.4845 11.7035C12.1964 11.8635 11.8524 11.615 11.9138 11.2913L13.2241 4.38125C13.2498 4.24584 13.3453 4.13415 13.475 4.08769L22.4455 0.875563C22.567 0.832064 22.7022 0.85168 22.8063 0.927922L26.2317 3.43666ZM16.7847 0.897173C16.8565 0.831049 16.9505 0.794341 17.0481 0.794341H19.8578C20.2938 0.794341 20.3994 1.40198 19.9889 1.54903L15.3915 3.196C14.9926 3.33889 14.6854 2.83122 14.997 2.54414L16.7847 0.897173ZM15.6116 1.71369L4.34506 12.093C4.27329 12.1591 4.17926 12.1958 4.08167 12.1958H2.24428C1.86676 12.1958 1.71082 11.7119 2.01729 11.4915L15.6116 1.71369ZM4.09133 12.3902C4.18428 12.3902 4.27415 12.4235 4.34465 12.484L22.3891 27.986L1.99631 13.0928C1.6926 12.871 1.84949 12.3902 2.22558 12.3902H4.09133Z" fill="black"/>
                                                            <path d="M24.2578 29.5915C24.2575 29.5915 24.2574 29.5919 24.2576 29.5921L24.6052 29.8913C24.6136 29.8985 24.6263 29.8976 24.6335 29.8892C24.6404 29.8813 24.6522 29.88 24.6606 29.8862L38.263 39.8206C38.3995 39.9204 38.5849 39.9204 38.7215 39.8206L76.2599 12.4053C76.2734 12.3955 76.2897 12.3902 76.3064 12.3902C76.3829 12.3902 76.4145 12.2921 76.3524 12.2474L60.2045 0.631302C60.1939 0.62368 60.1791 0.626188 60.1716 0.636845C60.1584 0.655509 60.1289 0.646281 60.1289 0.623419C60.1289 0.610472 60.1185 0.599976 60.1055 0.599976H16.8809C16.8679 0.599976 16.8575 0.610471 16.8575 0.623419C16.8575 0.64628 16.828 0.655509 16.8148 0.636844C16.8073 0.626188 16.7924 0.62368 16.7819 0.631302L0.633994 12.2474C0.571878 12.2921 0.603488 12.3902 0.680006 12.3902C0.696711 12.3902 0.712985 12.3955 0.726476 12.4053L24.258 29.5909C24.2583 29.5911 24.2582 29.5915 24.2578 29.5915ZM24.3804 29.4399C24.3797 29.4399 24.3791 29.4396 24.3786 29.4392L5.33035 13.0737C5.05678 12.8387 5.223 12.3902 5.58367 12.3902H11.3934C11.5105 12.3902 11.6214 12.443 11.6952 12.5339L25.0384 28.973C25.3254 29.3265 24.875 29.8004 24.5073 29.5319L24.3821 29.4404C24.3816 29.4401 24.381 29.4399 24.3804 29.4399ZM5.51681 12.1958C5.16276 12.1958 4.99303 11.761 5.25343 11.5212L12.1681 5.15126C12.4435 4.89754 12.8832 5.14168 12.8134 5.50959L11.6054 11.8795C11.5706 12.063 11.4103 12.1958 11.2235 12.1958H5.51681ZM26.0569 12.1958C25.8167 12.1958 25.634 11.9801 25.6735 11.7431L26.8645 4.59871C26.9121 4.31314 27.244 4.17795 27.4776 4.34898L37.2355 11.4934C37.5388 11.7154 37.3817 12.1958 37.0059 12.1958H26.0569ZM37.9086 12.3902C38.1516 12.3902 38.335 12.6105 38.2909 12.8494L35.0143 30.6164C34.9458 30.9877 34.4415 31.0533 34.2804 30.7118L25.8986 12.9447C25.7769 12.6869 25.965 12.3902 26.2501 12.3902H37.9086ZM25.4017 12.1958H13.5005C13.0993 12.1958 12.961 11.662 13.3117 11.4673L26.0633 4.38323C26.3478 4.22514 26.689 4.46591 26.6355 4.78699L25.4001 12.1939C25.4 12.1949 25.4007 12.1958 25.4017 12.1958ZM25.1748 12.3902C25.3252 12.3902 25.4621 12.477 25.5263 12.613L33.8789 30.3165C34.0579 30.6959 33.592 31.0506 33.2739 30.7771L12.6825 13.0737C12.4091 12.8386 12.5753 12.3902 12.936 12.3902H25.1748ZM27.5378 31.745L15.1146 16.4379C14.8159 16.0699 15.3105 15.5892 15.6698 15.8981L34.7333 32.2882C34.744 32.2974 34.7602 32.2963 34.7695 32.2857C34.7817 32.2717 34.8042 32.2749 34.8121 32.2917L37.5927 38.1851C37.7645 38.5493 37.3371 38.9024 37.0119 38.6649L27.542 31.7486C27.5405 31.7475 27.5391 31.7463 27.5378 31.745ZM34.9386 32.1046C34.9379 32.1046 34.9374 32.104 34.9375 32.1034L38.0991 14.9618C38.1777 14.5358 38.7891 14.5383 38.8643 14.9649L41.9312 32.3831C41.9319 32.3871 41.9357 32.3897 41.9398 32.389C41.9456 32.3879 41.9503 32.394 41.9477 32.3994L38.847 38.9005C38.7058 39.1963 38.2844 39.1954 38.1445 38.899L34.9395 32.1052C34.9393 32.1048 34.939 32.1046 34.9386 32.1046ZM52.0485 12.1958C51.8609 12.1958 51.7 12.0618 51.6662 11.8772L50.3687 4.80334C50.3095 4.48028 50.6528 4.23389 50.9399 4.3934L63.6728 11.4673C64.0235 11.6621 63.8851 12.1958 63.484 12.1958H52.0485ZM64.0493 12.3902C64.4098 12.3902 64.5761 12.8384 64.3029 13.0735L43.7784 30.7374C43.4597 31.0117 42.993 30.655 43.174 30.2755L51.5976 12.6116C51.6621 12.4763 51.7987 12.3902 51.9485 12.3902H64.0493ZM51.5263 12.1958H39.9787C39.6028 12.1958 39.4458 11.7154 39.749 11.4934L49.5199 4.34029C49.7513 4.17091 50.0801 4.30177 50.1319 4.58381L51.5279 12.1939C51.5281 12.1949 51.5274 12.1958 51.5263 12.1958ZM50.8734 12.3902C51.1592 12.3902 51.3473 12.6882 51.2242 12.9462L42.6052 31.0196C42.4423 31.3611 41.9371 31.2923 41.8715 30.9196L38.6892 12.8463C38.6473 12.6083 38.8303 12.3902 39.072 12.3902H50.8734ZM38.7446 39.5624C38.7448 39.5624 38.745 39.5623 38.745 39.5621L42.1363 32.4506C42.1596 32.4019 42.1927 32.3585 42.2336 32.3233L61.3031 15.9115C61.6624 15.6023 62.1572 16.083 61.8585 16.4511L49.4765 31.7078C49.4554 31.7338 49.431 31.757 49.4039 31.7767L38.7443 39.5614C38.7439 39.5617 38.7441 39.5624 38.7446 39.5624ZM50.0599 31.299C50.0593 31.2984 50.0593 31.2975 50.0598 31.2969L65.2893 12.5339C65.3631 12.443 65.474 12.3902 65.5911 12.3902H71.5376C71.8989 12.3902 72.0648 12.84 71.79 13.0745L53.4136 28.7633C53.3997 28.7752 53.398 28.7961 53.4099 28.8101C53.4224 28.8248 53.4198 28.847 53.4042 28.8584L50.0619 31.2991C50.0613 31.2996 50.0604 31.2995 50.0599 31.299ZM64.391 5.64956C64.3326 5.28632 64.7647 5.05276 65.0366 5.30056L71.8614 11.5197C72.1239 11.7589 71.9547 12.1958 71.5996 12.1958H65.7741C65.5833 12.1958 65.4206 12.0572 65.3903 11.8687L64.391 5.64956ZM54.774 27.8558C54.7741 27.8558 54.7742 27.8557 54.7743 27.8556L72.78 12.4832C72.8503 12.4232 72.9398 12.3902 73.0324 12.3902H74.757C75.133 12.3902 75.2899 12.871 74.9862 13.0928L54.7736 27.8548C54.7732 27.8551 54.7734 27.8558 54.774 27.8558ZM74.9673 11.4915C75.2738 11.712 75.1178 12.1958 74.7403 12.1958H73.0415C72.9446 12.1958 72.8513 12.1596 72.7797 12.0944L61.437 1.75839L74.9673 11.4915ZM59.9395 0.794341C60.0364 0.794341 60.1298 0.83051 60.2014 0.895763L62.2759 2.78648C62.5925 3.07506 62.2778 3.58863 61.877 3.43754L56.8602 1.54683C56.4556 1.39433 56.5649 0.794341 56.9973 0.794341H59.9395ZM64.0007 4.44626C64.0007 4.44609 64.0009 4.44607 64.001 4.44624L65.106 11.3201C65.1575 11.6405 64.817 11.8792 64.5334 11.7216L50.7957 4.09021C50.5478 3.95249 50.5261 3.60421 50.7549 3.43671L54.1768 0.932218C54.2827 0.854685 54.4206 0.835855 54.5435 0.882152L64.0005 4.44639C64.0006 4.44642 64.0007 4.44636 64.0007 4.44626ZM54.0317 0.794341C54.0323 0.794341 54.0326 0.795127 54.0321 0.79549L50.2151 3.59003C50.12 3.65962 49.9985 3.68235 49.8848 3.65184L42.0786 1.55854C41.6396 1.44082 41.7248 0.794341 42.1793 0.794341H54.0317ZM49.8607 3.84782C49.8613 3.84782 49.8616 3.84857 49.8611 3.84892L38.7238 12.0043C38.5871 12.1044 38.4012 12.1044 38.2645 12.0043L27.7799 4.32681C27.5166 4.13404 27.5937 3.72228 27.9088 3.63772L38.3915 0.825252C38.4575 0.807549 38.527 0.807547 38.593 0.825248L49.8606 3.84779C49.8606 3.84781 49.8607 3.84782 49.8607 3.84782ZM34.8057 0.794341C35.2601 0.794341 35.3453 1.44079 34.9064 1.55853L27.1017 3.65183C26.9879 3.68234 26.8664 3.65961 26.7713 3.59002L23.9121 1.49673C23.6089 1.2747 23.7659 0.794341 24.1418 0.794341H34.8057ZM26.2317 3.43666C26.4605 3.60421 26.4387 3.95241 26.1908 4.0901L12.4845 11.7035C12.1964 11.8635 11.8524 11.615 11.9138 11.2913L13.2241 4.38125C13.2498 4.24584 13.3453 4.13415 13.475 4.08769L22.4455 0.875563C22.567 0.832064 22.7022 0.85168 22.8063 0.927922L26.2317 3.43666ZM16.7847 0.897173C16.8565 0.831049 16.9505 0.794341 17.0481 0.794341H19.8578C20.2938 0.794341 20.3994 1.40198 19.9889 1.54903L15.3915 3.196C14.9926 3.33889 14.6854 2.83122 14.997 2.54414L16.7847 0.897173ZM15.6116 1.71369L4.34506 12.093C4.27329 12.1591 4.17926 12.1958 4.08167 12.1958H2.24428C1.86676 12.1958 1.71082 11.7119 2.01729 11.4915L15.6116 1.71369ZM4.09133 12.3902C4.18428 12.3902 4.27415 12.4235 4.34465 12.484L22.3891 27.986L1.99631 13.0928C1.6926 12.871 1.84949 12.3902 2.22558 12.3902H4.09133Z" stroke="black" stroke-width="1.2" mask="url(#path-2-outside-1_5581_7750)"/>
                                                            </svg>


                                            
                                        </span>
                                                    <div class="spec-title">Clarity</div>
                                                    <div class="spec-value">${diamondsArray?.clarity?.length > 0 ? diamondsArray?.clarity : '-'}</div>
                                                    </div>

                                                    <div class="spec-card" tabindex="0" role="group" aria-label="Cut ${diamondsArray?.cut?.length > 0 ? diamondsArray?.cut : '-'}">

                                                    <span class="icon " data-icon="dmd-cut">
                                        
                                            <svg width="44" height="32" viewBox="0 0 44 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-outside-1_3910_8594" maskUnits="userSpaceOnUse" x="-0.795898" y="7.31152" width="37" height="20" fill="black">
                                                <rect fill="white" x="-0.795898" y="7.31152" width="37" height="20"></rect>
                                                <path d="M11.3582 21.886C11.3581 21.886 11.358 21.8861 11.3581 21.8862L11.5208 22.0263C11.5248 22.0297 11.5307 22.0293 11.5341 22.0254C11.5373 22.0217 11.5428 22.021 11.5468 22.0239L17.9157 26.6755C17.9796 26.7222 18.0664 26.7222 18.1304 26.6755L35.7067 13.839C35.713 13.8344 35.7206 13.8319 35.7284 13.8319C35.7643 13.8319 35.7791 13.786 35.75 13.7651L28.1892 8.32619C28.1843 8.32262 28.1773 8.3238 28.1738 8.32879C28.1676 8.33753 28.1538 8.3332 28.1538 8.3225C28.1538 8.31644 28.1489 8.31152 28.1428 8.31152H7.90416C7.8981 8.31152 7.89319 8.31644 7.89319 8.3225C7.89319 8.3332 7.87939 8.33753 7.87321 8.32879C7.86968 8.3238 7.86275 8.32262 7.85779 8.32619L0.297019 13.7651C0.267935 13.786 0.282735 13.8319 0.318562 13.8319C0.326384 13.8319 0.334004 13.8344 0.340321 13.839L11.3583 21.8857C11.3584 21.8858 11.3584 21.886 11.3582 21.886ZM11.4156 21.815C11.4153 21.815 11.415 21.8149 11.4147 21.8147L2.49595 14.152C2.36786 14.042 2.44569 13.8319 2.61456 13.8319H5.33478C5.38962 13.8319 5.44154 13.8567 5.4761 13.8992L11.7237 21.5964C11.858 21.7619 11.6472 21.9838 11.475 21.858L11.4164 21.8152C11.4161 21.8151 11.4159 21.815 11.4156 21.815ZM2.58326 13.7409C2.41748 13.7409 2.33801 13.5374 2.45994 13.4251L5.69754 10.4425C5.82649 10.3237 6.03235 10.438 5.99968 10.6103L5.43408 13.5928C5.41779 13.6787 5.3427 13.7409 5.25526 13.7409H2.58326ZM12.2006 13.7409C12.0881 13.7409 12.0026 13.6399 12.0211 13.529L12.5787 10.1838C12.601 10.0501 12.7564 9.98681 12.8658 10.0669L17.4346 13.4121C17.5766 13.516 17.5031 13.7409 17.3271 13.7409H12.2006ZM17.7498 13.8319C17.8635 13.8319 17.9494 13.9351 17.9288 14.047L16.3946 22.3659C16.3625 22.5397 16.1264 22.5704 16.051 22.4105L12.1264 14.0916C12.0695 13.9709 12.1575 13.8319 12.291 13.8319H17.7498ZM11.8938 13.7409H6.32137C6.13356 13.7409 6.0688 13.491 6.23298 13.3998L12.2035 10.0829C12.3368 10.0089 12.4965 10.1216 12.4715 10.272L11.893 13.74C11.893 13.7405 11.8933 13.7409 11.8938 13.7409ZM11.7875 13.8319C11.858 13.8319 11.9221 13.8726 11.9521 13.9363L15.863 22.2254C15.9468 22.4031 15.7287 22.5692 15.5797 22.4411L5.9384 14.152C5.81037 14.0419 5.88821 13.8319 6.05706 13.8319H11.7875ZM12.894 22.8943L7.07714 15.7272C6.93731 15.5549 7.16887 15.3298 7.33712 15.4744L16.263 23.1486C16.2681 23.1529 16.2756 23.1524 16.28 23.1474C16.2857 23.1409 16.2962 23.1424 16.3 23.1503L17.6019 25.9097C17.6823 26.0802 17.4822 26.2455 17.3299 26.1343L12.8959 22.896C12.8952 22.8955 12.8946 22.8949 12.894 22.8943ZM16.3591 23.0627C16.3588 23.0627 16.3586 23.0624 16.3587 23.0621L17.839 15.0361C17.8758 14.8366 18.1621 14.8377 18.1972 15.0375L19.6333 23.193C19.6336 23.1949 19.6354 23.1962 19.6373 23.1958C19.64 23.1953 19.6422 23.1982 19.641 23.2007L18.1891 26.2446C18.1231 26.3832 17.9257 26.3827 17.8602 26.2439L16.3596 23.0629C16.3595 23.0628 16.3593 23.0627 16.3591 23.0627ZM24.3704 13.7409C24.2825 13.7409 24.2072 13.6782 24.1914 13.5918L23.5839 10.2796C23.5561 10.1284 23.7169 10.013 23.8513 10.0877L29.8131 13.3998C29.9773 13.491 29.9125 13.7409 29.7247 13.7409H24.3704ZM29.9894 13.8319C30.1582 13.8319 30.2361 14.0418 30.1081 14.1519L20.4981 22.4225C20.3489 22.551 20.1304 22.3839 20.2151 22.2062L24.1593 13.9356C24.1895 13.8723 24.2534 13.8319 24.3236 13.8319H29.9894ZM24.1259 13.7409H18.719C18.543 13.7409 18.4695 13.516 18.6115 13.4121L23.1864 10.0628C23.2948 9.98351 23.4487 10.0448 23.473 10.1768L24.1266 13.74C24.1267 13.7405 24.1264 13.7409 24.1259 13.7409ZM23.8202 13.8319C23.954 13.8319 24.042 13.9715 23.9844 14.0923L19.9488 22.5546C19.8726 22.7145 19.636 22.6823 19.6053 22.5078L18.1153 14.0455C18.0956 13.9341 18.1814 13.8319 18.2945 13.8319H23.8202ZM18.1412 26.5546C18.1413 26.5546 18.1414 26.5545 18.1414 26.5544L19.7293 23.2247C19.7402 23.2019 19.7557 23.1816 19.7748 23.1651L28.7036 15.4807C28.8718 15.3359 29.1035 15.561 28.9636 15.7333L23.1661 22.8769C23.1562 22.889 23.1448 22.8999 23.1321 22.9091L18.1411 26.5541C18.1409 26.5543 18.141 26.5546 18.1412 26.5546ZM23.4393 22.6855C23.439 22.6852 23.439 22.6848 23.4392 22.6845L30.57 13.8992C30.6046 13.8567 30.6565 13.8319 30.7113 13.8319H33.4956C33.6648 13.8319 33.7424 14.0425 33.6138 14.1524L25.0095 21.4982C25.003 21.5038 25.0022 21.5136 25.0078 21.5201C25.0137 21.527 25.0124 21.5374 25.0051 21.5427L23.4402 22.6855C23.4399 22.6857 23.4395 22.6857 23.4393 22.6855ZM30.1494 10.6758C30.1221 10.5058 30.3244 10.3964 30.4517 10.5124L33.6472 13.4244C33.7701 13.5364 33.6909 13.7409 33.5246 13.7409H30.797C30.7076 13.7409 30.6315 13.676 30.6173 13.5878L30.1494 10.6758ZM25.6465 21.0733C25.6466 21.0733 25.6466 21.0732 25.6467 21.0732L34.0773 13.8755C34.1102 13.8474 34.1522 13.8319 34.1955 13.8319H35.003C35.1791 13.8319 35.2525 14.0571 35.1103 14.1609L25.6464 21.0728C25.6461 21.0729 25.6463 21.0733 25.6465 21.0733ZM35.1015 13.4112C35.2449 13.5144 35.1719 13.7409 34.9952 13.7409H34.1998C34.1544 13.7409 34.1107 13.724 34.0772 13.6935L28.7663 8.85392L35.1015 13.4112ZM28.0651 8.40253C28.1105 8.40253 28.1542 8.41946 28.1877 8.45002L29.1591 9.33529C29.3073 9.47041 29.16 9.71088 28.9723 9.64013L26.6233 8.75486C26.4339 8.68346 26.485 8.40253 26.6875 8.40253H28.0651ZM29.9667 10.1124C29.9667 10.1124 29.9668 10.1123 29.9668 10.1124L30.4842 13.3309C30.5083 13.4809 30.3489 13.5927 30.2161 13.5189L23.7838 9.94573C23.6677 9.88124 23.6575 9.71817 23.7647 9.63974L25.3669 8.46709C25.4165 8.43078 25.4811 8.42197 25.5386 8.44364L29.9666 10.1125C29.9666 10.1125 29.9667 10.1125 29.9667 10.1124ZM25.299 8.40253C25.2993 8.40253 25.2994 8.4029 25.2991 8.40307L23.5119 9.71153C23.4674 9.74411 23.4105 9.75476 23.3573 9.74047L19.7023 8.76034C19.4967 8.70522 19.5366 8.40253 19.7494 8.40253H25.299ZM23.346 9.83223C23.3463 9.83223 23.3464 9.83258 23.3462 9.83275L18.1315 13.6513C18.0675 13.6982 17.9804 13.6982 17.9164 13.6513L13.0073 10.0565C12.884 9.96624 12.9201 9.77345 13.0677 9.73386L17.9759 8.417C18.0068 8.40871 18.0393 8.40871 18.0702 8.417L23.3459 9.83222C23.346 9.83223 23.346 9.83223 23.346 9.83223ZM16.2969 8.40253C16.5097 8.40253 16.5496 8.70521 16.3441 8.76034L12.6897 9.74046C12.6365 9.75475 12.5796 9.74411 12.5351 9.71153L11.1963 8.7314C11.0543 8.62744 11.1279 8.40253 11.3038 8.40253H16.2969ZM12.2824 9.63972C12.3895 9.71817 12.3793 9.8812 12.2633 9.94568L5.84568 13.5104C5.7108 13.5854 5.54973 13.469 5.57847 13.3174L6.19199 10.082C6.20401 10.0186 6.24871 9.9663 6.30946 9.94455L10.5097 8.44056C10.5665 8.42019 10.6298 8.42938 10.6786 8.46508L12.2824 9.63972ZM7.85912 8.45068C7.89273 8.41972 7.93675 8.40253 7.98245 8.40253H9.29802C9.50218 8.40253 9.5516 8.68704 9.3594 8.75589L7.20678 9.52704C7.02003 9.59394 6.87617 9.35624 7.02208 9.22182L7.85912 8.45068ZM7.30984 8.83299L2.03462 13.6928C2.00101 13.7237 1.95699 13.7409 1.9113 13.7409H1.05099C0.874225 13.7409 0.80121 13.5144 0.944709 13.4112L7.30984 8.83299ZM1.91582 13.8319C1.95934 13.8319 2.00142 13.8475 2.03443 13.8759L10.4832 21.1342L0.934886 14.1609C0.792681 14.0571 0.866142 13.8319 1.04223 13.8319H1.91582Z"></path>
                                                </mask>
                                                <path d="M11.3582 21.886C11.3581 21.886 11.358 21.8861 11.3581 21.8862L11.5208 22.0263C11.5248 22.0297 11.5307 22.0293 11.5341 22.0254C11.5373 22.0217 11.5428 22.021 11.5468 22.0239L17.9157 26.6755C17.9796 26.7222 18.0664 26.7222 18.1304 26.6755L35.7067 13.839C35.713 13.8344 35.7206 13.8319 35.7284 13.8319C35.7643 13.8319 35.7791 13.786 35.75 13.7651L28.1892 8.32619C28.1843 8.32262 28.1773 8.3238 28.1738 8.32879C28.1676 8.33753 28.1538 8.3332 28.1538 8.3225C28.1538 8.31644 28.1489 8.31152 28.1428 8.31152H7.90416C7.8981 8.31152 7.89319 8.31644 7.89319 8.3225C7.89319 8.3332 7.87939 8.33753 7.87321 8.32879C7.86968 8.3238 7.86275 8.32262 7.85779 8.32619L0.297019 13.7651C0.267935 13.786 0.282735 13.8319 0.318562 13.8319C0.326384 13.8319 0.334004 13.8344 0.340321 13.839L11.3583 21.8857C11.3584 21.8858 11.3584 21.886 11.3582 21.886ZM11.4156 21.815C11.4153 21.815 11.415 21.8149 11.4147 21.8147L2.49595 14.152C2.36786 14.042 2.44569 13.8319 2.61456 13.8319H5.33478C5.38962 13.8319 5.44154 13.8567 5.4761 13.8992L11.7237 21.5964C11.858 21.7619 11.6472 21.9838 11.475 21.858L11.4164 21.8152C11.4161 21.8151 11.4159 21.815 11.4156 21.815ZM2.58326 13.7409C2.41748 13.7409 2.33801 13.5374 2.45994 13.4251L5.69754 10.4425C5.82649 10.3237 6.03235 10.438 5.99968 10.6103L5.43408 13.5928C5.41779 13.6787 5.3427 13.7409 5.25526 13.7409H2.58326ZM12.2006 13.7409C12.0881 13.7409 12.0026 13.6399 12.0211 13.529L12.5787 10.1838C12.601 10.0501 12.7564 9.98681 12.8658 10.0669L17.4346 13.4121C17.5766 13.516 17.5031 13.7409 17.3271 13.7409H12.2006ZM17.7498 13.8319C17.8635 13.8319 17.9494 13.9351 17.9288 14.047L16.3946 22.3659C16.3625 22.5397 16.1264 22.5704 16.051 22.4105L12.1264 14.0916C12.0695 13.9709 12.1575 13.8319 12.291 13.8319H17.7498ZM11.8938 13.7409H6.32137C6.13356 13.7409 6.0688 13.491 6.23298 13.3998L12.2035 10.0829C12.3368 10.0089 12.4965 10.1216 12.4715 10.272L11.893 13.74C11.893 13.7405 11.8933 13.7409 11.8938 13.7409ZM11.7875 13.8319C11.858 13.8319 11.9221 13.8726 11.9521 13.9363L15.863 22.2254C15.9468 22.4031 15.7287 22.5692 15.5797 22.4411L5.9384 14.152C5.81037 14.0419 5.88821 13.8319 6.05706 13.8319H11.7875ZM12.894 22.8943L7.07714 15.7272C6.93731 15.5549 7.16887 15.3298 7.33712 15.4744L16.263 23.1486C16.2681 23.1529 16.2756 23.1524 16.28 23.1474C16.2857 23.1409 16.2962 23.1424 16.3 23.1503L17.6019 25.9097C17.6823 26.0802 17.4822 26.2455 17.3299 26.1343L12.8959 22.896C12.8952 22.8955 12.8946 22.8949 12.894 22.8943ZM16.3591 23.0627C16.3588 23.0627 16.3586 23.0624 16.3587 23.0621L17.839 15.0361C17.8758 14.8366 18.1621 14.8377 18.1972 15.0375L19.6333 23.193C19.6336 23.1949 19.6354 23.1962 19.6373 23.1958C19.64 23.1953 19.6422 23.1982 19.641 23.2007L18.1891 26.2446C18.1231 26.3832 17.9257 26.3827 17.8602 26.2439L16.3596 23.0629C16.3595 23.0628 16.3593 23.0627 16.3591 23.0627ZM24.3704 13.7409C24.2825 13.7409 24.2072 13.6782 24.1914 13.5918L23.5839 10.2796C23.5561 10.1284 23.7169 10.013 23.8513 10.0877L29.8131 13.3998C29.9773 13.491 29.9125 13.7409 29.7247 13.7409H24.3704ZM29.9894 13.8319C30.1582 13.8319 30.2361 14.0418 30.1081 14.1519L20.4981 22.4225C20.3489 22.551 20.1304 22.3839 20.2151 22.2062L24.1593 13.9356C24.1895 13.8723 24.2534 13.8319 24.3236 13.8319H29.9894ZM24.1259 13.7409H18.719C18.543 13.7409 18.4695 13.516 18.6115 13.4121L23.1864 10.0628C23.2948 9.98351 23.4487 10.0448 23.473 10.1768L24.1266 13.74C24.1267 13.7405 24.1264 13.7409 24.1259 13.7409ZM23.8202 13.8319C23.954 13.8319 24.042 13.9715 23.9844 14.0923L19.9488 22.5546C19.8726 22.7145 19.636 22.6823 19.6053 22.5078L18.1153 14.0455C18.0956 13.9341 18.1814 13.8319 18.2945 13.8319H23.8202ZM18.1412 26.5546C18.1413 26.5546 18.1414 26.5545 18.1414 26.5544L19.7293 23.2247C19.7402 23.2019 19.7557 23.1816 19.7748 23.1651L28.7036 15.4807C28.8718 15.3359 29.1035 15.561 28.9636 15.7333L23.1661 22.8769C23.1562 22.889 23.1448 22.8999 23.1321 22.9091L18.1411 26.5541C18.1409 26.5543 18.141 26.5546 18.1412 26.5546ZM23.4393 22.6855C23.439 22.6852 23.439 22.6848 23.4392 22.6845L30.57 13.8992C30.6046 13.8567 30.6565 13.8319 30.7113 13.8319H33.4956C33.6648 13.8319 33.7424 14.0425 33.6138 14.1524L25.0095 21.4982C25.003 21.5038 25.0022 21.5136 25.0078 21.5201C25.0137 21.527 25.0124 21.5374 25.0051 21.5427L23.4402 22.6855C23.4399 22.6857 23.4395 22.6857 23.4393 22.6855ZM30.1494 10.6758C30.1221 10.5058 30.3244 10.3964 30.4517 10.5124L33.6472 13.4244C33.7701 13.5364 33.6909 13.7409 33.5246 13.7409H30.797C30.7076 13.7409 30.6315 13.676 30.6173 13.5878L30.1494 10.6758ZM25.6465 21.0733C25.6466 21.0733 25.6466 21.0732 25.6467 21.0732L34.0773 13.8755C34.1102 13.8474 34.1522 13.8319 34.1955 13.8319H35.003C35.1791 13.8319 35.2525 14.0571 35.1103 14.1609L25.6464 21.0728C25.6461 21.0729 25.6463 21.0733 25.6465 21.0733ZM35.1015 13.4112C35.2449 13.5144 35.1719 13.7409 34.9952 13.7409H34.1998C34.1544 13.7409 34.1107 13.724 34.0772 13.6935L28.7663 8.85392L35.1015 13.4112ZM28.0651 8.40253C28.1105 8.40253 28.1542 8.41946 28.1877 8.45002L29.1591 9.33529C29.3073 9.47041 29.16 9.71088 28.9723 9.64013L26.6233 8.75486C26.4339 8.68346 26.485 8.40253 26.6875 8.40253H28.0651ZM29.9667 10.1124C29.9667 10.1124 29.9668 10.1123 29.9668 10.1124L30.4842 13.3309C30.5083 13.4809 30.3489 13.5927 30.2161 13.5189L23.7838 9.94573C23.6677 9.88124 23.6575 9.71817 23.7647 9.63974L25.3669 8.46709C25.4165 8.43078 25.4811 8.42197 25.5386 8.44364L29.9666 10.1125C29.9666 10.1125 29.9667 10.1125 29.9667 10.1124ZM25.299 8.40253C25.2993 8.40253 25.2994 8.4029 25.2991 8.40307L23.5119 9.71153C23.4674 9.74411 23.4105 9.75476 23.3573 9.74047L19.7023 8.76034C19.4967 8.70522 19.5366 8.40253 19.7494 8.40253H25.299ZM23.346 9.83223C23.3463 9.83223 23.3464 9.83258 23.3462 9.83275L18.1315 13.6513C18.0675 13.6982 17.9804 13.6982 17.9164 13.6513L13.0073 10.0565C12.884 9.96624 12.9201 9.77345 13.0677 9.73386L17.9759 8.417C18.0068 8.40871 18.0393 8.40871 18.0702 8.417L23.3459 9.83222C23.346 9.83223 23.346 9.83223 23.346 9.83223ZM16.2969 8.40253C16.5097 8.40253 16.5496 8.70521 16.3441 8.76034L12.6897 9.74046C12.6365 9.75475 12.5796 9.74411 12.5351 9.71153L11.1963 8.7314C11.0543 8.62744 11.1279 8.40253 11.3038 8.40253H16.2969ZM12.2824 9.63972C12.3895 9.71817 12.3793 9.8812 12.2633 9.94568L5.84568 13.5104C5.7108 13.5854 5.54973 13.469 5.57847 13.3174L6.19199 10.082C6.20401 10.0186 6.24871 9.9663 6.30946 9.94455L10.5097 8.44056C10.5665 8.42019 10.6298 8.42938 10.6786 8.46508L12.2824 9.63972ZM7.85912 8.45068C7.89273 8.41972 7.93675 8.40253 7.98245 8.40253H9.29802C9.50218 8.40253 9.5516 8.68704 9.3594 8.75589L7.20678 9.52704C7.02003 9.59394 6.87617 9.35624 7.02208 9.22182L7.85912 8.45068ZM7.30984 8.83299L2.03462 13.6928C2.00101 13.7237 1.95699 13.7409 1.9113 13.7409H1.05099C0.874225 13.7409 0.80121 13.5144 0.944709 13.4112L7.30984 8.83299ZM1.91582 13.8319C1.95934 13.8319 2.00142 13.8475 2.03443 13.8759L10.4832 21.1342L0.934886 14.1609C0.792681 14.0571 0.866142 13.8319 1.04223 13.8319H1.91582Z" fill="black"></path>
                                                <path d="M11.3582 21.886C11.3581 21.886 11.358 21.8861 11.3581 21.8862L11.5208 22.0263C11.5248 22.0297 11.5307 22.0293 11.5341 22.0254C11.5373 22.0217 11.5428 22.021 11.5468 22.0239L17.9157 26.6755C17.9796 26.7222 18.0664 26.7222 18.1304 26.6755L35.7067 13.839C35.713 13.8344 35.7206 13.8319 35.7284 13.8319C35.7643 13.8319 35.7791 13.786 35.75 13.7651L28.1892 8.32619C28.1843 8.32262 28.1773 8.3238 28.1738 8.32879C28.1676 8.33753 28.1538 8.3332 28.1538 8.3225C28.1538 8.31644 28.1489 8.31152 28.1428 8.31152H7.90416C7.8981 8.31152 7.89319 8.31644 7.89319 8.3225C7.89319 8.3332 7.87939 8.33753 7.87321 8.32879C7.86968 8.3238 7.86275 8.32262 7.85779 8.32619L0.297019 13.7651C0.267935 13.786 0.282735 13.8319 0.318562 13.8319C0.326384 13.8319 0.334004 13.8344 0.340321 13.839L11.3583 21.8857C11.3584 21.8858 11.3584 21.886 11.3582 21.886ZM11.4156 21.815C11.4153 21.815 11.415 21.8149 11.4147 21.8147L2.49595 14.152C2.36786 14.042 2.44569 13.8319 2.61456 13.8319H5.33478C5.38962 13.8319 5.44154 13.8567 5.4761 13.8992L11.7237 21.5964C11.858 21.7619 11.6472 21.9838 11.475 21.858L11.4164 21.8152C11.4161 21.8151 11.4159 21.815 11.4156 21.815ZM2.58326 13.7409C2.41748 13.7409 2.33801 13.5374 2.45994 13.4251L5.69754 10.4425C5.82649 10.3237 6.03235 10.438 5.99968 10.6103L5.43408 13.5928C5.41779 13.6787 5.3427 13.7409 5.25526 13.7409H2.58326ZM12.2006 13.7409C12.0881 13.7409 12.0026 13.6399 12.0211 13.529L12.5787 10.1838C12.601 10.0501 12.7564 9.98681 12.8658 10.0669L17.4346 13.4121C17.5766 13.516 17.5031 13.7409 17.3271 13.7409H12.2006ZM17.7498 13.8319C17.8635 13.8319 17.9494 13.9351 17.9288 14.047L16.3946 22.3659C16.3625 22.5397 16.1264 22.5704 16.051 22.4105L12.1264 14.0916C12.0695 13.9709 12.1575 13.8319 12.291 13.8319H17.7498ZM11.8938 13.7409H6.32137C6.13356 13.7409 6.0688 13.491 6.23298 13.3998L12.2035 10.0829C12.3368 10.0089 12.4965 10.1216 12.4715 10.272L11.893 13.74C11.893 13.7405 11.8933 13.7409 11.8938 13.7409ZM11.7875 13.8319C11.858 13.8319 11.9221 13.8726 11.9521 13.9363L15.863 22.2254C15.9468 22.4031 15.7287 22.5692 15.5797 22.4411L5.9384 14.152C5.81037 14.0419 5.88821 13.8319 6.05706 13.8319H11.7875ZM12.894 22.8943L7.07714 15.7272C6.93731 15.5549 7.16887 15.3298 7.33712 15.4744L16.263 23.1486C16.2681 23.1529 16.2756 23.1524 16.28 23.1474C16.2857 23.1409 16.2962 23.1424 16.3 23.1503L17.6019 25.9097C17.6823 26.0802 17.4822 26.2455 17.3299 26.1343L12.8959 22.896C12.8952 22.8955 12.8946 22.8949 12.894 22.8943ZM16.3591 23.0627C16.3588 23.0627 16.3586 23.0624 16.3587 23.0621L17.839 15.0361C17.8758 14.8366 18.1621 14.8377 18.1972 15.0375L19.6333 23.193C19.6336 23.1949 19.6354 23.1962 19.6373 23.1958C19.64 23.1953 19.6422 23.1982 19.641 23.2007L18.1891 26.2446C18.1231 26.3832 17.9257 26.3827 17.8602 26.2439L16.3596 23.0629C16.3595 23.0628 16.3593 23.0627 16.3591 23.0627ZM24.3704 13.7409C24.2825 13.7409 24.2072 13.6782 24.1914 13.5918L23.5839 10.2796C23.5561 10.1284 23.7169 10.013 23.8513 10.0877L29.8131 13.3998C29.9773 13.491 29.9125 13.7409 29.7247 13.7409H24.3704ZM29.9894 13.8319C30.1582 13.8319 30.2361 14.0418 30.1081 14.1519L20.4981 22.4225C20.3489 22.551 20.1304 22.3839 20.2151 22.2062L24.1593 13.9356C24.1895 13.8723 24.2534 13.8319 24.3236 13.8319H29.9894ZM24.1259 13.7409H18.719C18.543 13.7409 18.4695 13.516 18.6115 13.4121L23.1864 10.0628C23.2948 9.98351 23.4487 10.0448 23.473 10.1768L24.1266 13.74C24.1267 13.7405 24.1264 13.7409 24.1259 13.7409ZM23.8202 13.8319C23.954 13.8319 24.042 13.9715 23.9844 14.0923L19.9488 22.5546C19.8726 22.7145 19.636 22.6823 19.6053 22.5078L18.1153 14.0455C18.0956 13.9341 18.1814 13.8319 18.2945 13.8319H23.8202ZM18.1412 26.5546C18.1413 26.5546 18.1414 26.5545 18.1414 26.5544L19.7293 23.2247C19.7402 23.2019 19.7557 23.1816 19.7748 23.1651L28.7036 15.4807C28.8718 15.3359 29.1035 15.561 28.9636 15.7333L23.1661 22.8769C23.1562 22.889 23.1448 22.8999 23.1321 22.9091L18.1411 26.5541C18.1409 26.5543 18.141 26.5546 18.1412 26.5546ZM23.4393 22.6855C23.439 22.6852 23.439 22.6848 23.4392 22.6845L30.57 13.8992C30.6046 13.8567 30.6565 13.8319 30.7113 13.8319H33.4956C33.6648 13.8319 33.7424 14.0425 33.6138 14.1524L25.0095 21.4982C25.003 21.5038 25.0022 21.5136 25.0078 21.5201C25.0137 21.527 25.0124 21.5374 25.0051 21.5427L23.4402 22.6855C23.4399 22.6857 23.4395 22.6857 23.4393 22.6855ZM30.1494 10.6758C30.1221 10.5058 30.3244 10.3964 30.4517 10.5124L33.6472 13.4244C33.7701 13.5364 33.6909 13.7409 33.5246 13.7409H30.797C30.7076 13.7409 30.6315 13.676 30.6173 13.5878L30.1494 10.6758ZM25.6465 21.0733C25.6466 21.0733 25.6466 21.0732 25.6467 21.0732L34.0773 13.8755C34.1102 13.8474 34.1522 13.8319 34.1955 13.8319H35.003C35.1791 13.8319 35.2525 14.0571 35.1103 14.1609L25.6464 21.0728C25.6461 21.0729 25.6463 21.0733 25.6465 21.0733ZM35.1015 13.4112C35.2449 13.5144 35.1719 13.7409 34.9952 13.7409H34.1998C34.1544 13.7409 34.1107 13.724 34.0772 13.6935L28.7663 8.85392L35.1015 13.4112ZM28.0651 8.40253C28.1105 8.40253 28.1542 8.41946 28.1877 8.45002L29.1591 9.33529C29.3073 9.47041 29.16 9.71088 28.9723 9.64013L26.6233 8.75486C26.4339 8.68346 26.485 8.40253 26.6875 8.40253H28.0651ZM29.9667 10.1124C29.9667 10.1124 29.9668 10.1123 29.9668 10.1124L30.4842 13.3309C30.5083 13.4809 30.3489 13.5927 30.2161 13.5189L23.7838 9.94573C23.6677 9.88124 23.6575 9.71817 23.7647 9.63974L25.3669 8.46709C25.4165 8.43078 25.4811 8.42197 25.5386 8.44364L29.9666 10.1125C29.9666 10.1125 29.9667 10.1125 29.9667 10.1124ZM25.299 8.40253C25.2993 8.40253 25.2994 8.4029 25.2991 8.40307L23.5119 9.71153C23.4674 9.74411 23.4105 9.75476 23.3573 9.74047L19.7023 8.76034C19.4967 8.70522 19.5366 8.40253 19.7494 8.40253H25.299ZM23.346 9.83223C23.3463 9.83223 23.3464 9.83258 23.3462 9.83275L18.1315 13.6513C18.0675 13.6982 17.9804 13.6982 17.9164 13.6513L13.0073 10.0565C12.884 9.96624 12.9201 9.77345 13.0677 9.73386L17.9759 8.417C18.0068 8.40871 18.0393 8.40871 18.0702 8.417L23.3459 9.83222C23.346 9.83223 23.346 9.83223 23.346 9.83223ZM16.2969 8.40253C16.5097 8.40253 16.5496 8.70521 16.3441 8.76034L12.6897 9.74046C12.6365 9.75475 12.5796 9.74411 12.5351 9.71153L11.1963 8.7314C11.0543 8.62744 11.1279 8.40253 11.3038 8.40253H16.2969ZM12.2824 9.63972C12.3895 9.71817 12.3793 9.8812 12.2633 9.94568L5.84568 13.5104C5.7108 13.5854 5.54973 13.469 5.57847 13.3174L6.19199 10.082C6.20401 10.0186 6.24871 9.9663 6.30946 9.94455L10.5097 8.44056C10.5665 8.42019 10.6298 8.42938 10.6786 8.46508L12.2824 9.63972ZM7.85912 8.45068C7.89273 8.41972 7.93675 8.40253 7.98245 8.40253H9.29802C9.50218 8.40253 9.5516 8.68704 9.3594 8.75589L7.20678 9.52704C7.02003 9.59394 6.87617 9.35624 7.02208 9.22182L7.85912 8.45068ZM7.30984 8.83299L2.03462 13.6928C2.00101 13.7237 1.95699 13.7409 1.9113 13.7409H1.05099C0.874225 13.7409 0.80121 13.5144 0.944709 13.4112L7.30984 8.83299ZM1.91582 13.8319C1.95934 13.8319 2.00142 13.8475 2.03443 13.8759L10.4832 21.1342L0.934886 14.1609C0.792681 14.0571 0.866142 13.8319 1.04223 13.8319H1.91582Z" stroke="black" stroke-width="0.561866" mask="url(#path-1-outside-1_3910_8594)"></path>
                                                <line x1="17.4718" y1="0.361551" x2="42.7786" y2="18.9102" stroke="black" stroke-width="0.723375" stroke-linecap="round"></line>
                                                <line x1="42.7756" y1="8.8166" x2="11.3395" y2="31.5804" stroke="black" stroke-width="0.723375" stroke-linecap="round"></line>
                                            </svg>

                                            
                                        </span>
                                         <div class="spec-title">Cut</div>
                                             <div class="spec-value">${diamondsArray?.cut?.length > 0 ? diamondsArray?.cut : '-'}</div>
                                          </div>
                                           <div class="spec-card" tabindex="0" role="group" aria-label="Dimensions 8.21 by 8.29 by 1.00 millimeters">
                                            <span class="icon " data-icon="dmd-dimensions">
                                                <svg width="37" height="15" viewBox="0 0 37 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 14.2092C0 14.409 0.161933 14.5709 0.361688 14.5709H35.8071C36.0068 14.5709 36.1687 14.409 36.1687 14.2092V5.99059C36.1687 5.79084 36.0068 5.62891 35.8071 5.62891H0.361687C0.161933 5.62891 0 5.79084 0 5.99059V14.2092ZM1.08507 7.07566C1.08506 6.8759 1.247 6.71397 1.44675 6.71397H1.62054C1.82029 6.71397 1.98223 6.8759 1.98223 7.07566V8.55915C1.98223 8.75891 2.14416 8.92084 2.34392 8.92084H2.7056C2.90536 8.92084 3.06729 8.75891 3.06729 8.55915V7.07566C3.06729 6.8759 3.22922 6.71397 3.42898 6.71397H4.0139C4.21365 6.71397 4.37559 6.8759 4.37559 7.07566V8.55915C4.37559 8.75891 4.53752 8.92084 4.73727 8.92084H5.09896C5.29872 8.92084 5.46065 8.75891 5.46065 8.55915V7.07566C5.46065 6.8759 5.62258 6.71397 5.82234 6.71397H6.40726C6.60701 6.71397 6.76894 6.8759 6.76894 7.07566V10.8054C6.76894 11.0051 6.93088 11.1671 7.13063 11.1671H7.49232C7.69207 11.1671 7.85401 11.0051 7.85401 10.8054V7.07566C7.85401 6.8759 8.01594 6.71397 8.21569 6.71397H8.80062C9.00037 6.71397 9.1623 6.8759 9.1623 7.07566V8.55915C9.1623 8.75891 9.32424 8.92084 9.52399 8.92084H9.88591C10.0856 8.92084 10.2475 8.75905 10.2476 8.55939L10.2485 7.07542C10.2487 6.87576 10.4106 6.71397 10.6102 6.71397H11.1954C11.3951 6.71397 11.5571 6.8759 11.5571 7.07566V8.55915C11.5571 8.75891 11.719 8.92084 11.9188 8.92084H12.2804C12.4802 8.92084 12.6421 8.75891 12.6421 8.55915V7.07566C12.6421 6.8759 12.8041 6.71397 13.0038 6.71397H13.5887C13.7885 6.71397 13.9504 6.8759 13.9504 7.07566V10.8054C13.9504 11.0051 14.1124 11.1671 14.3121 11.1671H14.6738C14.8736 11.1671 15.0355 11.0051 15.0355 10.8054V7.07566C15.0355 6.8759 15.1974 6.71397 15.3972 6.71397H15.9821C16.1819 6.71397 16.3438 6.8759 16.3438 7.07566V8.55915C16.3438 8.75891 16.5057 8.92084 16.7055 8.92084H17.0674C17.2671 8.92084 17.429 8.75905 17.4291 8.55939L17.43 7.07542C17.4302 6.87576 17.5921 6.71397 17.7917 6.71397H18.3769C18.5766 6.71397 18.7386 6.8759 18.7386 7.07566V8.55915C18.7386 8.75891 18.9005 8.92084 19.1003 8.92084H19.4619C19.6617 8.92084 19.8236 8.75891 19.8236 8.55915V7.07566C19.8236 6.8759 19.9856 6.71397 20.1853 6.71397H20.7702C20.97 6.71397 21.1319 6.8759 21.1319 7.07566V10.8054C21.1319 11.0051 21.2939 11.1671 21.4936 11.1671H21.8553C22.0551 11.1671 22.217 11.0051 22.217 10.8054V7.07566C22.217 6.8759 22.3789 6.71397 22.5787 6.71397H23.1636C23.3633 6.71397 23.5253 6.8759 23.5253 7.07566V8.55915C23.5253 8.75891 23.6872 8.92084 23.887 8.92084H24.2487C24.4484 8.92084 24.6103 8.75891 24.6103 8.55915V7.07566C24.6103 6.8759 24.7723 6.71397 24.972 6.71397H25.557C25.7567 6.71397 25.9186 6.8759 25.9186 7.07566V8.55915C25.9186 8.75891 26.0806 8.92084 26.2803 8.92084H26.6422C26.8419 8.92084 27.0038 8.75905 27.0039 8.55939L27.0049 7.07542C27.005 6.87576 27.1669 6.71397 27.3666 6.71397H27.9517C28.1515 6.71397 28.3134 6.8759 28.3134 7.07566V10.8054C28.3134 11.0051 28.4753 11.1671 28.6751 11.1671H29.0368C29.2365 11.1671 29.3985 11.0051 29.3985 10.8054V7.07566C29.3985 6.8759 29.5604 6.71397 29.7602 6.71397H30.3451C30.5448 6.71397 30.7068 6.8759 30.7068 7.07566V8.55915C30.7068 8.75891 30.8687 8.92084 31.0685 8.92084H31.4301C31.6299 8.92084 31.7918 8.75891 31.7918 8.55915V7.07566C31.7918 6.8759 31.9538 6.71397 32.1535 6.71397H32.7384C32.9382 6.71397 33.1001 6.8759 33.1001 7.07566V8.55915C33.1001 8.75891 33.2621 8.92084 33.4618 8.92084H33.8237C34.0234 8.92084 34.1853 8.75905 34.1854 8.55939L34.1864 7.07542C34.1865 6.87576 34.3484 6.71397 34.5481 6.71397H34.7221C34.9218 6.71397 35.0838 6.8759 35.0838 7.07566V13.1241C35.0838 13.3239 34.9218 13.4858 34.7221 13.4858L1.44681 13.4844C1.24706 13.4844 1.08514 13.3225 1.08514 13.1228L1.08507 7.07566Z" fill="black"></path>
                                                    <path d="M35.4454 0C35.2456 0 35.0837 0.161933 35.0837 0.361688V0.832171C35.0837 1.03193 34.9218 1.19386 34.722 1.19386H1.44675C1.24699 1.19386 1.08506 1.03193 1.08506 0.832171V0.361688C1.08506 0.161933 0.923129 0 0.723375 0H0.361688C0.161933 0 0 0.161933 0 0.361688V3.11109C0 3.31085 0.161933 3.47278 0.361688 3.47278H0.723375C0.923129 3.47278 1.08506 3.31085 1.08506 3.11109V2.64061C1.08506 2.44085 1.247 2.27892 1.44675 2.27892H34.722C34.9218 2.27892 35.0837 2.44085 35.0837 2.64061V3.11109C35.0837 3.31085 35.2456 3.47278 35.4454 3.47278H35.8071C36.0068 3.47278 36.1687 3.31085 36.1687 3.11109V0.361688C36.1687 0.161933 36.0068 0 35.8071 0H35.4454Z" fill="black"></path>
                                                </svg>
                                            </span>
                                            <div class="spec-title">Dimensions (mm)</div>
                                                <div class="spec-value measurements">--</div>
                                             </div>
                                            <div class="spec-card" tabindex="0" role="group" aria-label="Certificate">
                                                <span class="icon " data-icon="dmd-certificate">
                                                <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M28.1296 0H1.6014C0.71876 0 0 0.714895 0 1.5975V17.2244C0 18.1083 0.71876 18.8258 1.6014 18.8258H17.5365L16.1428 24.03C16.1093 24.159 16.1557 24.2932 16.2616 24.3758C16.3674 24.4545 16.5119 24.4649 16.628 24.3991L18.7869 23.15L20.036 25.3127C20.0953 25.4185 20.2037 25.4779 20.3225 25.4779H20.365C20.4967 25.4585 20.6051 25.363 20.6386 25.234L21.9303 20.4245C21.9961 20.4284 22.0658 20.4284 22.1316 20.4284C22.1974 20.4284 22.2671 20.4284 22.3329 20.4245L23.6246 25.234C23.6582 25.363 23.7666 25.4585 23.8982 25.4779H23.9408C24.0595 25.4779 24.1679 25.4185 24.2272 25.3127L25.4763 23.15L27.6352 24.3991C27.75 24.4649 27.8959 24.4545 28.0017 24.3758C28.1075 24.2932 28.1539 24.1578 28.1204 24.03L26.7267 18.8258H28.1268C29.0121 18.8271 29.7308 18.1083 29.7308 17.2244V1.5975C29.7308 0.714862 29.0122 0 28.1296 0ZM20.2116 24.2944L19.1961 22.5382C19.1496 22.462 19.0773 22.4065 18.9948 22.3833C18.9651 22.3769 18.9393 22.373 18.9096 22.373C18.8541 22.373 18.7947 22.3859 18.7444 22.4156L16.9882 23.4311L18.218 18.8268H18.2309C19.0412 19.6243 20.0929 20.1778 21.2672 20.3624L20.2116 24.2944ZM22.1601 19.769H22.1072C21.8801 19.769 21.6555 19.7523 21.4375 19.72C20.6271 19.6052 19.8748 19.2916 19.2425 18.827C18.9793 18.6322 18.7315 18.4115 18.5109 18.1677C18.4812 18.1341 18.4515 18.1018 18.4218 18.0683C18.2373 17.8541 18.0696 17.627 17.9237 17.3831C17.4824 16.6476 17.2282 15.7843 17.2282 14.8642C17.2282 12.1544 19.4232 9.95699 22.1331 9.95699C24.8431 9.95699 27.0381 12.1558 27.0381 14.8642C27.0381 15.7843 26.7839 16.6476 26.3425 17.3831C26.198 17.627 26.029 17.8541 25.8444 18.0683C25.8148 18.1018 25.7851 18.1341 25.7554 18.1677C25.5348 18.4115 25.287 18.6322 25.0238 18.827C24.3915 19.2916 23.6392 19.6052 22.8288 19.72C22.612 19.7535 22.3872 19.769 22.1601 19.769ZM27.2791 23.4312L25.5229 22.4157C25.4467 22.3731 25.3577 22.3602 25.2725 22.3821C25.1899 22.4054 25.1177 22.4608 25.0712 22.537L24.0557 24.2932L23.0014 20.3615C24.1744 20.1769 25.2261 19.6234 26.0377 18.8259H26.0506L27.2791 23.4312ZM29.0715 17.2244C29.0715 17.7457 28.6495 18.1677 28.1282 18.1677H26.6055C27.2946 17.2451 27.6959 16.1005 27.6959 14.8656C27.6959 11.797 25.2002 9.29862 22.1316 9.29862C19.063 9.29862 16.5673 11.7968 16.5673 14.8656C16.5673 16.1018 16.9699 17.2451 17.6577 18.1677H1.60137C1.08006 18.1677 0.658076 17.7458 0.658076 17.2244L0.659366 1.59754C0.659366 1.08009 1.08131 0.658109 1.60266 0.658109H28.1295C28.6508 0.658109 29.0728 1.08006 29.0728 1.59754L29.0715 17.2244ZM22.1329 18.7252C20.0038 18.7252 18.2709 16.9921 18.2709 14.8631C18.2709 12.734 20.0039 11.0011 22.1329 11.0011C24.262 11.0011 25.995 12.7341 25.995 14.8631C25.995 16.9936 24.2633 18.7252 22.1329 18.7252ZM22.1329 11.6601C20.3677 11.6601 18.9302 13.0963 18.9302 14.8629C18.9302 16.6282 20.3664 18.0657 22.1329 18.0657C23.8982 18.0657 25.3357 16.6294 25.3357 14.8629C25.3357 13.0976 23.8995 11.6601 22.1329 11.6601ZM21.8555 4.29049H7.87539C7.69345 4.29049 7.54634 4.14339 7.54634 3.96144C7.54634 3.7795 7.69345 3.63239 7.87539 3.63239H21.8555C22.0375 3.63239 22.1846 3.7795 22.1846 3.96144C22.1858 4.14339 22.0375 4.29049 21.8555 4.29049ZM26.6352 7.01582H3.09566C2.91372 7.01582 2.76661 6.86872 2.76661 6.68677C2.76661 6.50482 2.91372 6.35772 3.09566 6.35772H26.6352C26.8172 6.35772 26.9643 6.50482 26.9643 6.68677C26.9656 6.86872 26.8172 7.01582 26.6352 7.01582ZM14.9054 9.74244H3.09566C2.91372 9.74244 2.76661 9.59533 2.76661 9.41339C2.76661 9.23144 2.91372 9.08434 3.09566 9.08434H14.9054C15.0874 9.08434 15.2345 9.23144 15.2345 9.41339C15.2358 9.59404 15.0874 9.74244 14.9054 9.74244ZM14.9054 12.4678H3.09566C2.91372 12.4678 2.76661 12.3207 2.76661 12.1387C2.76661 11.9568 2.91372 11.8097 3.09566 11.8097H14.9054C15.0874 11.8097 15.2345 11.9568 15.2345 12.1387C15.2358 12.3194 15.0874 12.4678 14.9054 12.4678ZM14.9054 15.1931H3.09566C2.91372 15.1931 2.76661 15.046 2.76661 14.864C2.76661 14.6821 2.91372 14.535 3.09566 14.535H14.9054C15.0874 14.535 15.2345 14.6821 15.2345 14.864C15.2358 15.0447 15.0874 15.1931 14.9054 15.1931Z" fill="black"></path>
                                            </svg>
                                        </span>
                                            <div class="spec-title">Certificate</div>
                                                    <div class="spec-value certificate-del">--</div>
                                                    </div>

                                                </div>
                                                </div>
                                            </div>
                                            <div class="details-section">
                                                <h3 class="details-heading hdfont">Additional Details</h3>
                                                <table class="details-table" aria-label="Additional product details">
                                                <tbody>
                                                    <tr>
                                                    <td class="dt-label">SKU:</td>
                                                    <td class="dt-value">${diamondsArray?.shopify_sku?.length > 0 ? diamondsArray?.shopify_sku : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="dt-label">Stone:</td>
                                                            <td class="dt-value">Lab-Grown Diamond</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="dt-label">Price:</td>
                                                            <td class="dt-value">${window.LB_GROWN_DIAMOND.formatMoney(parseFloat(window.LB_GROWN_DIAMOND.priceInShopCurrency(diamondsArray?.price)) * 100)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="dt-label">Certification:</td>
                                                            <td class="dt-value certificate-del"><a class="tdu" href="${diamondsArray?.cert_url}" target="_blank">${diamondsArray?.lab?.length > 0 ? diamondsArray?.lab : '-'}</a></td>
                                                    </tr>
                                                     <tr>
                                                    <td class="dt-label">Carat Weight:</td>
                                                    <td class="dt-value">${diamondsArray?.carat?.length > 0 ? diamondsArray?.carat : '-'} ct</td>
                                                    </tr>
                                                     <tr>
                                                    <td class="dt-label">Shape:</td>
                                                    <td class="dt-value">${diamondsArray?.shape?.length > 0 ? diamondsArray?.shape : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                    <td class="dt-label">Cut:</td>
                                                    <td class="dt-value">${diamondsArray?.cut?.length > 0 ? diamondsArray?.cut : '-'}</td>
                                                    </tr>
                                                     <tr>
                                                    <td class="dt-label">Color:</td>
                                                    <td class="dt-value">${diamondsArray?.color?.length > 0 ? diamondsArray?.color : '-'}</td>
                                                    </tr>
                                                     <tr>
                                                    <td class="dt-label">Clarity:</td>
                                                    <td class="dt-value">${diamondsArray?.clarity?.length > 0 ? diamondsArray?.clarity : '-'}</td>
                                                    </tr>
                                                      <tr>
                                                    <td class="dt-label">Measurements (mm):</td>
                                                    <td class="dt-value measurements">-</td>
                                                    </tr>
                                                      <tr>
                                                    <td class="dt-label">Table (%):</td>
                                                    <td class="dt-value">${diamondsArray?.table?.length > 0 ? diamondsArray?.table : '-'}</td>
                                                    </tr>
                                                      
                                                    <tr>
                                                    <td class="dt-label">Depth (%):</td>
                                                    <td class="dt-value">${diamondsArray?.depth?.length > 0 ? diamondsArray?.depth : '-'}</td>
                                                    </tr>
                                                     <tr>
                                                    <td class="dt-label">Symmetry:</td>
                                                    <td class="dt-value">${diamondsArray?.symmetry?.length > 0 ? diamondsArray?.symmetry : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                    <td class="dt-label">Polish:</td>
                                                    <td class="dt-value">${diamondsArray?.polish?.length > 0 ? diamondsArray?.polish : '-'}</td>
                                                    </tr>
                                                     <tr>
                                                    <td class="dt-label">Fluorescence:</td>
                                                    <td class="dt-value">${diamondsArray?.fluor?.length > 0 ? diamondsArray?.fluor : '-'}</td>
                                                    </tr>
                                                    <tr>
                                                    <td class="dt-label">Length/Width Ratio:</td>
                                                    <td class="dt-value">${diamondsArray?.l_w_ratio?.length > 0 ? diamondsArray?.l_w_ratio : '-'}</td>
                                                    </tr>
                                                 
                                                </tbody>
                                                </table>
                                            </div>

                                            </div>
                                            <div class="filters-toggle-container">
                                            <div class="filter-buttons">
                                            
                                                <a href="${ringurl }" class="button button--secondary reset-button" aria-label="Add diamond to ring">${window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined ? 'select': 'Add to ring'}</a>
                                                ${window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') === undefined ? `<a href="javascript:;"  data-id="${diamondsArray?.shopify_variant_id}" class="button button--primary results-button add-to-cart vdb-add-to-cart" aria-label="Add to Bag">ADD TO BAG</a>`:""}
                                                
                                            </div>
                                            <a target="_blank" href="/products/${staticHandle1}?&dyo=diamond_journey" class="viewdetail">VIEW DETAILS</a>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                        `;
                                    // if (x == (resultArray?.data?.length-1)) { // page_number == 1 &&
                                    //     htmlList += '<tr><td colspan="7" style="padding: 0;"><div class="listing-banner"><a href="/pages/customer-care" target="_blank"><img class="is-hidden-mobile-only" src="https://cdn.shopify.com/s/files/1/1164/4258/files/MiaDonna-Database_Banner_Answer-Questions-Diamonds-Help.jpg?v=1697791217" alt="MiaDonna Database Banner" width="100%" height="100%" loading="lazy"><img class="is-hidden-desktop-only" src="https://cdn.shopify.com/s/files/1/1164/4258/files/MiaDonna-Database_Banner-Mobile_Answer-Questions-Diamonds-Help.jpg?v=1697791216" alt="MiaDonna Database Banner" width="100%" height="100%" loading="lazy"></a></div></td></tr><tr   style="display: none;"><td colspan="7" class="listing-banner-tr"></td></tr>';
                                    // }
                                    //const table = document.querySelector("#table-id tbody"); // your table selector
                                    //const rows = table.querySelectorAll('tr');

                                    // rows.forEach(tr => {
                                    //     // If this row does NOT have a .listing-banner inside, remove it
                                    //     if (tr.querySelector('.listing-banner')) {
                                    //         tr.remove();
                                    //     }
                                    // });
                                    //document.querySelector("#table-id tbody").innerHTML += htmlList;
                                    
                               

                                                             
                                        rows.push(htmlList);


                                    totalResultIndex++;
                                }
                               
                                    
                                  
                                  
                                  
                                //document.querySelector("#table-id tbody .listing-banner")?.closest("tr")?.remove();      
                               var tbody = document.querySelector("#table-id tbody");
                               
                                // var banners = tbody.getElementsByClassName("listing-banner");

                                // if (banners.length) {
                                // banners[banners.length - 1].closest("tr").remove();
                                // }
                                // var bannersTr = tbody.getElementsByClassName("listing-banner-tr");

                                // if (bannersTr.length) {
                                // bannersTr[bannersTr.length - 1].closest("tr").remove();
                                // }
                                 //const tbody = document.querySelector("#table-id tbody");
                                //tbody.insertAdjacentHTML("beforeend", rows.join(""));
                                const fragment = document.createDocumentFragment();
                                const tempDiv = document.createElement('tbody');
                                tempDiv.innerHTML = rows.join("");
                                while (tempDiv.firstChild) {
                                    fragment.appendChild(tempDiv.firstChild);
                                }
                                tbody.appendChild(fragment);

                                /* if (totalResultIndex < parseInt(resultArray?.total_count)) {
                                    window.LB_GROWN_DIAMOND.showElements('.vdb-see-more-div');    
                                } */

                                if (resultArray?.page_count > 1 && document.getElementsByClassName('vdb-pagination-section')?.length > 0) {
                                    let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section');
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                        vdbPaginationSectionElements[i].innerHTML = window.LB_GROWN_DIAMOND.initPaginationHTML(resultArray?.current_page,resultArray?.page_count);
                                    }
                                    window.LB_GROWN_DIAMOND.initPaginationButtonEvent();
                                    window.LB_GROWN_DIAMOND.showElements('.vdb-container--pagination');
                                }
                                  if (resultArray?.page_count > 1 && document.getElementsByClassName('vdb-pagination-section-loadmore')?.length > 0) {
                                  
                                    let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section-loadmore');
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                        vdbPaginationSectionElements[i].innerHTML = '';
                                        
                                        vdbPaginationSectionElements[i].innerHTML = window.LB_GROWN_DIAMOND.initPaginationloadMoreHTML(resultArray?.current_page,resultArray?.page_count,resultArray?.total_count,resultArray?.sr_end);
                                        //console.log(window.LB_GROWN_DIAMOND.initPaginationloadMoreHTML(resultArray?.current_page,resultArray?.page_count,resultArray?.total_count,resultArray?.sr_end));
                                       
                                    }
                                    window.LB_GROWN_DIAMOND.initPaginationButtonEvent();
                                    window.LB_GROWN_DIAMOND.showElements('.vdb-container--pagination');
                                }else{
                                    let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section-loadmore');
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                        vdbPaginationSectionElements[i].innerHTML = '';
                                        
                                        vdbPaginationSectionElements[i].innerHTML = '';
                                        //console.log(window.LB_GROWN_DIAMOND.initPaginationloadMoreHTML(resultArray?.current_page,resultArray?.page_count,resultArray?.total_count,resultArray?.sr_end));
                                       
                                    }
                                     window.LB_GROWN_DIAMOND.showElements('.vdb-container--pagination');
                                }
                                
                                window.LB_GROWN_DIAMOND.initViewButton();
                                window.LB_GROWN_DIAMOND.initOpenCertPopup();
                                window.LB_GROWN_DIAMOND.initClearFiltersButton();
                                //window.LB_GROWN_DIAMOND.initApplyFiltersButton();
                                window.LB_GROWN_DIAMOND.initAddToCartButton();
                                window.LB_GROWN_DIAMOND.openContactPopup();
                                window.LB_GROWN_DIAMOND.initShowAndHideIframe();
                            } else {
                                if (window.LB_GROWN_DIAMOND.config.page_number == 1) {
                                    document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                                /*document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '<div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div>';
                                document.querySelector("#table-id tbody").innerHTML = '<tr><td colspan="7" style="text-align: center;"><div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div></td></tr>';*/
                                document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a href="" class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                                document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="7" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                            } /*else if (window.LB_GROWN_DIAMOND.config.page_number > 1) {
                                    // document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                                document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                                document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="7" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                            }*/
                            // document.getElementById('vdb-lb-filter-container').style.display = 'none';
                             if (document.getElementsByClassName(' vdb-pagination-section-loadmore')?.length > 0) {
                                    let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section-loadmore');
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                        vdbPaginationSectionElements[i].innerHTML = '';
                                        
                                    }
                                }
                            }
                        } else {
                            if (window.LB_GROWN_DIAMOND.config.page_number == 1) {
                                document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                            //document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '<div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div>';
                            //document.querySelector("#table-id tbody").innerHTML = '<tr><td colspan="7" style="text-align: center;"><div class="no-results"><div class="no-results-content text-center"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">CLEAR FILTERS</a></div></div></td></tr>';
                            document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                            document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="7" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                        } /*else if (window.LB_GROWN_DIAMOND.config.page_number > 1) {
                                // document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                            document.getElementById('vdb-lb-search-result-wrapper').innerHTML += '<div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div>';
                            document.querySelector("#table-id tbody").innerHTML += '<tr><td colspan="7" style="text-align: center;padding: 0;"><div class="no-results"><div class="no-results-content text-center" style="padding-bottom: 25px;"><p>No diamonds meets your filter criteria.</p><a class="list--btn list--clear-filters vdb-lb-clear-all-filters" href="javascript:;">RESET FILTERS</a></div><div class="no-results-content text-center"><p>No stone left unturned, if you don’t see what you’re looking for, contact us and we’ll find you the perfect diamond from our offline inventory.</p><a class="list--btn list--contact-us open-contact-us-popup" href="javascript:;">CONTACT US</a></div></div></td></tr>';
                        }*/
                        // document.getElementById('vdb-lb-filter-container').style.display = 'none';
                         if (document.getElementsByClassName(' vdb-pagination-section-loadmore')?.length > 0) {
                                    let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section-loadmore');
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                        vdbPaginationSectionElements[i].innerHTML = '';
                                        
                                    }
                                }
                        }
                        
                        //document.querySelector(".diamond-loader").classList.add('hide');
                        // window.LB_GROWN_DIAMOND.initClearFiltersButton();
                        // window.LB_GROWN_DIAMOND.openContactPopup();
                         window.LB_GROWN_DIAMOND.initViewButton();
                                window.LB_GROWN_DIAMOND.initOpenCertPopup();
                                window.LB_GROWN_DIAMOND.initClearFiltersButton();
                                //window.LB_GROWN_DIAMOND.initApplyFiltersButton();
                                window.LB_GROWN_DIAMOND.initAddToCartButton();
                                window.LB_GROWN_DIAMOND.openContactPopup();
                                window.LB_GROWN_DIAMOND.initShowAndHideIframe();
                        //detailDiamondLListDrawer();
                        //    if(ajaxPaginationClick == 'Yes') {
                        // ajaxPaginationClick == 'No';
                        // //        if (document.getElementsByClassName('pagination-button__load-more')?.length > 0) {
                        // //          let paginationButtonLoadNumberElements = document.getElementsByClassName('pagination-button__load-more');
                        // //          //paginationButtonLoadNumberElements.classList.remvoe('is-loading');
                        // //        }   
                        //    }
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
                              const tdURL = this.dataset.href;
                             // window.location.href = tdURL;
                         })
                        element.addEventListener('click', async function (e) {
                            const tdId = this.dataset.id;
                            const tdDisplay = this.dataset.display;
                            const tdVideo = this.dataset.video;

                            vdbLBViewButtonElements.forEach(i => document.querySelector('#' + i.dataset.id + '-list').classList.remove('hide'));
                            vdbLBViewButtonElements.forEach(i => document.querySelector('#' + i.dataset.id).classList.add('vdb-active-content'));
                            vdbLBViewButtonElements.forEach(i => document.querySelectorAll('.' + i.dataset.id + '-video-desk') && (document.querySelectorAll('.' + i.dataset.id + '-video-desk').forEach(e => e.src = '')));
                            vdbLBViewButtonElements.forEach(i => document.querySelectorAll('.' + i.dataset.id + '-video-mob') && (document.querySelectorAll('.' + i.dataset.id + '-video-mob').forEach(e => e.src = '')));
                            if (tdDisplay == "true") {
                                //document.querySelector('#' + tdId+'-list').classList.add('hide');
                                //document.querySelector('#' + tdId).classList.remove('vdb-active-content');
                                /* if (window.innerWidth <= 799) {
                                    document.querySelectorAll('.' + tdId + '-video-mob').forEach(e => e.src = tdVideo);    
                                } else { */
                                    document.querySelectorAll('.' + tdId + '-video-desk').forEach(e => e.src = tdVideo);
                                /* } */
                            }
                        //     window.LB_GROWN_DIAMOND.initShowAndHideIframe();
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
                                //myCertFrame.src = 'https://docs.google.com/gview?url=' + save_cert_data + '&embedded=true';
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
        clearAllFiltersFun: async function (e) {
             
            window.LB_GROWN_DIAMOND.hideElements('.vdb-container--pagination'); // window.LB_GROWN_DIAMOND.hideElements('.vdb-see-more-div');
    
            let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
            vdbListItemAShapeStyleElements.forEach(i => i.dataset.shapeValue == defaultShape ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
            vdbListItemAShapeStyleElements.forEach(el => el.classList.remove('active')); 

    
            if (window.LB_GROWN_DIAMOND.getUrlParameter('color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') !== undefined) {
                if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color')) {
                    let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
                    vdbListItemAFancyStyleElements.forEach(i => i.dataset.fancyValue == defaultFancy ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                } else {
                    if (defaultColor?.length == 0) {
                        let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
                        vdbListItemAFancyStyleElements.forEach(i => i.dataset.fancyValue == defaultFancy ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                    } else {
                        let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
                        vdbListItemAColorStyleElements.forEach(i => i.dataset.colorValues == defaultColor ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                    }
                }
                
            } else if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('color') !== undefined) {
                if (window.LB_GROWN_DIAMOND.getUrlParameter('color')) {
                    let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
                    vdbListItemAColorStyleElements.forEach(i => i.dataset.colorValues == defaultColor ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                } else {
                    if (defaultFancy?.length == 0) {
                        let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
                        vdbListItemAColorStyleElements.forEach(i => i.dataset.colorValues == defaultColor ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                    } else {
                        let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
                        vdbListItemAFancyStyleElements.forEach(i => i.dataset.fancyValue == defaultFancy ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                    }
                }
            } else if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('color') == undefined) {
                if (defaultColor?.length > 0) {
                    let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
                    vdbListItemAColorStyleElements.forEach(i => i.dataset.colorValues == defaultColor ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                } else {
                    let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
                    vdbListItemAFancyStyleElements.forEach(i => i.dataset.fancyValue == defaultFancy ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                }
            }

            let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
            vdbListItemAFancyStyleElements.forEach(el => el.classList.remove('active')); 
            vdbListItemAFancyStyleElements.forEach(i => i.dataset.fancyValue == defaultFancy ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));

            const defaultColorArray = defaultColor.split(',');
            $slider_color && ($slider_color.value1 = defaultColorArray[0]);
            $slider_color && ($slider_color.value2 = defaultColorArray[defaultColorArray?.length - 1]);
            const containerColor = document.querySelector('.dmdfilter-swatche-color');
            setActiveSwatches(containerColor, defaultColorArray);
            
            $slider_color_mobile && ($slider_color_mobile.value1 = defaultColorArray[0]);
            $slider_color_mobile && ($slider_color_mobile.value2 = defaultColorArray[defaultColorArray?.length - 1]);
    
            const defaultClarityArray = defaultClarity.split(',');
            $slider_clarity && ($slider_clarity.value1 = defaultClarityArray[0]);
            $slider_clarity && ($slider_clarity.value2 = defaultClarityArray[defaultClarityArray?.length - 1]);
            const containerClarity = document.querySelector('.dmdfilter-swatche-clarity');
            setActiveSwatches(containerClarity, defaultClarityArray);
            
            $slider_clarity_mobile && ($slider_clarity_mobile.value1 = defaultClarityArray[0]);
            $slider_clarity_mobile && ($slider_clarity_mobile.value2 = defaultClarityArray[defaultClarityArray?.length - 1]);
    
            const defaultCutArray = defaultCut.split(',');
            $slider_cut && ($slider_cut.value1 = defaultCutArray[0]);
            $slider_cut && ($slider_cut.value2 = defaultCutArray[defaultCutArray?.length - 1]);
            const containerCut = document.querySelector('.dmdfilter-swatches-cut');
            setActiveSwatches(containerCut, defaultCutArray);
    
            $slider_cut_mobile && ($slider_cut_mobile.value1 = defaultCutArray[0]);
            $slider_cut_mobile && ($slider_cut_mobile.value2 = defaultCutArray[defaultCutArray?.length - 1]);
    
            $slider_carat && ($slider_carat.value1 = defaultCaratMin);
            $slider_carat && ($slider_carat.value2 = defaultCaratMax);
            setTimeout(resetCaratSwatchesIfNone, 1000);
            $slider_carat_mobile && ($slider_carat_mobile.value1 = defaultCaratMin);
            $slider_carat_mobile && ($slider_carat_mobile.value2 = defaultCaratMax);
    
            $slider_price && ($slider_price.value1 = defaultPriceMin);
            $slider_price && ($slider_price.value2 = defaultPriceMax);
    
            $slider_price_mobile && ($slider_price_mobile.value1 = defaultPriceMin);
            $slider_price_mobile && ($slider_price_mobile.value2 = defaultPriceMax);
            const containerPrice = document.querySelector('.dmdfilter-swatche-price');
           setTimeout(() => {
                setActiveSwatches(containerPrice, []);
            }, 1000);
    
            $slider_ratio && ($slider_ratio.value1 = defaultRatioMin);
            $slider_ratio && ($slider_ratio.value2 = defaultRatioMax);
    
            $slider_ratio_mobile && ($slider_ratio_mobile.value1 = defaultRatioMin);
            $slider_ratio_mobile && ($slider_ratio_mobile.value2 = defaultRatioMax);
    
            $slider_table && ($slider_table.value1 = defaultTableMin);
            $slider_table && ($slider_table.value2 = defaultTableMax);
    
            $slider_table_mobile && ($slider_table_mobile.value1 = defaultTableMin);
            $slider_table_mobile && ($slider_table_mobile.value2 = defaultTableMax);
    
            $slider_depth && ($slider_depth.value1 = defaultDepthMin);
            $slider_depth && ($slider_depth.value2 = defaultDepthMax);
    
            $slider_depth && ($slider_depth_mobile.value1 = defaultDepthMin);
            $slider_depth && ($slider_depth_mobile.value2 = defaultDepthMax);
            
            //clearQualitySelection();
            document.getElementById('polish-select') && (document.getElementById('polish-select').value = defaultPolish);
            document.getElementById('symmetry-select') && (document.getElementById('symmetry-select').value = defaultSymmetry);
            document.getElementById('fluorescence-select') && (document.getElementById('fluorescence-select').value = defaultFluorescence);
            document.getElementById('certified-by-select') && (document.getElementById('certified-by-select').value = defaultCertifiedBy);
            document.getElementById('sustainability-select') && (document.getElementById('sustainability-select').value = defaultSustainability);
            document.getElementById('quality-select') && (document.getElementById('quality-select').value = defaultQuality);
            const containerCertified = document.querySelector('.certified-swatches');
            setActiveSwatches(containerCertified, [defaultCertifiedBy]);
            const containerFuorescence = document.querySelector('.dmdfilter-swatches-fluorescence');
            setActiveSwatches(containerFuorescence, [defaultFluorescence]);
            const containerPolish = document.querySelector('.dmdfilter-swatches-polish');
            setActiveSwatches(containerPolish, [defaultPolish]);
            const containerSymmetry = document.querySelector('.dmdfilter-swatches-symmetry');
            setActiveSwatches(containerSymmetry, [defaultSymmetry]);
               
            document.getElementById('polish-select-mobile') && (document.getElementById('polish-select-mobile').value = defaultPolish);
            document.getElementById('symmetry-select-mobile') && (document.getElementById('symmetry-select-mobile').value = defaultSymmetry);
            document.getElementById('fluorescence-select-mobile') && (document.getElementById('fluorescence-select-mobile').value = defaultFluorescence);
            document.getElementById('certified-by-select-mobile') && (document.getElementById('certified-by-select-mobile').value = defaultCertifiedBy);
            document.getElementById('sustainability-select-mobile') && (document.getElementById('sustainability-select-mobile').value = defaultSustainability);
            document.getElementById('quality-select-mobile') && (document.getElementById('quality-select-mobile').value = defaultQuality);
  
            const cut_array = defaultCut?.length > 0 && defaultCut.split(',') || [], clarity_array = defaultClarity?.length > 0 && defaultClarity.split(',') || [], color_array = defaultColor?.length > 0 && defaultColor.split(',') || [];
            let fancyColorValue = '', colorValue = '';
            if (window.LB_GROWN_DIAMOND.getUrlParameter('color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') !== undefined) {
                if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color')) {
                    fancyColorValue = defaultFancy;
                } else {
                    if (defaultColor?.length == 0) {
                        fancyColorValue = defaultFancy;
                    } else {
                        colorValue = defaultColor;
                    }
                }
            } else if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('color') !== undefined) {
                if (window.LB_GROWN_DIAMOND.getUrlParameter('color')) {
                    colorValue = defaultColor;
                } else {
                    if (defaultFancy?.length == 0) {
                        colorValue = defaultColor;
                    } else {
                        fancyColorValue = defaultFancy;
                    }
                }
            } else if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('color') == undefined) {
                if (defaultColor?.length > 0) {
                    colorValue = defaultColor;
                } else {
                    fancyColorValue = defaultFancy;
                }
            }
            

            //document.getElementById('important-select') && (document.getElementById('important-select').value = '');
            //document.getElementById('important-select-mobile') && (document.getElementById('important-select-mobile').value = '');
            
            //document.getElementById('important-select-mobile').dispatchEvent(new Event('change', { bubbles: true }));
            window.LB_GROWN_DIAMOND.config.shapeValue = defaultShape;
            window.LB_GROWN_DIAMOND.config.colorValues = color_array?.length > 0 ? `${color_array[0]},${color_array[color_array?.length-1]}` : '';
            window.LB_GROWN_DIAMOND.config.clarityValues = clarity_array?.length > 0 ? `${clarity_array[0]},${clarity_array[clarity_array?.length-1]}` : '';
            window.LB_GROWN_DIAMOND.config.cutValues = cut_array?.length > 0 ? `${cut_array[0]},${cut_array[cut_array?.length-1]}` : '';
            window.LB_GROWN_DIAMOND.config.polishValue = defaultPolish;
            window.LB_GROWN_DIAMOND.config.symmetryValue = defaultSymmetry;
            window.LB_GROWN_DIAMOND.config.fluorescenceValue = defaultFluorescence;
            window.LB_GROWN_DIAMOND.config.certifiedByValue = defaultCertifiedBy;
            window.LB_GROWN_DIAMOND.config.sustainabilityValue = defaultSustainability;
            window.LB_GROWN_DIAMOND.config.qualityValue = defaultQuality;
            window.LB_GROWN_DIAMOND.config.fancyValues = fancyColorValue;
            window.LB_GROWN_DIAMOND.config.vendorValue = '';
            window.LB_GROWN_DIAMOND.config.page_number = 1;
            totalResultIndex = 0;
            
            let vdbLBSortingGridElements = document.getElementsByClassName('vdb-lb-sorting-grid');
            vdbLBSortingGridElements = Array.prototype.slice.call(vdbLBSortingGridElements);
            vdbLBSortingGridElements.forEach(e => e.dataset.sorting_field=='carat' && e.dataset.sorting_seq=='ASC' ? e.classList.add('active') : e.classList.remove('active'));
            
            window.LB_GROWN_DIAMOND.config.sortingField = 'carat';
            window.LB_GROWN_DIAMOND.config.sortingSeq = 'ASC';
            document.getElementById('sort-by-span').innerText = `${'LOWEST CARAT'.toLocaleUpperCase()}`;
            document.getElementById('sort-by-list-wrapper').classList.remove('sort-by-active');
            
            // if (swiperShape[0]) {
            //     swiperShape[0].slideTo(0);
            //     swiperShape[1].slideTo(0);
            // }
    
            // if (swiperFancy[0]) {
            //     swiperFancy[0].slideTo(0);
            //     swiperFancy[1].slideTo(0);
            // }
            await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
        },
        initClearFiltersButton: function () {
            if (document.getElementsByClassName('vdb-lb-clear-all-filters1')?.length > 0) {
                let vdbLBClearAllFiltersElements = document.getElementsByClassName('vdb-lb-clear-all-filters1');
                vdbLBClearAllFiltersElements = Array.prototype.slice.call(vdbLBClearAllFiltersElements);
                for (let i = 0; i < vdbLBClearAllFiltersElements.length; i++) {
                    if (!vdbLBClearAllFiltersElements[i].dataset.listenerAdded) {
                    vdbLBClearAllFiltersElements[i].addEventListener('click', async function(event) {
                      
                        event.stopPropagation();
                        event.preventDefault();
                        window.location.href = '/collections/lab-created-diamonds?min_carat=2&page=1&color=F%2CD&clarity=VS1%2CIF&cut=Excellent%2CIdeal';
                       // window.LB_GROWN_DIAMOND.clearAllFiltersFun(event);
                    });
                    // vdbLBClearAllFiltersElements[i].dataset.listenerAdded = "true";
                }
                }
            }
            if (document.getElementsByClassName('vdb-lb-clear-all-filters')?.length > 0) {
                let vdbLBClearAllFiltersElements = document.getElementsByClassName('vdb-lb-clear-all-filters');
                vdbLBClearAllFiltersElements = Array.prototype.slice.call(vdbLBClearAllFiltersElements);
                for (let i = 0; i < vdbLBClearAllFiltersElements.length; i++) {
                    if (!vdbLBClearAllFiltersElements[i].dataset.listenerAdded) {
                    vdbLBClearAllFiltersElements[i].addEventListener('click', async function(event) {
                      
                        event.stopPropagation();
                        event.preventDefault();
                        //window.location.href = '/collections/lab-created-diamonds?min_carat=2&page=1&color=F%2CD&clarity=VS1%2CIF&cut=Excellent%2CIdeal';
                       $(document).trigger("vdb-lb-advanced-filter-mobile-view-close");
                        window.LB_GROWN_DIAMOND.clearAllFiltersFun(event);
                        const closeBtn = event.target.closest('.vdb-lb-advanced-filter-mobile-view-close');

                                if (closeBtn) {

                                    const htmlTag = document.documentElement;
                                    const filterWrappers = document.getElementsByClassName('vdb-lb-main-advance-filter-mobile');

                                    // Remove sidebar classes
                                    htmlTag.classList.remove('open-dmdfilter');

                                    Array.from(filterWrappers).forEach(el =>
                                    el.classList.remove('sidebar-active')
                                    );

                                    // Remove open filter lists
                                    document.querySelectorAll('.filter__list-open')
                                    .forEach(el => el.classList.remove('filter__list-open'));

                                    // Remove mobile tooltip active
                                    document.querySelectorAll('.mobile-tooltip-active')
                                    .forEach(el => el.classList.remove('mobile-tooltip-active'));

                                    return;
                                }
                         
                    });
                    // vdbLBClearAllFiltersElements[i].dataset.listenerAdded = "true";
                }
                }
            }
        },
        callProductDiamondDetail: async function (handle) {
            try {

                const response = await fetch(`/products/${handle}?view=json`);

                const productData = await response.json();

                return productData;

            } catch (error) {
                console.log('error', error);
                return null;
            }
        },

         initApplyFiltersButton: function () {
            if (document.getElementsByClassName('vdb-lb-apply-all-filters')?.length > 0) {
                let vdbLBApplyAllFiltersElements = document.getElementsByClassName('vdb-lb-apply-all-filters');
                vdbLBApplyAllFiltersElements = Array.prototype.slice.call(vdbLBApplyAllFiltersElements);
                for (let i = 0; i < vdbLBApplyAllFiltersElements.length; i++) {
                    vdbLBApplyAllFiltersElements[i].addEventListener('click', async function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                         await handleGlobalSliderEventsForMobile();
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
        showElementsLoader: function (element) {
            document.documentElement.style.overflow = 'hidden';
            document.querySelectorAll(element).forEach((element) => element.classList.remove('hide'));
        },
        hideElementsLoader: function (element) {
            document.documentElement.style.overflow = '';
            document.querySelectorAll(element).forEach((element) =>element.classList.add('hide'));
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
        arrayToQueryParams: function(array) {
            return array.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
        },
        getUrlParameter: function(sParam) {
            var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]).replace(/\+/g, " ");
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
                          properties['Material'] = "Lab Grown Diamond";
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
                        await window.LB_GROWN_DIAMOND.addToCart(this, variantId, 1, properties);
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
            dmdDetailFilterClose();
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
        removeURLParameterNew: function(url, parameter) {
    const params = new URLSearchParams(url);

    params.delete(parameter);
 ignorePopState = true;
    return params.toString() ? '?' + params.toString() : '';
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
                        window.LB_GROWN_DIAMOND.config.page_number = (parseInt(page_number));

                        if (myCustomController !== null) {
                            myCustomController.abort();
                        }

                        ajaxCallDiamondListRunning = 'No';
                        document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                        document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '';
                        document.querySelector("#table-id tbody").innerHTML = "";
                        window.LB_GROWN_DIAMOND.hideElements('.vdb-container--pagination');
                        inactiveListView();

                        const targetOffset = document.getElementById('collection-results-filters').getBoundingClientRect().top + window.scrollY - 30;
                        window.scrollTo({
                            top: targetOffset,
                            behavior: 'smooth'
                        });

                        await window.LB_GROWN_DIAMOND?.callDiamondList();
                    });
                }
            }
             if (document.getElementsByClassName('pagination-button__load-more')?.length > 0) {
                let paginationButtonLoadNumberElements = document.getElementsByClassName('pagination-button__load-more');
                paginationButtonLoadNumberElements = Array.prototype.slice.call(paginationButtonLoadNumberElements);
                for (let i = 0; i < paginationButtonLoadNumberElements.length; i++) {
                    paginationButtonLoadNumberElements[i].addEventListener('click', async function() {
                       // const page_number = this.dataset.current_page;
                         const page_number =  this.closest('.paginate').dataset.paginatePages;
                        window.LB_GROWN_DIAMOND.config.page_number = (parseInt(page_number));

                        if (myCustomController !== null) {
                            myCustomController.abort();
                        }
                         let vdbPaginationSectionElements = document.getElementsByClassName('vdb-pagination-section-loadmore');
                          let vdbPaginationElements = document.getElementsByClassName('pagination-button__load-mor');
                        
                                    vdbPaginationSectionElements = Array.prototype.slice.call(vdbPaginationSectionElements);
                                    for (let i = 0; i < vdbPaginationSectionElements?.length; i++) {
                                       // vdbPaginationSectionElements[i].innerHTML = '';
                                       // vdbPaginationSectionElements[i].classList.add('is-loading');
                                     //  vdbPaginationElementss[i].classList.add('is-loading');
                                     paginationButtonLoadNumberElements[i].classList.add('is-loading');
                                    }

                        ajaxCallDiamondListRunning = 'No';
                        document.getElementById('search_diamond_count').innerHTML = `0 - RESULTS`;
                        document.getElementById('vdb-lb-search-result-wrapper').innerHTML = '';
                       //document.querySelector("#table-id tbody").innerHTML = "";
                        window.LB_GROWN_DIAMOND.hideElements('.vdb-container--pagination');
                        //inactiveListView();

                        //const targetOffset = document.getElementById('collection-results-filters').getBoundingClientRect().top + window.scrollY - 30;
                        // window.scrollTo({
                        //     top: targetOffset,
                        //     behavior: 'smooth'
                        // });
                            ajaxPaginationClick = 'Yes';        
                        await window.LB_GROWN_DIAMOND?.callDiamondList();
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
         initPaginationloadMoreHTML(current_page,page_count,total_count,sr_end,adjacents = 2){
            current_page = parseInt(current_page);
            page_count = parseInt(page_count);
            adjacents = parseInt(adjacents);
            sr_end = parseInt(sr_end).toLocaleString('en-US');
            total_count = parseInt(total_count).toLocaleString('en-US');
            percentage = (sr_end / total_count) * 100;
           
        
            var out = '<ul class="pagination-list">';
            var out = `
                <div class="dmd-pageprogress-sec">
                <div class="dmd-pageprogress"  role="status"  aria-live="polite">
                    <div class="progress-text" id="progress-text">${sr_end} of ${total_count} Items</div>
                    <div class="progress-bar" role="progressbar"  aria-describedby="progress-text"
                     aria-valuemin="0"
                     aria-valuemax="${total_count}"
                     aria-valuenow="${sr_end}">
                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                    </div>
                </div>
                </div>

                
                `;
                if(current_page !=page_count){
                    var next_page = current_page + 1;
                     out += ` <div class="container container--pagination vdb-see-more-div ">
                    <div class="one-whole column text-align-center">
                        <div class="paginate" data-current-page="${current_page}" data-paginate-pages="${next_page}"  role="navigation" aria-label="Pagination Navigation">
                            <button 
        type="button"
        class="button button--primary pagination-button__load-more"
        aria-label="Load more products"
        aria-controls="product-list"
        aria-live="polite">LOAD MORE<span class="diamond-loader-pagination  hide"><span>
                            </span><span></span><span></span><span></span></span></button>
                        </div>
                    </div>
                    </div> `;
                }
        
           
        
            return out;
        },
        clearImportantFilter: function () {
            const importantSelectElement = document.getElementById('important-select');
            if (importantSelectElement.value?.length > 0) {
                let selectedColorValue1 = importantSelectElement.options[importantSelectElement.selectedIndex].dataset.colorValue1,
                    selectedColorValue2 = importantSelectElement.options[importantSelectElement.selectedIndex].dataset.colorValue2,
                    selectedClarityValue1 = importantSelectElement.options[importantSelectElement.selectedIndex].dataset.clarityValue1,
                    selectedClarityValue2 = importantSelectElement.options[importantSelectElement.selectedIndex].dataset.clarityValue2,
                    selectedCutValue1 = importantSelectElement.options[importantSelectElement.selectedIndex].dataset.cutValue1,
                    selectedCutValue2 = importantSelectElement.options[importantSelectElement.selectedIndex].dataset.cutValue2;
                /* if (slider_color_mia.value1 != selectedColorValue1 || slider_color_mia.value2 != selectedColorValue2 || slider_clarity_mia.value1 != selectedClarityValue1 || slider_clarity_mia.value2 != selectedClarityValue2 || slider_cut_mia.value1 != selectedCutValue1 || slider_cut_mia.value2 != selectedCutValue2) { */
                    // importantSelectElement.value = '';
                /* } */
            } else {
                importantSelectElement.value = '';
            }
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

if (window.LB_GROWN_DIAMOND.getUrlParameter('supported_shapes')) {
    let supportedShapesURL = window.LB_GROWN_DIAMOND.getUrlParameter('supported_shapes').split(',');
    supportedShapesURL = Array.prototype.slice.call(supportedShapesURL);
    if (supportedShapesURL?.length < 6) {
        let swiperScrollbarShapeElements = document.getElementsByClassName('swiper-scrollbar-shape');
        swiperScrollbarShapeElements = Array.prototype.slice.call(swiperScrollbarShapeElements);
        swiperScrollbarShapeElements.map(e => e.remove());
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    let cut_array = defaultCut?.length > 0 && defaultCut.split(',') || [], clarity_array = defaultClarity?.length > 0 && defaultClarity.split(',') || [], color_array = defaultColor?.length > 0 && defaultColor.split(',') || [];
    let fancyColorValue = '', colorValue = '';
    if (window.LB_GROWN_DIAMOND.getUrlParameter('color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') !== undefined) {
        if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color')) {
            fancyColorValue = window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') ? window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') : defaultFancy;
        } else {
            if (defaultColor?.length == 0) {
                fancyColorValue = window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') ? window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') : defaultFancy;
            } else {
                colorValue = window.LB_GROWN_DIAMOND.getUrlParameter('color') ? window.LB_GROWN_DIAMOND.getUrlParameter('color') : defaultColor;
            }
        }
    } else if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('color') !== undefined) {
        if (window.LB_GROWN_DIAMOND.getUrlParameter('color')) {
            colorValue = window.LB_GROWN_DIAMOND.getUrlParameter('color') ? window.LB_GROWN_DIAMOND.getUrlParameter('color') : defaultColor;
        } else {
            if (defaultFancy?.length == 0) {
                colorValue = window.LB_GROWN_DIAMOND.getUrlParameter('color') ? window.LB_GROWN_DIAMOND.getUrlParameter('color') : defaultColor;
            } else {
                fancyColorValue = window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') ? window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') : defaultFancy;
            }
        }
    } else if (window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined && window.LB_GROWN_DIAMOND.getUrlParameter('color') == undefined) {
        if (defaultColor?.length > 0) {
            colorValue = window.LB_GROWN_DIAMOND.getUrlParameter('color') ? window.LB_GROWN_DIAMOND.getUrlParameter('color') : defaultColor;
        } else {
            fancyColorValue = window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') ? window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') : defaultFancy;
        }
    }

    let selectDefaultShape = '';
    if (window.LB_GROWN_DIAMOND.getUrlParameter('supported_shapes')) {
        let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
        vdbListItemAShapeStyleElements = Array.prototype.slice.call(vdbListItemAShapeStyleElements);
        if (vdbListItemAShapeStyleElements?.length > 0) {
            for (let i = 0; i < vdbListItemAShapeStyleElements.length; i++) {
                const element = vdbListItemAShapeStyleElements[i];
                let supportedShapes = window.LB_GROWN_DIAMOND.getUrlParameter('supported_shapes').split(',');
                supportedShapes = Array.prototype.slice.call(supportedShapes);
                supportedShapes = supportedShapes.map(e => e.replace('Cut', '').trim());
                if (supportedShapes.includes(element.dataset.shapeValue) == false) {
                    document.querySelectorAll('.' + element.dataset.module).forEach(e => e.classList.add('hide'));
                } else {
                    document.querySelectorAll('.' + element.dataset.module).forEach(e => e.classList.add('visible-shape'));
                }
            }
        }

        if (window.LB_GROWN_DIAMOND.getUrlParameter('shape') == undefined) {
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
            selectDefaultShape = window.LB_GROWN_DIAMOND.getUrlParameter('shape') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('shape').replace('Cut', '').trim() : defaultShape;
        }
    } else {
        selectDefaultShape = window.LB_GROWN_DIAMOND.getUrlParameter('shape') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('shape').replace('Cut', '').trim() : defaultShape;
    }

    if (window.LB_GROWN_DIAMOND.getUrlParameter('shape') !== undefined) {
        let vdbListItemAShapeStyleElements = document.getElementsByClassName('vdb-list-item-a-shape-style');
        vdbListItemAShapeStyleElements = Array.prototype.slice.call(vdbListItemAShapeStyleElements);
        if (vdbListItemAShapeStyleElements?.length > 0) {
            const queryShape = window.LB_GROWN_DIAMOND.getUrlParameter('shape').replace('Cut', '').trim();
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
    // As per the conditions outlined below, this update is related to ticket: SHOP-2843 & 03-03-2026
    clarity_array = ['VS1','IF'];
    if (window.LB_GROWN_DIAMOND.getUrlParameter('clarity')) {
        clarity_array = window.LB_GROWN_DIAMOND.getUrlParameter('clarity').split(',');
    }
     // As per the conditions outlined below, this update is related to ticket: SHOP-2843 & 03-03-2026
    cut_array = ['Excellent','Ideal'];
    if (window.LB_GROWN_DIAMOND.getUrlParameter('cut')) {
        cut_array = window.LB_GROWN_DIAMOND.getUrlParameter('cut').split(',');
    }
      // As per the conditions outlined below, this update is related to ticket: SHOP-2843 & 03-03-2026
    color_array = ['F','D'];
    if (window.LB_GROWN_DIAMOND.getUrlParameter('color')) {
        color_array = window.LB_GROWN_DIAMOND.getUrlParameter('color').split(',');
    }

    // if (window.LB_GROWN_DIAMOND.getUrlParameter('shape') !== undefined && shapeData.split(',')?.length > 0) {
    //     let shapeList = shapeData.split(',') || [];

    //     let queryParamShape = window.LB_GROWN_DIAMOND.getUrlParameter('shape').replace('Cut', '').trim();
        
    //     if (!shapeList.includes(queryParamShape)) {
    //         selectDefaultShape = '';
    //     }
    // }
    if (
  window.LB_GROWN_DIAMOND.getUrlParameter('shape') !== undefined &&
  shapeData.split(',')?.length > 0
) {
    let shapeList = shapeData.split(',') || [];

    let queryParamShape = window.LB_GROWN_DIAMOND.getUrlParameter('shape');


    let queryShapes = queryParamShape
        .split(',')
        .map(shape => shape.replace(/Cut/gi, '').trim());
       


    let hasValidShape = queryShapes.some(shape => {
        return shapeList.includes(shape)});
    if (!hasValidShape) {
        selectDefaultShape = '';
    } else {

        selectDefaultShape = queryShapes.join(','); // optional: store valid shapes
        
    }
}

    let isQueryParamsExists = new URL(window.location.href);
    window.LB_GROWN_DIAMOND.config = {
        //page_number: parseInt(window.LB_GROWN_DIAMOND.getUrlParameter('page')) || 1,
        page_number:  1,
        shapeValue: selectDefaultShape, //isQueryParamsExists?.searchParams?.size > 0 && window.LB_GROWN_DIAMOND.getUrlParameter('shape') == undefined ? '' :
        colorValues: color_array?.length > 0 ? `${color_array[0]},${color_array[color_array?.length-1]}` : '',
        clarityValues: clarity_array?.length > 0 ? `${clarity_array[0]},${clarity_array[clarity_array?.length-1]}` : '',
        cutValues: cut_array?.length > 0 ? `${cut_array[0]},${cut_array[cut_array?.length-1]}` : '',
        polishValue: window.LB_GROWN_DIAMOND.getUrlParameter('polish') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('polish') : defaultPolish,
        symmetryValue: window.LB_GROWN_DIAMOND.getUrlParameter('symmetry') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('symmetry') : defaultSymmetry,
        fluorescenceValue: window.LB_GROWN_DIAMOND.getUrlParameter('fluor') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('fluor') : defaultFluorescence,
        certifiedByValue: window.LB_GROWN_DIAMOND.getUrlParameter('lab') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('lab') : defaultCertifiedBy,
        sustainabilityValue: window.LB_GROWN_DIAMOND.getUrlParameter('sustainability') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('sustainability') : defaultSustainability,
        qualityValue: window.LB_GROWN_DIAMOND.getUrlParameter('quality') !== undefined ? window.LB_GROWN_DIAMOND.getUrlParameter('quality') : defaultQuality,
        fancyValues: isQueryParamsExists?.searchParams?.size > 0 && window.LB_GROWN_DIAMOND.getUrlParameter('fancy_color') == undefined ? '' : fancyColorValue,
        vendorValue: '',
        // sortingField: 'carat',
         sortingField: 'price', // As per the conditions outlined below, this update is related to ticket: SHOP-2843 & 03-03-2026
        sortingSeq: 'ASC'
    };
    await window.LB_GROWN_DIAMOND?.callDiamondList(); // await window.LB_GROWN_DIAMOND?.callMinAndMaxDiamondList();

    if (document.getElementsByClassName('vdb-main-advance-filter-web')?.length > 0) {
        document.getElementById('vdb-lb-advanced-filter-desk-view').classList.remove('hide');
    } else {
        document.getElementById('vdb-lb-advanced-filter-desk-view').classList.add('hide');
    }

    if(window.LB_GROWN_DIAMOND.getUrlParameter('ring-handle') !== undefined){
        document.querySelector('[data-view="grid"]').style.display = 'none';
        document.querySelector('[data-view="list"]').style.display = 'none';
    }
    window.LB_GROWN_DIAMOND.initClearFiltersButton();
    //window.LB_GROWN_DIAMOND.initApplyFiltersButton();
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
                window.LB_GROWN_DIAMOND.loadGridImages();
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
                // remove active-state from all shape items
    // vdbListItemAShapeStyleElements.forEach(el => el.classList.remove('active'));
    //               vdbListItemAShapeStyleElements.forEach(el => {
    //     if (el !== this) {
    //         el.classList.remove('active');
    //     }
    // });

                                
                               
    // toggle active-state on clicked shape item
    this.classList.toggle('active');
        var selectedShapeValues = '';
    document.querySelectorAll('.vdb-lb-slider-shape').forEach(container => {
       selectedShapeValues = Array.from(container.querySelectorAll('.vdb-list-item-a-shape-style.active')).map(el => el.getAttribute('data-shape-value')).join(',');
                      
                                });
                const module_class = this.dataset.module, shape_value = this.dataset.shapeValue;
                vdbListItemAShapeStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                (window.LB_GROWN_DIAMOND.config.shapeValue != shape_value && (document.querySelectorAll('.' + module_class).forEach(e => e.classList.toggle('active-state'))));
                window.LB_GROWN_DIAMOND.config.shapeValue = (window.LB_GROWN_DIAMOND.config.shapeValue != selectedShapeValues ? selectedShapeValues : '');
                await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
            });
        }
    }
}

/*if (document.getElementsByClassName('vdb-list-item-a-color-style')?.length > 0) {
    let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
    vdbListItemAColorStyleElements = Array.prototype.slice.call(vdbListItemAColorStyleElements);
    if (vdbListItemAColorStyleElements?.length > 0) {
        for (let i = 0; i < vdbListItemAColorStyleElements.length; i++) {
            const element = vdbListItemAColorStyleElements[i];
            element.addEventListener('click', async function (e) {
                const module_class = this.dataset.module, color_values = this.dataset.colorValues;

                vdbListItemAColorStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                (window.LB_GROWN_DIAMOND.config.colorValues != color_values && (document.querySelectorAll('.' + module_class).forEach(e => e.classList.toggle('active-state'))));
                window.LB_GROWN_DIAMOND.config.colorValues = (window.LB_GROWN_DIAMOND.config.colorValues != color_values ? color_values : '');

                let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
                vdbListItemAFancyStyleElements = Array.prototype.slice.call(vdbListItemAFancyStyleElements);
                (vdbListItemAFancyStyleElements?.length > 0) && (vdbListItemAFancyStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state'))));
                window.LB_GROWN_DIAMOND.config.fancyValues = '';

                await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
            });
        }
    }
}*/

if (document.getElementsByClassName('vdb-list-item-a-fancy-style')?.length > 0) {
    let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
    vdbListItemAFancyStyleElements = Array.prototype.slice.call(vdbListItemAFancyStyleElements);
    if (vdbListItemAFancyStyleElements?.length > 0) {
        for (let i = 0; i < vdbListItemAFancyStyleElements.length; i++) {
            const element = vdbListItemAFancyStyleElements[i];
            element.addEventListener('click', async function (e) {
                   vdbListItemAFancyStyleElements.forEach(el => {
                        if (el !== this) {
                            el.classList.remove('active');
                        }
                    });
                       this.classList.toggle('active');
                const module_class = this.dataset.module, fancy_value = this.dataset.fancyValue;
                vdbListItemAFancyStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));
                (window.LB_GROWN_DIAMOND.config.fancyValues != fancy_value && (document.querySelectorAll('.' + module_class).forEach(e => e.classList.toggle('active-state'))));
                window.LB_GROWN_DIAMOND.config.fancyValues = (window.LB_GROWN_DIAMOND.config.fancyValues != fancy_value ? fancy_value : '');

                if ($slider_carat.value1 == 1) {
                    $slider_carat.value1 = $slider_carat.min;
                    $slider_carat_mobile.value1 = $slider_carat_mobile.min;
                }

                const defaultColorArray = defaultColor.split(',');
                $slider_color && ($slider_color.value1 = defaultColorArray[0]);
                $slider_color && ($slider_color.value2 = defaultColorArray[defaultColorArray?.length - 1]);

                $slider_color_mobile && ($slider_color_mobile.value1 = defaultColorArray[0]);
                $slider_color_mobile && ($slider_color_mobile.value2 = defaultColorArray[defaultColorArray?.length - 1]);

                // let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
                // vdbListItemAColorStyleElements = Array.prototype.slice.call(vdbListItemAColorStyleElements);
                // (vdbListItemAColorStyleElements?.length > 0) && (vdbListItemAColorStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state'))));
                window.LB_GROWN_DIAMOND.config.colorValues = '';

                await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
            });
        }
    }
}

/* Desktop View JS */
let handleGlobalSliderEventsForDesk = async function(isChange='No') {
    if (myCustomController !== null) {
        myCustomController.abort();
    }

    if ($slider_carat_mobile) {
        $slider_carat_mobile.value1 = $slider_carat.value1;
        $slider_carat_mobile.value2 = $slider_carat.value2;
    }

    // if ($slider_price_mobile) {
    //     $slider_price_mobile.value1 = $slider_price.value1;
    //     $slider_price_mobile.value2 = $slider_price.value2;
    // }

    if ($slider_ratio_mobile) {
        $slider_ratio_mobile.value1 = $slider_ratio.value1;
        $slider_ratio_mobile.value2 = $slider_ratio.value2;
    }

    if ($slider_table_mobile) {
        $slider_table_mobile.value1 = $slider_table.value1;
        $slider_table_mobile.value2 = $slider_table.value2;
    }

    if ($slider_depth_mobile) {
        $slider_depth_mobile.value1 = $slider_depth.value1;
        $slider_depth_mobile.value2 = $slider_depth.value2;
    }

    if (document.getElementById('polish-select')) {
        const polishSelectElement = document.getElementById('polish-select'), polishSelectMobileElement = document.getElementById('polish-select-mobile');
        window.LB_GROWN_DIAMOND.config.polishValue = polishSelectElement.value;
        polishSelectMobileElement.value = polishSelectElement.value;
    }

    if (document.getElementById('symmetry-select')) {
        const symmetrySelectElement = document.getElementById('symmetry-select'), symmetrySelectMobileElement = document.getElementById('symmetry-select-mobile');
        window.LB_GROWN_DIAMOND.config.symmetryValue = symmetrySelectElement.value;
        symmetrySelectMobileElement.value = symmetrySelectElement.value;
    }

    if (document.getElementById('fluorescence-select')) {
        const fluorescenceSelectElement = document.getElementById('fluorescence-select'), fluorescenceSelectMobileElement = document.getElementById('fluorescence-select-mobile');
        window.LB_GROWN_DIAMOND.config.fluorescenceValue = fluorescenceSelectElement.value;
        fluorescenceSelectMobileElement.value = fluorescenceSelectElement.value;
    }

    if (document.getElementById('certified-by-select')) {
        const certifiedBySelectElement = document.getElementById('certified-by-select'), certifiedBySelectMobileElement = document.getElementById('certified-by-select-mobile');
        window.LB_GROWN_DIAMOND.config.certifiedByValue = certifiedBySelectElement.value;
        certifiedBySelectMobileElement.value = certifiedBySelectElement.value;
    }

    if (document.getElementById('sustainability-select')) {
        const sustainabilitySelectElement = document.getElementById('sustainability-select'), sustainabilitySelectMobileElement = document.getElementById('sustainability-select-mobile');
        window.LB_GROWN_DIAMOND.config.sustainabilityValue = sustainabilitySelectElement.value;
        sustainabilitySelectMobileElement.value = sustainabilitySelectElement.value;
    }

    if (document.getElementById('quality-select')) {
        const qualitySelectElement = document.getElementById('quality-select'), qualitySelectMobileElement = document.getElementById('quality-select-mobile');
        window.LB_GROWN_DIAMOND.config.qualityValue = qualitySelectElement.value;
        qualitySelectMobileElement.value = qualitySelectElement.value;
    }
    await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
}

document.getElementById('slider_carat_mia') && (document.getElementById('slider_carat_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('slider_price_mia') && (document.getElementById('slider_price_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('slider_ratio_mia') && (document.getElementById('slider_ratio_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('slider_table_mia') && (document.getElementById('slider_table_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('slider_depth_mia') && (document.getElementById('slider_depth_mia').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('polish-select') && (document.getElementById('polish-select').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('symmetry-select') && (document.getElementById('symmetry-select').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('fluorescence-select') && (document.getElementById('fluorescence-select').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('certified-by-select') && (document.getElementById('certified-by-select').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('sustainability-select') && (document.getElementById('sustainability-select').addEventListener('change', handleGlobalSliderEventsForDesk));
document.getElementById('quality-select') && (document.getElementById('quality-select').addEventListener('change', handleGlobalSliderEventsForDesk));

if (document.getElementById('slider_clarity_mia')) {
    $slider_clarity.addEventListener('change', async (evt) => {
        // var clarityFilteredValues = slider_clarity?.data.filter((value) => value.toString() >= slider_clarity?.value1.toString() && value.toString() <= slider_clarity?.value2.toString());
        $slider_clarity_mobile.value1 = $slider_clarity.value1;
        $slider_clarity_mobile.value2 = $slider_clarity.value2;

        window.LB_GROWN_DIAMOND.config.clarityValues = `${$slider_clarity.value1},${$slider_clarity.value2}`; // clarityFilteredValues?.join(',');

        window.LB_GROWN_DIAMOND.clearImportantFilter();
        await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
    });
}

if (document.getElementById('slider_cut_mia')) {
    $slider_cut.addEventListener('change', async (evt) => {
        // var cutFilteredValues = slider_cut?.data.filter((value) => value >= slider_cut?.value1 && value <= slider_cut?.value2);
        $slider_cut_mobile.value1 = $slider_cut.value1;
        $slider_cut_mobile.value2 = $slider_cut.value2;

        window.LB_GROWN_DIAMOND.config.cutValues = `${$slider_cut.value1},${$slider_cut.value2}`; // cutFilteredValues?.join(',');

        window.LB_GROWN_DIAMOND.clearImportantFilter();
        await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
    });
}

if (document.getElementById('slider_color_mia')) {
    $slider_color.addEventListener('change', async (evt) => {
        $slider_color_mobile.value1 = $slider_color.value1;
        $slider_color_mobile.value2 = $slider_color.value2;

        let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
        vdbListItemAFancyStyleElements = Array.prototype.slice.call(vdbListItemAFancyStyleElements);
        (vdbListItemAFancyStyleElements?.length > 0) && (vdbListItemAFancyStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state'))));
        //window.LB_GROWN_DIAMOND.config.fancyValues = '';

        window.LB_GROWN_DIAMOND.config.colorValues = `${$slider_color.value1},${$slider_color.value2}`;

        window.LB_GROWN_DIAMOND.clearImportantFilter();
        await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
    });
}
/* END */

let handleGlobalSliderEventsForMobile = async function() {

    if (myCustomController !== null) {
        myCustomController.abort();
    }
     var  caratswatch = false;
    // if ($slider_carat) {
    //     $slider_carat.value1 = $slider_carat_mobile.value1;
    //     $slider_carat.value2 = $slider_carat_mobile.value2;
    // }

    if ($slider_price) {
        $slider_price.value1 = $slider_price_mobile.value1;
        $slider_price.value2 = $slider_price_mobile.value2;
    }

    if ($slider_ratio) {
        $slider_ratio.value1 = $slider_ratio_mobile.value1;
        $slider_ratio.value2 = $slider_ratio_mobile.value2;
    }

    if ($slider_table) {
        $slider_table.value1 = $slider_table_mobile.value1;
        $slider_table.value2 = $slider_table_mobile.value2;
    }

    if ($slider_depth) {
        $slider_depth.value1 = $slider_depth_mobile.value1;
        $slider_depth.value2 = $slider_depth_mobile.value2;
    }

    if (document.getElementById('polish-select')) {
        // const polishSelectMobileElement = document.getElementById('polish-select-mobile'), polishSelectElement = document.getElementById('polish-select');
        // //window.LB_GROWN_DIAMOND.config.polishValue = polishSelectMobileElement.value;
        // window.LB_GROWN_DIAMOND.config.polishValue = Array.from(polishSelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
        // polishSelectElement.value = Array.from(polishSelectMobileElement.selectedOptions).map(opt => opt.value);
    }

    if (document.getElementById('symmetry-select')) {
        // const symmetrySelectMobileElement = document.getElementById('symmetry-select-mobile'), symmetrySelectElement = document.getElementById('symmetry-select');
        // // window.LB_GROWN_DIAMOND.config.symmetryValue = symmetrySelectMobileElement.value;
        // window.LB_GROWN_DIAMOND.config.symmetryValue = Array.from(symmetrySelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
        // // symmetrySelectElement.value = symmetrySelectMobileElement.value;
        // symmetrySelectElement.value = Array.from(symmetrySelectMobileElement.selectedOptions).map(opt => opt.value);
    }

    // if (document.getElementById('fluorescence-select')) {
    //     const fluorescenceSelectMobileElement = document.getElementById('fluorescence-select-mobile'), fluorescenceSelectElement = document.getElementById('fluorescence-select');
    //     // window.LB_GROWN_DIAMOND.config.fluorescenceValue = fluorescenceSelectMobileElement.value;
    //     window.LB_GROWN_DIAMOND.config.fluorescenceValue = Array.from(fluorescenceSelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
    //     // fluorescenceSelectElement.value = fluorescenceSelectMobileElement.value;
    //     fluorescenceSelectElement.value = Array.from(fluorescenceSelectMobileElement.selectedOptions).map(opt => opt.value);
    // }

    // if (document.getElementById('certified-by-select')) {
    //     const certifiedBySelectMobileElement = document.getElementById('certified-by-select-mobile'), certifiedBySelectElement = document.getElementById('certified-by-select');
    //     //window.LB_GROWN_DIAMOND.config.certifiedByValue = certifiedBySelectMobileElement.value;
    //     window.LB_GROWN_DIAMOND.config.certifiedByValue =  Array.from(certifiedBySelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
    //     certifiedBySelectElement.value = Array.from(certifiedBySelectMobileElement.selectedOptions).map(opt => opt.value);
    // }

    if (document.getElementById('sustainability-select')) {
        const sustainabilitySelectMobileElement = document.getElementById('sustainability-select-mobile'), sustainabilitySelectElement = document.getElementById('sustainability-select');
        window.LB_GROWN_DIAMOND.config.sustainabilityValue = sustainabilitySelectMobileElement.value;
        sustainabilitySelectElement.value = sustainabilitySelectMobileElement.value;
    }

    if (document.getElementById('quality-select')) {
        const qualitySelectMobileElement = document.getElementById('quality-select-mobile'), qualitySelectElement = document.getElementById('quality-select');
        window.LB_GROWN_DIAMOND.config.qualityValue = qualitySelectMobileElement.value;
        qualitySelectElement.value = qualitySelectMobileElement.value;
    }
    // --- NEW: Swatch Multiple Values Syncing ---
    // This loops through every swatch group and updates the config based on 'data-option-name'
    document.querySelectorAll('.dmdfilter-swatches').forEach(container => {
        const optionName = container.getAttribute('data-option-name');
        const selectedValues = Array.from(container.querySelectorAll('.swatches-tab.active'))
                                    .map(el => el.getAttribute('data-value'))
                                    .join(', ');

        if (window.LB_GROWN_DIAMOND && window.LB_GROWN_DIAMOND.config) {
            if (optionName === 'Certified') {
                const certifiedBySelectMobileElement = document.getElementById('certified-by-select-mobile'), certifiedBySelectElement = document.getElementById('certified-by-select');
                window.LB_GROWN_DIAMOND.config.certifiedByValue = selectedValues;
                certifiedBySelectElement.value = Array.from(certifiedBySelectMobileElement.selectedOptions).map(opt => opt.value);
             } else if (optionName === 'Fluorescence') {
                 const fluorescenceSelectMobileElement = document.getElementById('fluorescence-select-mobile'), fluorescenceSelectElement = document.getElementById('fluorescence-select');
                 window.LB_GROWN_DIAMOND.config.fluorescenceValue = selectedValues;
                 fluorescenceSelectElement.value = Array.from(fluorescenceSelectMobileElement.selectedOptions).map(opt => opt.value);
             } else if (optionName === 'Polish') {
                const polishSelectMobileElement = document.getElementById('polish-select-mobile'), polishSelectElement = document.getElementById('polish-select');
                window.LB_GROWN_DIAMOND.config.polishValue = selectedValues;
                polishSelectElement.value = Array.from(polishSelectMobileElement.selectedOptions).map(opt => opt.value);
             }else if (optionName === 'Symmetry') {
                const symmetrySelectMobileElement = document.getElementById('symmetry-select-mobile'), symmetrySelectElement = document.getElementById('symmetry-select');
                window.LB_GROWN_DIAMOND.config.symmetryValue = selectedValues
                symmetrySelectElement.value = Array.from(symmetrySelectMobileElement.selectedOptions).map(opt => opt.value);
             }else if (optionName === 'Color') {
                   
                if(selectedValues.length > 0 ){
                    
                    let colorarr = selectedValues.split(',');
                    let colorfirstValue = colorarr[0];
                    let colorlastValue = colorarr[colorarr.length - 1];
                    $slider_color_mobile.value1 = colorfirstValue;
                    $slider_color_mobile.value2 = colorlastValue;
                    
                }else{
                     const defaultColorArray = defaultColor.split(',');
                     $slider_color_mobile.value1 = defaultColorArray[0];
                     
                     $slider_color_mobile.value2 = defaultColorArray[defaultColorArray?.length - 1];
                }
                window.LB_GROWN_DIAMOND.config.colorValues = `${$slider_color_mobile.value1},${$slider_color_mobile.value2}`;
                
              
             }else if (optionName === 'Clarity') {
                if(selectedValues.length > 0 ){
                    let clarityarr = selectedValues.split(',');
                    let clarityfirstValue = clarityarr[0];
                    let claritylastValue = clarityarr[clarityarr.length - 1];
                      $slider_clarity_mobile.value1 = clarityfirstValue;
                        $slider_clarity_mobile.value2 = claritylastValue;
                }else{
                      const defaultClarityArray = defaultClarity.split(',');
                     $slider_clarity_mobile.value1 = defaultClarityArray[0];
                     $slider_clarity_mobile.value2 = defaultClarityArray[defaultClarityArray?.length - 1];
                }
                window.LB_GROWN_DIAMOND.config.clarityValues = `${$slider_clarity_mobile.value1},${$slider_clarity_mobile.value2}`;
              
              }else if (optionName === 'Cut') {
                if(selectedValues.length > 0 ){
                    let cutarr = selectedValues.split(',');
                    let cutfirstValue = cutarr[0];
                    let cutlastValue = cutarr[cutarr.length - 1];
                      $slider_cut_mobile.value1 = cutfirstValue;
                        $slider_cut_mobile.value2 = cutlastValue;
                }else{
                    const defaultCutArray = defaultCut.split(',');
                     $slider_cut_mobile.value1 = defaultCutArray[0];
                     $slider_cut_mobile.value2 = defaultCutArray[defaultCutArray?.length - 1];
                }
                window.LB_GROWN_DIAMOND.config.cutValues = `${$slider_cut_mobile.value1},${$slider_cut_mobile.value2}`;
              
            }else if (optionName === 'Carat') {

                 var  caratswatch = true;
                if(selectedValues.length > 0 ){
                    let caratarr = selectedValues.split('-').map(v => v.trim());
                    let caratfirstValue = caratarr[0];
                    let caratlastValue = caratarr[caratarr.length - 1];
                    $slider_carat_mobile.value2 = defaultCaratMax;
                    $slider_carat_mobile.value1 = caratfirstValue;
                    $slider_carat_mobile.value2 = caratlastValue;
                }else{
                     //$slider_carat_mobile.value1 = defaultCaratMin;
                     //$slider_carat_mobile.value2 = defaultCaratMax;
                }
              
              }else if (optionName === 'Price') {
                 var  Priceswatch = true;
                if(selectedValues.length > 0 ){
                    let pricearr = selectedValues.split('-').map(v => v.trim());
                    let pricefirstValue = pricearr[0];
                    let pricelastValue = pricearr[pricearr.length - 1];
                      $slider_price_mobile.value2 = defaultPriceMax;
                    $slider_price_mobile.value1 = pricefirstValue;
                    $slider_price_mobile.value2 = pricelastValue;
                }else{
                    // $slider_price.value1 = defaultPriceMin;
                    // $slider_price.value2 = defaultPriceMax;
                }
                return false;
              
             }
                
            
        }
    });

    await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
}
let handleGlobalSliderEventsForMobileNew = async function() {
 

    if (myCustomController !== null) {
        myCustomController.abort();
    }
    
    if ($slider_carat) {
        $slider_carat.value1 = $slider_carat_mobile.value1;
        $slider_carat.value2 = $slider_carat_mobile.value2;
       //setTimeout(resetCaratSwatchesIfNone, 1000);
        
        // var  caratswatch = false;
    }

    if ($slider_price) {
        $slider_price.value1 = $slider_price_mobile.value1;
        $slider_price.value2 = $slider_price_mobile.value2;
    }

    if ($slider_ratio) {
        $slider_ratio.value1 = $slider_ratio_mobile.value1;
        $slider_ratio.value2 = $slider_ratio_mobile.value2;
    }

    if ($slider_table) {
        $slider_table.value1 = $slider_table_mobile.value1;
        $slider_table.value2 = $slider_table_mobile.value2;
    }

    if ($slider_depth) {
        $slider_depth.value1 = $slider_depth_mobile.value1;
        $slider_depth.value2 = $slider_depth_mobile.value2;
    }

    if (document.getElementById('polish-select')) {
        // const polishSelectMobileElement = document.getElementById('polish-select-mobile'), polishSelectElement = document.getElementById('polish-select');
        // //window.LB_GROWN_DIAMOND.config.polishValue = polishSelectMobileElement.value;
        // window.LB_GROWN_DIAMOND.config.polishValue = Array.from(polishSelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
        // polishSelectElement.value = Array.from(polishSelectMobileElement.selectedOptions).map(opt => opt.value);
    }

    if (document.getElementById('symmetry-select')) {
        // const symmetrySelectMobileElement = document.getElementById('symmetry-select-mobile'), symmetrySelectElement = document.getElementById('symmetry-select');
        // // window.LB_GROWN_DIAMOND.config.symmetryValue = symmetrySelectMobileElement.value;
        // window.LB_GROWN_DIAMOND.config.symmetryValue = Array.from(symmetrySelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
        // // symmetrySelectElement.value = symmetrySelectMobileElement.value;
        // symmetrySelectElement.value = Array.from(symmetrySelectMobileElement.selectedOptions).map(opt => opt.value);
    }

    // if (document.getElementById('fluorescence-select')) {
    //     const fluorescenceSelectMobileElement = document.getElementById('fluorescence-select-mobile'), fluorescenceSelectElement = document.getElementById('fluorescence-select');
    //     // window.LB_GROWN_DIAMOND.config.fluorescenceValue = fluorescenceSelectMobileElement.value;
    //     window.LB_GROWN_DIAMOND.config.fluorescenceValue = Array.from(fluorescenceSelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
    //     // fluorescenceSelectElement.value = fluorescenceSelectMobileElement.value;
    //     fluorescenceSelectElement.value = Array.from(fluorescenceSelectMobileElement.selectedOptions).map(opt => opt.value);
    // }

    // if (document.getElementById('certified-by-select')) {
    //     const certifiedBySelectMobileElement = document.getElementById('certified-by-select-mobile'), certifiedBySelectElement = document.getElementById('certified-by-select');
    //     //window.LB_GROWN_DIAMOND.config.certifiedByValue = certifiedBySelectMobileElement.value;
    //     window.LB_GROWN_DIAMOND.config.certifiedByValue =  Array.from(certifiedBySelectMobileElement.selectedOptions).map(opt => opt.value).join(', ');
    //     certifiedBySelectElement.value = Array.from(certifiedBySelectMobileElement.selectedOptions).map(opt => opt.value);
    // }

    if (document.getElementById('sustainability-select')) {
        const sustainabilitySelectMobileElement = document.getElementById('sustainability-select-mobile'), sustainabilitySelectElement = document.getElementById('sustainability-select');
        window.LB_GROWN_DIAMOND.config.sustainabilityValue = sustainabilitySelectMobileElement.value;
        sustainabilitySelectElement.value = sustainabilitySelectMobileElement.value;
    }

    if (document.getElementById('quality-select')) {
        const qualitySelectMobileElement = document.getElementById('quality-select-mobile'), qualitySelectElement = document.getElementById('quality-select');
        window.LB_GROWN_DIAMOND.config.qualityValue = qualitySelectMobileElement.value;
        qualitySelectElement.value = qualitySelectMobileElement.value;
    }
    // --- NEW: Swatch Multiple Values Syncing ---
    // This loops through every swatch group and updates the config based on 'data-option-name'
    document.querySelectorAll('.dmdfilter-swatches').forEach(container => {
        const optionName = container.getAttribute('data-option-name');
        const selectedValues = Array.from(container.querySelectorAll('.swatches-tab.active'))
                                    .map(el => el.getAttribute('data-value'))
                                    .join(', ');

        if (window.LB_GROWN_DIAMOND && window.LB_GROWN_DIAMOND.config) {
            if (optionName === 'Certified') {
                const certifiedBySelectMobileElement = document.getElementById('certified-by-select-mobile'), certifiedBySelectElement = document.getElementById('certified-by-select');
                window.LB_GROWN_DIAMOND.config.certifiedByValue = selectedValues;
                certifiedBySelectElement.value = Array.from(certifiedBySelectMobileElement.selectedOptions).map(opt => opt.value);
             } else if (optionName === 'Fluorescence') {
                 const fluorescenceSelectMobileElement = document.getElementById('fluorescence-select-mobile'), fluorescenceSelectElement = document.getElementById('fluorescence-select');
                 window.LB_GROWN_DIAMOND.config.fluorescenceValue = selectedValues;
                 fluorescenceSelectElement.value = Array.from(fluorescenceSelectMobileElement.selectedOptions).map(opt => opt.value);
             } else if (optionName === 'Polish') {
                const polishSelectMobileElement = document.getElementById('polish-select-mobile'), polishSelectElement = document.getElementById('polish-select');
                window.LB_GROWN_DIAMOND.config.polishValue = selectedValues;
                polishSelectElement.value = Array.from(polishSelectMobileElement.selectedOptions).map(opt => opt.value);
             }else if (optionName === 'Symmetry') {
                const symmetrySelectMobileElement = document.getElementById('symmetry-select-mobile'), symmetrySelectElement = document.getElementById('symmetry-select');
                window.LB_GROWN_DIAMOND.config.symmetryValue = selectedValues
                symmetrySelectElement.value = Array.from(symmetrySelectMobileElement.selectedOptions).map(opt => opt.value);
             }else if (optionName === 'Color') {
                if(selectedValues.length > 0 ){
                    let colorarr = selectedValues.split(',');
                    let colorfirstValue = colorarr[0];
                    let colorlastValue = colorarr[colorarr.length - 1];
                      $slider_color_mobile.value1 = colorfirstValue;
                        $slider_color_mobile.value2 = colorlastValue;
                }else{
                     const defaultColorArray = defaultColor.split(',');
                     $slider_color_mobile.value1 = defaultColorArray[0];
                     $slider_color_mobile.value2 = defaultColorArray[defaultColorArray?.length - 1];
                }
              
             }else if (optionName === 'Clarity') {
                if(selectedValues.length > 0 ){
                    let clarityarr = selectedValues.split(',');
                    let clarityfirstValue = clarityarr[0];
                    let claritylastValue = clarityarr[clarityarr.length - 1];
                      $slider_clarity_mobile.value1 = clarityfirstValue;
                        $slider_clarity_mobile.value2 = claritylastValue;
                }else{
                      const defaultClarityArray = defaultClarity.split(',');
                     $slider_clarity_mobile.value1 = defaultClarityArray[0];
                     $slider_clarity_mobile.value2 = defaultClarityArray[defaultClarityArray?.length - 1];
                }
              
              }else if (optionName === 'Cut') {
                if(selectedValues.length > 0 ){
                    let cutarr = selectedValues.split(',');
                    let cutfirstValue = cutarr[0];
                    let cutlastValue = cutarr[cutarr.length - 1];
                      $slider_cut_mobile.value1 = cutfirstValue;
                        $slider_cut_mobile.value2 = cutlastValue;
                }else{
                    const defaultCutArray = defaultCut.split(',');
                     $slider_cut_mobile.value1 = defaultCutArray[0];
                     $slider_cut_mobile.value2 = defaultCutArray[defaultCutArray?.length - 1];
                }
              
            }
                
            //     window.LB_GROWN_DIAMOND.config.clarityValue = selectedValues;
            // } else if (optionName === 'Cut') {
            //     window.LB_GROWN_DIAMOND.config.cutValue = selectedValues;
            // }
        }
    });

    await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
}

// checks every 50ms
/* Mobile View JS */
//document.getElementById('slider_carat_mia_mobile').addEventListener('onPointerClicked', handleGlobalSliderEventsForMobileNew);
const $sliderCaratMobile = document.getElementById('slider_carat_mia_mobile');

if ($sliderCaratMobile) {
    $sliderCaratMobile.addEventListener('change', (evt) => {
        // ONLY reset if the user dragged the handle (not from a swatch click)
        if (!isProgrammaticChange) {
            console.log("Slider moved by user - Resetting Swatches");
            
            const container = document.querySelector('.dmdfilter-swatche-carat');
            if (container) {
                container.querySelectorAll('.swatches-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        }
        
        // Always update the values and results
        handleGlobalSliderEventsForMobileNew();
    });
}
const $sliderPriceMobile = document.getElementById('slider_price_mia_mobile');

if ($sliderPriceMobile) {
    $sliderPriceMobile.addEventListener('change', (evt) => {
        // ONLY reset if the user dragged the handle (not from a swatch click)
        if (!isProgrammaticPriceChange) {
            console.log("Slider moved by user - Resetting Swatches");
            
            const container = document.querySelector('.dmdfilter-swatche-price');
            if (container) {
                container.querySelectorAll('.swatches-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
            }
        }
        
        // Always update the values and results
        handleGlobalSliderEventsForMobileNew();
    });
}
//document.getElementById('slider_carat_mia_mobile') && (document.getElementById('slider_carat_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobileNew));
//document.getElementById('slider_price_mia_mobile') && (document.getElementById('slider_price_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('slider_ratio_mia_mobile') && (document.getElementById('slider_ratio_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('slider_table_mia_mobile') && (document.getElementById('slider_table_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('slider_depth_mia_mobile') && (document.getElementById('slider_depth_mia_mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('polish-select-mobile') && (document.getElementById('polish-select-mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('symmetry-select-mobile') && (document.getElementById('symmetry-select-mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('fluorescence-select-mobile') && (document.getElementById('fluorescence-select-mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('certified-by-select-mobile') && (document.getElementById('certified-by-select-mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('sustainability-select-mobile') && (document.getElementById('sustainability-select-mobile').addEventListener('change', handleGlobalSliderEventsForMobile));
document.getElementById('quality-select-mobile') && (document.getElementById('quality-select-mobile').addEventListener('change', handleGlobalSliderEventsForMobile));

if (document.getElementById('slider_clarity_mia_mobile')) {
    $slider_clarity_mobile.addEventListener('change', async (evt) => {
        // var clarityFilteredValues = slider_clarity_mobile?.data.filter((value) => value.toString() >= slider_clarity_mobile?.value1.toString() && value.toString() <= slider_clarity_mobile?.value2.toString());
        $slider_clarity.value1 = $slider_clarity_mobile.value1;
        $slider_clarity.value2 = $slider_clarity_mobile.value2;
        let defaultClarityArr = defaultClarity.split(',');
        let minClarityIndex = defaultClarityArr.indexOf($slider_clarity_mobile.value1);
        let maxClarityIndex = defaultClarityArr.indexOf($slider_clarity_mobile.value2);
        let betweenClarity = defaultClarityArr.slice(minClarityIndex, maxClarityIndex + 1);
        const containerClarityData = document.querySelector('.dmdfilter-swatche-clarity');
        setActiveSwatches(containerClarityData, betweenClarity);
        window.LB_GROWN_DIAMOND.config.clarityValues = `${$slider_clarity_mobile.value1},${$slider_clarity_mobile.value2}`; // clarityFilteredValues?.join(',');

        // window.LB_GROWN_DIAMOND.clearImportantFilter();
        // await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
    });
}

if (document.getElementById('slider_cut_mia_mobile')) {
    $slider_cut_mobile.addEventListener('change', async (evt) => {
        // var cutFilteredValues = slider_cut_mobile?.data.filter((value) => value >= slider_cut_mobile?.value1 && value <= slider_cut_mobile?.value2);
        $slider_cut.value1 = $slider_cut_mobile.value1;
        $slider_cut.value2 = $slider_cut_mobile.value2;
        let defaultCutArr = defaultCut.split(',');

        let minCutIndex = defaultCutArr.indexOf($slider_cut_mobile.value1);
        let maxCutIndex = defaultCutArr.indexOf($slider_cut_mobile.value2);

        let betweenCut = defaultCutArr.slice(minCutIndex, maxCutIndex + 1);

        const containerCutData = document.querySelector('.dmdfilter-swatches-cut');

        setActiveSwatches(containerCutData, betweenCut);
        window.LB_GROWN_DIAMOND.config.cutValues = `${$slider_cut_mobile.value1},${$slider_cut_mobile.value2}`; // cutFilteredValues?.join(',');

        // window.LB_GROWN_DIAMOND.clearImportantFilter();
        // await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
    });
}

if (document.getElementById('slider_color_mia_mobile')) {
    
  
    $slider_color_mobile.addEventListener('change', async (evt) => {
        $slider_color.value1 = $slider_color_mobile.value1;
        $slider_color.value2 = $slider_color_mobile.value2;
        window.LB_GROWN_DIAMOND.config.colorValues = `${$slider_color_mobile.value1},${$slider_color_mobile.value2}`;
        let defaultColorarr = defaultColor.split(',');
        let minColorIndex = defaultColorarr.indexOf($slider_color_mobile.value1);
        let maxColorIndex = defaultColorarr.indexOf($slider_color_mobile.value2);
        let betweenColor = defaultColorarr.slice(minColorIndex, maxColorIndex + 1);
        const containerColordata = document.querySelector('.dmdfilter-swatche-color');
            setActiveSwatches(containerColordata, betweenColor);
        // window.LB_GROWN_DIAMOND.clearImportantFilter();
        // await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
    });
    
}
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

/*window.addEventListener('scroll', async function () {
    var searchResultWrapper = document.getElementById("vdb-lb-search-result-wrapper");
    var tableId = document.getElementById("table-id");

    calculateSidebarHeight();
    if (searchResultWrapper.offsetHeight > 0 && window.scrollY + window.innerHeight >= searchResultWrapper.offsetHeight) {
        await window.LB_GROWN_DIAMOND?.callDiamondList();
    } else if (tableId.querySelector("tbody").innerHTML !== '' && window.scrollY + window.innerHeight >= tableId.parentElement.offsetHeight && tableId.parentElement.offsetHeight > 0) {
        await window.LB_GROWN_DIAMOND?.callDiamondList();
    }
});*/

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

// if (document.getElementsByClassName('pagination-button__load-more')?.length > 0) {
//     let paginationButtonLoadMoreElements = document.getElementsByClassName('pagination-button__load-more');
//     paginationButtonLoadMoreElements = Array.prototype.slice.call(paginationButtonLoadMoreElements);
//     for (let i = 0; i < paginationButtonLoadMoreElements.length; i++) {
//         paginationButtonLoadMoreElements[i].addEventListener('click', async function() {
//             inactiveListView();
//             window.LB_GROWN_DIAMOND.hideElements('.vdb-see-more-div');
//             await window.LB_GROWN_DIAMOND?.callDiamondList();
//         });
//     }
// }

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
            const hiddenSortingField = window.LB_GROWN_DIAMOND.config.sortingField;
            const hiddenSortingSeq = window.LB_GROWN_DIAMOND.config.sortingSeq;
            if (hiddenSortingField == thSortingField) {
                if (hiddenSortingSeq == 'ASC') {
                    window.LB_GROWN_DIAMOND.config.sortingSeq = 'DESC';
                    clickedElement.classList.add('vdb-sorting_desc');
                    clickedElement.classList.remove('vdb-sorting_both');
                    clickedElement.classList.remove('vdb-sorting_asc');
                } else {
                    window.LB_GROWN_DIAMOND.config.sortingSeq = 'ASC';
                    clickedElement.classList.add('vdb-sorting_asc');
                    clickedElement.classList.remove('vdb-sorting_both');
                    clickedElement.classList.remove('vdb-sorting_desc');
                }
            } else {
                window.LB_GROWN_DIAMOND.config.sortingSeq = 'ASC';
                clickedElement.classList.add('vdb-sorting_asc');
                clickedElement.classList.remove('vdb-sorting_both');
                clickedElement.classList.remove('vdb-sorting_desc');
            }
            window.LB_GROWN_DIAMOND.config.sortingField = thSortingField;
            await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
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

const openBtns = document.getElementsByClassName('vdb-lb-advanced-filter-mobile-view-open');
const closeBtns = document.getElementsByClassName('vdb-lb-advanced-filter-mobile-view-close');
const filterWrappers = document.getElementsByClassName('vdb-lb-main-advance-filter-mobile');
const htmlTag = document.documentElement;

// Open / Toggle
// Array.from(openBtns).forEach(openBtn => {
//   openBtn.addEventListener('click', (event) => {
//     htmlTag.classList.toggle('open-dmdfilter');

//     Array.from(filterWrappers).forEach(el =>
//       el.classList.toggle('sidebar-active')
//     );

//       const btn = event.target.closest('[data-filter]');
//       if (btn) {
//           const filterName = btn.dataset.filter;
//             const element = document.querySelector('[data-li="'+filterName+'"]');
//             element.click();
//       }
//   });
// });

// // Close
// Array.from(closeBtns).forEach(btn => {
//   btn.addEventListener('click', () => {
//     htmlTag.classList.remove('open-dmdfilter');

//     Array.from(filterWrappers).forEach(el =>
//       el.classList.remove('sidebar-active')
//     );
//       let filterListOpenElements = document.getElementsByClassName('filter__list-open');
//     filterListOpenElements = Array.prototype.slice.call(filterListOpenElements);
//     filterListOpenElements.forEach(e => e.classList.remove('filter__list-open'));

//     let mobileTooltipActiveElements = document.getElementsByClassName('mobile-tooltip-active');
//     mobileTooltipActiveElements = Array.prototype.slice.call(mobileTooltipActiveElements);
//     mobileTooltipActiveElements.map(e => e.classList.remove('mobile-tooltip-active'));

// //      const element = document.querySelector('[data-li="carat"]');

// // element.click();
//   });
// });
document.addEventListener('click', function (event) {

  /* ===============================
     OPEN FILTER (Mobile)
  =============================== */
  const openBtn = event.target.closest('.vdb-lb-advanced-filter-mobile-view-open');

  if (openBtn) {

    const htmlTag = document.documentElement;
    const filterWrappers = document.getElementsByClassName('vdb-lb-main-advance-filter-mobile');

    // Toggle classes
    htmlTag.classList.toggle('open-dmdfilter');

    Array.from(filterWrappers).forEach(el =>
      el.classList.toggle('sidebar-active')
    );

    // Trigger specific filter tab if exists
    const btn = event.target.closest('[data-filter]');
    if (btn) {
      const filterName = btn.dataset.filter;
      const element = document.querySelector('[data-li="' + filterName + '"]');
      if (element){
        element.click();
        element.classList.add('active');
      } 
    }

    return; // stop here
  }


  /* ===============================
     CLOSE FILTER (Mobile)
  =============================== */
  const closeBtn = event.target.closest('.vdb-lb-advanced-filter-mobile-view-close');

  if (closeBtn) {

    const htmlTag = document.documentElement;
    const filterWrappers = document.getElementsByClassName('vdb-lb-main-advance-filter-mobile');

    // Remove sidebar classes
    htmlTag.classList.remove('open-dmdfilter');

    Array.from(filterWrappers).forEach(el =>
      el.classList.remove('sidebar-active')
    );

    // Remove open filter lists
    document.querySelectorAll('.filter__list-open')
      .forEach(el => el.classList.remove('filter__list-open'));

    // Remove mobile tooltip active
    document.querySelectorAll('.mobile-tooltip-active')
      .forEach(el => el.classList.remove('mobile-tooltip-active'));

    return;
  }

});


// if (document.getElementsByClassName('filter__list-icon')?.length > 0) {
//     let filterListIconElements = document.getElementsByClassName('filter__list-icon');
//     filterListIconElements = Array.prototype.slice.call(filterListIconElements);

//     let activeLi = '';
//     for (let i = 0; i < filterListIconElements?.length; i++) {
//         filterListIconElements[i].addEventListener('click', function (event) {
//             if (activeLi?.length > 0 && activeLi != this.dataset.li) {
//                 let filterListOpenElements = document.getElementsByClassName('filter__list-open');
//                 filterListOpenElements = Array.prototype.slice.call(filterListOpenElements);
//                 filterListOpenElements.forEach(e => e.classList.remove('filter__list-open'));

//                 let mobileTooltipActiveElements = document.getElementsByClassName('mobile-tooltip-active');
//                 mobileTooltipActiveElements = Array.prototype.slice.call(mobileTooltipActiveElements);
//                 mobileTooltipActiveElements.map(e => e.classList.remove('mobile-tooltip-active'));
//             }
//             document.querySelector(`.filter__list-${this.dataset.li}`).classList.toggle('filter__list-open');
//             activeLi = this.dataset.li;
//         });
//     }
// }

document.addEventListener('click', function (e) {
    // const filterSelected = e.target.closest('.filter-selected');
    //  if (filterSelected) return;
   
    //const icon = e.target.closest('.filter__list-icon');
    const icon = e.target.closest('.filter__list-label');
    if (!icon) return;

    const currentItem = icon.closest('.filter__list-item');
    const currentContent = currentItem.querySelector('.filter__list-content');

    if (!currentContent) return;

    const isOpen = currentContent.classList.contains('filter__list-open');
    

    // 🔹 CLOSE SIBLINGS (same level only)
    // const parentUL = currentItem.parentElement;
    // const siblingItems = parentUL.querySelectorAll(':scope > .filter__list-item');

    // siblingItems.forEach(item => {
    //     if (item !== currentItem) {
    //         const content = item.querySelector('.filter__list-content');
    //         if (content) {
    //             content.classList.remove('filter__list-open');

    //             // ALSO close nested children inside siblings
    //             const nested = content.querySelectorAll('.filter__list-open');
    //             nested.forEach(n => n.classList.remove('filter__list-open'));
    //         }
    //     }
    // });

    // 🔹 TOGGLE CURRENT
    if (isOpen) {
        // Closing → also close all children inside
        const nested = currentContent.querySelectorAll('.filter__list-open');
        nested.forEach(n => n.classList.remove('filter__list-open'));
        currentContent.classList.remove('filter__list-open');
        icon.querySelectorAll('.filter__list-icon').forEach(n => n.classList.remove('active'));

   currentContent.querySelectorAll('.mobile-tooltip-active').forEach(el => el.classList.remove('mobile-tooltip-active'));
    } else {
        currentContent.classList.add('filter__list-open');
        icon.querySelector('.filter__list-icon').classList.add('active');
        
    }

});

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

            window.LB_GROWN_DIAMOND.config.sortingField = sortingField;
            window.LB_GROWN_DIAMOND.config.sortingSeq = sortingSeq;
            await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
        });
    }
}

if (document.getElementsByClassName('mobile-tooltip')?.length > 0) {

    let mobileTooltipElements = document.querySelectorAll('.mobile-tooltip');
    let activeTooltip = null;

    function closeAllTooltips() {
        document.querySelectorAll('.mobile-tooltip-active')
            .forEach(el => el.classList.remove('mobile-tooltip-active'));
        activeTooltip = null;
        const cutContainer = document.querySelector('.js-tolcontent[data-type="cut"]');
        resetolltiptSwatchContainer(cutContainer);
         const clarityContainer = document.querySelector('.js-tolcontent[data-type="clarity"]');
        resetolltiptSwatchContainer(clarityContainer);
    }

    mobileTooltipElements.forEach(function (tooltip) {

        tooltip.addEventListener('click', function (e) {

            if (e.target.closest('.vdb-lb-close-tooltip')) {
                closeAllTooltips();
                return;
            }

            if (e.target.closest('.tooltiptext')) {
                e.stopPropagation(); 
                return; // close mat karo
            }

            let tooltipText = this.querySelector('.tooltiptext');
            if (activeTooltip && activeTooltip !== this.dataset.mbTooltip) {
                closeAllTooltips();
            }

            tooltipText.classList.toggle('mobile-tooltip-active');
            if (tooltipText.classList.contains('mobile-tooltip-active')) {
                activeTooltip =this.querySelector('.dmd-toltiptext').dataset.mbTooltip;
                
            } else {
                activeTooltip = null;
            }

            e.stopPropagation();
        });
    });

    // document.addEventListener('click', function (e) {
    //     if (!e.target.closest('.mobile-tooltip')) {
    //         closeAllTooltips();
    //     }
    // });
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

async function qualityForMostImportantToYou(event, value) {
        let selectedColorValue1 = event.target.options[event.target.selectedIndex].dataset.colorValue1,
            selectedColorValue2 = event.target.options[event.target.selectedIndex].dataset.colorValue2,
            selectedClarityValue1 = event.target.options[event.target.selectedIndex].dataset.clarityValue1,
            selectedClarityValue2 = event.target.options[event.target.selectedIndex].dataset.clarityValue2,
            selectedCutValue1 = event.target.options[event.target.selectedIndex].dataset.cutValue1,
            selectedCutValue2 = event.target.options[event.target.selectedIndex].dataset.cutValue2;

        let vdbListItemAColorStyleElements = document.getElementsByClassName('vdb-list-item-a-color-style');
        vdbListItemAColorStyleElements.forEach(i => i.dataset.colorValues == selectedColor ? document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.add('active-state')) : document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state')));

        window.LB_GROWN_DIAMOND.hideElements('.vdb-container--pagination'); // window.LB_GROWN_DIAMOND.hideElements('.vdb-see-more-div');

        window.LB_GROWN_DIAMOND.config.vendorValue = '';
        if (value?.length > 0) {
            if (value != 'Carbon Capture Diamonds') {
                $slider_clarity && ($slider_clarity.value1 = selectedClarityValue1);
                $slider_clarity && ($slider_clarity.value2 = selectedClarityValue2);

                $slider_clarity_mobile && ($slider_clarity_mobile.value1 = selectedClarityValue1);
                $slider_clarity_mobile && ($slider_clarity_mobile.value2 = selectedClarityValue2);

                $slider_cut && ($slider_cut.value1 = selectedCutValue1);
                $slider_cut && ($slider_cut.value2 = selectedCutValue2);

                $slider_cut_mobile && ($slider_cut_mobile.value1 = selectedCutValue1);
                $slider_cut_mobile && ($slider_cut_mobile.value2 = selectedCutValue2);

                let vdbListItemAFancyStyleElements = document.getElementsByClassName('vdb-list-item-a-fancy-style');
                vdbListItemAFancyStyleElements = Array.prototype.slice.call(vdbListItemAFancyStyleElements);
                vdbListItemAFancyStyleElements.forEach(el => el.classList.remove('active')); 
                (vdbListItemAFancyStyleElements?.length > 0) && (vdbListItemAFancyStyleElements.forEach(i => document.querySelectorAll('.' + i.dataset.module).forEach(e => e.classList.remove('active-state'))));

                $slider_color && ($slider_color.value1 = selectedColorValue1);
                $slider_color && ($slider_color.value2 = selectedColorValue2);

                $slider_color_mobile && ($slider_color_mobile.value1 = selectedColorValue1);
                $slider_color_mobile && ($slider_color_mobile.value2 = selectedColorValue2);

                window.LB_GROWN_DIAMOND.config.colorValues = `${selectedColorValue1},${selectedColorValue2}`;
                window.LB_GROWN_DIAMOND.config.clarityValues = `${selectedClarityValue1},${selectedClarityValue2}`;
                window.LB_GROWN_DIAMOND.config.cutValues = `${selectedCutValue1},${selectedCutValue2}`;
                window.LB_GROWN_DIAMOND.config.fancyValues = '';
            } else {
                const defaultColorArray = defaultColor.split(',');
                $slider_color && ($slider_color.value1 = defaultColorArray[0]);
                $slider_color && ($slider_color.value2 = defaultColorArray[defaultColorArray?.length - 1]);

                $slider_color_mobile && ($slider_color_mobile.value1 = defaultColorArray[0]);
                $slider_color_mobile && ($slider_color_mobile.value2 = defaultColorArray[defaultColorArray?.length - 1]);

                const defaultClarityArray = defaultClarity.split(',');
                $slider_clarity && ($slider_clarity.value1 = defaultClarityArray[0]);
                $slider_clarity && ($slider_clarity.value2 = defaultClarityArray[defaultClarityArray?.length - 1]);

                $slider_clarity_mobile && ($slider_clarity_mobile.value1 = defaultClarityArray[0]);
                $slider_clarity_mobile && ($slider_clarity_mobile.value2 = defaultClarityArray[defaultClarityArray?.length - 1]);

                const defaultCutArray = defaultCut.split(',');
                $slider_cut && ($slider_cut.value1 = defaultCutArray[0]);
                $slider_cut && ($slider_cut.value2 = defaultCutArray[defaultCutArray?.length - 1]);

                $slider_cut_mobile && ($slider_cut_mobile.value1 = defaultCutArray[0]);
                $slider_cut_mobile && ($slider_cut_mobile.value2 = defaultCutArray[defaultCutArray?.length - 1]);

                window.LB_GROWN_DIAMOND.config.colorValues = `${defaultColorArray[0]},${defaultColorArray[defaultColorArray?.length - 1]}`;
                window.LB_GROWN_DIAMOND.config.clarityValues = `${defaultClarityArray[0]},${defaultClarityArray[defaultClarityArray?.length - 1]}`;
                window.LB_GROWN_DIAMOND.config.cutValues = `${defaultCutArray[0]},${defaultCutArray[defaultCutArray?.length - 1]}`;
                window.LB_GROWN_DIAMOND.config.fancyValues = '';
                window.LB_GROWN_DIAMOND.config.vendorValue = value;
                window.LB_GROWN_DIAMOND.config.page_number = 1;
            }
            window.LB_GROWN_DIAMOND.config.page_number = 1;
        } else {
            const defaultColorArray = defaultColor.split(',');
            $slider_color && ($slider_color.value1 = defaultColorArray[0]);
            $slider_color && ($slider_color.value2 = defaultColorArray[defaultColorArray?.length - 1]);

            $slider_color_mobile && ($slider_color_mobile.value1 = defaultColorArray[0]);
            $slider_color_mobile && ($slider_color_mobile.value2 = defaultColorArray[defaultColorArray?.length - 1]);

            const defaultClarityArray = defaultClarity.split(',');
            $slider_clarity && ($slider_clarity.value1 = defaultClarityArray[0]);
            $slider_clarity && ($slider_clarity.value2 = defaultClarityArray[defaultClarityArray?.length - 1]);

            $slider_clarity_mobile && ($slider_clarity_mobile.value1 = defaultClarityArray[0]);
            $slider_clarity_mobile && ($slider_clarity_mobile.value2 = defaultClarityArray[defaultClarityArray?.length - 1]);

            const defaultCutArray = defaultCut.split(',');
            $slider_cut && ($slider_cut.value1 = defaultCutArray[0]);
            $slider_cut && ($slider_cut.value2 = defaultCutArray[defaultCutArray?.length - 1]);

            $slider_cut_mobile && ($slider_cut_mobile.value1 = defaultCutArray[0]);
            $slider_cut_mobile && ($slider_cut_mobile.value2 = defaultCutArray[defaultCutArray?.length - 1]);

            window.LB_GROWN_DIAMOND.config.colorValues = `${defaultColorArray[0]},${defaultColorArray[defaultColorArray?.length - 1]}`;
            window.LB_GROWN_DIAMOND.config.clarityValues = `${defaultClarityArray[0]},${defaultClarityArray[defaultClarityArray?.length - 1]}`;
            window.LB_GROWN_DIAMOND.config.cutValues = `${defaultCutArray[0]},${defaultCutArray[defaultCutArray?.length - 1]}`;
            window.LB_GROWN_DIAMOND.config.fancyValues = '';

            window.LB_GROWN_DIAMOND.config.page_number = 1;
        }
        await window.LB_GROWN_DIAMOND?.callBeforeLGDiamond();
}

if (document.getElementById('important-select')) {
    const importantSelectElement = document.getElementById('important-select');
    importantSelectElement.addEventListener('change', async function(event) {
        const _value = this.value;
        const _event = event;

        document.getElementById('important-select-mobile') && (document.getElementById('important-select-mobile').value = _value);
        qualityForMostImportantToYou(_event, _value);
    });
}

if (document.getElementById('important-select-mobile')) {
    const importantSelectMobileElement = document.getElementById('important-select-mobile');
    if (!importantSelectMobileElement.dataset.listenerAdded) {
    importantSelectMobileElement.addEventListener('change', async function(event) {
      
        const _value = this.value;
        const _event = event;
        
        document.getElementById('important-select') && (document.getElementById('important-select').value = _value);
        qualityForMostImportantToYou(_event, _value);
    });
       importantSelectMobileElement.dataset.listenerAdded = "true";
    }
}

function getFilterdataCount(colorParamsString, colorData) {

  if (!colorParamsString || !colorData) return 0;

  // Convert params string → array
  const params = colorParamsString.split(",");

  // Get first and last + replace "+"
  const first = params[0].replace(/\+/g, " ").trim();
  const last = params[params.length - 1].replace(/\+/g, " ").trim();

  // Convert colorData → array
  const items = colorData.split(",").map(item => item.trim());

  const startIndex = items.indexOf(first);
  const endIndex = items.indexOf(last);

  // Validation
  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    return 0;
  }

  return endIndex - startIndex + 1;
}

//======================================
// Swatch Click (Supports Multiple)
// ======================================
document.addEventListener('click', function (e) {

//     const btn = e.target.closest('.swatches-tab');
//     if (!btn) return;

//     const container = btn.closest('.dmdfilter-swatches');
//     if (!container) return;
// isProgrammaticChange = true;
// isProgrammaticPriceChange = true;
//     const isMultiple = container.getAttribute('data-multiple') === 'true';

//     if (isMultiple) {
//         // Toggle for multiple selection
//         btn.classList.toggle('active');
//         let btnValue = btn?.dataset?.value;
//         if(btnValue == 'All'){
//             if(container.querySelectorAll('.swatches-tab.active').length > 1){
//                 container.querySelector('.swatches-tab[data-value="All"]')?.classList.remove('active');
//             }else{
//                 container.querySelector('.swatches-tab[data-value="All"]')?.classList.add('active');
//             }
//         }else{
            
//         }
//     } else {
        
//         // Single selection
//         container.querySelectorAll('.swatches-tab')
//             .forEach(el => el.classList.remove('active'));

//         btn.classList.add('active');
//     }

const btn = e.target.closest('.swatches-tab');
if (!btn) return;

const container = btn.closest('.dmdfilter-swatches');
if (!container) return;

isProgrammaticChange = true;
isProgrammaticPriceChange = true;

const isMultiple = container.getAttribute('data-multiple') === 'true';

if (isMultiple) {
    btn.classList.toggle('active');

    const btnValue = btn.dataset.value;

    if (btnValue === 'All') {
        // If All clicked → remove active from others
        if (btn.classList.contains('active')) {
            container.querySelectorAll('.swatches-tab').forEach(el => {
                if (el.dataset.value !== 'All') {
                    el.classList.remove('active');
                }
            });
        }

    } else {
        // If other swatch clicked → remove All
        if(container.querySelectorAll('.swatches-tab.active').length <=0){
            container.querySelector('.swatches-tab[data-value="All"]')?.classList.add('active');
        }else{     
        container.querySelector('.swatches-tab[data-value="All"]')?.classList.remove('active');
        }
    }

} else {

    // Single selection
    container.querySelectorAll('.swatches-tab')
        .forEach(el => el.classList.remove('active'));

    btn.classList.add('active');
}
      
    handleGlobalSliderEventsForMobile();
    setTimeout(() => { isProgrammaticChange = false; }, 1000);
     setTimeout(() => { isProgrammaticPriceChange = false; }, 1000);
});

function setActiveSwatches(container, valuesArray) {

    const buttons = container.querySelectorAll('.swatches-tab');

    buttons.forEach(btn => {

        const value = btn.getAttribute('data-value');

        if (valuesArray.includes(value)) {
            btn.classList.add('active');
            btn.setAttribute('aria-checked', 'true');
            btn.setAttribute('tabindex', '0');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-checked', 'false');
            btn.setAttribute('tabindex', '-1');
        }

    });

}
function resetCaratSwatchesIfNone() {
        const containerCarat = document.querySelector('.dmdfilter-swatche-carat');
 setActiveSwatches(containerCarat, []);
    // if (!caratswatch) {
    //     setActiveSwatches(containerCarat, []);
    // }
}

// document.addEventListener('click', function(e){

//   const btn = e.target.closest('.filter__list-icon');
//   if(!btn) return;

//   const parentItem = btn.closest('.filter__list-item'); // each filter row
//   const parentList = parentItem.parentElement;

//   const isActive = btn.classList.contains('active');

//   parentList.querySelectorAll(':scope > .filter__list-item .filter__list-icon').forEach(function(el){
//     el.classList.remove('active');
//   });

//   if(!isActive){
//     btn.classList.add('active');
//   }

// });
function updateRangeFilterText({
  sliderId,
  labelSelector,
  unit = '',
  beforeunit = '',
  decimals = 2,
  roundvalue = true
}) {
      var slider = document.getElementById(sliderId);
  var label = document.querySelector(labelSelector);

  if (!slider || !label) return;

  function isValidNumber(value) {
  return typeof value !== "boolean" &&
         value !== null &&
         value !== "" &&
         !isNaN(value) &&
         isFinite(value);
}
  
function formatValue(val) {
    if(!isValidNumber(val)){
        return val;
    }else{
        if(roundvalue){
            return Math.round(val).toLocaleString('en-US');
        }else{
            return val.toLocaleString('en-US');
        }
    }
    
  }

  function update() {
    var min = formatValue(slider.value1);
    var max = formatValue(slider.value2);
    label.textContent = `${beforeunit}${min} ${unit} - ${beforeunit}${max} ${unit}`;
  }
slider.addEventListener("change", update);
  slider.addEventListener("input", update);
  // Initial update
  update();

}

function updateSelectFilterText({
  mainId,
  labelSelector,
  text = '',
  count = '',
  
}){
  var mainId = document.querySelector(mainId);

  var label = document.querySelector(labelSelector);

    if (!mainId || !label) return;
    if(text == 'All'){
        mainId.classList.add('hide');
    }else{
        mainId.classList.remove('hide');
    }
    if(text.length <=0){
        mainId.classList.add('hide');
    }
     function update() {
    label.innerHTML = `${text} ${count}`;
  }
    update();
}

// function detailDiamondLListDrawer(){
// //    if ($('.dmd-detail-filter .product-slider').hasClass('slick-initialized')) {
// //   $('.dmd-detail-filter  .product-slider').slick('unslick');
// // }

// var $slider = $('.dmd-detail-filter .product-slider');

// if ($slider.length && $slider.hasClass('slick-initialized')) {
//   $slider.slick('unslick');
// }
//   //const $slider = $('.dmd-detail-filter  .product-slider');

//   if (!$slider.length) return; // element not found

//   if ($slider.hasClass('slick-initialized')) {
//     $slider.slick('unslick');
//   }

// //   $slider.slick({
// //     dots: false,
// //     arrows: true,
// //     infinite: false,
// //     speed: 400,
// //     slidesToShow: 1,
// //     slidesToScroll: 1,
// //     prevArrow: `...`,
// //     nextArrow: `...`
// //   });

//    $slider.slick({
//       dots: false,
//       arrows: true,
//       infinite: false,
//       speed: 400,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       adaptiveHeight: false,
//       autoplay: false,
//       accessibility: true,
//        prevArrow: `<button type="button" class="slick-prev custom-arrow" aria-label="Previous Slide">
//                         <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M1.09149 11.0341L9.85809 19.8008C10.157 20.0996 10.7049 20.0996 11.0038 19.8008C11.3027 19.5019 11.3027 18.954 11.0038 18.6551L3.582 11.2333H22.3606C22.8089 11.2333 23.1576 10.8846 23.1576 10.4363C23.1576 10.0379 22.8089 9.63936 22.3606 9.63936H3.582L11.0038 2.26738C11.3027 1.96851 11.3027 1.42059 11.0038 1.12173C10.7049 0.822867 10.157 0.822867 9.85809 1.12173L1.09149 9.88842C0.792594 10.1873 0.792594 10.7352 1.09149 11.0341Z"/>
//                     </svg>
//                     </button>`,
//           nextArrow: `<button type="button" class="slick-next custom-arrow" aria-label="Next Slide">
//                        <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M22.9085 11.0341L14.1419 19.8008C13.843 20.0996 13.2951 20.0996 12.9962 19.8008C12.6973 19.5019 12.6973 18.954 12.9962 18.6551L20.418 11.2333H1.63937C1.19108 11.2333 0.842401 10.8846 0.842401 10.4363C0.842401 10.0379 1.19108 9.63937 1.63937 9.63937H20.418L12.9962 2.26739C12.6973 1.96852 12.6973 1.4206 12.9962 1.12174C13.2951 0.822876 13.843 0.822876 14.1419 1.12174L22.9085 9.88843C23.2074 10.1873 23.2074 10.7352 22.9085 11.0341Z"/>
//                         </svg>
//                     </button>`,
//     });
// }

function detailDiamondLListDrawer() {
  const slider = document.querySelector('.dmd-detail-filter .product-slider');

  if (!slider) return;

  // Access jQuery object for Slick
  const $slider = window.jQuery(slider);

  if ($slider.hasClass('slick-initialized')) {
    $slider.slick('unslick');
  }

  $slider.slick({
    dots: false,
    arrows: true,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    autoplay: false,
    accessibility: true,
    prevArrow: `<button type="button" class="slick-prev custom-arrow" aria-label="Previous Slide">
                      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.09149 11.0341L9.85809 19.8008C10.157 20.0996 10.7049 20.0996 11.0038 19.8008C11.3027 19.5019 11.3027 18.954 11.0038 18.6551L3.582 11.2333H22.3606C22.8089 11.2333 23.1576 10.8846 23.1576 10.4363C23.1576 10.0379 22.8089 9.63936 22.3606 9.63936H3.582L11.0038 2.26738C11.3027 1.96851 11.3027 1.42059 11.0038 1.12173C10.7049 0.822867 10.157 0.822867 9.85809 1.12173L1.09149 9.88842C0.792594 10.1873 0.792594 10.7352 1.09149 11.0341Z"/>
                  </svg>
                  </button>`,
    nextArrow: `<button type="button" class="slick-next custom-arrow" aria-label="Next Slide">
                      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M22.9085 11.0341L14.1419 19.8008C13.843 20.0996 13.2951 20.0996 12.9962 19.8008C12.6973 19.5019 12.6973 18.954 12.9962 18.6551L20.418 11.2333H1.63937C1.19108 11.2333 0.842401 10.8846 0.842401 10.4363C0.842401 10.0379 1.19108 9.63937 1.63937 9.63937H20.418L12.9962 2.26739C12.6973 1.96852 12.6973 1.4206 12.9962 1.12174C13.2951 0.822876 13.843 0.822876 14.1419 1.12174L22.9085 9.88843C23.2074 10.1873 23.2074 10.7352 22.9085 11.0341Z"/>
                       </svg>
                   </button>`
  });
}

document.addEventListener("click",async  function (e) {

  // OPEN FILTER
  if (e.target.closest(".open-filter-btn")) {
    var dataId = e.target.closest(".open-filter-btn").getAttribute("data-id");
var trdata = document.querySelector("#"+dataId);
if(trdata){
    window.LB_GROWN_DIAMOND.showElementsLoader('.diamond-loader');
    document.querySelector(".dmd-detail-filter").innerHTML = '';
                                         //  var productData = await window.LB_GROWN_DIAMOND.callProductDiamondDetail(staticHandle);

          const tddata = trdata.querySelector("td");
         const certificateEls = tddata?.querySelectorAll(".certificate");
         const certificateDelEls = tddata?.querySelectorAll(".certificate-del");
          const measurements = tddata?.querySelectorAll(".measurements");

//               var staticHandle = e.target.closest(".open-filter-btn").getAttribute("data-producthandle");
//  var productData = await window.LB_GROWN_DIAMOND.callProductDiamondDetail(staticHandle);
// certificateEls.forEach((el, index) => {
//   el.innerHTML = '#'+productData.cert_num || "-";
// });
// certificateDelEls.forEach((el, index) => {
//   el.innerHTML = `<a class="tdu" href="${productData.cert_url}" target="_blank">#${productData.cert_num}</a>` || "-";
// });
// measurements.forEach((el, index) => {
//   el.innerHTML = productData.measurements || "-";
// });
              document.querySelector(".dmd-detail-filter").innerHTML =  tddata?.innerHTML;
                var final_price = document.querySelector(".dmd-detail-filter").querySelector('.final_price').getAttribute("data-final-price");
               detailDiamondLListDrawer();
               window.LB_GROWN_DIAMOND.initAddToCartButton();
               breadPlacementBreadCheckout(final_price);
                window.LB_GROWN_DIAMOND.hideElementsLoader('.diamond-loader');
}

    document.querySelector(".dmd-detail-filter")?.classList.add("sidebar-active");
    document.documentElement.classList.add("open-dmdfilter");
  }

  // CLOSE FILTER
  if (e.target.closest(".dmd-detail-filter-close")) {
    document.querySelector(".dmd-detail-filter").innerHTML = '';
    document.querySelector(".dmd-detail-filter")?.classList.remove("sidebar-active");
    document.documentElement.classList.remove("open-dmdfilter");
  }

  if (e.target.closest(".open-filter-btn")) {
    
         var certificateEls = document.querySelector( ".dmd-detail-filter").querySelectorAll(".certificate");
         var certificateDelEls = document.querySelector( ".dmd-detail-filter")?.querySelectorAll(".certificate-del");
          var measurements = document.querySelector( ".dmd-detail-filter")?.querySelectorAll(".measurements");

              var staticHandle = e.target.closest(".open-filter-btn").getAttribute("data-producthandle");
 var productData = await window.LB_GROWN_DIAMOND.callProductDiamondDetail(staticHandle);
certificateEls.forEach((el, index) => {
  el.innerHTML = '#'+productData.cert_num || "-";
});
certificateDelEls.forEach((el, index) => {
  el.innerHTML = `<a class="tdu" href="${productData.cert_url}" target="_blank">#${productData.cert_num}</a>` || "-";
});
measurements.forEach((el, index) => {
  el.innerHTML = productData.measurements || "-";
});
}

 

});

function dmdDetailFilterClose(){
       document.querySelector(".dmd-detail-filter").innerHTML = '';
    document.querySelector(".dmd-detail-filter")?.classList.remove("sidebar-active");
    document.documentElement.classList.remove("open-dmdfilter");
}

function breadPlacementBreadCheckout(priceAdjusted){
    var priceAdjusted= 83000;
    BreadPayments.setInitMode("manual");
                                              //  var priceAdjusted = Number(document.getElementsByClassName("final_price")[0].getAttribute("data-final-price"))
                                                BreadPayments.setup({ integrationKey: "34f979be-388e-4ab5-82b5-1ad29e064479" });
                                                const placement = [
                                                    {
                                                        domID: "bread-checkout-btn-1", allowCheckout: false,

                                                    },
                                                    {
                                                        domID: "bread-checkout-btn-2", allowCheckout: false, order: {
                                                            subTotal: {
                                                                value: priceAdjusted,
                                                                currency: "USD",
                                                            },
                                                            totalTax: {
                                                                value: 0,
                                                                currency: "USD",
                                                            },
                                                            totalShipping: {
                                                                value: 0,
                                                                currency: "USD",
                                                            },
                                                            totalDiscounts: {
                                                                value: 0,
                                                                currency: "USD",
                                                            },
                                                            totalPrice: {
                                                                value: priceAdjusted,
                                                                currency: "USD",
                                                            },
                                                        },
                                                    }
                                                ];
                                                BreadPayments.registerPlacements(placement);
                                                BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {});
                                                BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {});
                                                BreadPayments.init();
                                          
                                          //  BreadPayments.on("INSTALLMENT:APPLICATION_DECISIONED", (installmentResult) => {});
                                            //BreadPayments.on("INSTALLMENT:APPLICATION_CHECKOUT", (installmentResult) => {});
}
 var mobileSelectBox = document.getElementById('important-select-mobile');
    var qualitySwatches = document.querySelectorAll('.quality-swatches .quality-card');
   // const removeFiltersBtns = document.querySelectorAll('.filter-remove-btn-quality');
    var filterSelectedContainer = document.getElementById('filter-superior-quality');
    var filterNameSpan = document.querySelector('.quality-filter-name');
 document.addEventListener('DOMContentLoaded', function () {
   
    if (!mobileSelectBox || qualitySwatches.length === 0) return;

    // Helper to completely clear selections
   

    // Handle swatch click (with toggle-off logic)
   
    qualitySwatches.forEach(function (swatch) {
  swatch.addEventListener('click', function () {
    
    const isAlreadyActive = this.classList.contains('active');

    // Remove active from all swatches
    qualitySwatches.forEach(function (s) {
      s.classList.remove('active');
    });

    let value = '';

    // If it was NOT active before → activate it
    if (!isAlreadyActive) {
      this.classList.add('active');
      value = this.getAttribute('data-value');
    }

    // Update select box
    if (mobileSelectBox.value !== value) {
      mobileSelectBox.value = value;
      mobileSelectBox.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Update UI pill
    if (filterSelectedContainer && filterNameSpan) {
      filterNameSpan.textContent = value;
      filterSelectedContainer.setAttribute('aria-label', `Selected filter: ${value}`);

      if (value.length > 0) {
        filterSelectedContainer.classList.remove('hide');
      } else {
        filterSelectedContainer.classList.add('hide');
      }
    }

  });
    // Handle select box change
    if (!mobileSelectBox.dataset.listenerAdded) {
      mobileSelectBox.addEventListener('change', function () {
        const selectedValue = this.value;

         var mobileSelectBox = document.getElementById('important-select-mobile');
        if (!selectedValue) {
       //   clearQualitySelection();
          return;
        }
        // Update swatches based on selected value
        qualitySwatches.forEach(function (swatch) {
          if (swatch.getAttribute('data-value') === selectedValue) {
            swatch.classList.add('active');
            //swatch.setAttribute('aria-pressed', 'true');
          } else {
            swatch.classList.remove('active');
            //swatch.setAttribute('aria-pressed', 'false');
          }
        });

        // Update Pill and show it
        if (filterSelectedContainer && filterNameSpan) {
          filterNameSpan.textContent = selectedValue;
          filterSelectedContainer.setAttribute('aria-label', `Selected filter: ${selectedValue}`);
          
          // Update the remove button aria-label
          

          filterSelectedContainer.classList.remove('hide');
        }
      });
       mobileSelectBox.dataset.listenerAdded = "true";
    }

    // Handle the remove filter button click
    // removeFiltersBtns.forEach(function (btn) {
    //   btn.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     clearQualitySelection();
    //   });
    // });
  });
});
//  function clearQualitySelection() {
//       // Clear select box
//        var mobileSelectBox = document.getElementById('important-select-mobile');
//       mobileSelectBox.value = '';
//       mobileSelectBox.dispatchEvent(new Event('change', { bubbles: true }));

//       // Clear all swatches
//       qualitySwatches.forEach(function (s) {
//         s.classList.remove('active');
//         //s.setAttribute('aria-pressed', 'false');
//       });

//       // Optionally hide the selected pill
//       if (filterSelectedContainer) {
//         filterSelectedContainer.classList.add('hide');
//         filterSelectedContainer.style.display = ''; // Clear inline styles just in case
//       }
//     }
  document.querySelectorAll(".js-tolcontent").forEach(container => {
    const image = container.querySelector("img");
    const text = container.querySelector("p");
    const buttons = container.querySelectorAll(".swatches-tab");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // remove active
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // update from HTML data
            image.src = button.dataset.img;
            text.textContent = button.dataset.text;
        });
    });
});

function resetolltiptSwatchContainer(container) {


    if (!container) return;

    const image = container.querySelector("img");
    const text = container.querySelector("p");
    const buttons = container.querySelectorAll(".swatches-tab");
    const resetData = container.querySelector(".reset-content");

    if (resetData) {
        const defaultImg = resetData.dataset.img;
        const defaultText = resetData.dataset.text;

        // 1. Restore Image and Text
        if (image) image.src = defaultImg;
        if (text) text.textContent = defaultText;

        // 2. Reset Active Swatch
        buttons.forEach(btn => {
            // Remove active from everyone
            btn.classList.remove("active");
            
            // Add active only to the button that matches the default image
            if (btn.dataset.img === defaultImg) {
                btn.classList.add("active");
            }
        });
    }
}