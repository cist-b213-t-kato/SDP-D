

for(var rId in mRegionData){
//    //チェックのため
//    localStorage.setItem('2', 'not required');
    
    var stampName = mRegionData[rId].name;
    var tagId = 'region_' + rId;
    
    var imagePath;
    var element;
    if(localStorage.getItem(rId)=='acquired'){
        imagePath = mRegionData[rId].imagePath;
    }else{
        imagePath = './ui/images/questionM.png';
    }
    element = $(
        '<div class="stamp" id="' + tagId + '">'
        + '<img src="' + imagePath + '"/><br/>'
        + stampName + 'スタンプ'
        + '</div>'
    );
    $('#stampList').append(element);
    $('#'+tagId).click(function(){
        var btnid = $(this).attr("id");
        var getId = btnid.replace('region_', '');
        localStorage.setItem('regionId', getId);
        location.href = './introducePage.html';
        return false;
    });
    
    

    
}