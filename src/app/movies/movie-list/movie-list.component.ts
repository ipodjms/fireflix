import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { ListBaseComponent } from 'src/app/core/list-base';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent extends ListBaseComponent<Movie, MovieService> implements OnChanges {

  public brazilianMovies: Movie[] = [];
  public comedyMovies: Movie[] = [];

  constructor(injector: Injector, service: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    super(injector, service);
  }

  public ngAfterContentInit(): void {

    // this.comedyMovies = [...this.models];
    this.brazilianMovies = [...this.models];

    this.filterByGenre(this.comedyMovies, 'comedy');

    this.filterBrazilianMovies();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = this.models;
    if (changes.change.currentValue) {
      alert();
    } 
  }

  public trackByMovie(index: number, movie: Movie): string {
    return movie.id;
  }

  filterBrazilianMovies () {
    this.brazilianMovies = this.brazilianMovies.filter (movie => {
      return movie.country === 'BR';
    })
  }

  public filterByGenre(movies: Movie[], genre:string): void {
    this.models.map((movie, idx) => {
      movie.genre.map (objGenre => {
        console.log (objGenre)
       if (objGenre === genre) {
        movies.push(movie);
       }
     })
   });
  }


  public onNavigateToMovie(event): void {
    console.log (event);
    let id = event;
    this.router.navigate(['watch', id], {
      replaceUrl: false,
      relativeTo: this.activatedRoute
    });
  }

  
}
