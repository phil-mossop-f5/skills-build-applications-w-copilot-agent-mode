import { useCollection } from '../api';
import CollectionFrame from './CollectionFrame';
import { initials, recordKey, textValue } from './recordUtils';

export default function Users() {
  const { records, loading, error } = useCollection('users');

  return (
    <CollectionFrame
      count={records.length}
      description="Athlete profiles registered with the Mergington fitness program."
      emptyMessage="No athlete profiles are available yet."
      error={error}
      eyebrow="FIELD NOTES / ATHLETE DIRECTORY"
      loading={loading}
      title="Athletes"
    >
      <div className="data-table-wrap">
        <table className="table data-table">
          <thead>
            <tr>
              <th scope="col">Athlete</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Team</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const name = textValue(record, 'name', 'fullName', 'username') || 'Athlete';
              return (
                <tr key={recordKey(record, index)}>
                  <td className="primary-cell">
                    <span className="initial-mark me-2" aria-hidden="true">{initials(name)}</span>
                    {name}
                  </td>
                  <td>{textValue(record, 'username', 'handle') || '-'}</td>
                  <td className="secondary-cell">{textValue(record, 'email') || '-'}</td>
                  <td>{textValue(record, 'teamName', 'team') || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CollectionFrame>
  );
}