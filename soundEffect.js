export default class SoundEffect {
  constructor() {
      const audioEl = document.createElement('audio');
      audioEl.src = "./resources/halloween.mp3";
      document.body.appendChild(audioEl);
      this.sound = audioEl;
  }

  pause () {
      this.sound.pause();
  }

  play () {
    this.sound.play();
  }
}