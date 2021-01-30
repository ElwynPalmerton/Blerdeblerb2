import React, { useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: "0.25rem",
    color: theme.palette.primary.main
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    color: theme.palette.yellow.main
  }
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>

      <div>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}>
          <MenuIcon />
        </IconButton>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    {/* PROFILE  */}

                    {/* <Link to={{
                      pathname: "/profile",
                      state: { referer: props.from }
                    }}> */}

                    {/* BIO */}
                    <Link
                      className={props.classes.link}
                      to={{
                        pathname: "/bio",
                        state: { referer: props.from }
                      }}>
                      <MenuItem
                        onClick={handleClose}>
                        Bio
                    </MenuItem>
                    </Link>

                    <Link
                      className={props.classes.link}
                      to={{
                        pathname: "/profile",
                        state: { referer: props.from }
                      }}>
                      <MenuItem
                        onClick={handleClose}>
                        My Blerbs
                    </MenuItem>
                    </Link>


                    {/* FIND BLERBERS */}
                    <Link
                      className={props.classes.link}
                      to={{
                        pathname: "/findBlerbers",
                        state: { referer: props.from }
                      }}>
                      <MenuItem onClick={handleClose}>
                        Find Blerbers
                    </MenuItem>
                    </Link>



                    {/* FOLLOWING  */}
                    <Link
                      className={props.classes.link}
                      to={{
                        pathname: "/following",
                        state: { referer: props.from }
                      }}>
                      <MenuItem onClick={handleClose}>
                        Following
                    </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
