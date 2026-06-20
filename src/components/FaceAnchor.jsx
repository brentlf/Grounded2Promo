import { SIZE, HALF } from './presentConstants'

/**
 * Anchors children to a cube face in local 2D coordinates (true 3D space).
 */
export default function FaceAnchor({ face, size = SIZE, half = HALF, zOffset = 0, className = '', children, style = {} }) {
  const z = half + zOffset
  const transforms = {
    front: `rotateY(0deg) translateZ(${z}px)`,
    back: `rotateY(180deg) translateZ(${z}px)`,
    right: `rotateY(90deg) translateZ(${z}px)`,
    left: `rotateY(-90deg) translateZ(${z}px)`,
    top: `rotateX(90deg) translateZ(${z}px)`,
    bottom: `rotateX(-90deg) translateZ(${z}px)`,
  }

  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        transform: transforms[face],
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
