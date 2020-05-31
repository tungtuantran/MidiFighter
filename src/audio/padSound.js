export default class PadSound {

    constructor(URL, audContext, analyser){
        this.analyser = analyser;
        this.setAudio(URL);
        this.audioCtx = audContext;

        this.source = this.audioCtx.createBufferSource();
        this.source.start(0);

        this.gainNode = this.audioCtx.createGain();
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
    }

}
