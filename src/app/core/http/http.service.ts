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
    fakeMovieList = fakeMovieList.concat(this.makeMoviesByCoutry(Country.BR));
    fakeMovieList = fakeMovieList.concat(this.makeMoviesByCoutry(Country.AR));
    fakeMovieList = fakeMovieList.concat(this.makeMoviesByCoutry(Country.ES));
    fakeMovieList = fakeMovieList.concat(this.makeMoviesByCoutry(Country.US));
    return fakeMovieList as unknown as T[];
  }

  public makeMoviesByCoutry(country: Country): Movie[] {
    let i;
    let cat = ['comedy', 'action', 'drama', 'crime', 'romance'];
    
    let fakeMovieList: Movie[] = [];
    
    for (i = 0; i < 10; i++) {
      let numbers = this.ramdomNumber();
      let movie = new Movie();
      movie.id = 'movie-' + String(country + i);
      movie.name = `Movie ${i}`;
      movie.duration = 0;

      movie.genre = [];

      movie.genre.push(cat[numbers[0]]);
      movie.genre.push(cat[numbers[1]]);

      // somente 2 cat por movie
      //movie.genre.push(cat[numbers[2]]);

      if (i % 2 == 0) {
        movie.source =  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      }
      else {
        movie.source =  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';
      }
      

      movie.country = country;
      fakeMovieList.push(movie);
    }
    return fakeMovieList;
  }

  public ramdomNumber() {
    let numbers = [];
    let i = 0;
    for (i = 0; i < 4 ; i++) {
      var ramdom = Math.floor(Math.random() * 5);
      if (numbers.indexOf(ramdom) === -1)
          numbers.push(ramdom);
    }
      console.log (numbers);
      return numbers;
  }

}