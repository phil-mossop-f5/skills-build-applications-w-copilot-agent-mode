import type { ReactNode } from 'react';

type CollectionFrameProps = {
  title: string;
  eyebrow: string;
  description: string;
  count: number;
  loading: boolean;
  error: string | null;
  emptyMessage: string;
  children: ReactNode;
};

export default function CollectionFrame({
  title,
  eyebrow,
  description,
  count,
  loading,
  error,
  emptyMessage,
  children,
}: CollectionFrameProps) {
  return (
    <section aria-labelledby="collection-title">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="collection-title">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="record-total" aria-live="polite">
          <strong>{count}</strong>
          <span>{count === 1 ? 'record' : 'records'}</span>
        </div>
      </div>

      {loading ? (
        <p className="collection-feedback" role="status">Loading records...</p>
      ) : error ? (
        <p className="collection-feedback error" role="alert">Could not load records: {error}</p>
      ) : count === 0 ? (
        <p className="collection-feedback">{emptyMessage}</p>
      ) : (
        children
      )}
    </section>
  );
}