import { useCollection } from '../api';
import CollectionFrame from './CollectionFrame';
import { numberValue, recordKey, textValue } from './recordUtils';

export default function Teams() {
  const { records, loading, error } = useCollection('teams');

  return (
    <CollectionFrame
      count={records.length}
      description="Crews bringing consistency, encouragement, and a little competition to every week."
      emptyMessage="No teams have been created yet."
      error={error}
      eyebrow="FIELD NOTES / CREW ROSTER"
      loading={loading}
      title="Teams"
    >
      <div className="team-list">
        {records.map((record, index) => {
          const members = Array.isArray(record.members) ? record.members.length : null;
          const memberCount = numberValue(record, 'memberCount', 'membersCount') ?? members;
          const points = numberValue(record, 'points', 'score');
          return (
            <article className="team-row" key={recordKey(record, index)}>
              <div className="team-name">
                <small>TEAM {String(index + 1).padStart(2, '0')}</small>
                <strong>{textValue(record, 'name', 'teamName') || 'Unnamed team'}</strong>
              </div>
              <div className="team-description">
                <small>ABOUT</small>
                <span>{textValue(record, 'description', 'tagline') || 'A team in the OctoFit community.'}</span>
              </div>
              <div className="team-stat">
                <small>MEMBERS</small>
                <strong>{memberCount ?? '-'}</strong>
              </div>
              <div className="team-stat">
                <small>POINTS</small>
                <strong>{points ?? '-'}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </CollectionFrame>
  );
}