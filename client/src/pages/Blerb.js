import React from 'react';
import { DateTime } from 'luxon';
import { connect } from 'react-redux';

//MUI
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoopIcon from '@material-ui/icons/Loop';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

//avatar
import defaultUserAvatar from './Bio/assets/defaultUserAvatar.png';
import { baseURL } from '../utils/API';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(4),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  userName: {
    fontWeight: "bold",
  },
  lightStyle: {
    fontWeight: "500",
  },
  reblerb: {
    fontWeight: "300",
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  text: {
    overflowWrap: "anywhere",
  },
  imgGrid: {
    textAlign: "center",
  },
  img: {
    borderRadius: "100px",
    height: "100px",
    width: "100px",
  },
  icon: {
    color: theme.palette.primary.main
  }
}));


function Blerb(props) {

  const classes = useStyles();

  const date = props.blerb.createdAt;
  const formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);

  // const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);

  let liked = false;
  //Applies the liked style to the liked output if the current user liked it.
  if (props.blerb.likes.indexOf(props.userID) !== -1) {
    liked = true;
  }

  const avatarBaseUrl = baseURL + "/users/avatar/";
  const imgUrl = avatarBaseUrl + props.blerb.author._id;

  function onImageError(e) {
    console.log('image error');
    e.target.onerror = null;
    e.target.src = defaultUserAvatar;
  }

  return (
    <Box my={4}>
      <Paper
        className={classes.root}
        variant="outlined"
      // className={}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          spacing={3}>
          <Grid
            className={classes.imgGrid}
            item={true}
            xs={4}>
            <img
              className={classes.img}
              // style={tempStyle}
              alt=""
              onError={onImageError}
              src={imgUrl}
            />

          </Grid>
          <Grid item={true} xs={8}>

            {/* Reblerbed by:  */}
            {
              props.blerb.isReblerb &&
              <p
                className={classes.reblerb}

              >Reblerbed by: {props.blerb.owner.name}</p>
            }

            {/* Name and datetime blerbed  */}
            <span>
              <span
                className={classes.userName}
              >{props.blerb.author.name} </span>
              <span
                className={classes.lightStyle}

              > - {formattedDate}</span>
            </span>

            {/* The BLERB itself  */}
            <p className={classes.text}

            >{props.blerb.text}</p>
            <br />

            {/* Reblerb and like buttons */}
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              spacing={3}>
              <Grid item={true} xs={2}>

                {/* REBLERB button  */}
                <IconButton
                  aria-label="reblerb"
                  size="small"
                  value={props.blerb._id}
                  onClick={props.reblerbHandler}
                >
                  <LoopIcon
                    value={props.blerb._id}
                    fontSize="inherit" />
                </IconButton>
              </Grid>
              <Grid
                item={true}
                xs={9}
              >
                {/* LIKE button */}
                <IconButton
                  className={classes.icon}
                  aria-label="reblerb"
                  size="small"
                  value={props.blerb._id}
                  onClick={props.likeBlerbHandler}
                >
                  {liked ?
                    (
                      <FavoriteIcon
                        value={props.blerb._id}
                        fontSize="inherit" />
                    ) : (<FavoriteBorderIcon
                      value={props.blerb._id}
                      fontSize="inherit" />
                    )
                  }
                </IconButton>

                {/* Number of likes  */}
                <span
                  className={classes.lightStyle}
                > {props.blerb.totalLikes}
                </span>
              </Grid>
            </Grid>
            {/* End of Grid for reblerb and like buttons  */}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return { userID: state.loginReducer.userID };
}

export default connect(mapStateToProps)(Blerb);

