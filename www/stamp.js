window.onload = function(){
    
    //DOM Storage
    var beaconMinor = Number(localStorage.getItem('beaconMinor'));

    
    $("img#stampimg").attr({"src": laboratory[beaconMinor].imagePath});
    $("p#getStampMessage").append(laboratory[beaconMinor].stampName + "を入手した！");
    
};