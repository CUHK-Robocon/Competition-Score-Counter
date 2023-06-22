var blueScore = 0, redScore = 0;
var numBlue = 0, numRed = 0;
var pole = new Array(11);
var poleHashMap = new Map([
    ["0a", [0, 25, 10]], ["0b", [1, 25, 10]], ["0c", [2, 25, 10]], 
    ["1a", [3, 10, 25]], ["1b", [4, 10, 25]], ["1c", [5, 10, 25]], 
    ["2a", [6, 30, 30]], ["2b", [7, 30, 30]], ["2c", [8, 30, 30]], ["2d", [9, 30, 30]],
    ["3", [10, 70, 70]] 
]);
// var numOfArrow = new Array(3);
// var score = new Array(3);
// var sequence = [];

var distance = 180000, timerInt = null;
var timer_start = false, endgame = false;

// Loop to create 2D array using 1D array
for (var i = 0; i < 11; i++) {
    pole[i] = 0;
}

//  onload()
$(document).ready(function () {
    //   adjust size of field
    $("#section-normal-field").height($("#section-normal-field").width() * 2725 / 2971);
    updateAll();
});

function updateAll() {
    document.getElementById("blueScore").innerHTML = blueScore.toString();
    document.getElementById("redScore").innerHTML = redScore.toString();
    updateMessage();

    if (timer_start) {
        document.getElementById("start-button-set").style.display = 'none';
        document.getElementById("pause-button-set").style.display = 'flex';
    } else {
        document.getElementById("start-button-set").style.display = 'flex';
        document.getElementById("pause-button-set").style.display = 'none';
    }

    // if (sequence.length) {
    //     $('#reverse-button').removeAttr('disabled');
    // } else {
    //     $('#reverse-button').attr('disabled', 'disabled');
    // }

    if(numBlue >= 8 || numRed >= 8){
        if (timer_start){
            stopTimer();
        }
        $('#start-button').attr('disabled', 'disabled');
        $('#section-normal-field button').attr('disabled', 'disabled');
    }else{
        $('#start-button').removeAttr('disabled');
        $('#section-normal-field button').removeAttr('disabled');
    }
}

function add(poleID) {
    poleIdx = poleHashMap.get(poleID)[0];
    if (pole[poleIdx] == 0) {
        pole[poleIdx] = 1;
        document.getElementById(poleID).className = "btn pole btn-primary";
        blueScore += poleHashMap.get(poleID)[1];
        numBlue += 1;
    } else if (pole[poleIdx] == 1) {
        pole[poleIdx] = 2;
        document.getElementById(poleID).className = "btn pole btn-danger";
        blueScore -= poleHashMap.get(poleID)[1];
        redScore += poleHashMap.get(poleID)[2];
        numBlue -= 1;
        numRed += 1;
    } else {
        pole[poleIdx] = 1;
        document.getElementById(poleID).className = "btn pole btn-primary";
        blueScore += poleHashMap.get(poleID)[1];
        redScore -= poleHashMap.get(poleID)[2];
        numBlue += 1;
        numRed -= 1;
    }
    updateAll();
}

//  reverse process
// function reverse() {
//     if (sequence.length) {
//         var pot = popTable();
//         var row = pot.charCodeAt(1) - 49;
//         var col = (pot.charAt(0) == 'b') ? 0 : 1;
//         numOfArrow[col][row]--;
//         updateAll();
//     }
// }

//  reset to init state
function resetScore() {
    for (var i = 0; i < 11; i++) {
        pole[i] = 0;
    }
    blueScore = 0;
    redScore = 0;
    numBlue = 0;
    numRed = 0;
    var utis = document.getElementsByClassName('pole');
    for (var i = 0; i < utis.length; i++) {
        utis[i].className = "btn pole btn-light";
    }
    updateAll();
}

function updateMessage() {
    if (numBlue >= 8) {
        document.getElementById("teamid").textContent = "Blue Team";
        document.getElementById("teamid").style.color = 'blue';
        document.getElementById("resultText").textContent = " Chey-Yo!!";
        document.getElementsByClassName('alert')[0].className = "alert alert-primary";
    } else if (numRed >= 8) {
        document.getElementById("teamid").textContent = "Red Team";
        document.getElementById("teamid").style.color = 'red';
        document.getElementById("resultText").textContent = " Chey-Yo!!";
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

//  functions related to table
// function appendTable(pot) {
//     time = 180 - parseInt(distance / 1000, 10);
//     cnt = sequence.length + 1;
//     sequence.push([pot, time]);
//     var min = parseInt(time / 60, 10);
//     var sec = time % 60;
//     var markup = "<tr id='row" + cnt + "'>"
//         + "<th scope='row'>" + cnt + "</th>"
//         + "<td>" + pot + "</td>"
//         + "<td>" + min + "' " + sec + "\"</td></tr>";
//     $("#sqtbody").append(markup);
// }

// function popTable() {
//     var pot = sequence.pop()[0];
//     cnt = sequence.length + 1;
//     $("#row" + cnt).remove();
//     return pot;
// }

// function clearTable() {
//     sequence.length = 0;
//     $("#sqtbody").children("tr").remove();
// }

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
