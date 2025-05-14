const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const xmlFilePath = 'gamers.xml';

// Endpoint для отримання даних
app.get('/gamers', (req, res) => {
    fs.readFile(xmlFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.type('application/xml').send(data);
    });
});

// Endpoint для оновлення даних
app.post('/gamers', (req, res) => {
    const newUser = req.body;

    fs.readFile(xmlFilePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        xml2js.parseString(data, (err, result) => {
            if (err) {
                return res.status(500).send('Error parsing XML');
            }

            if (!result.gamers) {
                result.gamers = { user: [] };
            }

            result.gamers.user.push(newUser);

            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);

            fs.writeFile(xmlFilePath, xml, (err) => {
                if (err) {
                    return res.status(500).send('Error writing file');
                }
                res.send('User data updated successfully');
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});