import { Observable, timer, of } from "rxjs";

import { flatMap } from "rxjs/operators";
import { Route, PreloadingStrategy } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class AppPreloadingStrategy implements PreloadingStrategy {
	preload(route: Route, load: Function): Observable<any> {
		const loadRoute = delay => (delay ? timer(5000).pipe(flatMap(_ => load())) : load());
		return route.data && route.data.preload ? loadRoute(route.data.delay) : of(null);
	}
}
