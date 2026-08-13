export type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

export function getPaginationItems(currentPage: number, pageCount: number): PaginationItem[] {
  const lastPage = Math.max(1, Math.trunc(pageCount));
  const current = Math.min(lastPage, Math.max(1, Math.trunc(currentPage)));

  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, index) => index + 1);
  }

  const visiblePages = [...new Set([1, current - 1, current, current + 1, lastPage])]
    .filter((page) => page >= 1 && page <= lastPage)
    .sort((left, right) => left - right);
  const items: PaginationItem[] = [];

  for (const page of visiblePages) {
    const previous = items.at(-1);
    const previousPage = typeof previous === 'number' ? previous : null;

    if (previousPage !== null && page - previousPage > 1) {
      items.push(previousPage === 1 ? 'ellipsis-start' : 'ellipsis-end');
    }
    items.push(page);
  }

  return items;
}
