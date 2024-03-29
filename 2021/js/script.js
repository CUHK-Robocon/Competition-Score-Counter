var blueScore = 0, redScore = 0, onlineScore = 0;
var numOfArrow = new Array(3);
var score = new Array(3);
var sequence = [];

var distance = 180000, timerInt = null;
var timer_start = false, online = true, endgame = false;

// Loop to create 2D array using 1D array
for (var i = 0; i < 3; i++) {
    numOfArrow[i] = new Array(8);
    score[i] = new Array(8);
}

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 8; j++) {
        numOfArrow[i][j] = 0;
        score[i][j] = 0;
    }
}

//  onload()
$(document).ready(function () {
    //  default online mode
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'checkbox') {
            inputs[i].checked = true;
        }
    }
    //   adjust size of field
    $("#section-online-field").height($("#section-online-field").width() * 7 / 8);
    $("#section-normal-field").height($("#section-normal-field").width());
    $("#section-normal-field").hide();
    updateAll();
});

function updateAll() {
    updateScore();
    updateMessage();

    if (timer_start) {
        document.getElementById("start-button-set").style.display = 'none';
        document.getElementById("pause-button-set").style.display = 'flex';
    } else {
        document.getElementById("start-button-set").style.display = 'flex';
        document.getElementById("pause-button-set").style.display = 'none';
    }

    if (sequence.length) {
        $('#reverse-button').removeAttr('disabled');
    } else {
        $('#reverse-button').attr('disabled', 'disabled');
    }

    endgame = isGreatVic("blue") || isGreatVic("red") || isAllArrow();
    if(endgame){
        if (timer_start){
            stopTimer();
        }
        $('#start-button').attr('disabled', 'disabled');
        $('#section-online-field button, #section-normal-field button').attr('disabled', 'disabled');
    }else{
        $('#start-button').removeAttr('disabled');
        $('#section-online-field button, #section-normal-field button').removeAttr('disabled');
    }
}

//  pot: add 1 arrow
function add(pot) {
    if (online) {
        var col = 2;
    } else {
        var col = (pot.charAt(0) == 'b') ? 0 : 1;
    }

    var row = pot.charCodeAt(1) - 49;
    numOfArrow[col][row]++;
    if (online) {
        pot = (row % 2 === 0) ? 'b' + (row / 2 + 1) : 'r' + ((row + 1) / 2);
    }
    appendTable(pot);
    updateAll();
}

//  reverse process
function reverse() {
    if (sequence.length) {
        var pot = popTable();
        if (online) {
            var row = (pot.charAt(0) == 'b') ? (pot.charCodeAt(1) - 49) * 2 : (pot.charCodeAt(1) - 49) * 2 + 1;
            var col = 2;
        } else {
            var row = pot.charCodeAt(1) - 49;
            var col = (pot.charAt(0) == 'b') ? 0 : 1;
        }
        numOfArrow[col][row]--;
        updateAll();
    }
}

//  reset to init state
function resetScore() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 8; j++) {
            numOfArrow[i][j] = 0;
        }
    }
    clearTable();
}

function updateScore() {
    var pot = "", potScore = "";
    if (online) {
        onlineScore = 0;
        for (var i = 0; i < 4; i++) {
            score[2][i] = numOfArrow[2][i * 2] + numOfArrow[2][i * 2 + 1];
            if (numOfArrow[2][i * 2] >= 1 && numOfArrow[2][i * 2 + 1] >= 1) score[2][i] += 6;
            if (numOfArrow[2][i * 2] >= 2 && numOfArrow[2][i * 2 + 1] >= 2) score[2][i] += 6;
            if (numOfArrow[2][i * 2] >= 3 && numOfArrow[2][i * 2 + 1] >= 3) score[2][i] += 6;

            pot = "o" + (i * 2 + 1);
            document.getElementById(pot).innerHTML = numOfArrow[2][i * 2].toString();
            pot = "o" + (i * 2 + 2);
            document.getElementById(pot).innerHTML = numOfArrow[2][i * 2 + 1].toString();
            potScore = "scoreo" + (i + 1);
            document.getElementById(potScore).innerHTML = score[2][i].toString();
            onlineScore += score[2][i];
        }
        document.getElementById("onlineScore").innerHTML = onlineScore.toString();
        document.getElementById("proScore").style.width = (onlineScore / 80 * 100).toString() + "%";
    } else {
        blueScore = 0;
        redScore = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 2; j++) {
                score[j][i] = numOfArrow[j][i];
                if (numOfArrow[j][i] >= 2) score[j][i] += 2;
                if (numOfArrow[j][i] >= 4) score[j][i] += 2;

                pot = (j == 0) ? "b" + (i + 1) : "r" + (i + 1);
                potScore = (j == 0) ? "scoreb" + (i + 1) : "scorer" + (i + 1);
                document.getElementById(pot).innerHTML = numOfArrow[j][i].toString();
                document.getElementById(potScore).innerHTML = score[j][i].toString();
            }
            blueScore += score[0][i];
            redScore += score[1][i];
        }
        document.getElementById("blueScore").innerHTML = blueScore.toString();
        document.getElementById("redScore").innerHTML = redScore.toString();
    }
}

//  check if any team get Great Victory (normal mode only)
//  parameter: string "blue" / "red"
//  return value: boolean
function isGreatVic(team) {
    var flag = true;
    var i = (team === "blue") ? 0 : 1;
    for (var j = 0; j < 5; j++) {
        flag = flag && numOfArrow[i][j] >= 2;
    }
    return flag;
}

