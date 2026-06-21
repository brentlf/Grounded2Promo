import { motion } from 'framer-motion'
import Present3D from './Present3D'
import VoucherCard from './VoucherCard'
import Confetti from './Confetti'

export default function GiftBox({
  currentStep,
  tapeRemoved,
  ribbonRemoved,
  openedFlaps,
  boxOpened,
  completed,
  shaking,
  copied,
  onTapeRemove,
  onRibbonRemove,
  onFlapOpen,
  onBoxOpen,
  onCopy,
  onPlayAgain,
  onInteractionStart,
}) {
  const showReveal = boxOpened || completed

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 min-h-0 py-2">
      <div
        className={`relative flex items-center justify-center ${!showReveal ? 'animate-bob' : ''} ${shaking ? 'animate-shake' : ''}`}
        style={{ minHeight: showReveal ? 420 : 300 }}
      >
        <Present3D
          currentStep={currentStep}
          tapeRemoved={tapeRemoved}
          ribbonRemoved={ribbonRemoved}
          openedFlaps={openedFlaps}
          boxOpened={boxOpened}
          completed={completed}
          showReveal={showReveal}
          onTapeRemove={onTapeRemove}
          onRibbonRemove={onRibbonRemove}
          onFlapOpen={onFlapOpen}
          onBoxOpen={onBoxOpen}
          onInteractionStart={onInteractionStart}
        />

        <Confetti active={showReveal} />

        {showReveal && (
          <motion.div
            className="absolute inset-0 flex items-end sm:items-center justify-center z-30 pointer-events-none pb-4 sm:pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="pointer-events-auto">
              <VoucherCard copied={copied} onCopy={onCopy} onPlayAgain={onPlayAgain} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
