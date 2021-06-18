var blueScore = 0, redScore = 0;
var numOfArrow = new Array(2);
 
// Loop to create 2D array using 1D array
for (var i = 0; i < numOfArrow.length; i++) {
    numOfArrow[i] = new Array(5);
}

function add1(pot){
    var count = document.getElementById(pot);
    var number = parseInt(count.textContent);
    if(number < 20){
        number++;
        count.textContent = number.toString();
    }
    updateBlue();
    updateRed();
}

function minus1(pot){
    var count = document.getElementById(pot);
    var number = parseInt(count.textContent);
    if(number > 0){
        number--;
        count.textContent = number.toString();
    }
    updateBlue();
    updateRed();
}

function updateBlue(){
    let number = [];
    number[0] = parseInt(document.getElementById("b1").textContent);
    number[1] = parseInt(document.getElementById("b2").textContent);
    number[2] = parseInt(document.getElementById("b3").textContent);
    number[3] = parseInt(document.getElementById("b4").textContent);
    number[4] = parseInt(document.getElementById("b5").textContent);

    var score = 0;
    for(var i = 0; i < 5; i++){
        if(number[i] <= 4){
            if(number[i] % 2 == 0){
                score += number[i] * 2;
            }else{
                score += number[i] * 2 - 1;
            }
        }else{
            score += number[i] + 4;
        }
    }
    blueScore = score;
    document.getElementById("blueScore").innerHTML = blueScore.toString();
}

function updateRed(){
    for(var i = 0; i < 5; i++){
        numOfArrow[1][i] = parseInt(document.getElementById("r" + i + 1).textContent);
    }

    var score = 0;
    for(var i = 0; i < 5; i++){
        if(numOfArrow[1][i] <= 4){
            if(numOfArrow[1][i] % 2 == 0){
                score += numOfArrow[1][i] * 2;
            }else{
                score += numOfArrow[1][i] * 2 - 1;
            }
        }else{
            score += numOfArrow[1][i] + 4;
        }
    }
    redScore = score;
    document.getElementById("redScore").innerHTML = redScore.toString();
}

function reset(){
    var i = 0;
    for(i = 1; i <= 5; i++){
        document.getElementById("b" + i).textContent = "0";
        document.getElementById("r" + i).textContent = "0";
    }
    updateRed();
    updateBlue();
}

function compare(){

}