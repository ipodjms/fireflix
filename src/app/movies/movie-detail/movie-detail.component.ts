import { ActivatedRoute } from '@angular/router';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  public movie: Movie;
  constructor(private movieService:MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let movieId = this.getUrlsParams();
    if (!!movieId) {
      this.movie = this.movieService.getCurrentMovie(movieId);
    }
  }

  getUrlsParams() {
    return this.activatedRoute.snapshot.params.id;

  }

}
