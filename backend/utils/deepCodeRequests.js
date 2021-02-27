const axios = require('axios').default;

const instance = axios.create({
  baseURL: 'https://www.deepcode.ai/publicapi/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

async function getSessionToken() {
  try {
    const response = await instance.post('login', {
      source: 'perfectCodeAPI',
    });
    return response.data.sessionToken;
  } catch (error) {
    console.log(error);
  }
}

async function submitBundle(codeSubmission, sessionToken) {
  try {
    const response = await instance.post('bundle', {
      headers: { 'Session-Token': sessionToken.toString() },
      body: { codeSubmission },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

exports.submitBundle = submitBundle;
exports.getSessionToken = getSessionToken;
