import axios from 'axios';

const server = 'http://localhost:3000';

const request = (type, path, body) => axios
  .request({ url: `${server}${path}`, method: type, data: body })
  .then(req => req.data)


  export const signIn = body => request('post', '/login', body);
  export const registers = body => request('post', '/register', body);
  export const profile = body => request('put', '/user', body);
