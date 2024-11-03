import express from 'express';
import axios from 'axios';
import cors from 'cors';  // Import the cors package

const app = express();
const port = process.env.PORT || 3000;
;

const API_KEY = '601a380c-7cda-4085-825d-03f8de0435c8'; // Your CoinMarketCap API key

app.use(cors());  // Enable CORS for all routes

app.get('/crypto-data', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
        'Accept': 'application/json'
      },
      params: {
        'start': 1,
        'limit': 3,  // Limiting to 3 coins
        'convert': 'USD'
      }
    });
    
    res.json(response.data);  // Send the API response back to the browser
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    res.status(500).send('Error fetching crypto data');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
