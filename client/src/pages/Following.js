import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Blerber from './Blerber.js';
import { unfollowBlerber } from '../actions/user';

import API from '../utils/API';
import setHeaders from '../utils/setHeaders';


//Components
import Navbar from './Navbar';
import LayoutGrid from './LayoutGrid';

function Following(props) {

  const [error, setError] = useState('');

  const [following, setFollowing] = useState([])

  const location = useLocation();

  useLayoutEffect(() => {
    setHeaders();
    API.get('/following/following', {
      test: 'test value'
    }).then(result => {

      if (result.data) {

        console.log('result', result);
        setFollowing(result.data);
      } else {
        setError('Unable to load blerbers');
      }
    }).catch((e) => {
      setError('Unable to load blerbers.');
      console.log('e', e);
    })
  }, [])

  function unfollowBlerber(e) {
    e.preventDefault();

    const blerberToUnfollow = e.currentTarget.value;

    setHeaders();
    API.post('/following/unfollow', {
      blerberToUnfollow
    }).then(result => {
      if (result.data.success) {
        setFollowing(prevs => {
          return prevs.filter((prevs) => {
            return prevs._id !== blerberToUnfollow;
          })
        })
      } else {
        setError('Unable to connect to server');
      }
    }).catch((e) => {
      console.log('error: ', e);
    })
  }

  return (
    <div>
      <Navbar
        from={location}
      />
      <LayoutGrid
        center={
          <div>
            <h1>Blerbers you follow</h1>
            {error && <p>{error}</p>}
            {
              following.map((blerber, i) => {
                return (
                  <Blerber
                    handleClick={unfollowBlerber}
                    key={i}
                    blerber={blerber}
                    following={true}
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

const mapDispatchToProps = { unfollowBlerber };

export default connect(mapStateToProps, mapDispatchToProps)(Following);


