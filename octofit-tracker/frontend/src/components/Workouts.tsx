import { useCollection } from '../api';
import CollectionFrame from './CollectionFrame';
import { numberValue, recordKey, textValue } from './recordUtils';

export default function Workouts() {
  const { records, loading, error } = useCollection('workouts');

  return (
    <CollectionFrame
      count={records.length}
      description="Coach-curated sessions for building strength, stamina, and healthy routines."
      emptyMessage="Workout suggestions will appear here."
      error={error}
      eyebrow="FIELD NOTES / TRAINING LIBRARY"
      loading={loading}
      title="Workouts"
    >
      <div className="workout-grid">
        {records.map((record, index) => {
          const exercises = Array.isArray(record.exercises)
            ? record.exercises.filter((exercise): exercise is string => typeof exercise === 'string')
            : [];
          const duration = numberValue(record, 'durationMinutes', 'duration');
          return (
            <article className="workout-item" key={recordKey(record, index)}>
              <div className="workout-meta">
                <span>{textValue(record, 'type', 'category') || 'Training'}</span>
                <span>{textValue(record, 'difficulty', 'level') || 'All levels'}</span>
              </div>
              <h2>{textValue(record, 'title', 'name') || 'Workout'}</h2>
              <p>{textValue(record, 'description') || 'A guided session for your next training day.'}</p>
              {exercises.length > 0 && (
                <ul className="exercise-list" aria-label="Exercises">
                  {exercises.map((exercise) => <li key={exercise}>{exercise}</li>)}
                </ul>
              )}
              <div className="workout-meta mt-3">
                <span>{duration === null ? 'Flexible duration' : `${duration} minutes`}</span>
              </div>
            </article>
          );
        })}
      </div>
    </CollectionFrame>
  );
}