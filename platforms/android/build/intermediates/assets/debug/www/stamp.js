window.onload = function(){
    
    //DOM Storage
    var beaconMinor = Number(localStorage.getItem('beaconMinor'));

    
//    //画像のパス
//    var imagePath = "";
//    
//    var stampName = "";
    
//    switch(beaconMinor){
//        case 1:
//            imagePath = "./ui/images/olaf.png";
//            stampName = "カートハウス・オラフ";
//            break;
//        case 2:
//            imagePath = "./ui/images/daiji.jpg";
//            stampName = "小林大二";
//            break;
//        default:
//            imagePath = "./ui/images/none.jpg";
//            stampName = "hattenおじさん";
//            break;
//    }
    
    $("img#stampimg").attr({"src": laboratory[beaconMinor].imagePath});
    $("p#getStampMessage").append(laboratory[beaconMinor].stampName + "を入手した！");
    
};