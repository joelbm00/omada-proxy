const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'https://pumaweb-d8ef2.web.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/omada-proxy', async (req, res) => {
  const { clientMac } = req.query;

  if (!clientMac) {
    return res.status(400).json({ error: 'Falta el parámetro clientMac' });
  }

  const omadaUrl = `https://use1-omada-cloud.tplinkcloud.com/portal/auth?clientMac=${clientMac}`;

  try {
    const response = await fetch(omadaUrl);
    const text = await response.text();
    res.send(text);
  } catch (error) {
    console.error('Error al contactar con Omada:', error);
    res.status(500).json({ error: 'Error al obtener respuesta de Omada' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});
