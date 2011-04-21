/*
 * jQuery GeoNames Input Plugin
 * http://www.davidcornu.com/
 *
 * Written by David Cornu.
 */

(function($) { 
	$.fn.geoname = function(locale){
		if (typeof locale == "undefined") {locale = "en";}

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
			}
		});
		
		return this;
	}
})(jQuery);