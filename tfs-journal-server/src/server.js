import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import schema from './schema/schema.js';
import root from './resolver/root.js';
import {
  MAX_FILE_SIZE,
  MAX_REQUEST_SIZE,
  DB_URL,
} from './private-const/config.js';

import { imageUploadResolver } from './resolver/image-upload-resolver.js';

const port = 3006;

const app = express();
app.use(cors());

app.use(express.json({ limit: MAX_REQUEST_SIZE }));
app.use(
  express.urlencoded({
    limit: MAX_REQUEST_SIZE,
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  '/graphql',
  createHandler({
    schema,
    graphiql: true,
    rootValue: root,
    context: (req) => ({ authorization: req.headers.authorization }),
  })
);

app.use(
  fileUpload({
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
    abortOnLimit: true,
  })
);

app.use('/image-upload', imageUploadResolver);

app.use('/public-images', express.static('public-images'));

app.listen(port);
console.log(`GraphQL API server running at localhost:${port}`);

const startApp = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
