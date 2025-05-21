const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/members', async (req, res) => {
    try {
        const clanTag = process.env.CLAN_TAG;
        const apiKey = process.env.API_TOKEN;

        const response = await axios.get(`https://api.clashofclans.com/v1/clans/${clanTag}/members`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        const sortedMembers = response.data.items.sort((a, b) => b.trophies - a.trophies);

        res.json(sortedMembers);
    } catch (error) {
        console.error('Error fetching clan members:', error);
        res.status(500).json({ error: 'Error fetching clan members' });
    }
});

module.exports = router;
