import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { VOUCHER_CODE } from './config'
import { useSound } from './hooks/useSound'
import Header from './components/Header'
import ProgressTracker from './components/ProgressTracker'
import BackgroundScene from './components/BackgroundScene'
import InstructionCard from './components/InstructionCard'
import HelpModal from './components/HelpModal'
import GiftBox from './components/GiftBox'

const INSTRUCTIONS = {
  1: 'PULL THE BOW TO UNTIE IT',
  2: 'DRAG THE TAPE TO PEEL IT OFF',
  3: 'PULL EACH WRAPPING FLAP OPEN',
  4: 'OPEN THE SUPPLY DROP',
}

const INITIAL_FLAPS = { top: false, left: false, right: false, front: false }
const INITIAL_TAPE = { 0: false, 1: false, 2: false }

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [tapeRemoved, setTapeRemoved] = useState(INITIAL_TAPE)
  const [ribbonRemoved, setRibbonRemoved] = useState(false)
  const [openedFlaps, setOpenedFlaps] = useState(INITIAL_FLAPS)
  const [boxOpened, setBoxOpened] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shaking, setShaking] = useState(false)

  const sounds = useSound(soundEnabled)

  const triggerShake = useCallback(() => {
    setShaking(true)
    setTimeout(() => setShaking(false), 400)
  }, [])

  const handleInteractionStart = useCallback(() => {
    triggerShake()
  }, [triggerShake])

  const handleRibbonRemove = useCallback(() => {
    sounds.playRibbonPull()
    setRibbonRemoved(true)
    setTimeout(() => setCurrentStep(2), 600)
  }, [sounds])

  const handleTapeRemove = useCallback(
    (id) => {
      sounds.playTapePeel()
      setTapeRemoved((prev) => {
        const next = { ...prev, [id]: true }
        const allDone = Object.values(next).every(Boolean)
        if (allDone) {
          setTimeout(() => setCurrentStep(3), 400)
        }
        return next
      })
    },
    [sounds],
  )

  const handleFlapOpen = useCallback(
    (flapId) => {
      sounds.playPaperCrinkle()
      setOpenedFlaps((prev) => {
        const next = { ...prev, [flapId]: true }
        const allDone = Object.values(next).every(Boolean)
        if (allDone) {
          setTimeout(() => setCurrentStep(4), 500)
        }
        return next
      })
    },
    [sounds],
  )

  const handleBoxOpen = useCallback(() => {
    sounds.playBoxOpen()
    setBoxOpened(true)
    setTimeout(() => {
      sounds.playRevealSparkle()
      setCompleted(true)
    }, 400)
  }, [sounds])

  const handleSkip = useCallback(() => {
    setSkipped(true)
    setCurrentStep(4)
    setTapeRemoved({ 0: true, 1: true, 2: true })
    setRibbonRemoved(true)
    setOpenedFlaps({ top: true, left: true, right: true, front: true })
    setBoxOpened(true)
    setCompleted(true)
    sounds.playRevealSparkle()
  }, [sounds])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(VOUCHER_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = VOUCHER_CODE
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [])

  const handlePlayAgain = useCallback(() => {
    setCurrentStep(1)
    setTapeRemoved(INITIAL_TAPE)
    setRibbonRemoved(false)
    setOpenedFlaps(INITIAL_FLAPS)
    setBoxOpened(false)
    setCompleted(false)
    setSkipped(false)
    setCopied(false)
  }, [])

  const instruction = completed
    ? skipped
      ? 'YOUR SUPPLY DROP IS READY!'
      : 'SUPPLY DROP UNLOCKED!'
    : INSTRUCTIONS[currentStep]

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      <BackgroundScene />

      <div className="relative z-10 flex flex-col h-full max-w-lg mx-auto w-full">
        <Header
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((s) => !s)}
          onOpenHelp={() => setShowHelp(true)}
        />

        <div className="px-4 py-2">
          <ProgressTracker currentStep={currentStep} completed={completed} />
        </div>

        <GiftBox
          currentStep={currentStep}
          tapeRemoved={tapeRemoved}
          ribbonRemoved={ribbonRemoved}
          openedFlaps={openedFlaps}
          boxOpened={boxOpened}
          completed={completed}
          shaking={shaking}
          copied={copied}
          onTapeRemove={handleTapeRemove}
          onRibbonRemove={handleRibbonRemove}
          onFlapOpen={handleFlapOpen}
          onBoxOpen={handleBoxOpen}
          onCopy={handleCopy}
          onPlayAgain={handlePlayAgain}
          onInteractionStart={handleInteractionStart}
        />

        <div className="px-4 pb-2 z-20">
          <AnimatePresence mode="wait">
            <InstructionCard key={instruction} text={instruction} />
          </AnimatePresence>
        </div>

        {!completed && (
          <div className="text-center pb-2 z-20">
            <button
              type="button"
              onClick={handleSkip}
              className="text-white/30 text-[10px] sm:text-xs underline hover:text-white/50 transition-colors"
            >
              Having trouble? Skip to reveal
            </button>
          </div>
        )}

        <footer className="text-center pb-3 pt-1 z-20">
          <p className="text-white/40 text-[10px] sm:text-xs">
            Made with love by Brent ♥
          </p>
        </footer>
      </div>

      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  )
}
