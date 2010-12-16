/*
 * jQuery GeoNames Input Plugin
 * http://www.davidcornu.com/
 *
 * Written by David Cornu.
 */


//Fetch Information from GeoNames.org 
function GetGeoNames(id, locale){
	input = $("#" + id);
	list = $("#" + id + "_suggestion_list");
	base_url = "http://ws.geonames.org/searchJSON?";
	limit_param = "maxRows=5";
	locale_param = "lang=" + locale;
	type_param = "featureClass=A"
	search_param = "name=" + input.val();
	final_url = base_url + "&" + limit_param + "&" + locale_param + "&" + type_param + "&" + search_param;
	if (input.val()){
		input.addClass("loading");
		$.getJSON(final_url, function(data){
			input.removeClass("loading");
			list.empty();
			$.each(data.geonames, function(index, obj){
				list.append("<li>" + obj.toponymName + ", " + obj.adminName1 + ", " + obj.countryName + "</li>");
			});
			list.slideDown('fast');
		});
	}
}

//Handle clicks for suggestions
$("ul.geonames_input_suggestion_list li").live("click", function(){
	$(this).parent().parent().find("input.geonames_input").val($(this).text());
	$(this).parent().slideUp();
});

//jQuery Plugin + Timeout for Typing
(function($) { 
	$.fn.geoname = function(delay, locale){
		var self = this;
		$(this).wrap("<div class='geonames_input_holder'/>").addClass("geonames_input");
		$(this).parent().append("<ul id='" + $(this).attr("id") + "_suggestion_list' class='geonames_input_suggestion_list'></ul>");
		$("ul#" + $(this)	.attr("id") + "_suggestion_list")
											.css("width", $(this).width())
											.css("top", $(this).height());
		$(this).keyup(function(){
			clearTimeout(self.typing);
			$("#" + self.attr("id") + "_suggestion_list").slideUp('fast');
			self.typing = setTimeout(function(){ GetGeoNames(self.attr("id"), locale) }, delay);
		});
		return this;
	}
})(jQuery);