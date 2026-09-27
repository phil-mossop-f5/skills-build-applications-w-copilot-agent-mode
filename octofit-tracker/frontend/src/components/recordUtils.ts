import type { ApiRecord } from '../api';

export function textValue(record: ApiRecord, ...keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
    if (typeof value === 'number') {
      return String(value);
    }
    if (typeof value === 'object' && value !== null) {
      const nested = value as Record<string, unknown>;
      for (const nestedKey of ['name', 'username', 'email', '_id']) {
        if (typeof nested[nestedKey] === 'string') {
          return nested[nestedKey];
        }
      }
    }
  }
  return '';
}

export function numberValue(record: ApiRecord, ...keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }
  return null;
}

export function recordKey(record: ApiRecord, index: number): string {
  return textValue(record, '_id', 'id') || `record-${index}`;
}

export function memberLabel(record: ApiRecord, ...keys: string[]): string {
  const label = textValue(record, ...keys);
  if (/^[a-f\d]{24}$/i.test(label)) {
    return `Member ${label.slice(-4).toUpperCase()}`;
  }
  return label || 'Unassigned';
}

export function formatDate(value: unknown): string {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return 'Not recorded';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'OT';
}