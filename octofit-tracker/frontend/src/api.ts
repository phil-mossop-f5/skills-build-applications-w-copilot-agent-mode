import { useEffect, useState } from 'react';

export type ApiRecord = Record<string, unknown>;

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function findCollection<T>(payload: unknown): T[] | undefined {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (typeof payload !== 'object' || payload === null) {
    return undefined;
  }

  const wrappedPayload = payload as Record<string, unknown>;
  for (const key of ['results', 'data', 'items']) {
    if (key in wrappedPayload) {
      const collection = findCollection<T>(wrappedPayload[key]);
      if (collection) {
        return collection;
      }
    }
  }

  return undefined;
}

export async function fetchCollection<T extends ApiRecord = ApiRecord>(
  componentOrUrl: string,
  signal?: AbortSignal,
): Promise<T[]> {
  const endpoint = /^https?:\/\//.test(componentOrUrl)
    ? componentOrUrl
    : `${apiBaseUrl}/api/${componentOrUrl}/`;
  const response = await fetch(endpoint, { signal });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`);
  }

  const payload: unknown = await response.json();
  const collection = findCollection<T>(payload);

  if (!collection) {
    throw new Error('The API response did not contain a record collection.');
  }

  return collection;
}

export function useCollection<T extends ApiRecord = ApiRecord>(componentOrUrl: string) {
  const [records, setRecords] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection<T>(componentOrUrl, controller.signal)
      .then(setRecords)
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setRecords([]);
          setError(
            requestError instanceof Error ? requestError.message : 'Unable to load records.',
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [componentOrUrl]);

  return { records, loading, error };
}