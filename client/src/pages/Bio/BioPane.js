import React, { useState } from 'react';

import { connect } from 'react-redux';
import ConnectedShowBio from './ShowBio';
import EditBio from './EditBio';
import API from '../../utils/API';
import { updateBio } from '../../actions/user';

function BioPane(props) {

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  function handleSave(bio) {

    API.post('/users/bio', {
      bio
    }).then(result => {
      if (result.data) {
        props.updateBio(result.data);
      } else if (result.error) {
        setError(result.error);
      }
    }).catch((e) => {
      setError('Unable to save bio');
      console.log(e);
    });

    setEditMode(false);
  }

  return (
    !editMode ? (
      <ConnectedShowBio
        classes={props.classes}
        handleClick={() => setEditMode(true)}
      />
    ) : (
        <EditBio
          color="primary"
          classes={props.classes}
          handleSave={handleSave}
        />
      )
  )
}

const mapStateToProps = ((state) => {
  return ({ user: state.loginReducer })
})

const mapDispatchToProps = { updateBio };

export default connect(mapStateToProps, mapDispatchToProps)(BioPane);