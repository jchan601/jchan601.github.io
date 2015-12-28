/** TO-DO:
* Have twice, one with team on bottom and one with team on top, or put on GitHub with one being pull request
* Final Jeopardy
* End
* Timer
* Load Jeopardy from JSON
* Start page
* Move to GitHub
*/
// Final Jeopardy idea: Author of Nectar in a Sieve or Indian mathematicians/prime ministers mentioned in power guide

var currentMode = null,
    pointsAdd = 0,
    wager = 0,
    usedQs = [],
    doubleJeopardy = false,
    teamEdit = false,
    alphabet = "abcdefghijklmnopqrstuvwxyz",
    colors = ["#00FFFF", "#00FF00", "#FF00FF", "#ADD8E6", "#C0C0C0", "#95B9C7", "#6698FF", "#CDFFFF", "#ADDFFF", "#7FFFD4", "#52D017", "#99C68E", "#7FE817", "#5EFB6E", "#8AFB17", "#CCFB5D", "#B1FB17", "#FFFF00", "#FFF380", "#FFE87C", "#EDDA74", "#F5F5DC", "#FFDB58", "#FFD801", "#FDD017", "#E9AB17", "#FFA62F", "#FFCBA4", "#E8A317", "#D4A017", "#FFA500", "#F87217", "#FF8040", "#F9966B", "#FF7F50", "#FF0000", "#E77471", "#E8ADAA", "#FCDFFF", "#FAAFBE", "#F778A1", "#F660AB", "#F52887", "#F433FF", "#A74AC7", "#8E35EF", "#8467D7", "#C45AEC", "#E238EC", "#E9CFEC", "#E3E4FA", "#FEFCFF", "#FFFFFF"],
    teams = [],
    jeopardy = {
        "categories": [
            {
                "name": "FILL IN THE BLANK CANVAS",
                "questions": [
                    {
                        "value": 200,
                        "question": "Van Gogh's \"Self-Portrait with Pipe and Bandaged ____\"",
                        "answer": "Ear"
                    },
                    {
                        "value": 400,
                        "question": "Jonathan Buttall is thought to be Gainsborough's model for \"The ____ Boy\"",
                        "answer": "Blue"
                    },
                    {
                        "value": 600,
                        "question": "Seurat got to the point in \"A ____ Afternoon on the Island of La Grande Jatte\"",
                        "answer": "Sunday"
                    },
                    {
                        "value": 800,
                        "question": "Duchamp caused a scandal with his \"Nude Descending a ____, No. 2\"",
                        "answer": "Staircase"
                    },
                    {
                        "value": 1000,
                        "question": "Dali gave it a name that stuck: \"The Persistence of ____\"",
                        "answer": "Memory"
                    }
                ]
            },
            {
                "name": "MOVIE CAMEOS",
                "questions": [
                    {
                        "value": 200,
                        "question": "Dan Patrick's good friend Adam Sandler has cast Patrick in 9 of his films, including \"Grown Ups 2\" in which Patrick played a gym teacher dressed as this 1980s Celtics legend",
                        "answer": "Larry Bird"
                    },
                    {
                        "value": 400,
                        "question": "In \"Twilight\" this author has a cameo as a customer in a diner with a veggie plate",
                        "answer": "Stephenie Meyer"
                    },
                    {
                        "value": 600,
                        "question": "Well, Al Michaels didn't win an Oscar playing myself in this 1996 movie but Cuba Gooding Jr. did for his performance as a wide receiver for the Cardinals",
                        "answer": "<i>Jerry Maguire</i>"
                    },
                    {
                        "value": 800,
                        "question": "Julia Roberts played this title crusader in a 2000 film while the real woman had a cameo as a waitress",
                        "answer": "Erin Brockovich"
                    },
                    {
                        "value": 1000,
                        "question": "From \"Rebecca\" on, this director appeared in all of his films; he sat next to Cary Grant on a bus in \"To Catch a Thief\"",
                        "answer": "Alfred Hitchcock"
                    }
                ]
            },
            {
                "name": "ANAGRAMMED FORMER WORLD LEADERS",
                "questions": [
                    {
                        "value": 200,
                        "question": "A sari wearer:<br/>HI, GRAND INDIA!",
                        "answer": "Indira Gandhi"
                    },
                    {
                        "value": 400,
                        "question": "In Italy:<br/>VIRILE SLOB COUSIN",
                        "answer": "Silvio Berlusconi"
                    },
                    {
                        "value": 600,
                        "question": "Uh oh! Panama!:<br/>GENUINE AMORAL",
                        "answer": "Manuel Moriega"
                    },
                    {
                        "value": 800,
                        "question": "He Laboured over Britain:<br/>BRAINY LOT",
                        "answer": "Tony Blair"
                    },
                    {
                        "value": 1000,
                        "question": "Late Israeli leader:<br/>SOLAR HERNIA",
                        "answer": "Ariel Sharon"
                    }
                ]
            },
            {
                "name": "NUT-TRITION",
                "questions": [
                    {
                        "value": 200,
                        "question": "Almonds are an excellent source of fiber & this bone-building element--got milk?",
                        "answer": "Calcium"
                    },
                    {
                        "value": 400,
                        "question": "These biggies from the Amazon basin have many health benefits, but with their high selenium content, too many can be harmful",
                        "answer": "Brazil Nuts"
                    },
                    {
                        "value": 600,
                        "question": "A key ingredient in pesto, these nuts are an excellent source of vitamin E",
                        "answer": "Pine Nuts"
                    },
                    {
                        "value": 800,
                        "question": "Pistachios get their green color mostly from lutein, which is essential to this one of the 5 senses",
                        "answer": "Vision"
                    },
                    {
                        "value": 1000,
                        "question": "Have some hazelnuts before bed; they're high in this sleep-aiding amino acid that's also found in turkey",
                        "answer": "Tryptophan"
                    }
                ]
            },
            {
                "name": "CEREMONIES",
                "questions": [
                    {
                        "value": 200,
                        "question": "This Christian sacrament, a holy ceremony, is also called Eucharist",
                        "answer": "communion"
                    },
                    {
                        "value": 400,
                        "question": "A ceremony on November 19, 1863 dedicated a cemetery in this town",
                        "answer": "Gettysburg",
                        "dailyDouble": true
                    },
                    {
                        "value": 600,
                        "question": "Vice presidents are often sent to this type of ceremony overseas; Al Gore attended Mitterrand's in 1996",
                        "answer": "Funerals"
                    },
                    {
                        "value": 800,
                        "question": "Giant scissors are mainly used for this type of ceremony at the grand opening of a new facility",
                        "answer": "Ribbon Cutting"
                    },
                    {
                        "value": 1000,
                        "question": "An accolade, a ceremonial tap on the shoulder with a sword, is followed by the words \"I dub thee\" this",
                        "answer": "Knight"
                    }
                ]
            },
            {
                "name": "THE NEW YORK TIMES CROSSWORD",
                "questions": [
                    {
                        "value": 200,
                        "question": "Monday had a presidential theme; one clue was to this \"supply-side fiscal policy popularized in the 1980s\"",
                        "answer": "Reaganomics"
                    },
                    {
                        "value": 400,
                        "question": "On Tuesday we had some hidden Bobs; you'll find Dylan in this \"classic board game with a peppermint forest\"",
                        "answer": "Candy Land"
                    },
                    {
                        "value": 600,
                        "question": "On Wednesday you had to know compound words where each half could also have \"dead\" before it--there was airline, seahorse & this response to \"top on official stationery\"",
                        "answer": "letterhead"
                    },
                    {
                        "value": 800,
                        "question": "On Thursday we rolled the D-I-C-E, as in these, \"racy books named after a Victorian garment\"",
                        "answer": "bodice ripper"
                    },
                    {
                        "value": 1000,
                        "question": "On Friday there's no theme, so you just have to know this 10-letter \"TV host who followed Jimmy Fallon on late night\"",
                        "answer": "Seth Meyers"
                    }
                ]
            }
        ],
        "round2": [
            {
                "name": "THE ROMANTIC POETS",
                "questions": [
                    {
                        "value": 400,
                        "question": "This title character of a Coleridge poem must wander the world recounting the tale of his days at sea",
                        "answer": "The Ancient Mariner"
                    },
                    {
                        "value": 800,
                        "question": "Keats was inspired to write an ode to this bird by the song of one that nested in Charles Brown's garden",
                        "answer": "Nightingale"
                    },
                    {
                        "value": 1200,
                        "question": "After part of \"Childe Harold's Pilgrimage\" was published, this lord \"awoke one morning and found myself famous\"",
                        "answer": "Lord Byron"
                    },
                    {
                        "value": 1600,
                        "question": "His first major work was \"The Lay of the Last Minstrel\", a poem set on & north of England's northern border",
                        "answer": "Sir Walter Scott"
                    },
                    {
                        "value": 2000,
                        "question": "The play in verse about this Greek god \"Unbound\" is often regarded as Shelley's greatest work",
                        "answer": "Prometheus"
                    }
                ]
            },
            {
                "name": "HONEST \"ABE\"",
                "questions": [
                    {
                        "value": 400,
                        "question": "To mark a product incorrectly",
                        "answer": "Mislabel"
                    },
                    {
                        "value": 800,
                        "question": "William Blackstone called it \"the great and efficacious writ, in all manner of illegal confinement\"",
                        "answer": "Habeus Corpus"
                    },
                    {
                        "value": 1200,
                        "question": "A young pine or fir stem tossed in Highland Games",
                        "answer": "The Caber"
                    },
                    {
                        "value": 1600,
                        "question": "This word for the science of baseball analytics comes from the name of a research society",
                        "answer": "Sabermetrics"
                    },
                    {
                        "value": 2000,
                        "question": "Early scientific instrument used to measure the altitude of celestial objects",
                        "answer": "Astrolabe"
                    }
                ]
            },
            {
                "name": "PALACES",
                "questions": [
                    {
                        "value": 400,
                        "question": "This \"seasonal\" palace has been called \"St. Petersburg's most famous building\"",
                        "answer": "Winter Palace for the Romanovs"
                    },
                    {
                        "value": 800,
                        "question": "Lhasa's Potala Palace would be a nice place for this religious leader, who fled in 1959, to come home to, if he ever can",
                        "answer": "Dalai Lama"
                    },
                    {
                        "value": 1200,
                        "question": "Istana Nurul Iman, the palace of the sultan of this country, features an air conditioned stable & a mosque for 1,500 people",
                        "answer": "Brunei"
                    },
                    {
                        "value": 1600,
                        "question": "Ponder the tragic life of Crown Prince Rudolf in his lavish suite in this capital's Schonbrunn Palace",
                        "answer": "Vienna",
                        "dailyDouble": true
                    },
                    {
                        "value": 2000,
                        "question": "Overlooking Granada, Spain, it has a name from Arabic for \"Red\", probably from the bricks of the outer walls",
                        "answer": "Alhambra"
                    }
                ]
            },
            {
                "name": "INTERNATIONAL SWIMMING HALL OF FAMERS",
                "questions": [
                    {
                        "value": 400,
                        "question": "Inducted in 1977, this American who'd been laden with gold at Munich 5 years earlier",
                        "answer": "Mark Spitz"
                    },
                    {
                        "value": 800,
                        "question": "This oceanographer & inventor, 1910-1997",
                        "answer": "Jacques Cousteau",
                        "dailyDouble": true
                    },
                    {
                        "value": 1200,
                        "question": "1993:<br/>This 4-time Olympic gold medalist who did much of his swimming following a dive",
                        "answer": "Greg Louganis"
                    },
                    {
                        "value": 1600,
                        "question": "<img src='http://www.j-archive.com/media/2015-12-18_DJ_26.jpg' height='270' width='480'/><br/>This prince shown as a young man, later chairman of the Monegasque Swimming Federation",
                        "answer": "Prince Albert"
                    },
                    {
                        "value": 2000,
                        "question": "This U.S. champ who helped bring the swimming movie to Hollywood with films like \"Bathing Beauty\"",
                        "answer": "Esther Williams"
                    }
                ]
            },
            {
                "name": "MINNEAPOLIS",
                "questions": [
                    {
                        "value": 400,
                        "question": "In 2001 General Mills bought this other Minneapolis-based baking giant for $10.5 billion; that's a lot of dough, boy",
                        "answer": "Pillsbury"
                    },
                    {
                        "value": 800,
                        "question": "Minneapolis is the home town of this pop icon; his Paisley Park Studios are about a half hour away",
                        "answer": "Prince"
                    },
                    {
                        "value": 1200,
                        "question": "<img src='http://www.j-archive.com/media/2015-12-18_DJ_28.jpg' height='270' width='480'/> <img src='http://www.j-archive.com/media/2015-12-18_DJ_28a.jpg' height='270' width='480'/><br/>Foshay Tower was Minneapolis' tallest when opened in this year; Mr. Foshay's business promptly collapsed, but the tower stands",
                        "answer": "1929"
                    },
                    {
                        "value": 1600,
                        "question": "Drive your toy truck to this 12-mile-long lake in the western suburbs",
                        "answer": "Minnetonka"
                    },
                    {
                        "value": 2000,
                        "question": "Before the Twins, fans rooted for this minor league team named for the many locals who worked grinding flour",
                        "answer": "Millers"
                    }
                ]
            },
            {
                "name": "ST. PAUL",
                "questions": [
                    {
                        "value": 400,
                        "question": "In Acts 9 Paul gets a call from the Lord near this Syrian city",
                        "answer": "Damascus"
                    },
                    {
                        "value": 800,
                        "question": "Paul & Barnabas preached to big crowds in Antioch, where Acts 11 says the Disciples were first called these",
                        "answer": "Christians"
                    },
                    {
                        "value": 1200,
                        "question": "Paul's New Testament letters include 2 to these Greeks who gave their name to an order of classical architecture",
                        "answer": "Corinthians"
                    },
                    {
                        "value": 1600,
                        "question": "The lord calls Paul a \"chosen vessel... to bear my name before\" these non-Jews",
                        "answer": "Gentiles"
                    },
                    {
                        "value": 2000,
                        "question": "Paul was born Saul in this Asia minor city around 4 B.C.",
                        "answer": "Tarsus"
                    }
                ]
            }
        ],
        "final": {
            "category": "AMERICANA",
            "question": "While working for a plastics company, Don Featherstone created this iconic lawn decor, basing it on photos in National Geographic",
            "answer": "A Pink Flamingo"
        }
    };

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
    var category = !doubleJeopardy ? jeopardy.categories[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
        question = category.questions[id % 10];
    $("display").innerHTML = "<table style='width:100%; height:90%' class='game'><th><img src='daily_double.png' onclick='setWager(" + id + ")'/><br/><br/><font color='#E5915C' size=5>Enter Wager:</font>&nbsp;&nbsp;<input type='number' id='dailyDouble' step='100' min='0' max='17800' value='" + question.value + "'/></th></table>";
}

