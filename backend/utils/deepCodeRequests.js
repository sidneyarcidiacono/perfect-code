const axios = require('axios').default;

const instance = axios.create({
  baseURL: 'https://www.deepcode.ai/publicapi/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

async function submitBundle(codeSubmission) {
  try {
    const response = await instance.post('bundle', codeSubmission);
    return response;
  } catch (error) {
    console.log(error);
  }
}

exports.submitBundle = submitBundle;
