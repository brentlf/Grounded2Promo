import { motion } from 'framer-motion'
import FaceAnchor from './FaceAnchor'
import { LAYER, SIZE } from './presentConstants'

/** Ribbon bands wrapping the cube — bow is rendered separately in Bow3D */
export default function Ribbon3D() {
  const band = 20
  const cx = SIZE / 2 - band / 2

  return (
    <motion.div
      style={{ transformStyle: 'preserve-3d', pointerEvents: 'none' }}
      exit={{
        opacity: 0,
        z: -40,
        rotateY: 30,
        transition: { duration: 0.55, ease: 'easeIn' },
      }}
    >
      <FaceAnchor face="front" zOffset={LAYER.RIBBON}>
        <div className="absolute ribbon-satin left-0 right-0" style={{ top: cx, height: band }} />
        <div className="absolute ribbon-satin top-0 bottom-0" style={{ left: cx, width: band }} />
      </FaceAnchor>

      <FaceAnchor face="right" zOffset={LAYER.RIBBON}>
        <div className="absolute ribbon-satin top-0 bottom-0" style={{ left: cx, width: band }} />
      </FaceAnchor>

      <FaceAnchor face="left" zOffset={LAYER.RIBBON}>
        <div className="absolute ribbon-satin top-0 bottom-0" style={{ left: cx, width: band }} />
      </FaceAnchor>

      <FaceAnchor face="top" zOffset={LAYER.RIBBON}>
        <div className="absolute ribbon-satin left-0 right-0" style={{ top: cx, height: band }} />
      </FaceAnchor>

      <FaceAnchor face="back" zOffset={LAYER.RIBBON}>
        <div className="absolute ribbon-satin left-0 right-0" style={{ top: cx, height: band }} />
      </FaceAnchor>
    </motion.div>
  )
}
