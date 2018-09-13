
$(document).ready(function () {

    //The number that keeps on incrementing with every click
    var incrementingNumber = 0;

    //Random number
    var randomNum = randomNumGen();

    // Start variables
    var wins = 0;
    var losses = 0;
    var crystals;
    
    //Function that returns the crystals object
    function randomNumCrystals() {
        return {
            red: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/red.png"
            },
            blue: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/blue.png"
            },
            yellow: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/yellow.png"
            },
            green: {
                points: Math.floor(Math.random() * 12) + 1,
                imageUrl: "assets/images/green.png"
            }
        };
    }

    //Function to create a random number between 19 and 120
    function randomNumGen() {
        return Math.floor(Math.random() * 102) + 19;
    }

    //Function that resets the game
    function reset() {
        incrementingNumber = 0;
        crystals = randomNumCrystals();
        randomNum = randomNumGen();
        $("#random-place").text(randomNum);
    }

    //Function that handles
    function refreshDOM(UserWin) {
        $("#win-place").empty();

        // If the user won...
        if (UserWin === true) {
            // Show victory message, restart the game, and display the new "current guess" number.
            $("#win-place").append($("<p>").text("You won!!"));
            reset();
            displayIncrementingNumber();
        }
        // If the user lost...
        else if (UserWin === false) {
            // Show defeat message, restart the game, and display the new "current guess" number.
            $("#win-place").append($("<p>").text("You lost!!"));
            reset();
            displayIncrementingNumber();
        }

        // Building our win/loss display and appending it to the page.
        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);

        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");

        pWins.append(wSpan);
        pLosses.append(lSpan);

        $("#win-place").append(pWins);
        $("#win-place").append(pLosses);
    }

    // Function to display crystals
    function displayCrystals() {
        for (var key in crystals) {
            var crystalDiv = $("<div class='crystals-button' data-name='" + key + "'>");
            var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#crystal-place").append(crystalDiv);
        }
    }

    function updateIncrementingNumber(crystal) {
        incrementingNumber += crystals[crystal.attr("data-name")].points;
    }

    function displayIncrementingNumber() {
        var scoreNumDiv = $("<div id='score-number'>").text(incrementingNumber);
        $("#score-place").html();
        $("#score-place").html(scoreNumDiv);
    }

    reset();
    refreshDOM();
    displayCrystals();
    displayIncrementingNumber();

    // on.click event
    $(".crystals-button").on("click", function (event) {
        // Increment our number and display it
        updateIncrementingNumber($(this));
        displayIncrementingNumber();

        if (incrementingNumber === randomNum) {
            // Increment wins, restart the game, and update the page.
            wins++;
            reset();
            refreshDOM(true);
        }
        // If our guess number exceeded our target number...
        else if (incrementingNumber > randomNum) {
            // Increment losses, restart the game, and update the page.
            losses++;
            reset();
            refreshDOM(false);
        }
    });
});