function isAllArrow() {
    var num = 0;
    for (var i = 0; i < 8; i++) {
        num += numOfArrow[2][i];
    }
    return num === 20;
}

function updateMessage() {
    if (online) {
        if (onlineScore === 80) {
            document.getElementById("resultText").textContent = "FULL MARK!!";
            document.getElementsByClassName('alert')[0].className = "alert alert-success";
        } else if (isAllArrow()) {
            document.getElementById("resultText").textContent = "All arrows have been used up :(";
            document.getElementsByClassName('alert')[0].className = "alert alert-danger";
        } else if (onlineScore === 0) {
            document.getElementById("resultText").textContent = "--";
            document.getElementsByClassName('alert')[0].className = "alert alert-info";
        } else {
            document.getElementById("resultText").textContent = "Keep going!";
            document.getElementsByClassName('alert')[0].className = "alert alert-info";
        }
    } else {
        if (isGreatVic("blue")) {
            document.getElementById("teamid").textContent = "Blue Team";
            document.getElementById("teamid").style.color = 'blue';
            document.getElementById("resultText").textContent = " Great Victory!!";
            document.getElementsByClassName('alert')[0].className = "alert alert-primary";
        } else if (isGreatVic("red")) {
            document.getElementById("teamid").textContent = "Red Team";
            document.getElementById("teamid").style.color = 'red';
            document.getElementById("resultText").textContent = " Great Victory!!";
            document.getElementsByClassName('alert')[0].className = "alert alert-danger";
        } else {
            if (blueScore > redScore) {
                document.getElementById("teamid").textContent = "Blue Team";
                document.getElementById("teamid").style.color = 'blue';
                document.getElementById("resultText").textContent = " is leading.";
                document.getElementsByClassName('alert')[0].className = "alert alert-primary";
            } else if (redScore > blueScore) {
                document.getElementById("teamid").textContent = "Red Team";
                document.getElementById("teamid").style.color = 'red';
                document.getElementById("resultText").textContent = " is leading.";
                document.getElementsByClassName('alert')[0].className = "alert alert-danger";
            } else if (redScore === 0) {
                document.getElementById("resultText").textContent = "--";
                document.getElementById("teamid").textContent = "";
                document.getElementsByClassName('alert')[0].className = "alert alert-info";
            } else {
                document.getElementById("resultText").textContent = "Fair.";
                document.getElementById("teamid").textContent = "";
                document.getElementsByClassName('alert')[0].className = "alert alert-info";
            }
        }
    }

}

//  functions related to table
function appendTable(pot) {
    time = 180 - parseInt(distance / 1000, 10);
    cnt = sequence.length + 1;
    sequence.push([pot, time]);
    var min = parseInt(time / 60, 10);
    var sec = time % 60;
    var markup = "<tr id='row" + cnt + "'>"
        + "<th scope='row'>" + cnt + "</th>"
        + "<td>" + pot + "</td>"
        + "<td>" + min + "' " + sec + "\"</td></tr>";
    $("#sqtbody").append(markup);
}

function popTable() {
    var pot = sequence.pop()[0];
    cnt = sequence.length + 1;
    $("#row" + cnt).remove();
    return pot;
}

function clearTable() {
    sequence.length = 0;
    $("#sqtbody").children("tr").remove();
}

//  functions related to timer
function startTimer() {
    timer_start = true;

    var countDownDate = new Date().getTime() + distance;
    document.getElementById("start-button-set").style.display = 'none';
    document.getElementById("pause-button-set").style.display = 'flex';
    timerInt = setInterval(function () {
        var now = new Date().getTime();
        distance = countDownDate - now;

        var minutes = parseInt(distance / 60 / 1000, 10)
        var seconds = parseInt(distance / 1000 % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("timer").innerHTML = minutes + ":" + seconds;

        if (distance < 0) {
            stopTimer();
            document.getElementById("timer").innerHTML = "00:00";
            alert("Time is up!!");
            $('#start-button').attr('disabled', 'disabled');
        }
    }, 1000);
    updateAll();
}

function stopTimer() {
    timer_start = false;
    clearInterval(timerInt);
    updateAll();
}

function resetTimer() {
    stopTimer();
    document.getElementById("timer").innerHTML = "03:00";
    distance = 180000;
    $('#start-button').removeAttr('disabled');
}

function resetAll() {
    resetScore();
    resetTimer();
    updateAll();
}


//  change game mode: online / normal
$(function () {
    $('#tonormal').change(function () {
        resetAll();
        if ($(this).prop('checked')) {
            online = true;
            document.getElementById("section-header").style.backgroundColor = '#808080';
            document.getElementById("section-online-score").style.display = 'block';
            document.getElementById("section-online-field").style.display = 'flex';
            document.getElementById("section-normal-score").style.display = 'none';
            document.getElementById("section-normal-field").style.display = 'none';

            var utis = document.getElementsByClassName('btn-uti');

            for (var i = 0; i < utis.length; i++) {
                utis[i].classList.replace("btn-primary", "btn-dark");
            }
        } else {
            online = false;
            document.getElementById("section-header").style.backgroundColor = '#0096ff';
            document.getElementById("section-online-score").style.display = 'none';
            document.getElementById("section-online-field").style.display = 'none';
            document.getElementById("section-normal-score").style.display = 'block';
            document.getElementById("section-normal-field").style.display = 'flex';

            var utis = document.getElementsByClassName('btn-uti');

            for (var i = 0; i < utis.length; i++) {
                utis[i].classList.replace("btn-dark", "btn-primary");
            }
        }
    })
})