import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Movie } from 'src/app/movies/shared/movie';

@Injectable({
  providedIn: 'root'
})

export class HttpService<T> {
  public httpClient: HttpClient;
  
  constructor(private injector: Injector,  @Inject('url') public url: string, @Inject('endpoint') protected endpoint: string ) {
    this.httpClient = injector.get(HttpClient);
  }


  public create(item: T): Observable<T> {
    return this.httpClient.post<T>(`${this.endpoint}`, item).pipe(map((data) => data as T));
  }

  public update(item: T): Observable<T> {
    return this.httpClient.put<T>(`${this.endpoint}`, item).pipe(map((data) => data as T));
  }

  public delete(item: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.endpoint}/${item}`).pipe(map((data) => data));
  }

  public get(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.endpoint}/${id}`).pipe(map((data) => data as T));
  }

  // public getAll(): Observable<T[]> {
  //  return this.httpClient.get<T[]>(`${this.url}/${this.endpoint}/getAll`).pipe(map((data) => data as T[]));
  // }

  public getAll(): T[] {
    console.log ('movies');
    return this.buildFakeMovies();
  }


  public buildFakeMovies(): T[] {
    let x: Movie[] = [];
    x = [
      {
        id: 'ee2cb54e-c05c-11ea-b3de-0242ac130004',
        name: 'Movie 1',
        duration: 90000,
        genre: ['Humor'],
        source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        id: '009a52a4-c05d-11ea-b3de-0242ac130004',
        name: 'Movie 2',
        duration: 90000,
        genre: ['Comedy'],
        source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      }
    ];
    return x as unknown as T[];
  }
}