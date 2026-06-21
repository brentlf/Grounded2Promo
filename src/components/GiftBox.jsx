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
        className={`relative flex items-center justify-center w-full flex-1 min-h-0 ${!showReveal ? 'animate-bob' : ''} ${shaking ? 'animate-shake' : ''}`}
        style={{ minHeight: showReveal ? undefined : 300 }}
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
            className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-2 pt-1 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <div className="pointer-events-auto w-full h-full flex flex-col items-center justify-center max-h-full">
              <VoucherCard copied={copied} onCopy={onCopy} onPlayAgain={onPlayAgain} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
