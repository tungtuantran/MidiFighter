export default class BackgroundBeatPlayer {

    //constructor(URL, audContext, analyser, streamDestination){
    constructor(params){

        this.lowpass = parseFloat(params.settings.lowpass);
        this.highpass = parseFloat(params.settings.highpass);

        this.analyser = params.analyser;
        this.audioCtx = params.audContext;
        this.destination = params.destination;
        this.gainNode = this.audioCtx.createGain();

        //LOWPASS FILTER
        this.lowpassfilter = this.audioCtx.createBiquadFilter();
        this.lowpassfilter.type = "lowshelf";
        this.lowpassfilter.frequency.value = 360;

        //HIGHPASS FILTER
        this.highpassfilter = this.audioCtx.createBiquadFilter();
        this.highpassfilter.type = "highshelf";
        this.highpassfilter.frequency.value = 3600;

        this.lowpassfilter.gain.value = parseFloat(params.settings.lowpass);
        this.highpassfilter.gain.value = parseFloat(params.settings.highpass);


        this.source = this.audioCtx.createBufferSource();
        this.source.loop = true;

        this.gainNode.gain.value = params.settings.volume;
        this.source.playbackRate.value = params.settings.speed;

        if(params.URL !== undefined){
            this.loadAudio(params.URL);
        }else{
            this.audioCtx.decodeAudioData(params.uploadedAudio).then(function (buffer) {
                this.source.buffer = buffer;
            }.bind(this));
        }
        this.connectAllProperties();
    }

    loadAudio(path){
        if (!path) {
            alert("No URL specified!");
            return;
        }
        fetch(path)
            .then(data => data.arrayBuffer())
            .then(arrayBuffer => this.audioCtx.decodeAudioData(arrayBuffer))
            .then(decodedAudio => {
                this.source.buffer = decodedAudio;
            });
    }


    stopAndDisconnect(){//for the case that a new sound was choosen
        this.source.stop();
    }


    connectAllProperties(){

        this.source.connect(this.gainNode);
        this.gainNode.connect(this.highpassfilter);
        this.highpassfilter.connect(this.lowpassfilter);
        this.lowpassfilter.connect(this.analyser);
        this.analyser.connect(this.destination);


        this.source.start();
    }

}
