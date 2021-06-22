var blueScore = 0, redScore = 0;
var numOfArrow = new Array(2);
var score = new Array(2);
const sequence = [];
var victory = false;

let timerInt = null;
 
// Loop to create 2D array using 1D array
for (var i = 0; i < 2; i++) {
    numOfArrow[i] = new Array(5);
    score[i] = new Array(5);
}

for (var i = 0; i < 2; i++) {
    for(var j = 0; j < 5; j++){
        numOfArrow[i][j] = 0;
        score[i][j] = 0;
    }
}

function add(pot){
    if(!isGreatVic("blue") && !isGreatVic("red")){
        var row = pot.charCodeAt(1)-49;
        var col = (pot.charAt(0) == 'b')? 0 : 1;
        numOfArrow[col][row]++;
        //document.getElementById(pot).textContent = numOfArrow[col][row].toString();
        sequence.push(pot);
        //document.getElementById("sequenceText").innerHTML = sequence;
        updateScore();
        updateMessage();
    }
}

function reverse(){
    if(sequence.length){
        var pot = sequence.pop();
        var row = pot.charCodeAt(1)-49;
        var col = (pot.charAt(0) == 'b')? 0 : 1;
        numOfArrow[col][row]--;
        //document.getElementById(pot).textContent = numOfArrow[col][row].toString();
        //document.getElementById("sequenceText").innerHTML = sequence;
        updateScore();
        updateMessage();
    }
}

function reset(){
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < 5; j++){
            numOfArrow[i][j] = 0;
        }
    }
    sequence.length = 0;
    updateScore();
    updateMessage();
}

function updateScore(){
    var pot = "", potScore = "";
    blueScore = 0;
    redScore = 0;
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 2; j++){
            score[j][i] = numOfArrow[j][i];
            if(numOfArrow[j][i] >= 2)   score[j][i] += 2;
            if(numOfArrow[j][i] >= 4)   score[j][i] += 2;

            pot = (j == 0)? "b" + (i+1): "r" + (i+1);
            potScore = (j == 0)? "scoreb" + (i+1): "scorer" + (i+1);
            document.getElementById(pot).innerHTML = numOfArrow[j][i].toString();
            document.getElementById(potScore).innerHTML = score[j][i].toString();
        }
        blueScore += score[0][i];
        redScore += score[1][i];
    }
    document.getElementById("blueScore").innerHTML = blueScore.toString();
    document.getElementById("redScore").innerHTML = redScore.toString();
    document.getElementById("sequenceText").innerHTML = sequence;   
}

//  check if any team get Great Victory
//  parameter: string "blue" / "red"
//  return value: boolean
function isGreatVic(team){
    var flag = true;
    var i = (team == "blue")? 0: 1;
    for(var j = 0; j < 5; j++){
        flag = flag && numOfArrow[i][j] >= 2;
    }
    return flag;
}

function updateMessage(){
    if(isGreatVic("blue")){
        document.getElementById("teamid").textContent = "Blue Team";
        document.getElementById("teamid").style.color = 'blue';
        document.getElementById("resultText").textContent = " Great Victory!!";
    }else if(isGreatVic("red")){
        document.getElementById("teamid").textContent = "Red Team";
        document.getElementById("teamid").style.color = 'red';
        document.getElementById("resultText").textContent = " Great Victory!!";
    }else{
        if(blueScore > redScore){
            document.getElementById("teamid").textContent = "Blue Team";
            document.getElementById("teamid").style.color = 'blue';
            document.getElementById("resultText").textContent = " is leading.";
        }else if(redScore > blueScore){
            document.getElementById("teamid").textContent = "Red Team";
            document.getElementById("teamid").style.color = 'red';
            document.getElementById("resultText").textContent = " is leading.";
        }else{
            document.getElementById("resultText").textContent = "Fair.";
            document.getElementById("teamid").textContent = "";
        }
    }
}

function startTimer(){
    var countDownDate = new Date().getTime() + 180 * 1000;
    timerInt = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var minutes = parseInt(distance / 60 / 1000, 10)
        var seconds = parseInt(distance / 1000 % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    
        if (distance < 0) {
            clearInterval(timerInt);
            document.getElementById("timer").innerHTML = "0:00";
            alert("Time is up!!");
        }
    }, 1000);
}

function resetTimer(){
    clearInterval(timerInt);
    document.getElementById("timer").innerHTML = "03:00";
}