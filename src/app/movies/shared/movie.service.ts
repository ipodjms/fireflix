import { HttpService } from './../../core/http/http.service';
import { Injectable, Injector } from '@angular/core';
import { Movie } from './movie';
import { VERSION_API } from 'src/app/shared/const';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService<Movie> {
  constructor(injector: Injector) {
    super(injector, VERSION_API, 'movies');
  }

  getCurrentMovie(id): Movie {
    let movies: Movie[] = this.getAll();
    let currentMovie: Movie;
    
    function getMovie(): Movie {
      movies.map(movie => {
        if (movie.id === id) {
          currentMovie = movie;
        }
      })
      return currentMovie;
    }
    return getMovie();
  }


}
