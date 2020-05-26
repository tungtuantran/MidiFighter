export default class AudioPlayer{
    
    constructor(URL,lowerBandThreshold, higherBandThreshold){
        this.setAudio(URL);
        //CREATE AUDIO CONTEXT
        if (!window.AudioContext || window.webkitAudioContext) {
            alert("Web Audio API is not supported in this browser!")
            return;
        }
        this.audioCtx = new (window.AudioContext||window.webkitAudioContext)();

        //CREATE BUFFER SOURCE
        this.source = this.audioCtx.createBufferSource();
        this.source.loop = true;
        this.source.start(0);

        //GainNode.gain -> VOLUME 
        this.gainNode = this.audioCtx.createGain(); 
        
        //LOWPASS FILTER
        this.lowpassfilter = this.audioCtx.createBiquadFilter();
        this.lowpassfilter.type = "lowshelf";
        this.lowpassfilter.frequency.value = lowerBandThreshold;

        //MIDPASS FILTER
        this.midfilter = this.audioCtx.createBiquadFilter();
        this.midfilter.type = "peaking";
        this.midfilter.frequency.value = 2000;

        
        //HIGHPASS FILTER
        this.highpassfilter = this.audioCtx.createBiquadFilter();
        this.highpassfilter.type = "highshelf";
        this.highpassfilter.frequency.value = higherBandThreshold;

        //VISUALISATION
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.c = document.getElementById("canvas");
        this.canvas = this.c.getContext("2d");
        this.canvas.clearRect(0, 0, 200, 100);

    }

    setAudio(URL){
        if (!URL) {
            alert("No URL specified!");
            return;
        }
        let promise = fetch(URL);
        promise.then(this.receiveResponse.bind(this));
    }

    receiveResponse(response){
        response.arrayBuffer().then(this.receiveAudioData.bind(this));
    }

    receiveAudioData(audioData){
        this.audioCtx.decodeAudioData(audioData,this.setBuffer.bind(this))
    }
    
    setBuffer(buffer){
        this.source.buffer = buffer;
        this.connectAllProperties();
    }

    connectAllProperties(){
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.highpassfilter);
        this.highpassfilter.connect(this.midfilter);
        this.midfilter.connect(this.lowpassfilter);
        this.lowpassfilter.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
    }

}
