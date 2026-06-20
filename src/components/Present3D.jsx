import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import KraftDoodles from './KraftDoodles'
import TapeStrip3D from './TapeStrip3D'
import Ribbon3D from './Ribbon3D'
import WrappingFlap3D from './WrappingFlap3D'
import OpenBox3D from './OpenBox3D'
import { SIZE, HALF, TAPE_PIECES } from './presentConstants'

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

  const allFlapsOpen = Object.values(openedFlaps).every(Boolean)
  const allTapeRemoved = TAPE_PIECES.every((t) => tapeRemoved[t.id])

  const showWrappedCube = currentStep <= 2 && !completed
  const showCardboardCore = currentStep === 3 && !completed
  const showOpenBox = currentStep >= 4

  const showRibbonVisible = !ribbonRemoved && !completed
  const showRibbonInteractive = currentStep === 1 && !completed

  const showTapeVisible = !allTapeRemoved && currentStep <= 2 && !completed
  const showTapeInteractive = currentStep === 2 && ribbonRemoved && !completed

  const showFlaps = currentStep === 3 && !allFlapsOpen && !completed

  const viewTilt = showReveal
    ? { x: -28, y: -8 }
    : showOpenBox
      ? { x: -24, y: -16 }
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
              <div className="w-full h-full kraft-texture relative">
                <KraftDoodles />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/18 pointer-events-none" />
              </div>
            </CubeFace>
            <CubeFace transform={`rotateY(180deg) translateZ(${HALF}px)`} shade={0.72}>
              <div className="w-full h-full kraft-texture" />
            </CubeFace>
            <CubeFace transform={`rotateY(90deg) translateZ(${HALF}px)`} shade={0.86}>
              <div className="w-full h-full kraft-texture" />
            </CubeFace>
            <CubeFace transform={`rotateY(-90deg) translateZ(${HALF}px)`} shade={0.9}>
              <div className="w-full h-full kraft-texture" />
            </CubeFace>
            <CubeFace transform={`rotateX(90deg) translateZ(${HALF}px)`} shade={1.1}>
              <div className="w-full h-full kraft-texture" />
            </CubeFace>
            <CubeFace transform={`rotateX(-90deg) translateZ(${HALF}px)`} shade={0.64}>
              <div className="w-full h-full kraft-texture" />
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

        {/* Layer 1: Ribbon (wraps around cube in 3D) */}
        <AnimatePresence>
          {showRibbonVisible && (
            <Ribbon3D
              key="ribbon"
              interactive={showRibbonInteractive}
              onRemove={onRibbonRemove}
              onDragStart={onInteractionStart}
            />
          )}
        </AnimatePresence>

        {/* Layer 2: Tape (on front face, above ribbon in Z) */}
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

        {/* Layer 3: Kraft flaps (each hinged on its 3D face) */}
        {showFlaps && (
          <div style={{ transformStyle: 'preserve-3d' }}>
            {['top', 'left', 'right', 'bottom'].map(
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
