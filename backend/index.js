const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

connectToMongo();
const app = express()
const port = 5000

app.use(cors({
  origin: (origin, cb) => cb(null, true),
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','auth-token','Authorization','Accept'],
  credentials: true
}));
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// serve static in production, but don't handle /api requests
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API route not found' });
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})