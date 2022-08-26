const axios = jest.fn(() => Promise.resolve({
  status: 200,
  message: 'OK',
}));

axios.get = jest.fn(() => Promise.resolve({
  status: 200,
  message: 'OK',
}));

module.exports = axios;
