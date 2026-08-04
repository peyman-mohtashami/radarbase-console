import {WritableSignal} from '@angular/core';
import {RbSort} from '../models/table.model';


export async function execute(op: {
  loading: WritableSignal<boolean>,
  error: WritableSignal<Error | null>,
  action: () => Promise<void>
}): Promise<boolean> {
  op.loading.set(true);
  op.error.set(null);
  try {
    await op.action();
    return true;
  } catch (e) {
    op.error.set(e as Error);
    return false;
  } finally {
    op.loading.set(false);
  }
}

// export interface StoreExecutionState {
//   loading: WritableSignal<boolean>;
//   error: WritableSignal<Error | null>;
// }
//
// /** Runs async op with loading and error handling. */
// export async function execute<T>(
//   state: StoreExecutionState,
//   op: () => Promise<T>,
// ): Promise<T | undefined> {
//   state.loading.set(true);
//   state.error.set(null);
//
//   try {
//     return await op();
//   } catch (e) {
//     state.error.set(e as Error);
//     return undefined;
//   } finally {
//     state.loading.set(false);
//   }
// }
//
// export async function mutate<T>(
//   action: () => Observable<T>,
//   options: {
//     execute: <R>(op: () => Promise<R>) => Promise<R | undefined>;
//     getWithQuery: () => Promise<void>;
//     clearSelected: () => void;
//   },
// ): Promise<void> {
//   await options.execute(async () => {
//     await firstValueFrom(action());
//     await options.getWithQuery();
//   });
//
//   options.clearSelected();
// }

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
  {sortField, sortOrder}: RbSort,
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
