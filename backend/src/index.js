import 'dotenv/config';
import { app } from './app.js';
import connectDB from './db/index.js';
import { carRouter } from './routes/car.routes.js';

const PORT = process.env.PORT || 5000;

app.use('/api', carRouter);

//! test route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Server is running at PORT: ${PORT}`,
  });
});

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    }),
  )
  .catch((error) => console.log('DB connection failed: ', error));
