import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import KraftDoodles from './KraftDoodles'
import TapeStrip from './TapeStrip'
import Ribbon3D from './Ribbon3D'
import WrappingFlap3D from './WrappingFlap3D'
import OpenBox3D from './OpenBox3D'

const SIZE = 200
const HALF = SIZE / 2

const TAPE_PIECES = [
  { id: 0, x: 28, y: 78, rot: -8 },
  { id: 1, x: 98, y: 68, rot: 12 },
  { id: 2, x: 55, y: 118, rot: -5 },
]

const FLAP_CONFIG = [
  { id: 'top', axis: 'x', sign: -1, hint: 'y', threshold: -40 },
  { id: 'left', axis: 'y', sign: -1, hint: 'x', threshold: -40 },
  { id: 'right', axis: 'y', sign: 1, hint: 'x', threshold: 40 },
  { id: 'bottom', axis: 'x', sign: 1, hint: 'y', threshold: 40 },
]

function CubeFace({ transform, shade = 1, className = '', children, style = {} }) {
  return (
    <div
      className={`absolute overflow-hidden border border-kraft-dark/20 ${className}`}
      style={{
        width: SIZE,
        height: SIZE,
        transform,
        backfaceVisibility: 'hidden',
        filter: `brightness(${shade})`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function Present3D({
  currentStep,
  tapeRemoved,
  ribbonRemoved,
  openedFlaps,
  boxOpened,
  completed,
  showReveal,
  onTapeRemove,
  onRibbonRemove,
  onFlapOpen,
  onBoxOpen,
  onInteractionStart,
}) {
  const [tilt, setTilt] = useState({ x: -18, y: -32 })

  useEffect(() => {
    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 14
      const ny = (e.clientY / window.innerHeight - 0.5) * 10
      setTilt({ x: -18 + ny, y: -32 + nx })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const allFlapsOpen = Object.values(openedFlaps).every(Boolean)
  const showTape = currentStep === 1 && !completed
  const showRibbon = currentStep === 2 && !completed
  const showFlaps = currentStep === 3 && !allFlapsOpen && !completed
  const showWrappedCube = currentStep <= 2 && !completed
  const showCardboardCore = currentStep === 3 && !completed
  const showOpenBox = currentStep >= 4
  const allTapeRemoved = TAPE_PIECES.every((t) => tapeRemoved[t.id])

  const viewTilt = showReveal
    ? { x: -28, y: -8 }
    : showOpenBox && !showWrapper
      ? { x: -22, y: -18 }
      : tilt

  return (
    <div
      className="present-scene relative"
      style={{
        width: SIZE + 80,
        height: SIZE + 100,
        perspective: '1100px',
        perspectiveOrigin: '50% 42%',
      }}
    >
      {/* contact shadow on ground */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-black/50 blur-xl pointer-events-none"
        style={{
          bottom: 10,
          width: SIZE * 1.1,
          height: 36,
          transform: 'translateX(-50%) rotateX(75deg)',
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: SIZE,
          height: SIZE,
          marginLeft: -HALF,
          marginTop: -HALF,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateX: viewTilt.x,
          rotateY: viewTilt.y,
          scale: showReveal ? 0.85 : 1,
          y: showReveal ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      >
        {/* ── Wrapped kraft cube (steps 1–2) ── */}
        {showWrappedCube && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            {/* solid core so faces don't show gaps */}
            <div
              className="absolute kraft-texture"
              style={{
                width: SIZE - 2,
                height: SIZE - 2,
                transform: `translate3d(1px, 1px, 0)`,
              }}
            />

            <CubeFace transform={`rotateY(0deg) translateZ(${HALF}px)`} shade={1.02}>
              <div className="w-full h-full kraft-texture relative">
                <KraftDoodles />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/15 pointer-events-none" />
              </div>
            </CubeFace>

            <CubeFace transform={`rotateY(180deg) translateZ(${HALF}px)`} shade={0.72}>
              <div className="w-full h-full kraft-texture">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </CubeFace>

            <CubeFace transform={`rotateY(90deg) translateZ(${HALF}px)`} shade={0.88}>
              <div className="w-full h-full kraft-texture">
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent" />
              </div>
            </CubeFace>

            <CubeFace transform={`rotateY(-90deg) translateZ(${HALF}px)`} shade={0.92}>
              <div className="w-full h-full kraft-texture">
                <div className="absolute inset-0 bg-gradient-to-l from-black/12 to-transparent" />
              </div>
            </CubeFace>

            <CubeFace transform={`rotateX(90deg) translateZ(${HALF}px)`} shade={1.08}>
              <div className="w-full h-full kraft-texture">
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent" />
              </div>
            </CubeFace>

            <CubeFace transform={`rotateX(-90deg) translateZ(${HALF}px)`} shade={0.65}>
              <div className="w-full h-full kraft-texture">
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </CubeFace>

            {/* edge highlights */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: SIZE,
                height: SIZE,
                transform: `rotateY(0deg) translateZ(${HALF + 1}px)`,
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.12)',
              }}
            />
          </div>
        )}

        {/* ── Cardboard core during unwrap (step 3) ── */}
        {showCardboardCore && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            {[
              { t: `rotateY(0deg) translateZ(${HALF - 4}px)`, shade: 1 },
              { t: `rotateY(180deg) translateZ(${HALF - 4}px)`, shade: 0.75 },
              { t: `rotateY(90deg) translateZ(${HALF - 4}px)`, shade: 0.85 },
              { t: `rotateY(-90deg) translateZ(${HALF - 4}px)`, shade: 0.88 },
              { t: `rotateX(90deg) translateZ(${HALF - 4}px)`, shade: 1.05 },
              { t: `rotateX(-90deg) translateZ(${HALF - 4}px)`, shade: 0.7 },
            ].map((face, i) => (
              <CubeFace key={i} transform={face.t} shade={face.shade}>
                <div className="w-full h-full cardboard-texture relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20 pointer-events-none" />
                </div>
              </CubeFace>
            ))}
          </div>
        )}

        {/* ── Open box with hinged lid (step 4) ── */}
        {showOpenBox && (
          <OpenBox3D
            size={SIZE}
            half={HALF}
            opened={boxOpened || completed}
            onOpen={onBoxOpen}
            onDragStart={onInteractionStart}
            showGlow={showReveal}
          />
        )}

        {/* ── 3D ribbon (step 2) ── */}
        <AnimatePresence>
          {showRibbon && !ribbonRemoved && (
            <motion.div
              key="ribbon-3d"
              style={{ transformStyle: 'preserve-3d' }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <Ribbon3D size={SIZE} half={HALF} onRemove={onRibbonRemove} onDragStart={onInteractionStart} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Tape on front face (step 1) ── */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(0deg) translateZ(${HALF + 2}px)`,
          }}
        >
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
                  depth
                />
              ))}
          </AnimatePresence>
        </div>

        {/* ── 3D wrapping flaps (step 3) ── */}
        {showFlaps && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            {FLAP_CONFIG.map((flap) =>
              openedFlaps[flap.id] ? null : (
                <WrappingFlap3D
                  key={flap.id}
                  id={flap.id}
                  size={SIZE}
                  half={HALF}
                  config={flap}
                  onOpen={() => onFlapOpen(flap.id)}
                  onDragStart={onInteractionStart}
                />
              ),
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export { SIZE as PRESENT_SIZE }
