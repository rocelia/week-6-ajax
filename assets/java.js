

$('document').ready(function () {

    var shows = ["How I Met Your Mother", "Fixer Upper", "This Is Us", "It's Always Sunny in Philadelphia", "Modern Family", "Big Mouth", "Game of Thrones", "Breaking Bad", "Dexter"];

    renderButtons();
    newButton();

    $(document).on('click', '.tvShows', displayGifs);
    $(document).on('click', '.tvGifs', function () {


        console.log("we gucci");

        var state = $(this).attr("data-state");

        // pause and start gifs
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        } else {

            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });

    $(document).on('click', '.tvShows', displayGifs);

    function renderButtons() {

        $('#tvShowButtons').empty();

        for (var i = 0; i < shows.length; i++) {

            var button = $('<button>');

            button.addClass("tvShows");
            button.attr("data-name", shows[i]);
            button.text(shows[i]);
            $('#tvShowButtons').append(button);
        }
    }

    // create new show buttons
    function newButton() {
        $('#addShow').on('click', function (event) {

            event.preventDefault();

            var show = $('#show-input').val().trim();


            shows.push(show);
            renderButtons();

        });
    }

    function displayGifs() {
        $("button").on("click", function () {
            var show = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                show + "&api_key=SwsNwECurBnUjNV8WfJI7nwVs1Hs1XjN&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            })

                .done(function (response) {
                    $('#shows').empty();
                    var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        console.log(response);
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var tvGifs = $("<img>");

                        tvGifs.attr('src', results[i].images.fixed_height_still.url);
                        tvGifs.attr('data-still', results[i].images.fixed_height_still.url);
                        tvGifs.attr('data-animate', results[i].images.fixed_height.url);
                        tvGifs.attr('data-state', 'still');
                        tvGifs.addClass('tvGifs');
                        tvGifs.append(p);
                        $("#shows").append(tvGifs);
                    }

                });

        })
    }


});

