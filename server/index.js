const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const Comment = require('./models/Comment');
const Contact = require('./models/Contact');
const sendContactEmail = require('./utils/mailer');



require('dotenv').config(); // Para usar variables desde .env

// Middleware
app.use(cors());
app.use(express.json());

// Obtener todos los comentarios
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
});

// Crear un nuevo comentario
app.post('/api/comments', async (req, res) => {
  const { name, email, message, rating } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Nombre y mensaje son requeridos' });
  }

  try {
    const newComment = new Comment({ name, email, message, rating });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar comentario' });
  }
});


// In-memory storage for comments (en producción usar una base de datos)
let comments = [
  {
    id: 1,
    name: 'María González',
    email: 'maria@ejemplo.com',
    message: '¡Excelente trabajo! Muy profesional y atento a los detalles.',
    rating: 5,
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos@ejemplo.com',
    message: 'Desarrollador muy talentoso. Entregó el proyecto antes de tiempo.',
    rating: 5,
    timestamp: new Date(Date.now() - 86400000).toISOString() // 1 día atrás
  }
];

// Routes
app.get('/api/comments', (req, res) => {
  res.json(comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
});

app.post('/api/comments', (req, res) => {
  const { name, email, message, rating } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ error: 'Nombre y mensaje son requeridos' });
  }

  const newComment = {
    id: comments.length + 1,
    name,
    email: email || '',
    message,
    rating: rating || 5,
    timestamp: new Date().toISOString()
  };

  comments.push(newComment);
  res.status(201).json(newComment);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save(); // <<<<<< ESTE ES EL GUARDADO REAL
    await sendContactEmail({ name, email, subject, message });


    console.log('✅ Mensaje guardado:', newContact);
    res.json({ message: 'Mensaje enviado exitosamente' });
  } catch (err) {
    console.error('❌ Error al guardar contacto:', err);
    res.status(500).json({ error: 'Error al guardar el mensaje de contacto' });
  }
});



// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});