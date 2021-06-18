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

    var score = 0, i = 0;
    for(i = 0; i < 5; i++){
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
    document.getElementById("blueScore").innerHTML = score.toString();
}

function updateRed(){
    let number = [];
    number[0] = parseInt(document.getElementById("r1").textContent);
    number[1] = parseInt(document.getElementById("r2").textContent);
    number[2] = parseInt(document.getElementById("r3").textContent);
    number[3] = parseInt(document.getElementById("r4").textContent);
    number[4] = parseInt(document.getElementById("r5").textContent);

    var score = 0, i = 0;
    for(i = 0; i < 5; i++){
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
    document.getElementById("redScore").innerHTML = score.toString();
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