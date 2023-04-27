import axios from 'axios';
const request = axios.create({
    baseURL: process.env.REACT_APP_BACK_API_URL  
  });

  export const services =  {
    getProducts: async function getProducts(){
        return await (await request.get("/product")).data
    }
}