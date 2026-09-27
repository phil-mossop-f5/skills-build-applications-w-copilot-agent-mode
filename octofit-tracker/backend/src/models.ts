import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({}, {
  strict: false,
  timestamps: true,
});

export const User = mongoose.model('User', collectionSchema, 'users');
export const Team = mongoose.model('Team', collectionSchema, 'teams');
export const Activity = mongoose.model('Activity', collectionSchema, 'activities');
export const LeaderboardEntry = mongoose.model(
  'LeaderboardEntry',
  collectionSchema,
  'leaderboard',
);
export const Workout = mongoose.model('Workout', collectionSchema, 'workouts');