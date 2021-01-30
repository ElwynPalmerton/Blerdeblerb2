export function addPost(post) {
  return {
    type: "ADD_POST",
    payload: post
  }
}

export function initializePosts(posts) {
  return {
    type: 'INITIALIZE_POSTS',
    payload: posts
  }
}

export function initializeBlerbs(blerbs) {
  return {
    type: 'INITIALIZE_BLERBS',
    payload: blerbs
  }
}

export function addBlerb(blerb) {
  return {
    type: "ADD_BLERB",
    payload: blerb
  }
}

export function addHistory(blerbs) {
  return {
    type: "ADD_HISTORY",
    payload: blerbs
  }
}


export function addBlerbs(blerbs) {
  return {
    type: "ADD_BLERBS",
    payload: blerbs
  }
}

export function likeBlerb(blerb) {
  return {
    type: "LIKE_BLERB",
    payload: blerb
  }
}

export function likePost(blerb) {
  console.log('likePost action')
  return {
    type: "LIKE_POST",
    payload: blerb
  }
}

export function preLikeBlerb(userID) {
  return {
    type: "PRE_LIKE_BLERB",
    payload: userID
  }
}