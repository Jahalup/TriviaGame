$(document).ready(function () {

    function Quiz(question, choices, correct) {
        this.question = question;
        this.choices = choices;
        this.correct = correct;
    }

    var all = [
        new Quiz("Which bird is red?", ["Cardinal", "American Robin", "Blue Jay"], 0),
        new Quiz("Which bird is blue?", ["American Robin", "Blue Jay", "Catbird"], 1),
        new Quiz("Which bird is orange?", ["Goldfinch", "Blue Jay", "Oriole"], 2)
    ];

    var currentQ = 0;
    var correctA = 0;
    var timeLeft = 30;


    function renderQuiz() {
        $('#question').html(parseInt(currentQ) + 1 + "." + all[currentQ].question);
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






