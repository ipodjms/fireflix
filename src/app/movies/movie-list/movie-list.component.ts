import { Country } from './../shared/country.enum';
import { Movie } from 'src/app/movies/shared/movie';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { ListBaseComponent } from 'src/app/core/list-base';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent extends ListBaseComponent<Movie, MovieService> implements OnChanges {

  public brMovies: Movie[] = [];

  public esMovies: Movie[] = [];
  public arMovies: Movie[] = [];
  public usMovies: Movie[] = [];

  public comedyMovies: Movie[] = [];
  public actionMovies: Movie[] = [];
  public dramaMovies: Movie[] = [];
  public crimeMovies: Movie[] = [];
  public romanceMovies: Movie[] = [];

  constructor(injector: Injector, service: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    super(injector, service);
  }

  public ngAfterContentInit(): void {

    if (!!this.models) {
      this.brMovies = [...this.models];
      this.esMovies = [...this.models];
      this.arMovies = [...this.models];
      this.usMovies = [...this.models];
  
      this.filterByGenre(this.comedyMovies, 'comedy');
      this.filterByGenre(this.actionMovies, 'action');
      this.filterByGenre(this.dramaMovies, 'drama');
      this.filterByGenre(this.crimeMovies, 'crime');
      this.filterByGenre(this.romanceMovies, 'romance');
  
      this.filterByCountry(Country.BR);
      this.filterByCountry(Country.ES);
      this.filterByCountry(Country.AR);
      this.filterByCountry(Country.US);
    }



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

  public filterByCountry(country: Country): void {

    switch (true) {
      case country === Country.BR:
        this.brMovies = this.brMovies.filter (movie => {
          return movie.country === Country.BR;
        })
          break;
      case country === Country.ES:
        this.esMovies = this.esMovies.filter (movie => {
          return movie.country === Country.ES;
        })
          break;
        case country === Country.AR:
          this.arMovies = this.arMovies.filter (movie => {
            return movie.country === Country.AR;
        })
          break;
        case country === Country.US:
          this.usMovies = this.usMovies.filter (movie => {
              return movie.country === Country.US;
        })
            break;
    }
  }

  public filterByGenre(movies: Movie[], genre:string): void {
    this.models.map((movie, idx) => {
      movie.genre.map (objGenre => {
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
