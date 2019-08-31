// HTML Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

// Functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function playerIconSwap() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function slide() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', playerIconSwap);
video.addEventListener('pause', playerIconSwap);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('change', slide));
ranges.forEach(slider => slider.addEventListener('mousemove', slide));

let mouseClicked = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseClicked && scrub(e));
progress.addEventListener('mousedown', () => mouseClicked = true);
progress.addEventListener('mouseup', () => mouseClicked = false);

//----------------------------------------------
//----------------------------------------------
function q (check, style, trace) {
    let mytype;
    switch (true) {
        case typeof check === 'string':
            mytype = 'String';
            break;
        case Number.isInteger(check):
            mytype = 'Integer';
            break;
        case typeof check === 'boolean':
            mytype = 'Boolean'
            break;
        case check instanceof Array:
            mytype = 'Array';
            break;
        case typeof check === "function":
            mytype = 'Function';
            break;
        case check instanceof Date:
            mytype = 'Date';
            break;
        case check instanceof Object:
            mytype = 'Object';
            break;
        default:
            mytype = '...Odd Bit?'
            break;
    };
    console.log(`Q: This ${mytype} has a value of:`);
    if (arguments.length >= 2 && (typeof check === 'string' || check instanceof String) && style !== (undefined || null ) && typeof style !== 'boolean') {
        check = `%c ${check}`
        console.log(check, style);
    } else {
        if(mytype === 'Array') { console.table(check); } 
        else { console.log(check); };
    };
    if ((arguments.length >= 2 && typeof style === 'boolean') || trace) { 
        console.log('%c Trace Your Steps Below... ', 'font-size:15px; color: Cornsilk; background: DarkOliveGreen;') 
        console.trace(check) 
    }
    if (mytype !== 'Integer') { console.assert(check, "That's not true! That's impossible!"); }
};

// Console log as a message.
function say (log) {
    console.log(`Message: ${log}`);
}