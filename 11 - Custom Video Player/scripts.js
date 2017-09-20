"use strict";

// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build fonctions
function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateBtn() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
	video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeUpdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(b => b.addEventListener('click', skip));
ranges.forEach(r => r.addEventListener('change', handleRangeUpdate));
ranges.forEach(r => r.addEventListener('mouseMove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mouseMove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseDown', () => mouseDown = true);
progress.addEventListener('mouseUp', () => mouseDown = false);