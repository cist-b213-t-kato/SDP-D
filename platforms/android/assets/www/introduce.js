window.onload = function(){
    var regionId = Number(localStorage.getItem('regionId'));
    var imagePath = mRegionData[regionId].imagePath;
    var stampName = mRegionData[regionId].name;
    var exp = mRegionData[regionId].explanation;
    
    var element = $(
        '<p>' + stampName + '研究室</p>'
        + '<p>' + exp + '</p>'
    );
    
    $('img#stampimg').attr({"src": imagePath });
    $('p#introduceMessage').append(element);
};