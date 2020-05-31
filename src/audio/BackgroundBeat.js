export default class BackgroundBeatPlayer{

    constructor(URL, audContext, analyser){
        this.analyser = analyser;
        this.setAudio(URL);
        this.audioCtx = audContext;

        //CREATE BUFFER SOURCE
        this.source = this.audioCtx.createBufferSource();
        this.source.loop = true;
        this.source.start(0);

        //GainNode.gain -> VOLUME
        this.gainNode = this.audioCtx.createGain();


        //VISUALISATION
        //this.analyser = this.audioCtx.createAnalyser();
        //this.analyser.fftSize = 256;
        //this.bufferLength = this.analyser.frequencyBinCount;
        //this.dataArray = new Uint8Array(this.bufferLength);
        //this.analyser.getByteTimeDomainData(this.dataArray);
        //this.c = document.getElementById("canvas");
        //this.canvas = this.c.getContext("2d");
        //this.canvas.clearRect(0, 0, 200, 100);

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

    stopAndDisconnect(){//for the case that a new sound was choosen
        this.source.stop();
        this.gainNode.disconnect(this.analyser);
    }

    setBuffer(buffer){
        this.source.buffer = buffer;
        this.connectAllProperties();
    }

    connectAllProperties(){
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.analyser);
        //this.highpassfilter.connect(this.midfilter);
        //this.midfilter.connect(this.lowpassfilter);
        //this.lowpassfilter.connect(this.analyser);
        //this.analyser.connect(this.audioCtx.destination);
    }

}
