const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

let db = { files: [], blacklist: [], logs: [] };
if (fs.existsSync('./database.json')) {
    db = JSON.parse(fs.readFileSync('./database.json'));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/api/files', (req, res) => {
    res.json(db.files);
});

app.post('/api/admin/add', (req, res) => {
    const newFile = { id: Date.now().toString(), ...req.body };
    db.files.push(newFile);
    fs.writeFileSync('./database.json', JSON.stringify(db, null, 2));
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("SERVEUR ACTIF : http://localhost:3000");
});