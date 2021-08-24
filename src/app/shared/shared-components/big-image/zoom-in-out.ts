export function zoomin(id){
    var myImg = document.getElementById(id);
    var currWidth = myImg.clientWidth;
    var currHeight = myImg.clientHeight;
    //if(currWidth == 2500) return false;
    // else{
    //    myImg.style.width = (currWidth + 100) + "px";
    //} 
    myImg.style.width = (currWidth + 100) + "px";
    myImg.style.height = (currHeight + 100) + "px";
}
export function zoomout(id){
    var myImg = document.getElementById(id);
    var currWidth = myImg.clientWidth;
    var currHeight = myImg.clientHeight;
    if(currWidth == 100 || currHeight == 100) return false;
 else{
        myImg.style.width = (currWidth - 100) + "px";
        myImg.style.height = (currHeight - 100) + "px";
    }
}