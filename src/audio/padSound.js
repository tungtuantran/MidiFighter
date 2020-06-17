export default class PadSound {

    constructor(params) {
        if (params.URL !== undefined) {
            this.speed = params.speed;
            this.volume = params.volume;
            this.lowpass = parseFloat(params.lowpassfilter);
            this.highpass = parseFloat(params.highpassfilter);

            this.analyser = params.analyser;
            this.setAudio(params.URL);
            this.audioCtx = params.audContext;

            this.destination = params.destination;

            this.source = this.audioCtx.createBufferSource();
            this.source.start(0);

            this.gainNode = this.audioCtx.createGain();

            //LOWPASS FILTER
            this.lowpassfilter = this.audioCtx.createBiquadFilter();
            this.lowpassfilter.type = "lowshelf";
            this.lowpassfilter.frequency.value = 360;
    
            //HIGHPASS FILTER
            this.highpassfilter = this.audioCtx.createBiquadFilter();
            this.highpassfilter.type = "highshelf";
            this.highpassfilter.frequency.value = 3600;

        } else {//if playing uploaded audio

            this.analyser = params.analyser;
            this.audioCtx = params.audContext;
            this.destination = params.destination;
            this.gainNode = this.audioCtx.createGain();

            this.speed = params.speed;
            this.volume = params.volume;
            this.lowpass = params.lowpassfilter;
            this.highpass = params.highpassfilter;

            this.audioCtx.decodeAudioData(params.uploadedAudio.audio).then(function (buffer) {
                this.source = this.audioCtx.createBufferSource();

                //LOWPASS FILTER
                this.lowpassfilter = this.audioCtx.createBiquadFilter();
                this.lowpassfilter.type = "lowshelf";
                this.lowpassfilter.frequency.value = 360;
        
                //HIGHPASS FILTER
                this.highpassfilter = this.audioCtx.createBiquadFilter();
                this.highpassfilter.type = "highshelf";
                this.highpassfilter.frequency.value = 3600;

                this.source.playbackRate.value = this.speed;
                this.gainNode.gain.value = this.volume;

                //if (isFinite(this.lowpass) && isFinite(this.highpass)) {
                this.lowpassfilter.gain.value = this.lowpass;
                this.highpassfilter.gain.value = this.highpass;
                //}

                this.source.start(0);

                this.source.buffer = buffer;
                this.connectAllProperties();

            }.bind(this));
        }
    }

    setAudio(URL) {
        if (!URL) {
            alert("No URL specified!");
            return;
        }
        let promise = fetch(URL);
        promise.then(this.receiveResponse.bind(this));
    }

    receiveResponse(response) {
        response.arrayBuffer().then(this.receiveAudioData.bind(this));
    }

    receiveAudioData(audioData) {
        this.audioCtx.decodeAudioData(audioData, this.setBuffer.bind(this))
    }

    stopAndDisconnect() {//for the case that a new sound was choosen
        this.source.stop();
        this.gainNode.disconnect(this.analyser);
    }

    setBuffer(buffer) {
        this.source.buffer = buffer;
        this.connectAllProperties();
    }

    connectAllProperties() {
        //connection to destination is needed for recording
        /*
        this.source.connect(this.gainNode).connect(this.analyser).connect(this.destination);
        */

       this.source.connect(this.gainNode);
       this.gainNode.connect(this.highpassfilter);
       this.highpassfilter.connect(this.lowpassfilter);
       this.lowpassfilter.connect(this.analyser);
       this.analyser.connect(this.destination);
    }

}