function showQuestion(id) {
    if (usedQs.indexOf(id) !== -1 && currentMode === "board") {
        return;
    }
    if (currentMode === "board") {
        usedQs.push(id);
    }
    currentMode = "question";
    var category = !doubleJeopardy ? jeopardy.categories[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
        question = category.questions[id % 10],
        out = ["<table style='width:100%; height:90%' class='game'><tr><td onclick='showAnswer(\"" + id + "\")'>"];
    if (question.dailyDouble === true && wager === 0) {
        handleDailyDouble(id);
        return;
    };
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
    out.push("</td></tr></table>");
    $("display").innerHTML = out.join("");
}

function editPoints(id, sign) {
    var category = !doubleJeopardy ? jeopardy.categories[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
        question = category.questions[id % 10],
        value = question.value;
    if (question.dailyDouble === true) {
        value = wager;
    }
    pointsAdd = sign === "-" ? -value : value;
}

function addPoints(team) {
    if (currentMode === "answer") {
        teams[team].points += pointsAdd;
        updateScoreBoard();
        createJeopardyBoard();
    }
}

function showAnswer(id) {
    currentMode = "answer";
    var category = !doubleJeopardy ? jeopardy.categories[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
        question = category.questions[id % 10],
        answer = question.answer,
        out = ["<table style='width:100%; height:90%' class='game'><tr style='height:90%'><td colspan=2 onclick='createJeopardyBoard()'>"];
      out.push("<center><strong><font color='#FFF2C6' size=7>");
    if (question.hasOwnProperty("choices") && Array.isArray(question.choices)) {
        var choices = question.choices.map(function (choice) { return choice.toLowerCase(); });
        out.push(alphabet[choices.indexOf(answer.toLowerCase())] + ". ");
    }
    out.push(answer + "</font></strong></center></td></tr>");
    out.push("<tr><th onclick='editPoints(" + id + ", \"+\")'><font color='green' size=5><b>+</b></font></th>");
    out.push("<th onclick='editPoints(" + id + ", \"-\")'><font color='red' size=5><b>&#8210;</b></font></th></tr>"); // Dash
    out.push("</table>");
    $("display").innerHTML = out.join("");
}

function back() {
    if (usedQs.length === 0) {
        return;
    }
    var lastQ = usedQs[usedQs.length - 1];
    switch (currentMode) {
        case "board":
            showAnswer(lastQ);
            break;
        case "question":
            usedQs.splice(-1, 1);
            createJeopardyBoard();
            break;
        case "answer":
            showQuestion(lastQ);
            break;
    }
}

function initDoubleJeopardy() {
    doubleJeopardy = true;
    usedQs = [];
    createJeopardyBoard();
}

function initFinalJeopardy() {
}

function end() {
}

function createJeopardyBoard() {
    currentMode = "board";
    wager = 0;
    var out = ["<table style='width:100%; height:90%' class='game'><tr>"],
        categories = (!doubleJeopardy ? jeopardy.categories : jeopardy.round2),
        width = Math.floor(100 / categories.length);
    if (!doubleJeopardy && usedQs.length === categories.length * categories[0].questions.length) {
        if (jeopardy.hasOwnProperty("round2")) {
            initDoubleJeopardy();
            return;
        } else if (jeopardy.hasOwnProperty("final")) { 
            initFinalJeopardy();
            return;
        } else {
            end();
            return;
        }
    } else if (doubleJeopardy && usedQs.length === categories.length * categories[0].questions.length) {
        if (jeopardy.hasOwnProperty("final")) {
            initFinalJeopardy();
            return;
        } else {
            end();
            return;
        }
    }
    for (var c = 0; c < categories.length; c++) {
        var color = "#0A1186";
        for (var q = 0; q < categories[0].questions.length; q++) {
            var id = c * 10 + q;
            if (usedQs.indexOf(id) === -1) {
                color = "#B0CFFC";
                break;
            }
        }
        out.push("<th style='width:" + width + "%'><font color='" + color + "' size=5>" + categories[c].name + "</font></th>");
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

function editTeams() {
    if (teamEdit === false) {
        teamEdit = true;
        var out = ["<table style='width:100%; height:10%'><tr>"];
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i];
            if (team.color === "#000000") {
                team.color = colors[rand(0, colors.length)];
            }
            out.push("<th><input id='team" + i + "' value='" + team.name + "'></input></th>");
        }
        out.push("<th style='width:2%'><a href='javascript:;' style='color:green; text-decoration: none' onclick='addTeam()'>+</a></th>");
        out.push("<th style='width:13%' rowspan=2>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='back()'>Back</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='alert(\"hi\")'>Skip</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='alert(\"hi\")'>End</a><br/>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='editTeams()'>Edit</a> &nbsp;&nbsp;&nbsp;");
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
            input = input.replace(/[\s]{0,1};[\s]{0,1}color[\s]{0,1}=[\s]{0,1}/g, ";color=");
            var lastIndex = input.lastIndexOf(";color=");
            if (lastIndex !== -1) {
                name = input.substring(0, lastIndex);
                color = input.slice(lastIndex + 7);
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
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='alert(\"hi\")'>Skip</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='alert(\"hi\")'>End</a><br/>");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='editTeams()'>Edit</a> &nbsp;&nbsp;&nbsp;");
    out.push("<a href='javascript:;' style='color:#E5915C' onclick='test_eval()'>Eval</a></th></tr><tr>");
    for (var i = 0; i < teams.length; i++) {
        var color = teams[i].points < 0 ? "#FF0000" : "#DBFEF8";
        out.push("<td><center><font color='" + color + "'>" + teams[i].points + "</font></center></td>");
    }
    out.push("</tr></table>");
    $("score").innerHTML = out.join("");
}

function onLoad() {
    for (var x = 0; x < 3; x++) {
        addTeam();
    }
    createJeopardyBoard();
    updateScoreBoard();
}