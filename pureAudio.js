(function() {
    this.PureAudio = function() {

        // Fixed context
        var _this = this;

        // Define default options
        this.defaultOptions = {
            autoplay: true,
            playBtn: null,
            prevBtn: null,
            nextBtn: null,
            currentTimeBlock: null,
            durationBlock: null,
            playList: []
        };

        this.indexAudio = 0;

        // Extending default options
        if(arguments[0] && typeof arguments[0] === 'object') {
            this.defaultOptions = extendDefaults(this.defaultOptions, arguments[0]);
        }

        // Get html elements for player
        var playBtn             = document.getElementById(this.defaultOptions.playBtn);
        var prevBtn             = document.getElementById(this.defaultOptions.prevBtn);
        var nextBtn             = document.getElementById(this.defaultOptions.nextBtn);
        var currentTimeBlock    = document.getElementById(this.defaultOptions.currentTimeBlock);
        var durationBlock       = document.getElementById(this.defaultOptions.durationBlock);

        // Create and configure audio tag
        initAudio();
        this.loadAudio();

        // Define events
        playBtn.addEventListener('click', this.playAudio.bind(this));
        prevBtn.addEventListener('click', this.prevAudio.bind(this));
        nextBtn.addEventListener('click', this.nextAudio.bind(this));

        setInterval(function() {
            currentTimeBlock.innerHTML = _this.getCurrentTime();
        }, 1000);

        if(this.defaultOptions.autoplay) {
            this.playAudio();
        }


        /*------------------------------------------------------*/
        function extendDefaults(defaultOptions, customOptions) {
            for(var option in customOptions) {
                if(defaultOptions.hasOwnProperty(option)) {
                    defaultOptions[option] = customOptions[option];
                }
            }
            return defaultOptions;
        }

        function initAudio() {
            _this.audioTag = document.createElement('audio');
            _this.audioTag.setAttribute('preload', 'auto');
            _this.audioTag.setAttribute('controls', 'controls');
            document.body.appendChild(_this.audioTag);
        }

    };

    PureAudio.prototype.loadAudio = function() {
        this.audioTag.setAttribute('src', this.defaultOptions.playList[this.indexAudio].file);
    }

    PureAudio.prototype.playAudio = function() {
        if(this.audioTag.paused) {
            this.audioTag.play();
        }
        else {
            this.audioTag.pause();
        }
    };

    PureAudio.prototype.prevAudio = function() {
        if(this.indexAudio !== 0) {
            this.indexAudio--;
            this.loadAudio();
            this.playAudio();
        }
    };

    PureAudio.prototype.nextAudio = function() {
        if(this.indexAudio < this.defaultOptions.playList.length - 1) {
            this.indexAudio++;
            this.loadAudio();
            this.playAudio();
        }
    };

    PureAudio.prototype.setPlaylist = function(playlist) {

    };

    PureAudio.prototype.getCurrentTime = function() {
        var totalSec = this.audioTag.currentTime;

        var hour = Math.floor(totalSec / 3600);
        if(parseInt(hour, 10) < 10) hour = "0" + hour;

        var min = Math.floor(totalSec % 3600 / 60);
        if(parseInt(min, 10) < 10) min = "0" + min;

        var sec = Math.floor(totalSec % 3600 % 60);
        if(parseInt(sec, 10) < 10) sec = "0" + sec;

        var result = (parseInt(hour, 10) !== 0) ? hour + ":" + min + ":" + sec : min + ":" + sec;

        return result;
    };


})();

var playlist = [
    { name: 'Oomph - Ich will', file: '1.mp3' },
    { name: 'Tim MacMoris - Beautiful life', file: '2.mp3' }
];

var audio = new PureAudio({
    autoplay: false,
    playBtn: 'playBtn',
    prevBtn: 'prev',
    nextBtn: 'next',
    currentTimeBlock: 'currentTime',
    durationBlock: 'time',
    playList: playlist,
    fgdg: 444
});
