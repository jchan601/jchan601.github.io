// Use node-fetch?

var currentMode = null,
    time = null,
    clock = 0,
    pointsAdd = 0,
    wager = 0,
    teamEdit = false,
    timerStarted = false,
    usedQs = [],
    teams = [],
    finalWagers = [],
    jeopardy = {},
    alphabet = "abcdefghijklmnopqrstuvwxyz",
    colors = ["#00FFFF", "#00FF00", "#FF00FF", "#ADD8E6", "#C0C0C0", "#95B9C7", "#6698FF", "#CDFFFF", "#ADDFFF", "#7FFFD4", "#52D017", "#99C68E", "#7FE817", "#5EFB6E", "#8AFB17", "#CCFB5D", "#B1FB17", "#FFFF00", "#FFF380", "#FFE87C", "#EDDA74", "#F5F5DC", "#FFDB58", "#FFD801", "#FDD017", "#E9AB17", "#FFA62F", "#FFCBA4", "#E8A317", "#D4A017", "#FFA500", "#F87217", "#FF8040", "#F9966B", "#FF7F50", "#FF0000", "#E77471", "#E8ADAA", "#FCDFFF", "#FAAFBE", "#F778A1", "#F660AB", "#F52887", "#F433FF", "#A74AC7", "#8E35EF", "#8467D7", "#C45AEC", "#E238EC", "#E9CFEC", "#E3E4FA", "#FEFCFF", "#FFFFFF"],
    defaultJeopardy = {"timer":20,"categories":[{"name":"FILL IN THE BLANK CANVAS","questions":[{"value":200,"question":"Van Gogh's \"Self-Portrait with Pipe and Bandaged ____\"","answer":"Ear"},{"value":400,"question":"Jonathan Buttall is thought to be Gainsborough's model for \"The ____ Boy\"","answer":"Blue"},{"value":600,"question":"Seurat got to the point in \"A ____ Afternoon on the Island of La Grande Jatte\"","answer":"Sunday"},{"value":800,"question":"Duchamp caused a scandal with his \"Nude Descending a ____, No. 2\"","answer":"Staircase"},{"value":1000,"question":"Dali gave it a name that stuck: \"The Persistence of ____\"","answer":"Memory"}]},{"name":"MOVIE CAMEOS","questions":[{"value":200,"question":"Dan Patrick's good friend Adam Sandler has cast Patrick in 9 of his films, including \"Grown Ups 2\" in which Patrick played a gym teacher dressed as this 1980s Celtics legend","answer":"Larry Bird"},{"value":400,"question":"In \"Twilight\" this author has a cameo as a customer in a diner with a veggie plate","answer":"Stephenie Meyer"},{"value":600,"question":"Well, Al Michaels didn't win an Oscar playing myself in this 1996 movie but Cuba Gooding Jr. did for his performance as a wide receiver for the Cardinals","answer":"<i>Jerry Maguire</i>"},{"value":800,"question":"Julia Roberts played this title crusader in a 2000 film while the real woman had a cameo as a waitress","answer":"Erin Brockovich"},{"value":1000,"question":"From \"Rebecca\" on, this director appeared in all of his films; he sat next to Cary Grant on a bus in \"To Catch a Thief\"","answer":"Alfred Hitchcock"}]},{"name":"ANAGRAMMED FORMER WORLD LEADERS","questions":[{"value":200,"question":"A sari wearer:<br/>HI, GRAND INDIA!","answer":"Indira Gandhi"},{"value":400,"question":"In Italy:<br/>VIRILE SLOB COUSIN","answer":"Silvio Berlusconi"},{"value":600,"question":"Uh oh! Panama!:<br/>GENUINE AMORAL","answer":"Manuel Noriega"},{"value":800,"question":"He Laboured over Britain:<br/>BRAINY LOT","answer":"Tony Blair"},{"value":1000,"question":"Late Israeli leader:<br/>SOLAR HERNIA","answer":"Ariel Sharon"}]},{"name":"NUT-TRITION","questions":[{"value":200,"question":"Almonds are an excellent source of fiber & this bone-building element--got milk?","answer":"Calcium"},{"value":400,"question":"These biggies from the Amazon basin have many health benefits, but with their high selenium content, too many can be harmful","answer":"Brazil Nuts"},{"value":600,"question":"A key ingredient in pesto, these nuts are an excellent source of vitamin E","answer":"Pine Nuts"},{"value":800,"question":"Pistachios get their green color mostly from lutein, which is essential to this one of the 5 senses","answer":"Vision"},{"value":1000,"question":"Have some hazelnuts before bed; they're high in this sleep-aiding amino acid that's also found in turkey","answer":"Tryptophan"}]},{"name":"CEREMONIES","questions":[{"value":200,"question":"This Christian sacrament, a holy ceremony, is also called Eucharist","answer":"communion"},{"value":400,"question":"A ceremony on November 19, 1863 dedicated a cemetery in this town","answer":"Gettysburg","dailyDouble":true},{"value":600,"question":"Vice presidents are often sent to this type of ceremony overseas; Al Gore attended Mitterrand's in 1996","answer":"Funerals"},{"value":800,"question":"Giant scissors are mainly used for this type of ceremony at the grand opening of a new facility","answer":"Ribbon Cutting"},{"value":1000,"question":"An accolade, a ceremonial tap on the shoulder with a sword, is followed by the words \"I dub thee\" this","answer":"Knight"}]},{"name":"THE NEW YORK TIMES CROSSWORD","questions":[{"value":200,"question":"Monday had a presidential theme; one clue was to this \"supply-side fiscal policy popularized in the 1980s\"","answer":"Reaganomics"},{"value":400,"question":"On Tuesday we had some hidden Bobs; you'll find Dylan in this \"classic board game with a peppermint forest\"","answer":"Candy Land"},{"value":600,"question":"On Wednesday you had to know compound words where each half could also have \"dead\" before it--there was airline, seahorse & this response to \"top on official stationery\"","answer":"letterhead"},{"value":800,"question":"On Thursday we rolled the D-I-C-E, as in these, \"racy books named after a Victorian garment\"","answer":"bodice ripper"},{"value":1000,"question":"On Friday there's no theme, so you just have to know this 10-letter \"TV host who followed Jimmy Fallon on late night\"","answer":"Seth Meyers"}]}],"final":{"category":"AMERICANA","question":"While working for a plastics company, Don Featherstone created this iconic lawn decor, basing it on photos in National Geographic","answer":"A Pink Flamingo"}};
    
