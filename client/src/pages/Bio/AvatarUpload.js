import React, { useState } from 'react';
import { connect } from 'react-redux';
import defaultUserAvatar from './assets/defaultUserAvatar.png';
import UploadImage from './UploadImage';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { makeStyles } from '@material-ui/core/styles';
import { baseURL } from '../../utils/API';

const useStyles = makeStyles((theme) => ({
  div: {
    textAlign: "center"
  },
  purple: {
    color: theme.palette.primary.main
  }
}))


function AvatarUpload(props) {
  const classes = useStyles();

  const [avatarMode, setAvatarMode] = useState(false);

  function onImageError(e) {
    e.target.onerror = null;
    e.target.src = defaultUserAvatar;
  }

  const tempStyle = {
    marginTop: "20px",
    borderRadius: "100px",
    width: "200px",
    height: "200px",
  }

  const handleClick = (e) => {
    setAvatarMode(true);
  }

  const handleSave = (e) => {
    setAvatarMode(false);
  }

  const avatarBaseUrl = baseURL + "/users/avatar/"

  const imgUrl = avatarBaseUrl + props.user.userID;

  return (
    <div className={classes.div}>



      <img
        alt="current user profile pic"
        style={tempStyle}
        src={imgUrl}
        onError={onImageError} />

      { !avatarMode ?
        (<IconButton
          variant="text"
          onClick={handleClick}
        >
          <AddAPhotoIcon />
        </IconButton>)
        :
        (<UploadImage
          handleSave={handleSave}

        />)}

    </div>
  )
}


const mapStateToProps = ((state) => {
  return ({ user: state.loginReducer })
})

export default connect(mapStateToProps)(AvatarUpload);