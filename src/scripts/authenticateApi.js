const axios = require('axios');

// JSONbin with our JSON
// const apiKey = '$2b$10$MjLDGc2yCUewqIFpHvHtTOf8QfIVoPGforji6s/KEAX7zimE8hlq.';
// const binId = '6481dfb7b89b1e2299abd3f8';
// const apiUrl = `https://api.jsonbin.io/v3/b/${binId}/latest`;

async function authenticateApi(apiUrl, apiKey) {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'secret-key': apiKey,
        },
      });

      const record = response.data['record'];
      return record;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

export default authenticateApi;
