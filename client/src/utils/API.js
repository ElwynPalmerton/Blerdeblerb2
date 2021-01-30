import axios from 'axios';

// const herokuURL="https://shielded-dusk-53756.herokuapp.com/"

// export const baseURL = "https://shielded-dusk-53756.herokuapp.com/"
export const baseURL = ""

// export const baseURL = "http://localhost:9000";

export default axios.create({
  baseURL: baseURL
});



