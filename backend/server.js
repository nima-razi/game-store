const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const gamesFilePath = path.join(__dirname, 'games.json');

app.use(cors()); 
app.use(express.json());

app.post('/add-game', (req, res) => {
  const newGame = req.body;

  fs.readFile(gamesFilePath, 'utf8', (err, data) => {
    let games = [];

    if (!err && data) {
      try {
        games = JSON.parse(data);
      } catch (parseErr) {
        console.error('JSON parse error:', parseErr);
      }
    }

    games.push(newGame);

    fs.writeFile(gamesFilePath, JSON.stringify(games, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to games.json:', writeErr);
        return res.status(500).send('Failed to save game');
      }

      console.log('Game added:', newGame);
      res.status(200).send('Game added');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});