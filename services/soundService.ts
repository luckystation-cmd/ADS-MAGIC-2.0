
class SoundEngine {
  private ctx: AudioContext | null = null;
  private pulseOsc: OscillatorNode | null = null;
  private pulseGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // เสียงคลิกมาตรฐาน (HUD Blip)
  playClick() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // เสียงเริ่มการประมวลผล (Magic Sweep)
  playMagic() {
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.8);
    
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  // เสียงเรนเดอร์สำเร็จ (Chime)
  playSuccess() {
    this.initCtx();
    if (!this.ctx) return;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);
      
      gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx!.currentTime + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.1 + 0.5);
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(this.ctx!.currentTime + i * 0.1);
      osc.stop(this.ctx!.currentTime + i * 0.1 + 0.5);
    });
  }

  // เสียงชีพจรขณะรอ (Processing Pulse)
  startProcessingLoop() {
    this.initCtx();
    if (!this.ctx || this.pulseOsc) return;

    this.pulseOsc = this.ctx.createOscillator();
    this.pulseGain = this.ctx.createGain();
    
    this.pulseOsc.type = 'sine';
    this.pulseOsc.frequency.setValueAtTime(40, this.ctx.currentTime);
    
    this.pulseGain.gain.setValueAtTime(0, this.ctx.currentTime);
    
    // Create a pulsing effect
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.5, this.ctx.currentTime); // 0.5 Hz pulse
    lfoGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(this.pulseGain.gain);
    
    this.pulseOsc.connect(this.pulseGain);
    this.pulseGain.connect(this.ctx.destination);
    
    this.pulseOsc.start();
    lfo.start();
  }

  stopProcessingLoop() {
    if (this.pulseOsc) {
      this.pulseOsc.stop();
      this.pulseOsc = null;
    }
  }
}

export const sounds = new SoundEngine();
