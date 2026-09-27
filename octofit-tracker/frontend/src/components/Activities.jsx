import { apiBaseUrl, useCollection } from '../api';
import CollectionFrame from './CollectionFrame';
import { formatDate, memberLabel, numberValue, recordKey, textValue } from './recordUtils';

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : `${apiBaseUrl}/api/activities/`;

export default function Activities() {
  const { records, loading, error } = useCollection(endpoint);

  return (
    <CollectionFrame
      count={records.length}
      description="Recent movement logged across the student community."
      emptyMessage="No activities have been logged yet."
      error={error}
      eyebrow="FIELD NOTES / ACTIVITY LOG"
      loading={loading}
      title="Activities"
    >
      <div className="data-table-wrap">
        <table className="table data-table">
          <thead>
            <tr>
              <th scope="col">Athlete</th>
              <th scope="col">Activity</th>
              <th scope="col">Date</th>
              <th scope="col">Duration</th>
              <th scope="col">Distance</th>
              <th scope="col">Calories</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const duration = numberValue(record, 'durationMinutes', 'duration');
              const distance = numberValue(record, 'distanceKm', 'distance');
              const calories = numberValue(record, 'calories');
              return (
                <tr key={recordKey(record, index)}>
                  <td className="primary-cell">{memberLabel(record, 'userName', 'user', 'userId')}</td>
                  <td>{textValue(record, 'type', 'activityType', 'name') || 'Activity'}</td>
                  <td className="secondary-cell">{formatDate(record.date ?? record.createdAt)}</td>
                  <td>{duration === null ? '-' : `${duration} min`}</td>
                  <td>{distance === null ? '-' : `${distance} km`}</td>
                  <td>{calories === null ? '-' : `${calories} kcal`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CollectionFrame>
  );
}