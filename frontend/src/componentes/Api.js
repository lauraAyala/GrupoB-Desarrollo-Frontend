import axios from 'axios';

const server = 'http://localhost:3001';

const request = (type, path, body) => axios
  .request({ url: `${server}${path}`, method: type, data: body })
  .then(req => req.data)


  export const signIn = body => request('post', '/user/login', body);
  export const register = body => request('post', '/user/registerUser', body);
  export const profile = body => request('put', '/user/user', body);
