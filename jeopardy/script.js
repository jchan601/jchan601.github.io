/** TO-DO:
* Final Jeopardy
* Skip
* End
* Timer
* Load Jeopardy from JSON
* Start page
* Randomize Daily Double
* Improve formatting webpage too
*/

var currentMode = null,
    pointsAdd = 0,
    wager = 0,
    usedQs = [],
    doubleJeopardy = false, // condense into round variable
    finalJeopardy = false,
    teamEdit = false,
    alphabet = "abcdefghijklmnopqrstuvwxyz",
    colors = ["#00FFFF", "#00FF00", "#FF00FF", "#ADD8E6", "#C0C0C0", "#95B9C7", "#6698FF", "#CDFFFF", "#ADDFFF", "#7FFFD4", "#52D017", "#99C68E", "#7FE817", "#5EFB6E", "#8AFB17", "#CCFB5D", "#B1FB17", "#FFFF00", "#FFF380", "#FFE87C", "#EDDA74", "#F5F5DC", "#FFDB58", "#FFD801", "#FDD017", "#E9AB17", "#FFA62F", "#FFCBA4", "#E8A317", "#D4A017", "#FFA500", "#F87217", "#FF8040", "#F9966B", "#FF7F50", "#FF0000", "#E77471", "#E8ADAA", "#FCDFFF", "#FAAFBE", "#F778A1", "#F660AB", "#F52887", "#F433FF", "#A74AC7", "#8E35EF", "#8467D7", "#C45AEC", "#E238EC", "#E9CFEC", "#E3E4FA", "#FEFCFF", "#FFFFFF"],
    teams = [],
    jeopardy = {
        "categories": [
            {
                "name": "MUSEUM OF MODERN _____",
                "questions": [
                    {
                        "value": 200,
                        "question": "How many tertiary colors exist?",
                        "choices": [
                            "six",
                            "four",
                            "nine",
                            "three",
                            "twelve"
                        ],
                        "answer": "six"
                    },
                    {
                        "value": 400,
                        "question": "For approximately how long did Britain dominate India?",
                        "choices": [
                            "two centuries",
                            "three centuries",
                            "four centuries",
                            "one century",
                            "five centuries"
                        ],
                        "answer": "two centuries"
                    },
                    {
                        "value": 600,
                        "question": "Why is the Buddha sometimes represented by an empty throne?",
                        "choices": [
                            "Nobody knows what he looked like.",
                            "His followers see him as royalty.",
                            "He is no longer a physical being.",
                            "It is considered sacrilege to depict such a holy figure.",
                            "He did not want others to view him as important."
                        ],
                        "answer": "He is no longer a physical being.",
                        "dailyDouble": true
                    },
                    {
                        "value": 800,
                        "question": "The Taj Mahal is am important example of",
                        "choices": [
                            "Jain architecture",
                            "Buddhist architecture",
                            "Indus Valley civilization architecture",
                            "Hindu architecture",
                            "Islamic architecture"
                        ],
                        "answer": "Islamic architecture"
                    },
                    {
                        "value": 1000,
                        "question": "To suggest a feeling of activity, an artist would MOST likely use",
                        "choices": [
                            "horizontal lines",
                            "vertical lines",
                            "implied lines",
                            "dotted lines",
                            "curved lines"
                        ],
                        "answer": "curved lines"
                    }
                ]
            },
            {
                "name": "PLANES: ____ CLASS",
                "questions": [
                    {
                        "value": 200,
                        "question": "Microeconomics uses all of the following models EXCEPT",
                        "choices": [
                            "the demand curve",
                            "the marginal revenue curve",
                            "a perfectly competitive market",
                            "a perfectly inelastic supply curve",
                            "the short-run aggregate supply curve"
                        ],
                        "answer": "the short-run aggregate supply curve"
                    },
                    {
                        "value": 400,
                        "question": "India's per capita income is about",
                        "choices": [
                            "$1500",
                            "$3500",
                            "$2500",
                            "$500",
                            "$4500"
                        ],
                        "answer": "$1500"
                    },
                    {
                        "value": 600,
                        "question": "The negative slope of the production possibility curve is evidence of",
                        "choices": [
                            "the law of supply",
                            "the law of demand",
                            "taxes",
                            "rent seeking",
                            "opportunity cost"
                        ],
                        "answer": "opportunity cost"
                    },
                    {
                        "value": 800,
                        "question": "If the money supply is 50 million, the velocity of money is 5, and the price level is 25, what is real Gross Domestic Product?",
                        "choices": [
                            "6.25 billion",
                            "400,000",
                            "250 million",
                            "2.5 million",
                            "10 million"
                        ],
                        "answer": "e. 10 million <br/> According to the quantity equation, MV = PY where M is the money supply, V is the velocity of money, P is the price level, and Y is real Gross Domestic Product. Therefore, Y = MV / P.",
                    },
                    {
                        "value": 1000,
                        "question": "How does the Coase Theorem affect the resolution of externalities?",
                        "choices": [
                            "The Coase Theorem describes possible paths to address both negative and positive externalities.",
                            "The Coase Theorem states that externalities can be resolved as long as both parties are free to negotiate.",
                            "The Coase Theorem posits that externalities cannot be resolved without government intervention.",
                            "The Coase Theorem establishes guidelines to resolve externalities through government intervention.",
                            "The Coase Theorem suggests that only positive externalities can be resolved."
                        ],
                        "answer": "The Coase Theorem states that externalities can be resolved as long as both parties are free to negotiate."
                    }
                ]
            },
            {
                "name": "ACADEMIC DISCIPLINE DEALING WITH SOCIETY",
                "questions": [
                    {
                        "value": 200,
                        "question": "Which form of Indian separatist movement has been MOST difficult to stem?",
                        "choices": [
                            "linguistic separatism",
                            "geographic separatism",
                            "ethnic separatism",
                            "religious separatism",
                            "racial separatism"
                        ],
                        "answer": "linguistic separatism"
                    },
                    {
                        "value": 400,
                        "question": "Vijayanagara's advantage over its rivals came as a result of its",
                        "choices": [
                            "trading connections",
                            "education system",
                            "policy of religious toleration",
                            "military prowess",
                            "government structure"
                        ],
                        "answer": "military prowess"
                    },
                    {
                        "value": 600,
                        "question": "Internationally, Nehru was PRIMARILY a supporter of",
                        "choices": [
                            "the Organization of Petroleum Exporting Countries",
                            "Asian and African nationalism",
                            "the British Commonwealth",
                            "the Soviet Union in the Cold War",
                            "the United States in the Cold War"
                        ],
                        "answer": "Asian and African nationalism"
                    },
                    {
                        "value": 800,
                        "question": "Which Governor-General oversaw a period of colonial expansion in India at the turn of the nineteenth century?",
                        "choices": [
                            "Cornwallis",
                            "Bentinck",
                            "Dalhousie",
                            "Wellesley",
                            "Hastings"
                        ],
                        "answer": "Wellesley"
                    },
                    {
                        "value": 1000,
                        "question": "Which of the following pairs does NOT correctly match an Indian Prime Minister with his or her political party?",
                        "choices": [
                            "I.K. Gujarat; Janata Dal",
                            "V.P. Singh; Janata Dal",
                            "Chandra Shekhar; Samajwadi Janata Party",
                            "H.D. Deve Gowda; Indian National Congress",
                            "Atal Bihari Vajpayee; Bharatiya Janata Party"
                        ],
                        "answer": "H.D. Deve Gowda; Indian National Congress"
                    }
                ]
            },
            {
                "name": "SOUND OF ____",
                "questions": [
                    {
                        "value": 200,
                        "question": "Common <i>talas</i> range from",
                        "choices": [
                            "4 to 14 beats",
                            "6 to 16 beats",
                            "3 to 13 beats",
                            "7 to 17 beats",
                            "5 to 15 beats"
                        ],
                        "answer": "6 to 16 beats"
                    },
                    {
                        "value": 400,
                        "question": "Which two languages are used in \"Mere Dil Mein Khayal Aata Hai\"?",
                        "choices": [
                            "Bengal and Arabic",
                            "Hindi and Urdu",
                            "Tamil and Telugu",
                            "Punjabi and Gujarati",
                            "Kannada and Malayam"
                        ],
                        "answer": "Hindi and Urdu"
                    },
                    {
                        "value": 600,
                        "question": "Identify the largest nation in South Asia.",
                        "choices": [
                            "Bangladesh",
                            "Sri Lanka",
                            "Pakistan",
                            "India",
                            "Bhutan"
                        ],
                        "answer": "India"
                    },
                    {
                        "value": 800,
                        "question": "Hindustani music refers to the music of",
                        "choices": [
                            "Sikh rituals",
                            "Keralan rulers",
                            "North India",
                            "Himalayan monks",
                            "Bengali customs"
                        ],
                        "answer": "North India"
                    },
                    {
                        "value": 1000,
                        "question": "How many <i>shrutis</i> are in Ga?",
                        "choices": [
                            "5",
                            "2",
                            "3",
                            "4",
                            "1"
                        ],
                        "answer": "2"
                    }
                ]
            },
            {
                "name": "AP _____ AND COMPOSITION",
                "questions": [
                    {
                        "value": 200,
                        "question": "<i>Nectar in a Sieve</i> is MOST similar to a(n)",
                        "choices": [
                            "memoir",
                            "parable",
                            "morality play",
                            "biography",
                            "autobiography"
                        ],
                        "answer": "memoir"
                    },
                    {
                        "value": 400,
                        "question": "Why did Mohandas Gandhi claim \"the English language cannot go\"?",
                        "choices": [
                            "No other language was as universal in India.",
                            "Indians were required to learn it in school.",
                            "The Indians could not thrive without it.",
                            "It belonged to the world, not just to Britain.",
                            "The Indian National Congress approved it."
                        ],
                        "answer": "It belonged to the world, not just to Britain."
                    },
                    {
                        "value": 600,
                        "question": "Why was Ruku only able to marry a poor tenant farmer in <i>Nectar in a Sieve?</i>",
                        "choices": [
                            "There were few marriageable men in her village.",
                            "She was from a low social caste.",
                            "Her father did not believe she deserved a better life.",
                            "Her family could not afford to pay a large dowry.",
                            "Nathan was highly esteemed in the village."
                        ],
                        "answer": "Her family could not afford to pay a large dowry."
                    },
                    {
                        "value": 800,
                        "question": "Jawaharlal Nehru's family was",
                        "choices": [
                            "Bihari",
                            "Hindi",
                            "Punjabi",
                            "Bengali",
                            "Kashmiri"
                        ],
                        "answer": "Kashmiri"
                    },
                    {
                        "value": 1000,
                        "question": "Jawaharlal Nehru did NOT think that modern India should be",
                        "choices": [
                            "sovereign",
                            "secular",
                            "socialist",
                            "democratic",
                            "nationalist"
                        ],
                        "answer": "nationalist"
                    }
                ]
            },
            {
                "name": "KUNICK/HEISER",
                "questions": [
                    {
                        "value": 200,
                        "question": "Carbon, nitrogen, and phosphorus all",
                        "choices": [
                            "encounter plants at some point in their ecosystem cycles",
                            "are present in significant amounts in the atmosphere",
                            "must undergo fixation before organisms can use them",
                            "form compounds after photosynthesis",
                            "are present in significant amounts in the soil"
                        ],
                        "answer": "encounter plants at some point in their ecosystem cycles"
                    },
                    {
                        "value": 400,
                        "question": "Which of the following organisms would MOST likely be an intermediate species in a marine ecosystem?",
                        "choices": [
                            "cod",
                            "great white sharks",
                            "seaweed",
                            "killer whales",
                            "phytoplankton"
                        ],
                        "answer": "cod"
                    },
                    {
                        "value": 600,
                        "question": "Chloe is choosing 6 classes for next semester from 10 core classes and 12 electives. If she must take at least 4 \"core\" classes, how many distinct sets of classes can she choose?",
                        "choices": [
                            "13,860",
                            "17,094",
                            "59,528",
                            "68,750",
                            "194,040"
                        ],
                        "answer": "17,094"
                    },
                    {
                        "value": 800,
                        "question": "What is the sum of the coefficients of the expansion (2x + 8y)<sup>6</sup>?",
                        "choices": [
                            "100,000",
                            "500,000",
                            "1,000,000",
                            "5,000,000",
                            "10,000,000"
                        ],
                        "answer": "1,000,000"
                    },
                    {
                        "value": 1000,
                        "question": "Which of the following factors is MOST directly threatening global biodiversity?",
                        "choices": [
                            "the decreasing rate of ecosystem processes",
                            "the increasing human population",
                            "the increasing rate of biogeochemical processes",
                            "the decrease of global temperatures",
                            "the decreasing rate of biotic invasions"
                        ],
                        "answer": "the increasing human population"
                    }
                ]
            }
        ],
        "final": {
            "category": "NONE",
            "question": "Why did the chicken cross the road?",
            "answer": "To get to the other side!"
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
    var category = jeopardy.categories[Math.floor(id / 10)],
        question = category.questions[id % 10];
    $("display").innerHTML = "<table style='width:100%; height:90%' class='game'><th><img src='daily_double.png' onclick='setWager(" + id + ")'/><br/><br/><font color='#E5915C' size=5>Enter Wager:&nbsp;$&nbsp;</font><input type='number' id='dailyDouble' step='100' min='0' max='17800' value='" + question.value + "'/></th></table>";
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
    var category = jeopardy.categories[Math.floor(id / 10)],
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

function nextRound() {
    alert("This function is not coded yet");
}

function initDoubleJeopardy() {
    doubleJeopardy = true;
    usedQs = [];
    createJeopardyBoard();
}

function initFinalJeopardy() {
    var question = jeopardy["final"];
}

function end() {
    alert("This function is not coded yet");
}

function createJeopardyBoard() {
    currentMode = "board";
    wager = 0;
    var out = ["<table style='width:100%; height:90%' class='game'><tr>"],
        categories = jeopardy.categories,
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
            out.push("<th><input id='team" + i + "' value='" + team.name + " | " + team.color + "'></input></th>");
        }
        out.push("<th style='width:2%'><a href='javascript:;' style='color:green; text-decoration: none' onclick='addTeam()'>+</a></th>");
        out.push("<th style='width:13%' rowspan=2>");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='back()'>Back</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='skip()'>Skip</a> &nbsp;&nbsp;&nbsp;");
        out.push("<a href='javascript:;' style='color:#E5915C' onclick='end()'>End</a><br/>");
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