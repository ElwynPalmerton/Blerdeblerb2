
export function login(user) {
  return {
    type: 'LOGIN',
    payload: user
  }
}

export function logout() {
  console.log('Logging out');
  return {
    type: 'LOGOUT'
  }
}

export function changeName(name) {
  return {
    type: 'CHANGE_NAME',
    payload: name
  }
}

export function addFollowedBlerber(blerberId) {
  return {
    type: 'ADD_FOLLOWED_BLERBER',
    payload: blerberId
  }
}

export function unfollowBlerber(blerberId) {
  return {
    type: 'UNFOLLOW',
    payload: blerberId
  }
}


export function updateBio(bio) {
  return {
    type: 'UPDATE_BIO',
    payload: bio
  }
}

