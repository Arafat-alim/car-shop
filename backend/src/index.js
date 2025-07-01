import 'dotenv/config';
import { app } from './app.js';
import connectDB from './db/index.js';
import { carRouter } from './routes/car.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRouter);
app.use('/api', carRouter);

//! test route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Server is running at PORT: ${PORT}`,
  });
});

// Error Handler
app.use(errorHandler);

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    }),
  )
  .catch((error) => console.log('DB connection failed: ', error));
