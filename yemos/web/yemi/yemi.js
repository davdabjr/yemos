// yemi.js - Chatbot 100% local basado en reglas

import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

// Cargar respuestas
const responsesPath = path.join(process.cwd(), 'responses.json');
let responses = {};
try {
  const raw = fs.readFileSync(responsesPath, 'utf8');
  responses = JSON.parse(raw);
} catch (err) {
  console.error('Error cargando responses.json:', err);
}

// Configuración de Express
const app = express();
app.use(bodyParser.json());

// Función: encontrar mejor respuesta por palabras clave
function findBestResponse(message) {
  const msg = message.toLowerCase();

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of responses.rules) {
    let score = 0;

    for (const kw of entry.keywords) {
      if (msg.includes(kw.toLowerCase())) score++;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  // Si no hay coincidencia, usar fallback
  if (!bestMatch) return responses.fallback;

  return bestMatch.response;
}

// Endpoint principal Yemi
app.post('/api/yemi/message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Falta el parámetro message' });
  }

  const reply = findBestResponse(message);

  res.json({
    success: true,
    reply
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Yemi chatbot escuchando en http://localhost:${PORT}`);
});