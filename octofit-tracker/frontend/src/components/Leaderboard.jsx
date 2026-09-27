import { apiBaseUrl, useCollection } from '../api';
import CollectionFrame from './CollectionFrame';
import { memberLabel, numberValue, recordKey, textValue } from './recordUtils';

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : `${apiBaseUrl}/api/leaderboard/`;

export default function Leaderboard() {
  const { records, loading, error } = useCollection(endpoint);
  const rankedRecords = [...records].sort((first, second) => {
    const firstRank = numberValue(first, 'rank') ?? Number.MAX_SAFE_INTEGER;
    const secondRank = numberValue(second, 'rank') ?? Number.MAX_SAFE_INTEGER;
    return firstRank - secondRank;
  });

  return (
    <CollectionFrame
      count={records.length}
      description="A season-to-date view of individual effort and team standing."
      emptyMessage="Leaderboard results will appear as activities are scored."
      error={error}
      eyebrow="FIELD NOTES / SEASON STANDINGS"
      loading={loading}
      title="Leaderboard"
    >
      <div className="data-table-wrap">
        <table className="table data-table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Athlete</th>
              <th scope="col">Team</th>
              <th scope="col">Points</th>
            </tr>
          </thead>
          <tbody>
            {rankedRecords.map((record, index) => {
              const rank = numberValue(record, 'rank') ?? index + 1;
              const points = numberValue(record, 'points', 'score') ?? 0;
              return (
                <tr key={recordKey(record, index)}>
                  <td><span className={`rank-mark${rank === 1 ? ' top-rank' : ''}`}>{rank}</span></td>
                  <td className="primary-cell">{memberLabel(record, 'userName', 'name', 'user', 'userId')}</td>
                  <td>{textValue(record, 'teamName', 'team') || memberLabel(record, 'teamId')}</td>
                  <td><span className="score-value">{points}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CollectionFrame>
  );
}