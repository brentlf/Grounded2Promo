import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import WrapDoodles from './WrapDoodles'
import Ribbon3D from './Ribbon3D'
import Bow3D from './Bow3D'
import TapeStrip3D from './TapeStrip3D'
import WrappingFlap3D from './WrappingFlap3D'
import OpenBox3D from './OpenBox3D'
import { SIZE, HALF, TAPE_PIECES, FLAP_IDS } from './presentConstants'

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
        transformStyle: 'preserve-3d',
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
  const [tilt, setTilt] = useState({ x: -20, y: -30 })

  useEffect(() => {
    const handleMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 12
      const ny = (e.clientY / window.innerHeight - 0.5) * 8
      setTilt({ x: -20 + ny, y: -30 + nx })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const allFlapsOpen = FLAP_IDS.every((id) => openedFlaps[id])
  const allTapeRemoved = TAPE_PIECES.every((t) => tapeRemoved[t.id])

  const showWrappedCube = currentStep <= 2 && !completed
  const showCardboardCore = currentStep === 3 && !completed
  const showOpenBox = currentStep >= 4

  const showRibbonVisible = !ribbonRemoved && !completed
  const showRibbonInteractive = currentStep === 1 && !completed

  const showTapeVisible = !allTapeRemoved && currentStep <= 2 && !completed
  const showTapeInteractive = currentStep === 2 && ribbonRemoved && !completed

  const showFlaps = currentStep === 3 && !allFlapsOpen && !completed

  const step3Tilt = () => {
    let x = -24
    let y = -26
    if (!openedFlaps.top) x = -34
    if (!openedFlaps.front) y = -32
    if (!openedFlaps.right) y = -20
    return { x, y }
  }

  const viewTilt = showReveal
    ? { x: -28, y: -8 }
    : currentStep === 4 && !boxOpened
      ? { x: -30, y: -22 }
      : showOpenBox
        ? { x: -24, y: -16 }
        : currentStep === 3
          ? step3Tilt()
          : tilt

  return (
    <div
      className="present-scene relative"
      style={{
        width: SIZE + 80,
        height: SIZE + 100,
        perspective: '1000px',
        perspectiveOrigin: '50% 40%',
      }}
    >
      <div
        className="absolute left-1/2 rounded-[50%] bg-black/55 blur-xl pointer-events-none"
        style={{
          bottom: 8,
          width: SIZE * 1.15,
          height: 40,
          transform: 'translateX(-50%) rotateX(78deg) scaleY(0.5)',
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 present-rig"
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
          scale: showReveal ? 0.82 : 1,
          y: showReveal ? 24 : 0,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      >
        {/* Kraft wrapped cube — steps 1 & 2 */}
        {showWrappedCube && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            <CubeFace transform={`rotateY(0deg) translateZ(${HALF}px)`} shade={1.03}>
              <div className="w-full h-full gift-wrap-texture relative">
                <WrapDoodles variant="front" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-black/15 pointer-events-none" />
              </div>
            </CubeFace>
            <CubeFace transform={`rotateY(180deg) translateZ(${HALF}px)`} shade={0.72}>
              <div className="w-full h-full gift-wrap-texture"><WrapDoodles /></div>
            </CubeFace>
            <CubeFace transform={`rotateY(90deg) translateZ(${HALF}px)`} shade={0.86}>
              <div className="w-full h-full gift-wrap-texture"><WrapDoodles /></div>
            </CubeFace>
            <CubeFace transform={`rotateY(-90deg) translateZ(${HALF}px)`} shade={0.9}>
              <div className="w-full h-full gift-wrap-texture"><WrapDoodles /></div>
            </CubeFace>
            <CubeFace transform={`rotateX(90deg) translateZ(${HALF}px)`} shade={1.1}>
              <div className="w-full h-full gift-wrap-texture"><WrapDoodles variant="top" /></div>
            </CubeFace>
            <CubeFace transform={`rotateX(-90deg) translateZ(${HALF}px)`} shade={0.64}>
              <div className="w-full h-full gift-wrap-texture" />
            </CubeFace>
          </div>
        )}

        {/* Cardboard core — step 3 */}
        {showCardboardCore && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            {[
              { t: `rotateY(0deg) translateZ(${HALF - 4}px)`, s: 1 },
              { t: `rotateY(180deg) translateZ(${HALF - 4}px)`, s: 0.76 },
              { t: `rotateY(90deg) translateZ(${HALF - 4}px)`, s: 0.86 },
              { t: `rotateY(-90deg) translateZ(${HALF - 4}px)`, s: 0.88 },
              { t: `rotateX(90deg) translateZ(${HALF - 4}px)`, s: 1.06 },
              { t: `rotateX(-90deg) translateZ(${HALF - 4}px)`, s: 0.68 },
            ].map((f, i) => (
              <CubeFace key={i} transform={f.t} shade={f.s}>
                <div className="w-full h-full cardboard-texture" />
              </CubeFace>
            ))}
          </div>
        )}

        {/* Open cardboard box — step 4 */}
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

        {/* Layer 1: Ribbon bands (non-interactive wrap) */}
        <AnimatePresence>
          {showRibbonVisible && <Ribbon3D key="ribbon-bands" />}
        </AnimatePresence>

        {/* Layer 2: Tape — pointer-events off during step 1 so bow stays clickable */}
        <AnimatePresence>
          {showTapeVisible &&
            TAPE_PIECES.filter((t) => !tapeRemoved[t.id]).map((t) => (
              <TapeStrip3D
                key={t.id}
                id={t.id}
                x={t.x}
                y={t.y}
                rot={t.rot}
                w={t.w}
                h={t.h}
                interactive={showTapeInteractive}
                onRemove={onTapeRemove}
                onDragStart={onInteractionStart}
              />
            ))}
        </AnimatePresence>

        {/* Layer 3: 3D bow — rendered last, highest Z, pull to untie */}
        <AnimatePresence>
          {showRibbonVisible && (
            <motion.div
              key="ribbon-bow"
              style={{ transformStyle: 'preserve-3d' }}
              exit={{ opacity: 0, z: 40, rotateX: -25, transition: { duration: 0.5 } }}
            >
              <Bow3D
                interactive={showRibbonInteractive}
                onRemove={onRibbonRemove}
                onDragStart={onInteractionStart}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 4: Colourful wrap flaps — rendered last for reliable interaction */}
        {showFlaps && (
          <div style={{ transformStyle: 'preserve-3d', pointerEvents: 'auto' }}>
            {FLAP_IDS.map(
              (id) =>
                !openedFlaps[id] && (
                  <WrappingFlap3D
                    key={id}
                    id={id}
                    onOpen={() => onFlapOpen(id)}
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

export { SIZE, HALF }
