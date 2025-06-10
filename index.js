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

    const status = response.status;
    const headers = [...response.headers.entries()];
    const text = await response.text();

    console.log("🔄 Respuesta de Omada:");
    console.log("📦 Status:", status);
    console.log("🧾 Headers:", headers);
    console.log("📄 Body:");
    console.log(text);

    res.status(status);
    res.set('Content-Type', response.headers.get('content-type') || 'text/plain');
    res.send(text);
  } catch (error) {
    console.error('❌ Error al contactar con Omada:', error);
    res.status(500).json({ error: 'Error al obtener respuesta de Omada' });
  }
});

// ✅ Mover fuera del try-catch
app.listen(PORT, () => {
  console.log(`Servidor proxy escuchando en http://localhost:${PORT}`);
});