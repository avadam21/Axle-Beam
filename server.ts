import express from 'express';
import bodyParser from 'body-parser';
import Beam from '@onbeam/node';
const beam = new Beam("key");

async function profiles() {
    const profile:any = await beam.profiles.createProfile({
      "entityId": "kyubi2",
      "chainId": 13337
    });
    console.log(profile);
    
}
profiles();

interface User {
  id: number;
  name: string;
}

let users: User[] = [];

const app = express();
app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const user: User = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.status(201).json(user);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));