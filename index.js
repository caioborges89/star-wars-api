const app = require('express')();
const axios = require('axios');

const baseURL = 'https://swapi.co/api/';

const getFilmId = (url) => {
    const id = url.split('/')[5];
    return Number(id);
}

const getCharacterImageUrl = (url) => {
    const getCharacterId = url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/characters/${getCharacterId}.jpg`;
}

const getFilmImageUrl = (id) => {
    return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
}

app.get('/films', async (req, res, next) => {
    try {
        const { data: { results } } = await axios.request({ baseURL, url: 'films' });
        results.forEach(x => x.id = getFilmId(x.url));
        return res.send(results).status(200);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers' || '*'));
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(204).send();
    }
    next();
});

app.all('*', async (req, res, next) => {
    res.send({
        routes: ['films', 'films/id']
    })
})

const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Aplicação - Ativa :D | ${port}`);
});