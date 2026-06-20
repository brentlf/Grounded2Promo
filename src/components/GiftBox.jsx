import { AnimatePresence, motion } from 'framer-motion'
import KraftDoodles from './KraftDoodles'
import TapeStrip from './TapeStrip'
import Ribbon from './Ribbon'
import WrappingFlaps from './WrappingFlaps'
import BoxLid from './BoxLid'
import VoucherCard from './VoucherCard'
import Confetti from './Confetti'

const TAPE_PIECES = [
  { id: 0, x: '15%', y: '42%', rot: -8 },
  { id: 1, x: '55%', y: '38%', rot: 12 },
  { id: 2, x: '30%', y: '58%', rot: -5 },
]

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
  const allFlapsOpen = Object.values(openedFlaps).every(Boolean)
  const showReveal = boxOpened || completed
  const showWrapper = (currentStep <= 2 || (currentStep === 3 && !allFlapsOpen)) && !completed
  const showTape = currentStep === 1 && !completed
  const showRibbon = currentStep === 2 && !completed
  const showFlaps = currentStep === 3 && !allFlapsOpen && !completed
  const showInnerBox = currentStep >= 3 || completed
  const showLid = currentStep === 4 && !boxOpened && !completed

  const allTapeRemoved = TAPE_PIECES.every((t) => tapeRemoved[t.id])

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 min-h-0 py-2">
      {/* ground shadow */}
      <div className="absolute bottom-[8%] w-[70%] max-w-[280px] h-[20px] bg-black/40 rounded-[50%] blur-md" />

      {/* gift container with bob/shake */}
      <div
        className={`relative transition-all duration-500 ${!showReveal ? 'animate-bob' : ''} ${shaking ? 'animate-shake' : ''}`}
        style={{
          width: showReveal ? 'min(300px, 92vw)' : 'min(240px, 65vw)',
          height: showReveal ? 'auto' : 'min(240px, 65vw)',
          minHeight: showReveal ? 420 : undefined,
        }}
      >
        {/* cardboard box base (visible after unwrap) */}
        {showInnerBox && (
          <div className="absolute inset-[8%] bg-[#9a7850] rounded-sm border-2 border-[#7a6040] shadow-inner z-5">
            {/* shredded paper filler */}
            {showReveal && (
              <div className="absolute inset-0 overflow-hidden rounded-sm">
                {Array.from({ length: 40 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#d4b896]"
                    style={{
                      left: `${Math.random() * 90}%`,
                      top: `${Math.random() * 80}%`,
                      width: `${8 + Math.random() * 12}px`,
                      height: `${2 + Math.random() * 3}px`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      opacity: 0.6 + Math.random() * 0.4,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* kraft paper wrapper */}
        {showWrapper && (
          <div className="absolute inset-0 kraft-texture rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-10 overflow-hidden border border-kraft-dark/30">
            <KraftDoodles />
          </div>
        )}

        {/* wrapping flaps (step 3) */}
        {showFlaps && (
          <WrappingFlaps
            openedFlaps={openedFlaps}
            onFlapOpen={onFlapOpen}
            onDragStart={onInteractionStart}
          />
        )}

        {/* ribbon (step 2) */}
        <AnimatePresence>
          {showRibbon && !ribbonRemoved && (
            <motion.div
              key="ribbon"
              className="absolute inset-0"
              exit={{ opacity: 0, y: 30, transition: { duration: 0.5 } }}
            >
              <Ribbon onRemove={onRibbonRemove} onDragStart={onInteractionStart} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* tape strips (step 1) */}
        <AnimatePresence>
          {showTape &&
            !allTapeRemoved &&
            TAPE_PIECES.filter((t) => !tapeRemoved[t.id]).map((t) => (
              <TapeStrip
                key={t.id}
                id={t.id}
                initialX={t.x}
                initialY={t.y}
                rotation={t.rot}
                onRemove={onTapeRemove}
                onDragStart={onInteractionStart}
              />
            ))}
        </AnimatePresence>

        {/* box lid (step 4) */}
        {showLid && (
          <BoxLid onOpen={onBoxOpen} onDragStart={onInteractionStart} opened={false} />
        )}
        {(boxOpened || completed) && currentStep >= 4 && (
          <BoxLid opened onOpen={() => {}} onDragStart={() => {}} />
        )}

        {/* golden glow on reveal */}
        {showReveal && (
          <div className="absolute inset-0 box-glow z-20 pointer-events-none animate-pulse" />
        )}

        <Confetti active={showReveal} />

        {/* voucher card */}
        {showReveal && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <VoucherCard copied={copied} onCopy={onCopy} onPlayAgain={onPlayAgain} />
          </div>
        )}
      </div>
    </div>
  )
}
