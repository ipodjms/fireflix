import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit, Injector } from '@angular/core';
import { ListBaseComponent } from 'src/app/core/list-base';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent extends ListBaseComponent<Movie, MovieService> {

  constructor(injector: Injector, service: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    super(injector, service);
  }

  ngOnInit() {
  }

  public trackByMovie(index: number, movie: Movie): string {
    return movie.id;
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