// Shamelessly stolen from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};

function readable(arr, last_delim) {
    if (!Array.isArray(arr))
        return arr;
    if (arr.length > 1) {
        return arr.slice(0, arr.length - 1).join(", ") + " " + last_delim + " " + arr.slice(-1)[0];
    } else if (arr.length == 1) {
        return arr[0];
    } else {
        return "";
    }
}

function $(id) { // shortcut for document.getElementById
    return document.getElementById(id);
}

/*function changeBackground() {
    document.body.style.background = "#0A1186"; // to change background color of page
}*/

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function setWager(id) {
    wager = +$("dailyDouble").value;
    if (wager < 5) {
        alert("Wager must be greater than or equal to $5!");
        return;
    }
    showQuestion(id);
}

function handleDailyDouble(id) {
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10];
    $("display").innerHTML = "<table style='width:100%; height:90%' class='game'><th><img src='daily_double.png' onclick='setWager(" + id + ")'/><br/><br/><font color='#E5915C' size=5>Enter Wager:&nbsp;$&nbsp;</font><input type='number' id='dailyDouble' step='100' min='0' max='17800' value='" + question.value + "'/></th></table>";
}

function startTimer() {
    if (currentMode !== "question" || timerStarted === true) {
        return;
    }
    timerStarted = true;
    if (time === null) {
        time = jeopardy.timer;
    }
    countdownTimer();
}

