import { useCallback, useRef } from 'react'

/**
 * Sound manager with Web Audio synthesized placeholders.
 * Replace play* functions with actual audio files in public/sounds/ if desired:
 *   public/sounds/tape-peel.mp3, ribbon-pull.mp3, paper-crinkle.mp3, box-open.mp3, reveal-sparkle.mp3
 */
export function useSound(enabled) {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!enabled) return null
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [enabled])

  const playTone = useCallback(
    (freq, duration, type = 'sine', volume = 0.15) => {
      const ctx = getCtx()
      if (!ctx) return

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(volume, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    },
    [getCtx],
  )

  const playNoise = useCallback(
    (duration, volume = 0.08) => {
      const ctx = getCtx()
      if (!ctx) return

      const bufferSize = ctx.sampleRate * duration
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
      }
      const source = ctx.createBufferSource()
      const gain = ctx.createGain()
      source.buffer = buffer
      gain.gain.setValueAtTime(volume, ctx.currentTime)
      source.connect(gain)
      gain.connect(ctx.destination)
      source.start()
    },
    [getCtx],
  )

  const playTapePeel = useCallback(() => {
    playNoise(0.25, 0.12)
    playTone(800, 0.15, 'sawtooth', 0.06)
  }, [playNoise, playTone])

  const playRibbonPull = useCallback(() => {
    playTone(200, 0.3, 'triangle', 0.12)
    setTimeout(() => playTone(150, 0.2, 'triangle', 0.08), 100)
  }, [playTone])

  const playPaperCrinkle = useCallback(() => {
    playNoise(0.4, 0.15)
    playTone(300, 0.2, 'square', 0.04)
  }, [playNoise, playTone])

  const playBoxOpen = useCallback(() => {
    playTone(120, 0.5, 'sine', 0.2)
    playTone(180, 0.4, 'sine', 0.15)
    playNoise(0.3, 0.1)
  }, [playNoise, playTone])

  const playRevealSparkle = useCallback(() => {
    ;[523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => playTone(f, 0.3, 'sine', 0.1), i * 80)
    })
  }, [playTone])

  return {
    playTapePeel,
    playRibbonPull,
    playPaperCrinkle,
    playBoxOpen,
    playRevealSparkle,
  }
}
