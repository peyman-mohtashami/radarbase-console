import {UrlTree} from '@angular/router';

export function getLastSegment(urlTree: UrlTree) {
  const primaryRoute = urlTree.root.children['primary'];

  if (!primaryRoute) return;

  const segments = primaryRoute.segments.map(segment => segment.path);
  return segments[segments.length - 1];
}
