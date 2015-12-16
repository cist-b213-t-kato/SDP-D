

for(var rId in mRegionData){
//    //チェックのため
//    localStorage.setItem('2', 'not required');
    
    var stampName = mRegionData[rId].name;
    var tagId = 'region_' + rId;
    
    var imagePath;
    if(localStorage.getItem(rId)=='acquired'){
        imagePath = mRegionData[rId].imagePath;
        $('#'+tagId).click(function(){
            var btnid = $(this).attr("id");
            var getId = btnid.replace('region_', '');
            localStorage.setItem('regionId', getId);
            location.href = './index.html';
            return false;
        });
    }else{
        imagePath = './ui/images/questionM.png';
    }
    
    var element = $(
        '<span class="stamp" id="' + tagId + '">'
        + '<img src="' + imagePath + '"/><br/>'
        + stampName
        + '</span>'
    );
    $('#stampList').append(element);
    

    
}