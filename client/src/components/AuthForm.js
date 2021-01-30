import styled from 'styled-components';


const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  /* margin-top: 6rem; */
  grid-column-start: 2;
  grid-row-start: 2;
  display: flex;
  flex-direction: column;
  width: 410px;
  /* justify-items: center; */
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-color: #3f4eae;
  border-radius: 3px;
  /* padding: 1rem; */
  color: white ;
  font-weight: 700;
  width: 100px;
  height: 30px;
  margin-bottom: 1rem;
  margin-top: 1rem;

  font-size: 0.8rem;
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 1rem;
`;

const Error = styled.div`
  background-color: red;
`;

export { Form, Input, Button, Logo, Card, Error };





