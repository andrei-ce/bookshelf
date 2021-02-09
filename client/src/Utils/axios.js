import axios from 'axios';

const baseUrl = 'http://localhost:5000';
const contentJSON = { 'Content-type': 'application/json' };

const axiosCall = {
  get: async function (url) {
    const config = { headers: contentJSON };
    let answer = await axios.get(baseUrl + url, config);
    // console.log(answer);
    // console.log(answer.data);
    return answer;
  },
  post: async function (url, body) {
    const config = { headers: contentJSON };
    return await axios.post(baseUrl + url, body, config);
  },
  put: async function (url, body) {
    const config = { headers: contentJSON };
    return await axios.put(baseUrl + url, body, config);
  },
};

export default axiosCall;