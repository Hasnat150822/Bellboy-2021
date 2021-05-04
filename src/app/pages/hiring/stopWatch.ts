var hr:any = 0;
var min:any = 0;
var sec:any = 0;
var stoptime = true;

export function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
export function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

export function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

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

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }
  }
}

export function resetTimer() {
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
} 