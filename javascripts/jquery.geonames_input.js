/*
 * jQuery GeoNames Input Plugin
 * http://www.davidcornu.com/
 *
 * Written by David Cornu.
 */

(function($) { 
	$.fn.geoname = function(locale){
		if (typeof locale == "undefined") {locale = "en";}
		$(this).addClass("ui-geoname-input").wrap("<div class='ui-geoname-holder' />");
		$(this).parent().prepend("<div class='ui-geoname-value'></div>");
		
		// Initial Value
		if($(this).val().length == 0){
			$(this).val(geoip_city() + ", " + geoip_region_name() + ", " + geoip_country_name());
			if($(this).val().length > 0){
      	$(this).hide();
        $(this).parent().find(".ui-geoname-value").html($(this).val());
			}
  	}
  		
  		// Allow editing
  		$(this).parent().find(".ui-geoname-value").click(function(){
      	$(this).hide()
      	$(this).parent().find(".ui-geoname-input").show().select();
  		});
  		
  		// Return on blur
  		$(this).blur(function(){
				if($(this).val().length > 0){
      		$(this).val( $(this).parent().find(".ui-geoname-value").html() ).hide();
        	$(this).parent().find(".ui-geoname-value").show();
  			}
			});
		
		// Autocompletion
		$(this).autocomplete({
			delay: 1000,
			source: function(request, response){
				base_url = "http://ws.geonames.org/searchJSON?";
				limit_param = "maxRows=5";
				locale_param = "lang=" + locale;
				type_param = "featureClass=P"
				search_param = "name=" + encodeURIComponent(request.term);
				final_url = base_url + "&" + limit_param + "&" + locale_param + "&" + type_param + "&" + search_param;
				var results = new Array	
				$.getJSON(final_url, function(data){
					$.each(data.geonames, function(index, obj){
						if(obj.adminName1.length == 0){
							result = obj.toponymName + ", " + obj.countryName
						} else {
							result = obj.toponymName + ", " + obj.adminName1 + ", " + obj.countryName
						}
						results.push(result)
					});
					response(results);
				}).error(function(){ response("") });
			},
      select: function(event, ui){
      	$(this).parent().find(".ui-geoname-value").html(ui.item.value).show();
        $(this).hide();
      }
		});
		
		return this;
	}
})(jQuery);