function countdownTimer() {
    if (time < 0) {
        time = 0;
    }
    var minutes = Math.floor(time / 60).toString(), seconds = (time % 60).toString();
    if (minutes.length < 2) {
        minutes = "0" + minutes;
    }
    if (seconds.length < 2) {
        seconds = "0" + seconds;
    }
    $("timer").innerHTML = minutes + ":" + seconds;
    if (time > 0) {
        --time;
        clock = setTimeout("countdownTimer()", 1000);
    }
}

function stopTimer() {
    if (clock > 0) {
        timerStarted = false;
        clearTimeout(clock);
    }
}

function showQuestion(id) {
    if (usedQs.indexOf(id) !== -1 && currentMode === "board") {
        return;
    }
    if (currentMode === "board") {
        usedQs.push(id);
    }
    currentMode = "question";
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10],
        timer = !isNaN(jeopardy.timer) && jeopardy.timer > 0,
        out = ["<table style='width:100%; height:90%' class='game'><tr><td" + (timer ? " colspan=8" : "") + " height='90%' style='border:none' onclick='showAnswer(\"" + id + "\")'>"];
    if (question.dailyDouble === true && wager === 0) {
        handleDailyDouble(id);
        return;
    }
    if (!question.hasOwnProperty("choices") && !Array.isArray(question.choices)) {
        out.push("<center><strong><font color='#FFF2C6' size=7>" + question.question + "</font></strong></center>");
    } else {
        out.push("<strong><font color='#FFF2C6' size=7>" + question.question + "</font></strong><br/>");
        /*var size = 6, string = "";
        if (question.choices.join("").length > 56 * question.choices.length - 10) {
            size = 6;
        }*/
        for (var i = 0; i < question.choices.length; i++) {
            var choice = question.choices[i];
            /*if (size === 7 && choice.length > 56) {
                var j = choice.substring(0, 56).lastIndexOf(" ");
                choice = choice.substring(0, j) + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + choice.slice(j);
            }*/
            if (choice.length > 91) {
                var j = choice.substring(0, 91).lastIndexOf(" ");
                choice = choice.substring(0, j) + "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + choice.slice(j);
            }
            out.push("<br/>&nbsp;&nbsp;&nbsp;&nbsp;<b><font color='#FFF2C6' size=6>" + alphabet[i] + ". " + choice + "</font></b>");
        }
    }
    out.push("</td></tr>");
    if (timer) {
        out.push("<tr><td style='border:none' width='80%'></td><td style='background-color:green' onclick='startTimer()'><strong><center><font size=5>Start</font></center></strong></td><td style='background-color:red' onclick='stopTimer()'><strong><center><font size=5>Pause</font></center></strong></td></tr>");
        out.push("<tr><td style='border:none' width='80%'></td><td colspan=2><strong><center><font size=7 color=yellow><div id='timer'>00:00</div></font></center></strong></td></tr>");
    }
    out.push("</table>");
    $("display").innerHTML = out.join("");
}

function editPoints(id, sign) {
    var value;
    if (id === "final") {
        value = 1;
    } else {
        var category = jeopardy.categories[Math.floor(id / 10)],
            question = category.questions[id % 10];
        value = question.value;
        if (question.dailyDouble === true) {
            value = wager;
        }
    }
    pointsAdd = sign === "-" ? -value : value;
}

function addPoints(team) {
    if (currentMode === "answer") {
        teams[team].points += pointsAdd;
        updateScoreBoard();
        createJeopardyBoard();
    } else if (currentMode === "final_answer") {
        teams[team].points += finalWagers[team] * pointsAdd;
        updateScoreBoard();
    }
}

