var main = function () {
    "use strict";
    loadPremadeDeck();
    loadHorde();
}
var loadPremadeDeck = function() {
    $("#play-premade").on("click", function() {
        var deck = $("input[name=deck]:checked").val();
        console.log("getting " + deck);
        $.ajax({
            url: 'http://localhost:5000/deck_select/get_premade/' + deck,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
              // Handle the received data
              console.log(data);
            },
            error: function(xhr, status, error) {
              // Handle any errors
              console.error('Error: ' + status + ' - ' + error);
            }
        });
    });
}
var loadCustomDeck = function() {
    $("#play-custom").on("click", function() {
        var deckText = document.getElementById("decklist").value;
        // call python apis: parse decklist, upload decklist, get tokens
        $.ajax({
            url: '',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
              // Handle the received data
              console.log(data);
            },
            error: function(xhr, status, error) {
              // Handle any errors
              console.error('Error: ' + status + ' - ' + error);
            }
        });
    });
}
var loadHorde = function() {
    $("#play-premade").on("click", function() {
        console.log("getting horde deck");
        $.ajax({
            url: 'https://localhost:5000/horde_commands/initialize_horde',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
              // Handle the received data
              console.log(data);
            },
            error: function(xhr, status, error) {
              // Handle any errors
              console.error('Error: ' + status + ' - ' + error);
            }
        });
    });
}
var uploadJS = function() {
    $("#play-custom").on("click", function() {
        //alert(document.getElementById("decklist").value);
        var deckText = document.getElementById("decklist").value;
        var decklist = deckText.split("\n");
        console.log(decklist);

        // Parse the entered text into quantity and card name.
        var num, cardName;
        var numArray = [], cardNameArray = [];
        decklist.forEach(function (entry) {
            num = entry.split(' ', 1);
            // TODO allow formatting as 1x Storm Crow
            var lengthOfNum = num.length;
            num = Number(num);
            cardName = entry.substr(lengthOfNum + 1);
            numArray.push(num);
            cardNameArray.push(cardName);
        });

        // Get the card objects from the names in appropriate number
        $.getJSON("../../server/data/oracle-cards.json", function (allCards) {
            var deck = [];
            cardNameArray.forEach(function (cardNameDeck) {
                console.log("looking for ", cardNameDeck);
                //console.log("cardnamedeck ", typeof(cardNameDeck));
                console.log("cardNameAll ", allCards[0].name);
                allCards.find(function(cardObject) {
                    //console.log("checking ", cardNameAll);
                    //return cardNameDeck === cardObject.name;
                    if (cardNameDeck === cardObject.Name) {
                        console.log(cardnameDeck, " found!");
                        //deck.push(cardObject);
                        return true;
                    }
                    return false;
                });
            });
            console.log("all cards searched");
        });
    });
    //[x] search database
    //[o] build deck out of input
    //[ ] store deck in quickplay?
    //[ ] load play page
    //[ ] send data to play page
}
$(document).ready(main);