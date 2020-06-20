export default class BackgroundBeatPlayer {

    //constructor(URL, audContext, analyser, streamDestination){
    constructor(params){
        console.log(params.settings.speed);
        this.speed = params.settings.speed;
        this.volume = params.settings.volume;
        this.lowpass = parseFloat(params.settings.lowpass);
        this.highpass = parseFloat(params.settings.highpass);
        if(params.URL !== undefined){

            this.analyser = params.analyser;
            this.setAudio(params.URL);
            this.audioCtx = params.audContext;
            this.destination = params.destination;


            //CREATE BUFFER SOURCE
            this.source = this.audioCtx.createBufferSource();
            this.source.loop = true;
            //this.source.start(0);

            //GainNode.gain -> VOLUME
            this.gainNode = this.audioCtx.createGain();

            // provide input for optional recording
            //this.source.connect(this.gainNode).connect(params.destination);

            //LOWPASS FILTER
            this.lowpassfilter = this.audioCtx.createBiquadFilter();
            this.lowpassfilter.type = "lowshelf";
            this.lowpassfilter.frequency.value = 360;

            //HIGHPASS FILTER
            this.highpassfilter = this.audioCtx.createBiquadFilter();
            this.highpassfilter.type = "highshelf";
            this.highpassfilter.frequency.value = 3600;


        }else{
            this.analyser = params.analyser;
            this.audioCtx = params.audContext;
            this.destination = params.destination;
            this.gainNode = this.audioCtx.createGain();

            /*
            //LOWPASS FILTER
            this.lowpassfilter = this.audioCtx.createBiquadFilter();
            this.lowpassfilter.type = "lowshelf";
            this.lowpassfilter.frequency.value = 360;

            //HIGHPASS FILTER
            this.highpassfilter = this.audioCtx.createBiquadFilter();
            this.highpassfilter.type = "highshelf";
            this.highpassfilter.frequency.value = 3600;
            */


            this.audioCtx.decodeAudioData(params.uploadedAudio).then(function (buffer) {
                console.log(this);
                this.source = this.audioCtx.createBufferSource();
                this.source.loop = true;

                //LOWPASS FILTER
                this.lowpassfilter = this.audioCtx.createBiquadFilter();
                this.lowpassfilter.type = "lowshelf";
                this.lowpassfilter.frequency.value = 360;

                //HIGHPASS FILTER
                this.highpassfilter = this.audioCtx.createBiquadFilter();
                this.highpassfilter.type = "highshelf";
                this.highpassfilter.frequency.value = 3600;

                this.source.buffer = buffer;
                this.connectAllProperties();
            }.bind(this));
        }
    }

    setAudio(URL){
        if (!URL) {
            alert("No URL specified!");
            return;
        }
        let promise = fetch(URL);
        promise.then(this.receiveResponse.bind(this));
    }


    startPlaying(){
        this.source.playbackRate.value = this.speed;
        this.gainNode.gain.value = this.volume;

        console.log("werte4: " + this.speed +" "+ this.volume + " " + this.lowpass + " " + this.highpass);

        //if (isFinite(this.lowpass) && isFinite(this.highpass)) {
        this.lowpassfilter.gain.value = this.lowpass;
        this.highpassfilter.gain.value = this.highpass;
        //}

        console.log("werte5: " + this.highpassfilter.type +" "+ this.highpassfilter.gain.value);

        this.source.start();
    }

    receiveResponse(response){
        response.arrayBuffer().then(this.receiveAudioData.bind(this));
    }

    receiveAudioData(audioData){
        this.audioCtx.decodeAudioData(audioData,this.setBuffer.bind(this))
    }

    stopAndDisconnect(){//for the case that a new sound was choosen
        this.source.stop();
        /*this.gainNode.disconnect(this.highpassfilter);
        this.highpassfilter.disconnect(this.lowpassfilter);
        this.lowpassfilter.disconnect(this.analyser);
        this.analyser.disconnect(this.destination);
        */

    }

    setBuffer(buffer){
        this.source.buffer = buffer;
        this.connectAllProperties();
    }

    connectAllProperties(){

        /*
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.destination);//needed for recording
        */

        this.source.connect(this.gainNode);
        this.gainNode.connect(this.highpassfilter);
        this.highpassfilter.connect(this.lowpassfilter);
        this.lowpassfilter.connect(this.analyser);
        this.analyser.connect(this.destination);


        this.startPlaying();
    }

}
