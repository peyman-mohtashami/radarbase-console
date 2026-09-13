import {AppSort} from '../models/table.model';

export function filterItems<T extends object>(
  items: T[],
  filter: Record<string, string | undefined>,
): T[] {
  return Object.entries(filter)
    .filter(([, value]) => value)
    .reduce(
      (acc, [key, value]) =>
        acc.filter(item =>
          field(item, key).toLowerCase().includes(value!.toLowerCase()),
        ),
      items,
    );
}

export function sortItems<T extends object>(
  items: T[],
  {sortField, sortOrder}: AppSort,
): T[] {
  const collator = new Intl.Collator('en', {
    numeric: true,
    sensitivity: 'base',
  });

  const dir = sortOrder === 'asc' ? 1 : -1;

  return [...items].sort((a, b) =>
    dir * collator.compare(field(a, sortField), field(b, sortField)),
  );
}

export function paginateItems<T extends object>(
  items: T[],
  {pageSize, pageIndex}: { pageSize: number; pageIndex: number },
): T[] {
  const start = pageSize * pageIndex;
  return items.slice(start, start + pageSize);
}

/** Safe string accessor for dynamic field keys. */
function field(entity: object, key: string): string {
  return (entity as Record<string, unknown>)[key]?.toString() ?? '';
}
