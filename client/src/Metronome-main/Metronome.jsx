import React, { useEffect, useState } from 'react'
import Timer from './timer.js';
import click1 from './click1.mp3';
import click2 from './click2.mp3';
import './styles.css';
const Metronome = () => {
  const [bpm, setBpm] = useState(140);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tempoTextString, setTempoTextString] = useState('Nice and steady');

  const decreaseTempo = () => {
    if (bpm <= 20) return;
    setBpm(bpm - 1);
    validateTempo();
    updateMetronome();
  };

  const increaseTempo = () => {
    if (bpm >= 280) return;
    setBpm(bpm + 1);
    validateTempo();
    updateMetronome();
  };

  const handleTempoChange = (e) => {
    const newBpm = parseInt(e.target.value);
    setBpm(newBpm);
    validateTempo();
    updateMetronome(newBpm);
  };

  const subtractBeats = () => {
    if (beatsPerMeasure <= 2) return;
    setBeatsPerMeasure(beatsPerMeasure - 1);
    setCount(0);
  };

  const addBeats = () => {
    if (beatsPerMeasure >= 12) return;
    setBeatsPerMeasure(beatsPerMeasure + 1);
    setCount(0);
  };

  const startStop = () => {
    setCount(0);
    if (!isRunning) {
      metronome.start();
      setIsRunning(true);
    } else {
      metronome.stop();
      setIsRunning(false);
    }
  };

  function updateMetronome(newBpm) {
    const tempoText = document.querySelector('.tempo-text');
    const tempoSlider = document.querySelector('.slider');

    tempoSlider.value = newBpm;
    
    let tempoTextString = 'Nice and steady';
    if (newBpm <= 40) { tempoTextString = "Super Slow" };
    if (newBpm > 40 && newBpm < 80) { tempoTextString = "Slow" };
    if (newBpm > 80 && newBpm < 120) { tempoTextString = "Getting there" };
    if (newBpm > 120 && newBpm < 180) { tempoTextString = "Nice and Steady" };
    if (newBpm > 180 && newBpm < 220) { tempoTextString = "Rock n' Roll" };
    if (newBpm > 220 && newBpm < 240) { tempoTextString = "Funky Stuff" };
    if (newBpm > 240 && newBpm < 260) { tempoTextString = "Relax Dude" };
    if (newBpm > 260 && newBpm <= 280) { tempoTextString = "Eddie Van Halen" };

    setTempoTextString(tempoTextString);
    tempoText.textContent = tempoTextString;
  }

  function validateTempo() {
    if (bpm <= 20 || bpm >= 280) return;
  }

  function playClick() {
    if (count === beatsPerMeasure) {
        setCount(0);
    }
    if (count === 0) {
        const audio1 = new Audio(click1);
        audio1.play();
        audio1.currentTime = 0;
    } else {
        const audio2 = new Audio(click2);
        audio2.play();
        audio2.currentTime = 0;
    }
    setCount(count + 1);
  }

  const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });

 

  return (
    <div className='m'>
    <div className="container">
      <div className="metronome">
        <div className="bpm-display">
          <span className="tempo">{bpm}</span>
          <span className="bpm">BPM</span>
        </div>
        <div className="tempo-text">{tempoTextString}</div>
        <div className="tempo-settings">
          <div className="adjust-tempo-btn decrease-tempo" onClick={decreaseTempo}>-</div>
          <input
            type="range"
            className="slider"
            min="20"
            max="280"
            value={bpm}
            onChange={handleTempoChange}
          />
          <div className="adjust-tempo-btn increase-tempo" onClick={increaseTempo}>+</div>
        </div>
        <div className="start-stop" onClick={startStop}>{isRunning ? 'STOP' : 'START'}</div>
        <div className="measures">
          <div className="subtract-beats stepper" onClick={subtractBeats}>-</div>
          <div className="measure-count">{beatsPerMeasure}</div>
          <div className="add-beats stepper" onClick={addBeats}>+</div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Metronome;
