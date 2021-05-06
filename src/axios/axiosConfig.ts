import axios from 'axios';

    
const instance = axios.create({
    
       
    });
    
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.defaults.headers.get['Access-Control-Allow-Origin'] = '*';   

    instance.interceptors.request.use(request => {
        console.log("The request", request);
       
        return request;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

    instance.interceptors.response.use(response => {
        console.log("The response", response);
       
        return response;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });
    export default instance;