
/**
コールバックが何回行われているか
用途：重複コールバック実行の阻止
**/
var getStampFlag=0;
var state=0;

function getStamp() {
    if (state == 1) {
        location.href = "./stamp.html";
    }else if(state == 0){
        document.getElementById('message').innerHTML = "このちかくに　スタンプは　みつからないようだ";
        document.getElementById('message').style.color = "red";
        getStampFlag++;
        setTimeout(callback, 3000);   
    }
}

function callback() {
    getStampFlag--;
    if(getStampFlag > 0){
        return;
    }
    document.getElementById("message").innerHTML = "よくきたな ひかりのこうこうせいよ";
    document.getElementById('message').style.color = "white";
}

function jumpList() {
    location.href = "./StampList.html";
}

function jumpRanking() {
    location.href = "./Ranking.html";
}