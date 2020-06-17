export default class BackgroundBeatPlayer {

    //constructor(URL, audContext, analyser, streamDestination){
    constructor(params){
        if(params.URL !== undefined){
            this.speed = params.speed;
            this.volume = params.volume;

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


        }else{
            this.analyser = params.analyser;
            this.audioCtx = params.audContext;
            this.destination = params.destination;
            this.gainNode = this.audioCtx.createGain();


            this.speed = params.speed;
            this.volume = params.volume;
            console.log(params.uploadedAudio);

            this.audioCtx.decodeAudioData(params.uploadedAudio.audio).then(function (buffer) {
                console.log(this);
                this.source = this.audioCtx.createBufferSource();
                this.source.loop = true;

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
        //this.gainNode.disconnect(this.analyser);
    }

    setBuffer(buffer){
        this.source.buffer = buffer;
        this.connectAllProperties();
    }

    connectAllProperties(){

        this.source.connect(this.gainNode);
        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.destination);//needed for recording

        this.startPlaying();
    }

}
