var blueScore = 0, redScore = 0;
var numOfArrow = new Array(2);
var victory = false;
 
// Loop to create 2D array using 1D array
for (var i = 0; i < 2; i++) {
    numOfArrow[i] = new Array(5);
}

for (var i = 0; i < 2; i++) {
    for(var j = 0; j < 5; j++){
        numOfArrow[i][j] = 0;
    }
}

function add1(pot){
    if(!victory){
        var col = 0, row = pot.charCodeAt(1)-49;
        if(pot.charAt(0) == 'r'){
            col = 1;
        }
        numOfArrow[col][row]++;
        document.getElementById(pot).textContent = numOfArrow[col][row].toString();
        updateScore();
        compare();
    }
}

function minus1(pot){
    if(!victory){
        var col = 0, row = pot.charCodeAt(1)-49;
        if(pot.charAt(0) == 'r'){
            col = 1;
        }
        if(numOfArrow[col][row] > 0){
            numOfArrow[col][row]--;
        }
        document.getElementById(pot).textContent = numOfArrow[col][row].toString();
        updateScore();
        compare();
    }   
}

function updateScore(){
    var score = 0;
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < 5; j++){
            if(numOfArrow[i][j] <= 4){
                if(numOfArrow[i][j] % 2 == 0){
                    score += numOfArrow[i][j] * 2;
                }else{
                    score += numOfArrow[i][j] * 2 - 1;
                }
            }else{
                score += numOfArrow[i][j] + 4;
            }
        }
        if(i == 0){
            blueScore = score;
        }else{
            redScore = score;
        }
        score = 0;
    }
    document.getElementById("blueScore").innerHTML = blueScore.toString();
    document.getElementById("redScore").innerHTML = redScore.toString();
    
}

function reset(){
    for(var i = 1; i <= 5; i++){
        document.getElementById("b" + i).textContent = "0";
        document.getElementById("r" + i).textContent = "0";
        numOfArrow[0][i-1] = 0;
        numOfArrow[1][i-1] = 0;
    }
    updateScore();
    redScore = 0;
    blueScore = 0;
    victory = false;
}

function compare(){
    var flag = true;
    for(var i = 0; i < 2; i++){
        for(var j = 0; j < 5; j++){
            flag = flag && numOfArrow[i][j] >= 2;
        }
        if(flag){
            victory = true;
            if(i == 0){
                document.getElementById("teamid").textContent = "Blue Team";
                document.getElementById("teamid").style.color = 'blue';
            }else{
                document.getElementById("teamid").textContent = "Red Team";
                document.getElementById("teamid").style.color = 'red';
            }
            document.getElementById("resultText").textContent = " Great Victory!!";
            flag = false;
        }else{
            flag = true;
        }
    }
    if(flag){
        if(blueScore > redScore){
            document.getElementById("teamid").textContent = "Blue Team";
            document.getElementById("teamid").style.color = 'blue';
            document.getElementById("resultText").textContent = " is leading.";
        }else if(redScore > blueScore){
            document.getElementById("teamid").textContent = "Red Team";
            document.getElementById("teamid").style.color = 'red';
            document.getElementById("resultText").textContent = " is leading.";
        }else if(redScore == blueScore && blueScore == 0){
            document.getElementById("resultText").textContent = "";
            document.getElementById("teamid").textContent = ""
        }else{
            document.getElementById("resultText").textContent = "Fair.";
            document.getElementById("teamid").textContent = "";
        }
    }
}