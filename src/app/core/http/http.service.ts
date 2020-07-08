import { map } from 'rxjs/operators';
import { Country } from './../../movies/shared/country.enum';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Movie } from 'src/app/movies/shared/movie';

import * as uuid from 'uuid';


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
    let fakeMovieList: Movie[] = [];
    // fakeMovieList = [
    //   {
    //     id: 'ee2cb54e-c05c-11ea-b3de-0242ac130004',
    //     name: 'Movie 1',
    //     duration: 90000,
    //     genre: ['humor', 'comedy'],
    //     source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     country: Country.BR
    //   },
    //   {
    //     id: '009a52a4-c05d-11ea-b3de-0242ac130004',
    //     name: 'Movie 2',
    //     duration: 90000,
    //     genre: ['comedy', 'action', 'drama', 'crime', 'romance'],
    //     source: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    //     country: Country.BR
    //   }
    // ];
    fakeMovieList = fakeMovieList.concat(this.x(Country.BR));
    return fakeMovieList as unknown as T[];
  }

  x(country: Country): Movie[] {
    let i;
    let cat = ['comedy', 'action', 'drama', 'crime', 'romance'];
    
    let fakeMovieList: Movie[] = [];
    

    for (i = 0; i < 10; i++) {
      let numbers = this.ramdomNumber();
      let movie = new Movie();
      movie.id = uuid.v4();
      movie.name = `Movie ${i}`;
      movie.duration = 0;

      movie.genre = [];

      movie.genre.push(cat[numbers[0]]);
      movie.genre.push(cat[numbers[1]]);
      movie.genre.push(cat[numbers[2]]);
  
      movie.country = country;
      fakeMovieList.push(movie);
    }
    return fakeMovieList;
  }

  public ramdomNumber() {
    let numbers = [];
    let i = 0;
    for (i = 0; i < 4 ; i++) {
      var ramdom = Math.floor(Math.random() * 4);
      if (numbers.indexOf(ramdom) === -1)
          numbers.push(ramdom);
    }
      console.log (numbers);
      return numbers;
  }

sort() {

}

}