function showAnswer(id) {
    currentMode = "answer";
    stopTimer();
    time = null;
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10],
        answer = question.answer,
        out = ["<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2 onclick='createJeopardyBoard()'>"];
    out.push("<center><strong><font color='#FFF2C6' size=7>");
    if (question.hasOwnProperty("choices") && Array.isArray(question.choices)) {
        var choices = question.choices.map(function (choice) { return choice.toLowerCase(); }),
            i = choices.indexOf(answer.toLowerCase());
        if (i !== -1) {
            out.push(alphabet[i] + ". ");
        }
    }
    out.push(answer + "</font></strong></center></td></tr>");
    out.push("<tr><th onclick='editPoints(" + id + ", \"+\")'><font color='green' size=5><b>+</b></font></th>");
    out.push("<th onclick='editPoints(" + id + ", \"-\")'><font color='red' size=5><b>&#8210;</b></font></th></tr>"); // Dash
    out.push("</table>");
    $("display").innerHTML = out.join("");
}

function end() {
    currentMode = "end";
    teams = teams.sort(function(a, b) {
        return b.points - a.points;
    });
    var winners = [teams[0]], winner_names = [];
    for (var i = 1; i < teams.length; i++) {
        var team = teams[i];
        if (team.points === winners[0].points) {
            winners.push(team);
        } else {
            break;
        }
    }
    var losers = [];
    for (var i = 0; i < teams.length; i++) {
        var team = teams[i];
        if (team.points !== winners[0].points) {
            losers.push(team);
        }
    }
    for (var i = 0; i < winners.length; i++) {
        winner_names.push(winners[i].name);
    }
    var max = Math.max(winners.length, losers.length), min = Math.min(winners.length, losers.length);
    while (max % min > 0) {
        max++;
    }
    var out = ["<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=" + max + "><center><strong><font color=green size=7>Congratulations to </font><font color='" + winners[0].color + "' size=7>" + readable(winner_names, "and") + "</font><font color=green size=7>!</font></strong></center></td></tr><tr>"];
    for (var i = 0; i < winners.length; i++) {
        var team = winners[i], colspan = winners.length === max ? 1 : max;
        out.push("<td colspan=" + colspan + "><center><strong><font size=6 color='" + team.color + "'>" + team.name + "</font></strong></center></td>");
    }
    out.push("</tr><tr>");
    for (var i = 0; i < winners.length; i++) {
        var team = winners[i], colspan = winners.length === max ? 1 : max;
        out.push("<td colspan=" + colspan + "><center><font color='#DBFEF8'>" + team.points + "</font></center></td>");
    }
    out.push("</tr><tr><td colspan=" + max + "></td></tr><tr>");
    for (var i = 0; i < losers.length; i++) {
        var team = losers[i], colspan = losers.length === max ? 1 : max;
        out.push("<td colspan=" + colspan + "><center><strong><font size=5 color='" + team.color + "'>" + team.name + "</font></strong></center></td>");
    }
    out.push("</tr><tr>");
    for (var i = 0; i < losers.length; i++) {
        var team = losers[i], colspan = losers.length === max ? 1 : max;
        out.push("<td colspan=" + colspan + "><center><font color='#DBFEF8'>" + team.points + "</font></center></td>");
    }
    out.push("</tr></table>");
    $("display").innerHTML = out.join("");
}

function setFinalWagers() {
    if (!$("final0")) {
        return;
    }
    if (finalWagers.length !== 0) {
        finalWagers = [];
    }
    for (var t = 0; t < teams.length; t++) {
        finalWagers.push($("final" + t).value);
    }
}

