import express from "express";
import cors from "cors";
import { connectToDatabase } from "./infrastructure/database/mongoClient";
import Routes from './infrastructure/routes'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';
import config from "./config";
const API_VERSION=config.API_VERSION

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/'+API_VERSION,Routes)

// Swagger setup
app.use(`/${API_VERSION}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = config.PORT

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await connectToDatabase(config.MONGO_URL as string);
});
