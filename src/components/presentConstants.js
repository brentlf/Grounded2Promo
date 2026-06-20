export const SIZE = 200
export const HALF = SIZE / 2

/** Distance outward from each face surface */
export const LAYER = {
  RIBBON: 1,
  RIBBON_CROSS: 2,
  TAPE: 5,
  FLAP: 3,
  BOW: 12,
  LID_HINT: 8,
}

/** Tape on front face — local coords, crosses the ribbon */
export const TAPE_PIECES = [
  { id: 0, x: 38, y: 88, rot: 0, w: 124, h: 20 },       // horizontal over ribbon
  { id: 1, x: 72, y: 38, rot: 90, w: 90, h: 18 },        // vertical seal
  { id: 2, x: 18, y: 52, rot: -38, w: 80, h: 18 },      // diagonal corner
]

export const FLAP_IDS = ['top', 'left', 'right', 'bottom']
