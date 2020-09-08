const express = require('express');
const cors = require('cors');
const app = express();
// const db = require('monk')('localhost/meomeo');
const monk = require('monk');

const db = monk('localhost/meomeo');
const meos = db.get('meos');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "Meo Meo 🐈 😹"
    });
});

function isValidMeo(meo) {
    return meo.name && meo.name.toString().trim() != '' &&
        meo.name && meo.name.toString().trim() != '';
}

app.get('/meos', (req, res) => {
    meos.find()
        .then((meos) =>
            res.json(meos)
        );
})

app.post('/meos', (req, res) => {
    if (isValidMeo(req.body)) {
        const meo = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };

        meos.insert(meo)
            .then(createdMeo =>
                res.json(createdMeo)
            );
    } else {
        res.status(422);
        res.json({
            message: 'Name and Content are required!'
        });
    }
});

app.listen(5000, () => {
    console.log('listen in port 5000: http://localhost:5000');
});