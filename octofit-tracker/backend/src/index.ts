import cors from 'cors';
import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
 
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

function registerCollectionRoutes(
  path: string,
  model: typeof User,
) {
  app.get(path, async (_request, response) => {
    const records = await model.find().lean();
    response.json(records);
  });

  app.post(path, async (request, response) => {
    if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }

    const record = await model.create(request.body);
    response.status(201).json(record);
  });
}

registerCollectionRoutes('/api/users/', User);
registerCollectionRoutes('/api/teams/', Team);
registerCollectionRoutes('/api/activities/', Activity);
registerCollectionRoutes('/api/leaderboard/', LeaderboardEntry);
registerCollectionRoutes('/api/workouts/', Workout);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});