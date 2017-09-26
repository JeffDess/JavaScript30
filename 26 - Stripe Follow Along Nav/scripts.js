"use strict";

const triggers = document.querySelectorAll('.cool > li');
const bg = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter(e) {
  this.classList.add('trigger-enter');
  setTimeout(() =>
    this.classList.contains('trigger-enter') &&
    this.classList.add('trigger-enter-active'), 150);
  bg.classList.add('open');

  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();
  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  }

  bg.style.setProperty('height', `${coords.height}px`);
  bg.style.setProperty('width', `${coords.width}px`);
  bg.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`)
}

function handleLeave(e) {
  this.classList.remove('trigger-enter');
  setTimeout(() => this.classList.remove('trigger-enter-active'), 150);
  bg.classList.remove('open');
}


triggers.forEach(t => t.addEventListener('mouseenter', handleEnter));
triggers.forEach(t => t.addEventListener('mouseleave', handleLeave));