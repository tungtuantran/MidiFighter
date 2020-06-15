export default class PadSound {

    constructor(params) {
        if (params.URL !== undefined) {
            this.analyser = params.analyser;
            this.setAudio(params.URL);
            this.audioCtx = params.audContext;

            this.destination = params.destination;

            this.source = this.audioCtx.createBufferSource();
            this.source.start(0);

            this.gainNode = this.audioCtx.createGain();

        } else {//if playing uploaded audio
            this.analyser = params.analyser;
            this.audioCtx = params.audContext;
            this.destination = params.destination;
            this.gainNode = this.audioCtx.createGain();
            this.audioCtx.decodeAudioData(params.uploadedAudio.audio).then(function (buffer) {
                this.source = this.audioCtx.createBufferSource();
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
        this.source.connect(this.gainNode).connect(this.analyser).connect(this.destination);
    }

}
