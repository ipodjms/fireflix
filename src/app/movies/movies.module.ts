import { SharedModule } from './../shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingModule } from './movies.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';



@NgModule({
  declarations: [MovieListComponent, MovieDetailComponent, MovieComponent],
  imports: [
    CommonModule, MoviesRoutingModule, SharedModule
  ]
})
export class MoviesModule { }