function handleFinalJeopardy(num) {
    var question = jeopardy["final"],
        out = "<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2 {0}><center><strong><font color='#FFF2C6' size=7>{1}</font></strong></center></td></tr>{2}</table>",
        onclick = "onclick='handleFinalJeopardy(" + (num + 1) + ")'";
    switch (num) {
        case 0:
            currentMode = "final_confirm";
            $("display").innerHTML =  out.format(onclick, "All questions have been answered!<br/>Click to proceed to Final Jeopardy!", "");
            break;
        case 1:
            currentMode = "final_wager";
            var wagers = [];
            for (var t = 0; t < teams.length; t++) {
                var team = teams[t];
                wagers.push("<font color='" + team.color + "' size=5>" + team.name + ":</font> <input type='number' id='final" + t + "' step='100' min='0' value='0'/><br/>");
            }
            wagers.push("<br/><a href='javascript:;' style='color:#E5915C; font-size:0.57em;' onclick='handleFinalJeopardy(2)'>Continue</a>");
            $("display").innerHTML = out.format("", "CATEGORY: " + question.category + "<br/><br/><font size=6 color='#B0CFFC'>Make your wagers!</font><br/>" + wagers.join(""), "");
            break;
        case 2:
            currentMode = "final_question";
            setFinalWagers();
            $("display").innerHTML = out.format(onclick, question.question, "");
            break;
        case 3:
            currentMode = "final_answer";
            $("display").innerHTML =  out.format(onclick, question.answer, "<tr><th onclick='editPoints(\"final\", \"+\")'><font color='green' size=5><b>+</b></font></th><th onclick='editPoints(\"final\", \"-\")'><font color='red' size=5><b>&#8210;</b></font></th></tr>");
            break;
        default:
            end();
    }
}

function nextRound() {
    if (jeopardy.hasOwnProperty("final") && typeof currentMode === "string" && currentMode.indexOf("final") === -1) { 
        handleFinalJeopardy(0);
    } else {
        end();
    }
}

function back() {
    var lastQ = usedQs[usedQs.length - 1];
    switch (currentMode) {
        case "board":
        case "final_confirm":
        case "answer_display":
            if (lastQ !== undefined) {
                showAnswer(lastQ);
            } else {
                createJeopardyBoard();
            }
            break;
        case "question":
        case "board_display":
            stopTimer();
            time = null;
            usedQs.splice(-1, 1);
            createJeopardyBoard();
            break;
        case "answer":
        case "question_display":
            showQuestion(lastQ);
            break;
        case "final_wager":
        case "final_confirm_display":
            handleFinalJeopardy(0);
            break;
        case "final_question":
        case "final_wager_display":
            handleFinalJeopardy(1);
            break;
        case "final_answer":
        case "final_question_display":
            handleFinalJeopardy(2);
            break;
        case "end":
        case "final_answer_display":
            if (jeopardy.hasOwnProperty("final")) { 
                handleFinalJeopardy(3);
            } else {
                showAnswer(lastQ);
            }
            break;
        case "end_display":
            end();
            break;
        case null:
            teams = [];
            onLoad();
            break;
        default:
            alert("Unexpected error occurred, cannot go back!");
    }
}

function createJeopardyBoard() {
    currentMode = "board";
    wager = 0;
    var out = ["<table style='width:100%; height:90%' class='game'><tr>"],
        categories = jeopardy.categories,
        width = Math.floor(100 / categories.length);
    if (usedQs.length === categories.length * categories[0].questions.length) {
        nextRound();
        return;
    }
    for (var c = 0; c < categories.length; c++) {
        var color = "#0A1186", size = 5, name = categories[c].name;
        if (name.length > 20) {
            size = 4;
        }
        for (var q = 0; q < categories[0].questions.length; q++) {
            var id = c * 10 + q;
            if (usedQs.indexOf(id) === -1) {
                color = "#B0CFFC";
                break;
            }
        }
        out.push("<th style='width:" + width + "%'><font color='" + color + "' size=" + size + ">" + name + "</font></th>");
    }
    out.push("</tr>");
    for (var i = 0; i < categories[0].questions.length; i++) { // each category should have the same amount of questions
        out.push("<tr>");
        for (var j = 0; j < categories.length; j++) {
            var id = j * 10 + i,
                value = categories[j].questions[i].value,
                color = usedQs.indexOf(id) !== -1 ? "#0A1186" : "#E5915C";
            out.push("<th onclick='showQuestion(" + id + ")'><font color='" + color + "' size=10>$" + value + "</font></th>");
        }
        out.push("</tr>");
    }
    out.push("</table>");
    $("display").innerHTML = out.join("");
}

