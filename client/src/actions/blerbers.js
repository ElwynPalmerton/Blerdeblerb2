export function addBlerbers(blerbers) {
  return {
    type: 'ADD_BLERBERS',
    payload: blerbers
  }
}

export function removeBlerber(blerber) {
  return {
    type: 'REMOVE_BLERBER',
    payload: blerber
  }
}

//I'm not actually using this because I just used regular useState instead.
// [ ] Strip this and the reducer stuff.