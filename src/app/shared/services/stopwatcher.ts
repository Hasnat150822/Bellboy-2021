
export  function timerCycle(hr, min, sec) {
    sec = sec + 1;
    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }
    let timer;
    if(hr !== 0){
      timer = `${hr} hrs ${min} mins ${sec} sec`;
    }else{
      timer = `${min} mins ${sec} sec`;
    }
    return timer;
}