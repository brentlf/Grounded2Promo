const BASE_SIZE = 200
export const SIZE = 265
export const HALF = SIZE / 2
const R = SIZE / BASE_SIZE

/** Distance outward from each face surface */
export const LAYER = {
  RIBBON: 1,
  RIBBON_CROSS: 2,
  TAPE: 5,
  FLAP: 14,
  BOW: 12,
  LID_HINT: 8,
}

/** Tape on front face — local coords, crosses the ribbon */
export const TAPE_PIECES = [
  { id: 0, x: Math.round(38 * R), y: Math.round(88 * R), rot: 0, w: Math.round(124 * R), h: Math.round(20 * R) },
  { id: 1, x: Math.round(72 * R), y: Math.round(38 * R), rot: 90, w: Math.round(90 * R), h: Math.round(18 * R) },
  { id: 2, x: Math.round(18 * R), y: Math.round(52 * R), rot: -38, w: Math.round(80 * R), h: Math.round(18 * R) },
]

export const FLAP_IDS = ['top', 'right', 'front']

export const SCENE_WIDTH = SIZE + 80
export const SCENE_HEIGHT = SIZE + 100
