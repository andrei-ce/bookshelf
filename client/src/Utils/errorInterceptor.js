import axios from 'axios';

const errorInterceptor = () => {
  const errorCodes = [400, 422, 500];
  axios.interceptors.response.use(
    (response) => response, //allow all responses to go through
    (error) => {
      if (errorCodes.includes(error.response.status)) {
        console.log(error.response);
        let errorMsg = error.response.data.errors[0].msg;
        let errorStatus = error.response.status;
        window.alert(
          `Server error: ${errorStatus} 
        ${errorMsg}`
        );
        return;
      }
      // if other code errors are present
      return Promise.reject(error);
    }
  );
};

export default errorInterceptor;
