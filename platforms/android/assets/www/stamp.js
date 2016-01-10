window.onload = function(){
    
    var regionId = Number(localStorage.getItem('regionId'));
    
    var imagePath = mRegionData[regionId].imagePath;
    var stampName = mRegionData[regionId].name;
    $("img#stampimg").attr({"src": imagePath });
    $("p#getStampMessage").append( stampName + "を入手した！");
    
    localStorage.setItem(regionId, 'acquired');
    
};