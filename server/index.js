const express = require('express');
const cors = require('cors');
const app = express();
const rateLimit = require('express-rate-limit');
const monk = require('monk');
const Filter = require('bad-words'),
    filter = new Filter();

const db = monk(process.env.MONGO_URI || 'localhost/meomeo');
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

app.get('/v2/meos', (req, res, next) => {
    let { skip = 0, limit = 10, sort = "desc" } = req.query;
    skip = Number(skip) || 0;
    limit = Number(limit) || 10;


    Promise.all([
        meos.count(),
        meos.find({}, {
            skip,
            limit,
            sort: {
                created: sort === "asc" ? 1 : -1
            }
        })
    ])
        .then(([total, meos]) => {
            res.json(
                {
                    meos,
                    meta : {
                        total,
                        skip,
                        limit,
                        hasMore: total - (skip + limit) > 0,
                    }
                })
        }).catch(next)
})

app.use(rateLimit({
    windowMs: 30 * 1000,
    max: 10
}));

app.post('/meos', (req, res) => {
    if (isValidMeo(req.body)) {
        const meo = {
            name: filter.clean(req.body.name.toString().trim()),
            content: filter.clean(req.body.content.toString().trim()),
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

app.post('/meofind', (req, res) => {
    if (isValidMeo(req.body)) {
        const meo = {
            name: filter.clean(req.body.name.toString().trim()),
            content: filter.clean(req.body.content.toString().trim())
        };
        console.log(meo);
        meos.find(meo)
            .then(foundMeo => {
                console.log(foundMeo);
                res.json(foundMeo);
            });
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