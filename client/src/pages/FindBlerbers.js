import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import Blerber from './Blerber.js';
// import { addBlerbers, removeBlerber } from '../actions/blerbers';
import { addFollowedBlerber } from '../actions/user';
import API from '../utils/API';
import setHeaders from '../utils/setHeaders';
import LayoutGrid from './LayoutGrid';


function FindBlerbers(props) {


  const location = useLocation();

  const [blerberState, setBlerberState] = useState([]);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    setHeaders();
    API.get('/following/find', {
      test: 'test value'
    }).then(result => {
      if (result.data) {
        setBlerberState(result.data);
      } else {
        setError('Unable to load blerbers.');
      }
    }).catch((e) => {
      setError('Unable to load blerbers.');
    })
  }, [])


  function followBlerber(e) {
    // [ ] Remove from the (prospective) useState.
    // [ ] Add to the user's (following) redux state.

    const blerberToFollow = e.currentTarget.value;
    console.log("blerberToFollow: ", blerberToFollow);



    API.post('/following/follow', {
      blerberToFollow: blerberToFollow
    }).then(result => {
      const followed = result.data.followed
      const alreadyFollowing = result.data.alreadyFollowing;


      //Take the prospective blerber out of the component's state.
      if (!result.data.error || alreadyFollowing === true) {
        console.log('removing');
        setBlerberState((prevs) => {
          return (prevs.filter(prev => {
            return prev._id !== followed._id;
          }))
        })

      } else if (result.data.error) {
        setError("Server error: Unable follow that user.")
      }

    }).catch((e) =>
      setError("Server error: Unable to follow that user."))
  }


  return (
    <div>
      <Navbar
        from={location}
      />
      <LayoutGrid
        center={
          <div>

            <h2>Recommended for you... </h2>

            {error && <p>{error}</p>}
            {blerberState.length > 0 &&
              blerberState.map((blerber, i) => {
                return (
                  <Blerber
                    handleClick={followBlerber}
                    key={i}
                    blerber={blerber}
                    following={false}
                  // Refactor blerber to use the following value
                  />
                )
              })}
          </div>
        }
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { following: state.loginReducer.following };
}

const mapDispatchToProps = { addFollowedBlerber };

export default connect(mapStateToProps, mapDispatchToProps)(FindBlerbers);