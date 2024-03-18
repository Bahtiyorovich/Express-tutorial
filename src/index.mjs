import express from 'express';
import routes from './routes/index.mjs';

const app = express();
app.use(express.json())

// Routers
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));