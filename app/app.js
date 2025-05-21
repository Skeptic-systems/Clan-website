require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const clanRoutes = require('./clan');

const app = express();
const port = process.env.PORT || 65115;

app.use(cors());
app.use(express.json());

app.use('/api/clan', clanRoutes); 

const clanTag = process.env.CLAN_TAG;
const apiToken = process.env.API_TOKEN;

console.log('Clan Tag:', clanTag);  
console.log('API Token:', process.env.API_TOKEN); 

if (!clanTag || !apiToken) {
  console.error('Missing clan tag or API token.');
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
