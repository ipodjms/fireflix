import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SortService {
  constructor() {}

  public sortNumber(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }
}
