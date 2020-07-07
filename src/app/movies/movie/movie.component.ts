import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: Movie;
  @Output() public readonly navigateToMovie = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }


  public navigateTo() {
  this.navigateToMovie.emit(this.movie.id);
  }
}
