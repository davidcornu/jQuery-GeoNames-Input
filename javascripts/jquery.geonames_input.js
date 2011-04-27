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
        var search_url = "http://ws.geonames.org/searchJSON?";
        var params = {
					maxRows: 5,
					lang: locale,
					featureClass: "P",
					name: encodeURIComponent(request.term)
				}	
        var results = new Array 
        $.ajax({
					url: search_url + $.param(params),
					method: "GET",
					dataType: "jsonp",
					success: function(data){
	          $.each(data.geonames, function(index, obj){
	            if(obj.adminName1.length == 0){
	              var result = obj.toponymName + ", " + obj.countryName
	            } else {
	              var result = obj.toponymName + ", " + obj.adminName1 + ", " + obj.countryName
	            }
	            results.push(result)
	          });
	          response(results);
	        },
					error: function(){
						response("");
					}
				});
      }
    });

    return this;
  }
})(jQuery);