function updateScoreBoard() {
    var out = ["<table style='width:100%; height:10%'><tr>"];
    for (var i = 0; i < teams.length; i++) {
        var team = teams[i];
        if (team.color === "#000000") {
            team.color = colors[rand(0, colors.length)];
        }
        out.push("<th onclick='addPoints(" + i + ")'><font color='" + team.color + "'>" + team.name + "</font></th>");
    }
    out.push("<th style='width:15%' rowspan=2>");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='back()'>Back</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='nextRound()'>Skip</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='end()'>End</a><br/>");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='editTeams()'>Edit</a> &nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='display()'>Display</a> &nbsp;")
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='test_eval()'>Eval</a></th></tr><tr>");
    for (var i = 0; i < teams.length; i++) {
        var color = teams[i].points < 0 ? "#FF0000" : "#DBFEF8";
        out.push("<td><center><font color='" + color + "'>" + teams[i].points + "</font></center></td>");
    }
    out.push("</tr></table>");
    $("score").innerHTML = out.join("");
}

function editTeams() {
    if (teamEdit === false) {
        teamEdit = true;
        var out = ["<table style='width:100%; height:10%'><tr>"];
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i];
            if (team.color === "#000000") {
                var c = rand(0, colors.length);
                team.color = colors[c];
                colors.splice(c, 1);
            }
            out.push("<th><input id='team" + i + "' value='" + team.name + " | " + team.color + "'></input></th>");
        }
        out.push("<th style='width:2%'><a href='javascript:;' style='color:green; text-decoration: none' onclick='addTeam()'>+</a></th>");
        out.push("<th style='width:13%' rowspan=2>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='back()'>Back</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='skip()'>Skip</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='end()'>End</a><br/>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='editTeams()'>Edit</a> &nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='display()'>Display</a> &nbsp;")
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='test_eval()'>Eval</a></th></tr><tr>");
        for (var i = 0; i < teams.length; i++) {
            var color = teams[i].points < 0 ? "#FF0000" : "#DBFEF8";
            out.push("<td><center><input id='points" + i + "' value='" + teams[i].points + "'></input></center></td>");
        }
        out.push("<th><a href='javascript:;' style='color:red; text-decoration: none;' onclick='removeTeam()'>&#8210;</a></th>");
        out.push("</tr></table>");
        $("score").innerHTML = out.join("");
    } else {
        teamEdit = false;
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i],
                name, color,
                input = $("team" + i).value, 
                points = parseInt($("points" + i).value, 10);
            var lastIndex = input.lastIndexOf(" | ");
            if (lastIndex !== -1) {
                name = input.substring(0, lastIndex);
                color = input.slice(lastIndex + 3);
            } else {
                name = input;
                color = null;
            }
            if (team.name !== name) {
                team.name = name;
            } 
            if (color && team.color !== color) {
                team.color = color;
            } 
            if (team.points !== points) {
                team.points = points;
            }
        }
        updateScoreBoard();
    }
}

function addTeam() {
    var defaultTeam = {
        "name": "Team " + (teams.length + 1),
        "color": "#000000",
        "points": 0
    };
    teams.push(defaultTeam);
    if (teamEdit !== false) {
        teamEdit = false;
        editTeams();
    }
}

function removeTeam() {
    teams.splice(teams.length - 1, 1);
    if (teamEdit !== false) {
        teamEdit = false;
        editTeams();
    }
}

function test_eval() {
    var data = prompt("Eval [use alert() to see result]", "");
    try {
        var res = eval(data);
    } catch (err) {
        alert("Error in eval: " + err);
    }
}

function display() {
    if (currentMode === "question") {
        stopTimer();
    }
    if (typeof currentMode === "string" && currentMode.indexOf("_display") === -1) {
        currentMode += "_display";
    }
    var text = prompt("Enter text to display", "");
    $("display").innerHTML = "<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2 onclick='back()'><center><strong><font color='#FFF2C6' size=7>" + text + "</font></strong></center></td></tr></table>";
}

