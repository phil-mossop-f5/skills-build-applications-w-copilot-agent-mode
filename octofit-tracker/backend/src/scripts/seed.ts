import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000001'),
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    username: 'alexm',
  },
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000002'),
    name: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    username: 'jordanl',
  },
];

const teams = [
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000010'),
    name: 'Trailblazers',
    description: 'Building healthy habits one workout at a time.',
    members: users.map(({ _id }) => _id),
    points: 245,
  },
];

const activities = [
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000020'),
    userId: users[0]._id,
    teamId: teams[0]._id,
    type: 'running',
    durationMinutes: 32,
    distanceKm: 5.2,
    calories: 310,
    date: new Date('2026-09-20T08:00:00.000Z'),
  },
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000021'),
    userId: users[1]._id,
    teamId: teams[0]._id,
    type: 'strength training',
    durationMinutes: 40,
    calories: 220,
    date: new Date('2026-09-21T16:30:00.000Z'),
  },
];

const leaderboardEntries = [
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000030'),
    userId: users[0]._id,
    teamId: teams[0]._id,
    points: 145,
    rank: 1,
  },
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000031'),
    userId: users[1]._id,
    teamId: teams[0]._id,
    points: 100,
    rank: 2,
  },
];

const workouts = [
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000040'),
    title: 'Starter Run',
    type: 'running',
    description: 'An easy-paced run to build endurance.',
    difficulty: 'beginner',
    durationMinutes: 25,
  },
  {
    _id: new mongoose.Types.ObjectId('665000000000000000000041'),
    title: 'Bodyweight Basics',
    type: 'strength training',
    description: 'A full-body circuit using simple bodyweight movements.',
    difficulty: 'beginner',
    durationMinutes: 20,
    exercises: ['squats', 'push-ups', 'lunges', 'plank'],
  },
];

async function upsertSeedRecords(
  model: mongoose.Model<any>,
  records: Array<{ _id: mongoose.Types.ObjectId; [key: string]: unknown }>,
) {
  for (const record of records) {
    await model.updateOne(
      { _id: record._id },
      { $setOnInsert: record },
      { upsert: true },
    );
  }
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await upsertSeedRecords(User, users);
    await upsertSeedRecords(Team, teams);
    await upsertSeedRecords(Activity, activities);
    await upsertSeedRecords(LeaderboardEntry, leaderboardEntries);
    await upsertSeedRecords(Workout, workouts);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
