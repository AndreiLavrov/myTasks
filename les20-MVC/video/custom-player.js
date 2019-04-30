class CustomPlayer {
    constructor() {
        this.media = document.querySelector('video');
        this.controls = document.querySelector('.controls');

        this.play = document.querySelector('.play');
        this.stop = document.querySelector('.stop');
        this.rwd = document.querySelector('.rwd');
        this.fwd = document.querySelector('.fwd');

        this.timerWraper = document.querySelector('.timer');
        this.timer = document.querySelector('.timer span');
        this.timerBar = document.querySelector('.timer div');

        this.media.removeAttribute('controls');
        this.controls.style.visibility = 'visible';
        this.subscribe();

        this.intervalFwd = null;
        this.intervalBwd = null;

    }

    subscribe() {
        this.play.addEventListener('click', () => {
            this.playPauseMedia();
        });

        this.stop.addEventListener('click', () => {
           this.stopMedia();
        });

        this.media.addEventListener('ended', () => {
            this.stopMedia();
        });

        this.rwd.addEventListener('click', () => {
            this.mediaBackward();
        });
        this.fwd.addEventListener('click', () => {
            this.mediaForward();
        });

        this.media.addEventListener('timeupdate', () => {
           this.setTime();
        });
    }

    playPauseMedia() {
        if (this.media.paused) {
            this.play.setAttribute('data-icon', 'u');
            this.media.play();
            return false;
        }

        this.play.setAttribute('data-icon', 'P');
        this.media.pause();
    }

    stopMedia() {
        this.media.pause();
        this.media.currentTime = 0;
        this.play.setAttribute('data-icon', 'P');
    }

    mediaBackward() {
        if (this.intervalFwd) {
            clearInterval(this.intervalFwd);
            this.fwd.classList.remove('active');
        }

        if (this.rwd.classList.contains('active')) {
            this.rwd.classList.remove('active');
            clearInterval(this.intervalBwd);
            this.media.play();
        } else {
            this.rwd.classList.add('active');
            this.media.pause();
            this.intervalBwd = setInterval(() => {this.windBackward();}, 200);
        }
    }

    mediaForward() {
        if (this.intervalBwd) {
            clearInterval(this.intervalBwd);
            this.rwd.classList.remove('active');
        }

        if (this.fwd.classList.contains('active')) {
            this.fwd.classList.remove('active');
            clearInterval(this.intervalFwd);
            this.media.play();
        } else {
            this.fwd.classList.add('active');
            this.media.pause();
            this.intervalFwd = setInterval(() => {this.windForward();}, 200);
        }
    }

    windBackward() {
        if (this.media.currentTime  <= 3) {
            this.rwd.classList.remove('active');
            clearInterval(this.intervalBwd);
            this.stopMedia();
        } else {
            this.media.currentTime -=3;
        }
    }
    // Issue
    windForward() {
        if (this.media.currentTime >= this.media.duration - 3) {
            this.fwd.classList.remove('active');
            clearInterval(this.intervalFwd);
            this.stopMedia();
        } else {
            console.log(this.media.currentTime);
            this.media.currentTime +=3;
            console.log(this.media.currentTime);
        }
    }

    setTime() {
        let minutes = Math.floor(this.media.currentTime / 60);
        let seconds = Math.floor(this.media.currentTime - minutes * 60);
        let minutesValue = minutes;
        let secondsValue = seconds;

        if (minutes < 10) {
            minutesValue = `0${minutes}`;
        }

        if (seconds < 10) {
            secondsValue = `0${seconds}`;
        }

        let mediaTime = `${minutesValue}:${secondsValue}`;
        this.timer.textContent = mediaTime;
        let barLength = this.timerWraper.clientWidth * (this.media.currentTime / this.media.duration);
        this.timerBar.style.width = barLength + 'px';
    }
}

const customPlayer = new CustomPlayer();