function initJeopardy() {
    if (jeopardy.hasOwnProperty("categories")) { // otherwise it failed to load
        if (jeopardy.hasOwnProperty("randDailyDouble") && !isNaN(jeopardy.randDailyDouble)) {
            for (var i = 0; i < jeopardy.randDailyDouble; i++) {
                while (true) {
                    var categories = jeopardy.categories,
                        questions = categories[rand(0, categories.length)].questions;
                    if (questions.length === 5) {
                        var array = [0, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4],
                            question = questions[array[rand(0, array.length)]];
                        if (!question.hasOwnProperty("dailyDouble") || question.dailyDouble != true) {
                            question.dailyDouble = true;
                            break;
                        }
                    } else {
                        var question = questions[rand(0, questions.length)];
                        if (question.dailyDouble != true) {
                            question.dailyDouble = true;
                            break;
                        }
                    }
                }
            }
        }
        createJeopardyBoard();
    } else {
        alert("Error: Failed to create Jeopardy board");
    }
}

function loadJeopardy(type, data) {
    if (type === "default") {
        jeopardy = defaultJeopardy;
        initJeopardy();
    } else if (type === "url") {
        var url = data ? data : encodeURI($("url").value);
        if (url.substring(0, 7).toLowerCase() !== "http://" && url.substring(0, 8).toLowerCase() !== "https://") {
            url = "https://raw.githubusercontent.com/justinc646/justinc646.github.io/master/jeopardy/games/" + url;
            if (url.slice(url.lastIndexOf("/")).indexOf(".") === -1) {
                url += ".json";
            }
        } else {
            url = "https://cors-anywhere.herokuapp.com/" + url;
        }
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            xhr.open('GET', url, true);
        } else if (typeof XDomainRequest != "undefined"){
            xhr = new XDomainRequest();
            xhr.open('GET', url);
        } else {
            alert("Error: CORS is not supported on this browser, cannot load URL");
            return;
        }
        xhr.onload = function() {
            var resp = xhr.responseText;
            if (resp === "") {
                alert("Error: Couldn't retrieve data from URL");
                return;
            }
            try {
                jeopardy = JSON.parse(resp);
                initJeopardy();
            } catch (e) {
                alert("Error: Couldn't parse JSON string")
                return;
            }
        };
        xhr.onerror = function() {
            alert("Error: Couldn't access URL");
        };
        xhr.send();
    } else if (type === "file") {
        if (typeof window.FileReader !== "function") {
            alert("Error: File could not be read because the file API isn't supported on this browser yet.");
        } else {
            var file = $("file").files[0];
            var fr = new FileReader();
            fr.onload = function() {
                try {
                    jeopardy = JSON.parse(fr.result);
                    initJeopardy();
                } catch (e) {
                    alert("Error: Couldn't parse JSON string")
                    return;
                }
            };
            fr.readAsText(file);
        }
    }
}

function onLoad() {
    for (var x = 0; x < 3; x++) {
        addTeam();
    }
    $("display").innerHTML = "<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2><center><strong><font color='#FDE151' size=7>JEOPARDY!</font><br/><br/><a href='javascript:;' style='color:#E5915C; font-size:1.67em;' onclick='loadJeopardy(\"default\")'>Load Default</a><br/><br/><font color='#E5915C' size=5>Load from URL:</font> <input type='url' id='url'/></font> <button onclick='loadJeopardy(\"url\")'>Submit</button><br/><br/><font color='#E5915C' size=5>Load from File:</font> <input type='file' id='file' style='background-color: #1B26EE; color: white;' accept='.txt,.json'/></font> <button onclick='loadJeopardy(\"file\")'>Submit</button></strong></center></td></tr></table>";
    updateScoreBoard();
	if (location.search !== "") {
		var args = decodeURIComponent(location.search.substr(1)).split("&");
		var obj = {};
		for (var i = 0; i < args.length; i++) {
            var params = args[i];
            var pos = params.indexOf("=");
            var key = params.substring(0, pos);
            var value = params.substr(pos + 1);
			obj[key] = value;
		}
        if (obj.hasOwnProperty("url")) {
            loadJeopardy("url", obj.url);
        }
    }
}