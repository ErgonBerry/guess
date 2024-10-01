const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Para servir os arquivos estáticos do front-end

// Rota para buscar as coordenadas da cidade
app.get('/api/coordinates/:city', async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.OPENCAGE_API_KEY;

    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${apiKey}`);
        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry;
            res.json({ lat, lon: lng });
        } else {
            res.status(404).json({ message: "Cidade não encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar coordenadas", error });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

