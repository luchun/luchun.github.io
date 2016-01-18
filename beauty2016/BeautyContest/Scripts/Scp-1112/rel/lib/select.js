(function($,undefined){$.selectator=function(element,options){var defaults={requesttime:0,prefix:"selectator",placeholder:"请选择你所在的省/市"};var plugin=this;plugin.settings={};var $source_element=$(element);var $source_prov_element=$source_element.siblings(".selectProv");var $source_city_element=$source_element.siblings(".selectCity");var $source_dist_element=$source_element.siblings(".selectDist");var $source_prov=$source_prov_element.data("val");var $source_city=$source_city_element.data("val");var $source_dist=$source_dist_element.data("val");var $box_element=null;var $textlength_element=null;var $chosenitems_element=null;var $input_element=null;var $tab_element=null;var $prov_tab_element=null;var $city_tab_element=null;var $dist_tab_element=null;var $optionsbox_element=null;var $prov_element=null;var $city_element=null;var $dist_element=null;var $caret=null;var $temp_element=null;var city_json=null;var dist_json=null;var province_json=null;plugin.settings=$.extend({},defaults,options);if($source_prov)plugin.settings.placeholder=$source_prov+$source_city+$source_dist;plugin.init=function(){getDefaultValue();$box_element=$(document.createElement("div"));if($source_element.attr("id")!==undefined){$box_element.attr("id",$source_element.attr("id")+plugin.settings.prefix);}
$box_element.addClass(plugin.settings.prefix+" multiple "+" options-hidden");$box_element.css({width:$source_element.css("width"),minHeight:$source_element.css("height"),clear:"both",position:"relative"});$source_element.after($box_element);$source_element.hide();$textlength_element=$(document.createElement("span"));$textlength_element.addClass(plugin.settings.prefix+'textlength');$textlength_element.css({position:'absolute',visibility:'hidden'});$box_element.append($textlength_element);$chosenitems_element=$(document.createElement('div'));$chosenitems_element.addClass(plugin.settings.prefix+'chosen_items');$chosenitems_element.css({height:$source_element.css("height"),lineHeight:$source_element.css("height"),"overflow":"hidden","text-overflow":"hidden"});if(layoutViewModel.CityName()!=undefined&&layoutViewModel.CityName().length>0){$chosenitems_element.text(layoutViewModel.ProvinceName()+layoutViewModel.CityName()+layoutViewModel.CountyName());}else{$chosenitems_element.text(plugin.settings.placeholder);}
$box_element.append($chosenitems_element);$caret=$(document.createElement('span'));$caret.addClass("caret");$box_element.append($caret);$caret.css({position:"absolute",right:"8px",top:"14px"})
$input_element=$(document.createElement('input'));$input_element.addClass(plugin.settings.prefix+'input');$input_element.attr('readonly',true);$input_element.css({'width':'0px','height':'0px','overflow':'hidden','border':0,'padding':0,'position':'absolute'});$input_element.attr('autocomplete','false');$box_element.append($input_element);$tab_element=$(document.createElement("div"));$tab_element.addClass(plugin.settings.prefix+'tabs');for(i=0;i<3;i++){$temp_element=$(document.createElement("a"));$tab_element.append($temp_element);}
$box_element.append($tab_element);$prov_tab_element=$tab_element.find("a:eq(0)");$city_tab_element=$tab_element.find("a:eq(1)");$dist_tab_element=$tab_element.find("a:eq(2)");$prov_tab_element.text("省份");$city_tab_element.text("城市");$dist_tab_element.text("区县");$optionsbox_element=$(document.createElement("div"));$optionsbox_element.addClass(plugin.settings.prefix+'optionbox');for(i=0;i<3;i++){$temp_element=$(document.createElement("ul"));$temp_element.addClass(plugin.settings.prefix+'options');$optionsbox_element.append($temp_element);}
$box_element.append($optionsbox_element);$prov_element=$optionsbox_element.find("ul:eq(0)");$city_element=$optionsbox_element.find("ul:eq(1)");$dist_element=$optionsbox_element.find("ul:eq(2)");provStart();$box_element.bind("click",function(e){e.preventDefault();e.stopPropagation();$(".div_address").hide();$(".selectatorchosen_items").removeClass("p_error");$box_element.hasClass("options-hidden")?showOptions():hideOptions();$prov_tab_element.trigger("click");});$input_element.bind('blur',function(e){e.preventDefault();e.stopPropagation();selectOption();hideOptions();});$prov_tab_element.bind("click",function(e){e.preventDefault();e.stopPropagation();$(this).addClass("active").siblings().removeClass("active");$prov_element.addClass("active");$city_element.removeClass("active");$dist_element.removeClass("active");});$city_tab_element.bind("click",function(e){e.preventDefault();e.stopPropagation();if($city_element.find("li").length>0){$(this).addClass("active").siblings().removeClass("active");$prov_element.removeClass("active");$city_element.addClass("active");$dist_element.removeClass("active");}});$dist_tab_element.bind("click",function(e){e.preventDefault();e.stopPropagation();if($dist_element.find("li").length>0){$(this).addClass("active").siblings().removeClass("active");$prov_element.removeClass("active");$city_element.removeClass("active");$dist_element.addClass("active");}});};var getDefaultValue=function(){if($source_prov_element.length==0){$source_prov_element=$("<input type='hidden' name='province' class='selectProv'>");$source_element.before($source_prov_element)}
if($source_city_element.length==0){$source_city_element=$("<input type='hidden' name='city' class='selectCity'>");$source_element.before($source_city_element)}
if($source_dist_element.length==0){$source_dist_element=$("<input type='hidden' name='district' class='selectDist'>");$source_element.before($source_dist_element)}};var provStart=function(){var provval=$source_prov_element.val();$.each(province_json,function(i,p){var $option=$(document.createElement('li'));$option.data('index',p.ProvinceID);if(provval&&parseFloat(p.ProvinceID)==provval){$option.addClass("active");}
$option.attr("value",p.ProvinceID);$option.text(p.Name);$option.bind("click",function(e){e.preventDefault();e.stopPropagation();$(this).addClass("active").siblings().removeClass("active");layoutViewModel.ProvinceId(p.ProvinceID);layoutViewModel.ProvinceName(p.Name);layoutViewModel.CityId(0);layoutViewModel.CountyId(0);cityStart(p.ProvinceID);$(".selectatorchosen_items").html("请选择您所在的省/市");});$prov_element.append($option);});};var cityStart=function(provSelectedIndex){var prov_id=provSelectedIndex;var cityval=$source_city_element.val();$city_element.empty();$dist_element.empty();common.getCity(prov_id,function(re){city_json=re;if(city_json){$.each(city_json,function(i,city){var $option=$(document.createElement('li'));$option.data('index',city.CityID);$option.attr("value",city.CityID);if(cityval&&parseFloat(city.CityID)==cityval&&city.Name==$source_city){$option.addClass("active");}
$option.text(city.Name);$option.bind("click",function(e){e.preventDefault();e.stopPropagation();$(this).addClass("active").siblings().removeClass("active");distStart(city.CityID);layoutViewModel.CityId(city.CityID);layoutViewModel.CityName(city.Name);layoutViewModel.CountyId(0);$(".selectatorchosen_items").html("请选择您所在的省/市");});$city_element.append($option);});$city_tab_element.trigger("click");}else{$input_element.blur();}});};var distStart=function(citySelectedIndex){var city_id=citySelectedIndex;var distval=$source_dist_element.val();$dist_element.empty();common.getCounty(citySelectedIndex,function(re){dist_json=re;if(dist_json){$.each(dist_json,function(i,dist){var $option=$(document.createElement('li'));$option.data('index',dist.CountyID);$option.attr("value",dist.CountyID);if(distval&&parseFloat(dist.CountyID)==distval&&dist.Name==$source_dist){$option.addClass("active");}
$option.text(dist.Name);$option.bind("click",function(e){e.preventDefault();e.stopPropagation();layoutViewModel.CountyId(dist.CountyID);layoutViewModel.CountyName(dist.Name);$(this).addClass("active").siblings().removeClass("active");$input_element.blur();});$dist_element.append($option);});$dist_tab_element.trigger("click");}else{$input_element.blur();}});};var selectOption=function(){var prov_selected=$prov_element.find(".active");var city_selected=$city_element.find(".active");var dist_selected=$dist_element.find(".active");if(!prov_selected.length||!city_selected.length||!dist_selected.length){return false;}
$source_prov_element.val(prov_selected.val());$source_prov_element.data("val",prov_selected.html());$source_city_element.val(city_selected.val());$source_city_element.data("val",city_selected.html());$source_dist_element.val(dist_selected.val());$source_dist_element.data("val",dist_selected.html());var selected=prov_selected.html()+city_selected.html()+dist_selected.html();$chosenitems_element.text(selected);};var showOptions=function(){$box_element.removeClass('options-hidden').addClass('options-visible');setTimeout(function(){$optionsbox_element.css('top',($box_element.outerHeight()*2+1));},1);};var hideOptions=function(){$box_element.removeClass('options-visible').addClass('options-hidden');};plugin.destroy=function(){$box_element.remove();$.removeData(element,'selectator');$source_element.show();};common.getProvince(function(re){province_json=re;plugin.init();})};$.fn.selectator=function(options){options=options!==undefined?options:{};return this.each(function(){if(typeof(options)==='object'){if(undefined===$(this).data('selectator')){var plugin=new $.selectator(this,options);$(this).data('selectator',plugin);}}else if($(this).data('selectator')[options]){$(this).data('selectator')[options].apply(this,Array.prototype.slice.call(arguments,1));}else{$.error('Method '+options+' does not exist in $.selectator');}});};})(jQuery);