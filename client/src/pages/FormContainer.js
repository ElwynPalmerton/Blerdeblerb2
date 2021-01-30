import React from 'react';
// import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { Form } from '../components/AuthForm';
import styled from 'styled-components';

//This component is used in the login and register components.

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(4),
      textAlign: 'center'
    }
  },
  form: {
    textAlign: 'center'
  }
}));

const GridContainer = styled.div`
   display: grid;
   grid-template-rows: 0.5fr 1fr 1fr;
   grid-template-columns: 1fr 1fr 1fr;
`;


function FormContainer(props) {

  const classes = useStyles();
  return (
    <GridContainer className={classes.root}
      classes={{
        root: classes
      }}
    >
      <Form className={classes.form}>
        {props.children}
      </Form>
    </GridContainer>
  )
}

export default FormContainer;