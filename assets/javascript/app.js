$(document).ready(function () {

    function Quiz(question, choices, correct) {
        this.question = question;
        this.choices = choices;
        this.correct = correct;
    }

    var all = [
        new Quiz("A typical life span for a scarlet macaw is:", ["10 years", "20 years", "40 years", "50+ years"], 3),
        new Quiz("A bald eagle has a wingspan of 7 ft and weighs:", ["10lbs", "15lbs", "20lbs"], 0),
        new Quiz("The penguin is the only bird that has fur.", ["True", "False"], 1),
        new Quiz("A peregrine falcon can reach flight speeds of:", ["50mph", "25mph", "100mph", "200mph"], 3),
        new Quiz("Poisonous birds exist", ["True", "False'"], 0),
        new Quiz("Which one is an example of a bird that cannot fly?", ["turkey vulture", "pileated woodpecker", "Rhea"], 2),
        new Quiz("Feathers do not regrow", ["True", "False"], 1),
        new Quiz("The color of a chicken's egg can be predicted by the color of its:", ["feet", "earlobe", "feathers"], 1),
        new Quiz("The only bird that can fly backwards is the:", ["chicken", "falcon", "hummingbird"], 2),
        new Quiz("An owl can rotate its head", ["100 degrees", "270 degrees", "360 degrees"], 2)

    ];

    var currentQ = 0;
    var correctA = 0;
    var timeLeft = 30;


    function renderQuiz() {
        $('#question').html(parseInt(currentQ) + 1 + ". " + all[currentQ].question);
        var opts = all[currentQ].choices;
        var form = '';
        for (var i = 0; i < opts.length; i++) {
            form += '<div><input type="radio" name="option" value="' + i + '" class="options"><label for="option' + i + '">' + opts[i] + '</label></div><br>';
        }
        $('#form').html(form);
       timeLeft = 30;
        timer();
    }

    function check() {
        if ($("input[name=option]:checked").val() == all[currentQ].correct) {
            correctA++;
        }
    };
// 
    // var timerId = setTimeout(timer, 1000);
    function timer() {
        console.log("timer");
        var timerId = setInterval(timer, 1000);
        var first = true
        $("#next").click(function() {
            if (first == true)
            clearTimeout(timerId);
        });

        if (timeLeft == 0 && (currentQ == all.length - 1)) {
            check();
            currentQ++;
            $jumbotron.hide();
            $result.html("You correctly answered " + correctA + " out of " + currentQ + " questions").hide();
            $result.fadeIn(1500);
        }
            
        
        if (timeLeft == 0) {
            clearTimeout(timerId);
            // timeLeft = 30;
            check();
            currentQ++;
            renderQuiz();
        }

              
        else {
            clearTimeout(timerId);
            var timerId = setTimeout(timer, 1000);
            $("#timeR").html("Time Remaining: " + timeLeft + " seconds");

            timeLeft--;
        }
    };


    var $jumbotron = $(".jumbotron");
    var $next = $("#next");
    var $result = $("#result");
    var $start = $("#start");
    // var timerId = setInterval(timer, 1000);

    $jumbotron.hide();
    $start.click(function () {
        $jumbotron.show();
        $(this).hide();   
        $("#birdstart").hide();   
        renderQuiz();
        

    });

    

    $next.click(function () {
        // event.preventDefault();
        check();
        currentQ++;
        if (currentQ < all.length) {
            renderQuiz();
            // clearTimeout(timerId);
            // timeLeft = 30;}
        }



            if (currentQ == all.length - 1) {
                $next.html("Submit");
                $next.click(function () {
                    $jumbotron.hide();
                    $result.html("You correctly answered " + correctA + " out of " + currentQ + " questions").hide();
                    $result.fadeIn(1500);
                });
        

        };
    });
});






