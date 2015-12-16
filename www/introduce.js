window.onload = function(){
    var regionId = Number(localStorage.getItem('regionId'));
    var imagePath;
    var stampName = mRegionData[regionId].name;
    var exp = mRegionData[regionId].explanation;
    var element;
    if(localStorage.getItem(regionId)=='acquired'){
        imagePath = mRegionData[regionId].imagePath;
        element = $(
            '<p>' + stampName + '研究室</p>'
            + '<p>' + exp + '</p>'
        );
    }else{
        imagePath = './ui/images/questionM.png';
        element = $(
            '<p>' + stampName + '研究室</p>'
            + '<p>' + 'まだスタンプが押されていません' + '</p>'
        );
    }
    
    $('img#stampimg').attr({"src": imagePath });
    $('p#introduceMessage').append(element);
};