import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

export function findRouteData(
  route: ActivatedRoute,
  key: string
): any {
  console.log('Class: findRouteData, Function: findRouteData, Line 51 ' , );
  let current: ActivatedRoute | null = route;

  while (current) {
    console.log('Class: findRouteData, Function: findRouteData, Line 55 current' , current);
    if (key in current.snapshot.data) {
      return current.snapshot.data[key];
    }
    current = current.parent;
    console.log('Class: findRouteData, Function: findRouteData, Line 60 current' , current);
  }

  return null;
}

// Works from a root-provided service — walks DOWN the whole tree.
export function findRouteDataFromRoot(router: Router, key: string): any {
  const stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];
  while (stack.length) {
    const node = stack.pop()!;
    if (key in node.data) return node.data[key];
    stack.push(...node.children);
  }
  return null;
}
