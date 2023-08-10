import axios from 'axios'



const BaseUrl = axios.create({baseURL:'http://localhost:5000'});

export default BaseUrl;
