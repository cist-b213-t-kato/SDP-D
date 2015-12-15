//if(mRegionData==null){
//    alert('nullじゃ');
//}else{
//    alert('nullじゃないぞ');
//}    

//$('#stampList').empty();
//var elem = $(
//    '<p>piyo</p>'
//);
//$('#stampList').append(elem);

for(var rId in mRegionData){
    //チェックのため
    localStorage.setItem('2', 'not required');
    
    var imagePath;
    if(localStorage.getItem(rId)=='acquired'){
        imagePath = mRegionData[rId].imagePath;
    }else{
        imagePath = './ui/images/questionM.png';
    }
    
    var stampName = mRegionData[rId].name;
    var tagId = 'region_' + rId;
//    alert(stampName);
    var element = $(
        '<li class="eventBox" id="' + tagId + '">'
        + '<div class="stamp">'
        + '<img src="' + imagePath
        + '" width="100" height="100"/><br/>'
        + '</div>'
        + '</li>'
    );
    $('#stampList').append(element);
    
    
}