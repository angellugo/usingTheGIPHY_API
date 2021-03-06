var topics = [
    "Black holes", "Transhumanism", "Technological Singularity", "Politics", "The Matrix",
    "Space", "commodore 64"
];

$(document).ready(function () {
    const host = 'https://api.giphy.com';
    const searchPath = '/v1/gifs/search?'
    const apiKey = '87oAV91AlzohWGhVr4kMeAmaa0udmx77';
    const limit = 10;

    renderButtons();

    $('.navbar-nav').on('click', '.topic-item', function () {
        var topic = $(this).attr('data-topic');
        var queryURL = host + searchPath + 'q=' + topic + '&limit=' + limit + '&api_key=' + apiKey;
        console.log('queryURL', queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log('response', response);

            $('#topics').empty();

            response.data.forEach(element => {
                var figure = $("<figure>");
                figure.addClass("gif");
                figure.attr("id", element.id);
                $('#topics').append(figure);
                var figcaption = $("<figcaption>").text("Rating: " + element.rating);
                var gifUrl = element.images.fixed_height.url;
                var imageUrl = element.images.fixed_height_still.url;
                var image = $("<img>");
                image.addClass("gif");
                image.attr("src", imageUrl);
                image.attr("data-still", imageUrl);
                image.attr("data-animate", gifUrl);
                image.attr("data-state", "still");
                image.attr("alt", topic + ' image');
                $('#'+element.id).append(figcaption);
                $('#'+element.id).append(image);
            });// end response.data.forEach(element => {

            $(".gif").on("click", function () {
                console.log("gif clicked");
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                } //end else
            });// end $(".gif").on("click", function () {
        });// end .then(function(response) {
    });// end buttons.on('click', '.topic-item', function(){

    $(".btn").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        renderButtons();
    });// end $(".btn").on("click", function (event) {
});// end $(document).ready(function() {

function renderButtons() {
    $(".navbar-nav").empty();
    for (let index = 0; index < topics.length; index++) {
        var li = $('<li>');
        li.addClass('nav-item');
        var a = $('<a>');
        a.addClass('nav-link');
        a.addClass('topic-item');
        a.attr('data-topic', topics[index]);
        a.text(topics[index]);
        $('.navbar-nav').append(a);
    }// end for (let index = 0; index < topics.length; index++){
}// end function renderButtons() {
