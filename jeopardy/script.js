/** TO-DO:
* Have twice, one with team on bottom and one with team on top, or put on GitHub with one being pull request
* Final Jeopardy
* Skip
* End
* Timer
* Load Jeopardy from JSON
* Start page
* Unlimited rounds?
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
        "round1": [
            {
                "name": "ART",
                "questions": [
                    {
                        "value": 200,
                        "question": "The painting technique of sfumato involves",
                        "choices": [
                            "splattering",
                            "blending",
                            "layering",
                            "shading",
                            "glazing"
                        ],
                        "answer": "blending"
                    },
                    {
                        "value": 400,
                        "question": "Mahayana is a branch of",
                        "choices": [
                            "Jainism",
                            "Buddhism",
                            "Islam",
                            "Hinduism",
                            "Christianity"
                        ],
                        "answer": "Buddhism"
                    },
                    {
                        "value": 600,
                        "question": "Which nation was MOST influential in the development of miniature painting?",
                        "choices": [
                            "Egypt",
                            "Turkey",
                            "China",
                            "Persia",
                            "Italy"
                        ],
                        "answer": "Persia"
                    },
                    {
                        "value": 800,
                        "question": "The <i>Upanishads</i> envisions the universe as a",
                        "choices": [
                            "body",
                            "garden",
                            "fabric",
                            "wheel",
                            "dish"
                        ],
                        "answer": "fabric"
                    },
                    {
                        "value": 1000,
                        "question": "In paint, linseed oil is sometimes used as a",
                        "choices": [
                            "wash",
                            "slip",
                            "pigment",
                            "binder",
                            "solvent"
                        ],
                        "answer": "binder"
                    }
                ]
            },
            {
                "name": "ECONOMICS",
                "questions": [
                    {
                        "value": 200,
                        "question": "Which of the following forms of money is the LEAST liquid?",
                        "choices": [
                            "savings accounts",
                            "gold",
                            "M2",
                            "currency",
                            "traveler’s checks"
                        ],
                        "answer": "gold"
                    },
                    {
                        "value": 400,
                        "question": "Net imports equal the level of",
                        "choices": [
                            "portfolio investment",
                            "net exports",
                            "net capital outflow",
                            "foreign direct investment",
                            "net capital inflow"
                        ],
                        "answer": "net capital inflow"
                    },
                    {
                        "value": 600,
                        "question": "Which of the following adjectives does NOT describe economic models?",
                        "choices": [
                            "graphical",
                            "mathematical",
                            "generalized",
                            "simplified",
                            "descriptive"
                        ],
                        "answer": "descriptive"
                    },
                    {
                        "value": 800,
                        "question": "The expectation of a light monsoon can",
                        "choices": [
                            "encourage farmers to produce more",
                            "increase food prices",
                            "impede the participation of middle-men in the agriculture sector",
                            "reduce food prices",
                            "increase natural resource extraction in the short-term"
                        ],
                        "answer": "increase food prices",
                        "dailyDouble": true
                    },
                    {
                        "value": 1000,
                        "question": "The Consumer Price Index usually",
                        "choices": [
                            "is the same as the Gross Domestic Product deflator",
                            "does not suffer from substitution bias",
                            "overestimates the cost of living",
                            "overemphasizes the impact of improvements in quality",
                            "suffers from a constantly changing market basket"
                        ],
                        "answer": "overestimates the cost of living"
                    }
                ]
            },
            {
                "name": "SOCIAL SCIENCE",
                "questions": [
                    {
                        "value": 200,
                        "question": "The assassination of Indira Gandhi in 1984 led to retaliatory pogroms against",
                        "choices": [
                            "Hindus",
                            "Sikhs",
                            "Jains",
                            "Muslims",
                            "Buddhists"
                        ],
                        "answer": "Sikhs"
                    },
                    {
                        "value": 400,
                        "question": "Indira Gandhi justified large-scale repressive measures under the guise of",
                        "choices": [
                            "religious toleration",
                            "economic liberalization",
                            "poverty elimination",
                            "judicial conservatism",
                            "corruption purging"
                        ],
                        "answer": "poverty elimination"
                    },
                    {
                        "value": 600,
                        "question": "Sayyid Ahmed Barelvi led a campaign against followers of",
                        "choices": [
                            "Jainism",
                            "Buddhism",
                            "Islam",
                            "Hinduism",
                            "Sikhism"
                        ],
                        "answer": "Sikhism"
                    },
                    {
                        "value": 800,
                        "question": "In Awadh, following the Battle of Buxar, a treaty was signed at",
                        "choices": [
                            "Calcutta",
                            "Bihar",
                            "Allahabad",
                            "Lahore",
                            "Lucknow"
                        ],
                        "answer": "Allahabad"
                    },
                    {
                        "value": 1000,
                        "question": "Indira Gandhi’s first term as Prime Minister immediately followed the death of",
                        "choices": [
                            "Jawaharlal Nehru",
                            "Morarji Desai",
                            "Feroze Gandhi",
                            "Chaudhury Charan Singh",
                            "Lal Bahadur Shastri"
                        ],
                        "answer": "Lal Bahadur Shastri"
                    }
                ]
            },
            {
                "name": "MUSIC",
                "questions": [
                    {
                        "value": 200,
                        "question": " Indian films have been shown in international film festivals since the",
                        "choices": [
                            "1960s",
                            "1940s",
                            "1970s",
                            "1980s",
                            "1950s"
                        ],
                        "answer": "1950s"
                    },
                    {
                        "value": 400,
                        "question": "Which mountain range forms the northern border of India?",
                        "choices": [
                            "Vindhyas",
                            "Himalayas",
                            "Western Ghats",
                            "Satpuras",
                            "Saltoros"
                        ],
                        "answer": "Himalayas"
                    },
                    {
                        "value": 600,
                        "question": "Which aspect of a sound wave affects the pitch?",
                        "choices": [
                            "medium",
                            "tone",
                            "frequency",
                            "amplitude",
                            "speed"
                        ],
                        "answer": "frequency"
                    },
                    {
                        "value": 800,
                        "question": "Which of the following composers was a member of the“Trinity”?",
                        "choices": [
                            "Mutthuswami Diksitar",
                            "Bulleh Shah",
                            "Mira",
                            "Kabir",
                            "Venkatamakhin"
                        ],
                        "answer": "Mutthuswami Diksitar"
                    },
                    {
                        "value": 1000,
                        "question": "Name the lyricist of “Main Yahan Hoon.”",
                        "choices": [
                            "Vairamuthu",
                            "Sahir Ludhianvi",
                            "Shailendra",
                            "Javed Akhtar",
                            "Kidar Sharma"
                        ],
                        "answer": "Javed Akhtar"
                    }
                ]
            },
            {
                "name": "LITERATURE",
                "questions": [
                    {
                        "value": 200,
                        "question": "Which of the following writers claimed that English was an authentic Indian language?",
                        "choices": [
                            "Kamala Markandaya",
                            "Salman Rushdie",
                            "R.K. Narayan",
                            "Jaishankar Prassad",
                            "Mulk Raj Anand"
                        ],
                        "answer": "Salman Rushdie"
                    },
                    {
                        "value": 400,
                        "question": "In 1948, Kamala Markandaya moved to",
                        "choices": [
                            "Paris",
                            "Hong Kong",
                            "Mumbai",
                            "London",
                            "New York"
                        ],
                        "answer": "London"
                    },
                    {
                        "value": 600,
                        "question": "In which activity does Ruku find the MOST comfort from her pain in Nectar in a Sieve?",
                        "choices": [
                            "reading",
                            "speaking",
                            "singing",
                            "laughing",
                            "praying"
                        ],
                        "answer": "speaking"
                    },
                    {
                        "value": 800,
                        "question": "Jawaharlal Nehru and Mohandas Gandhi were similar in all the following ways EXCEPT in their",
                        "choices": [
                            "birth into high-caste families",
                            "struggle for Indian independence",
                            "training at a British law school",
                            "roles in Indian National Congress",
                            "reverence for modern science"
                        ],
                        "answer": "reverence for modern science"
                    },
                    {
                        "value": 1000,
                        "question": "Which role did Jawaharlal Nehru take in the Indian government in 1947?",
                        "choices": [
                            "Vice President",
                            "Cabinet Secretary",
                            "Prime Minister",
                            "President",
                            "Minister of State"
                        ],
                        "answer": "Prime Minister"
                    }
                ]
            },
            {
                "name": "SCIENCE/MATH",
                "questions": [
                    {
                        "value": 200,
                        "question": "Which of the following statements is true?",
                        "choices": [
                            "The mode of a set does not have to be a member of that set",
                            "A set can have more outliers than non-outliers",
                            "The standard deviation of a set can be negative",
                            "Any set has a member with a z-score with a value of 0",
                            "The median of a data set will not change if we remove both a high and low outlier"
                        ],
                        "answer": "The median of a data set will not change if we remove both a high and low outlier"
                    },
                    {
                        "value": 400,
                        "question": "Which of the following soil varieties would be the WORST at storing water?",
                        "choices": [
                            "sand",
                            "mucilage",
                            "silt",
                            "gravel",
                            "clay"
                        ],
                        "answer": "gravel"
                    },
                    {
                        "value": 600,
                        "question": "Why do the Eastern Himalayas have such high biodiversity?",
                        "choices": [
                            "There is little interspecies competition in the region so species do not experience limitation.",
                            "The elevation changes so fast that there are many ecosystems in a relatively small horizontal area.",
                            "British imperialists brought over a variety of species from Europe in the 1900s.",
                            "They are isolated from human activity, so a wide variety of species are able to thrive.",
                            "The Ganges River meets the ocean there, causing a diverse and productive estuary environment."
                        ],
                        "answer": "The elevation changes so fast that there are many ecosystems in a relatively small horizontal area."
                    },
                    {
                        "value": 800,
                        "question": "What is the best measure of central tendency in the set {1,1,3,3,3,3,4,6,6,6,7,8,52}?",
                        "choices": [
                            "Mean",
                            "Median",
                            "Mode",
                            "0.5(range)",
                            "Maximum- mean"
                        ],
                        "answer": "Median"
                    },
                    {
                        "value": 1000,
                        "question": "What is a basal species?",
                        "choices": [
                            "a species that is food for other species but does not eat other species",
                            "a species that eats deceased secondary producers",
                            "a species that is food for primary producers",
                            "a species that both eats other species and is food for other species",
                            "a species that eats other species but is not food for any species"
                        ],
                        "answer": "a species that is food for other species but does not eat other species"
                    }
                ]
            }
        ],
        "final": {
            "category": "INDIAN PRIME MINISTERS",
            "question": "Which Indian Prime Minister led the Non-Aligned Movement, sheltered the Dalai Lama, and lost a 1962 war against China?",
            "answer": "Jawaharlal Nehru"
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
    var category = !doubleJeopardy ? jeopardy.round1[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
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
    var category = !doubleJeopardy ? jeopardy.round1[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
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
    var category = !doubleJeopardy ? jeopardy.round1[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
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
    var category = !doubleJeopardy ? jeopardy.round1[Math.floor(id / 10)] : jeopardy.round2[Math.floor(id / 10)],
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
        categories = (!doubleJeopardy ? jeopardy.round1 : jeopardy.round2),
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