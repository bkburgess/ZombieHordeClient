
var main = function () {
    "use strict";
    getSwamp();
    test_api();
}
var test_api = function() {
    $("#api-test").on("click", function() {
        console.log('clicked api test button')
        $.get({
            url: 'http://localhost:5000/test_api_connection',
            dataType: 'text',
            success: function(response) {
                console.log(response)
                window.alert(response);
            },
            error: function(xhr, status, error) {
                console.error('Error: ' + status + '-' + error)
            }
        });
    });
}
var getSwamp = function () {
    "use strict";

    var url = "https://api.scryfall.com/cards/named?exact=swamp"; // search for swamp by exact name
    /*
    Example URLs for search
    "https://api.scryfall.com/cards/named?exact=swamp"; // search for swamp by exact name
    "https://data.scryfall.io/oracle-cards/oracle-cards-20230328210307.json" //download all oracle cards
    "https://api.scryfall.com/bulk-data/27bf3214-1271-490b-bdfe-c0be6c23d02e"
    "https://api.scryfall.com/cards/search?q=name:swamp%20t:basic" // search for swamp w/ regex
    */
    $.getJSON(url, function(response) {
        var $img = $("<img>");
        $img.attr("src", response.image_uris.normal);
        $("main .content").append($img);
    });
}
$(document).ready(main);