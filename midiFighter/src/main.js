import AudioPlayer from './AudioPlayer.js';

const lowerBandThreshold = 360;
const higherBandThreshold = 3600;

let player = new AudioPlayer('./public/Basic_Rock_135.wav', lowerBandThreshold, higherBandThreshold);
player.audioCtx.suspend();                     //auf default PAUSE
playPause();
speed();
volume();
filter();
visualize();  
setBackgroundBeat();


function setBackgroundBeat(){
    document.getElementById("beatDropdown").addEventListener('change', function() {
        if (document.querySelector('#playPause').innerHTML === 'PAUSE') {
            player.audioCtx.suspend();         //PAUSE
            document.querySelector('#playPause').innerHTML = 'PLAY';
        }

        player.audioCtx.suspend();
        var audioPath = this.options[this.selectedIndex].value;
        player = new AudioPlayer('./public/'.concat(audioPath), lowerBandThreshold, higherBandThreshold);
        player.audioCtx.suspend();
    });
    
}

function speed(){
    document.getElementById("speed").addEventListener('input', function () {
        player.source.playbackRate.value = this.value;
    });
}

function playPause(){
    document.getElementById("playPause").addEventListener('click', function () {
        if (document.querySelector('#playPause').innerHTML === 'PLAY') {
            player.audioCtx.resume();          //PLAY
            document.querySelector('#playPause').innerHTML = 'PAUSE';
        }else {
            player.audioCtx.suspend();         //PAUSE
            document.querySelector('#playPause').innerHTML = 'PLAY';
        }
    });
}

function volume(){
    document.getElementById("volume").addEventListener('input', function () {
        player.gainNode.gain.value = this.value;
    });
}

function filter(){
    document.getElementById("lowpassfilter").addEventListener('input', function () {
        player.lowpassfilter.gain.value = this.value;
    });

    document.getElementById("midpassfilter").addEventListener('input', function () {
        player.midfilter.gain.value = this.value;

    });

    document.getElementById("highpassfilter").addEventListener('input', function () {
        player.highpassfilter.gain.value = this.value; 
    });
}

function visualize(){
        var drawVisual = requestAnimationFrame(visualize);          //for loop
        player.analyser.getByteTimeDomainData(player.dataArray);  
        player.canvas.fillStyle = 'rgb(0, 0, 0)';                  //background color
        player.canvas.fillRect(0, 0, 200, 100);                    //0,0,width,height

        player.canvas.lineWidth = 1.0;
        player.canvas.strokeStyle = 'rgb(255, 0, 0)';
        player.canvas.beginPath();                                 

        var sliceWidth = 200 * 1.0 / player.bufferLength;          //width * 1.0 / bufferlength
        var x = 0;

        for(var i = 0; i < player.bufferLength; i++) {
            var v = player.dataArray[i] / 130.0;
            var y = v * 100/2;                                      //v * hight/2
    
            if(i === 0) {                                       
                player.canvas.moveTo(x, y);
            } else {
                player.canvas.lineTo(x, y);
            }
            x += sliceWidth;
        }

        player.canvas.lineTo(player.c.width, player.c.height/2);
        player.canvas.stroke();  
}