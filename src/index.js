const express = require('express');
const authRoutes = require('./api/routes');
const { requestLogger, errorHandler, rateLimiter } = require('./api/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

// General rate limit: 100 requests per 15 minutes per IP across all auth endpoints
app.use('/api/auth', rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
