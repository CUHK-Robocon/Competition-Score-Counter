var blueScore = 0, redScore = 0, onlineScore = 0;
var numOfArrow = new Array(3);
var score = new Array(3);
const sequence = [];
var victory = false;
var online = true;

let timerInt = null;
 
// Loop to create 2D array using 1D array
for (var i = 0; i < 3; i++) {
    numOfArrow[i] = new Array(8);
    score[i] = new Array(8);
}

for (var i = 0; i < 3; i++) {
    for(var j = 0; j < 8; j++){
        numOfArrow[i][j] = 0;
        score[i][j] = 0;
    }
}

function add(pot){
    if(online){
        var col = 2;
    }else{
        var col = (pot.charAt(0) == 'b')? 0 : 1;
    }

    if(!isGreatVic("blue") && !isGreatVic("red") && onlineScore < 80 && !isAllArrow()){
        var row = pot.charCodeAt(1)-49;
        numOfArrow[col][row]++;
        sequence.push(pot);
        updateScore();
        updateMessage();
    }
}

function reverse(){
    if(sequence.length){
        var pot = sequence.pop();
        var row = pot.charCodeAt(1)-49;
        var col = (pot.charAt(0) == 'b')? 0 : 1;
        if(online)  col = 2;
        numOfArrow[col][row]--;
        updateScore();
        updateMessage();
    }
}

function reset(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 8; j++){
            numOfArrow[i][j] = 0;
        }
    }
    sequence.length = 0;
    updateScore();
    updateMessage();
}

function updateScore(){
    var pot = "", potScore = "";
    if(online){
        onlineScore = 0;
        for(var i = 0; i < 8; i++){
            score[2][i] = numOfArrow[2][i];
            if(numOfArrow[2][i] >= 2)   score[2][i] += 6;
            if(numOfArrow[2][i] >= 4)   score[2][i] += 6;
            if(numOfArrow[2][i] >= 6)   score[2][i] += 6;
        
            pot = "o" + (i+1);
            potScore = "scoreo" + (i+1);
            document.getElementById(pot).innerHTML = numOfArrow[2][i].toString();
            document.getElementById(potScore).innerHTML = score[2][i].toString();
            onlineScore += score[2][i];
        }
        document.getElementById("onlineScore").innerHTML = onlineScore.toString();
    }else{
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
    }
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

function isAllArrow(){
    var num = 0;
    for(var i = 0; i < 8; i++){
        num += numOfArrow[2][i];
    }
    return num === 20;
}

function updateMessage(){
    if(online){
        if(onlineScore === 80){
            document.getElementById("resultText").textContent = "FULL MARK!!";
        }else if(isAllArrow()){
            document.getElementById("resultText").textContent = "All arrows have been used up :(";
        }else{
            document.getElementById("resultText").textContent = "Keep going!";
        }
    }else{
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
        document.getElementById("timer1").innerHTML = minutes + ":" + seconds;
    
        if (distance < 0) {
            clearInterval(timerInt);
            document.getElementById("timer").innerHTML = "00:00";
            document.getElementById("timer1").innerHTML = "00:00";
            alert("Time is up!!");
        }
    }, 1000);
}

function resetTimer(){
    clearInterval(timerInt);
    document.getElementById("timer").innerHTML = "03:00";
    document.getElementById("timer1").innerHTML = "03:00";
}

function show(status) {
    reset();
    online = (status === "online");
    if(!online){
        document.getElementById("normal-field").style.display='flex';
        document.getElementById("toonline").style.display='flex';
        document.getElementById("timer-section").style.display='flex';
        document.getElementById("score-section").style.display='flex';
        document.getElementById("online-field").style.display='none';
        document.getElementById("tonormal").style.display='none';
        document.getElementById("online-timer-section").style.display='none';
    }else{
        document.getElementById("online-field").style.display='flex';
        document.getElementById("tonormal").style.display='flex';
        document.getElementById("online-timer-section").style.display='flex';
        document.getElementById("normal-field").style.display='none';
        document.getElementById("toonline").style.display='none';
        document.getElementById("timer-section").style.display='none';
        document.getElementById("score-section").style.display='none';
    }
}