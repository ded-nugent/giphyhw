$(document).ready(function() {
var topics = ["Borzoi", "Bichon", "Poodle", "Golden Retriever", "Dachshund", "Pomeranian"];
function addSearchBtns() {
  $("#buttons").html("");
  for (i = 0; i < topics.length; i++) {
    let $button = $("<input type='button' class='btn btn-warning search-btn' />");
    $button.val(topics[i]);
    $("#buttons").append($button);
  }
}
addSearchBtns();



$(document).on("click", ".btn", function() {
  $("#results").html("");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  var query;
  var params = {
    q: query,
    limit: 10,
    api_key: "aFFKTuSMjd6j0wwjpFCPXZipQbcnw3vB",
    fmt: "json"
  };
  if ($(this).hasClass("search-btn")) {
    query = $(this).val();
  } else if ($("#search").val() !== "") {
    query = $("#search").val();
    topics.push(query);
    
    addSearchBtns();
  }
  params.q = query;

  
  $.ajax({
    url: queryURL + $.param(params),
    method: "GET",
    success: function(r) {
      for (i = 0; i < params.limit; i++) {
        var $img = $("<img>");
        var $div = $("<div>");
        var $rating = $("<h2>");
        var gifData = r.data[i];
        var gif = gifData.images;

       
        $img.attr({
          
          src: gif.fixed_height_still.url,
          "data-animate": gif.fixed_height.url,
          "data-still": gif.fixed_height_still.url,
          "data-state": "still",
          class: "gif"
        });
       
        $div.addClass("gif-box");
        $rating.text("Rating: " + gifData.rating);
        $div.append($img, $rating);
        $("#results").append($div);
      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    }
  });
});
});