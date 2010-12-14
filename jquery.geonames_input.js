/*
 * jQuery GeoNames Input Plugin
 * http://www.davidcornu.com/
 *
 * Written by David Cornu.
 */


function GetGeoNames(id, locale){
	input = $("#" + id);
	list = $("#" + id + "_suggestion_list");
	base_url = "http://ws.geonames.org/searchJSON?"
	limit_param = "maxRows=5"
	locale_param = "lang=" + locale;
	search_param = "name=" + input.val();
	final_url = base_url + "&" + limit_param + "&" + locale_param + "&" + search_param;
	if (input.val()){
		$.getJSON(final_url, function(data){
			$.each(data.geonames, function(index, obj){
				list.append("<li>" + obj.toponymName + ", " + obj.adminName1 + ", " + obj.countryName + "</li>");
			});
		});
	}
}


(function($) { 
	$.fn.geoname = function(delay, locale){
		var self = this;
		$("body").append("<ul id='" + self.attr("id") + "_suggestion_list'></ul>");
		$(this).keyup(function(){
			clearTimeout(self.typing);
			$("#" + self.attr("id") + "_suggestion_list").empty();
			self.typing = setTimeout(function(){ GetGeoNames(self.attr("id"), locale) }, delay);
		});
		return this;
	}
})(jQuery);