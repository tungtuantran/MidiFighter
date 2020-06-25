export default class PadSound {

    constructor(params) {
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

        this.gainNode.gain.value = params.settings.volume;

        this.source = this.audioCtx.createBufferSource();
        this.source.playbackRate.value = params.settings.speed;

        if (params.URL !== undefined) {
            this.loadAudio(params.URL);
        } else {//if playing uploaded audio
            this.audioCtx.decodeAudioData(params.uploadedAudio).then(function (buffer) {
                this.source.buffer = buffer;
            }.bind(this));
        }

        this.connectAllProperties();
        this.source.start(0);
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

    connectAllProperties() {

        this.source.connect(this.highpassfilter);
        this.highpassfilter.connect(this.lowpassfilter);
        this.lowpassfilter.connect(this.gainNode);
        this.gainNode.connect(this.analyser);
        this.analyser.connect(this.destination);
    }

}
