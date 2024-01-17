import { Component } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrl: './movie-list-view.component.scss'
})
export class MovieListViewComponent {

  constructor(private movieSvc: MovieService) {

  }

  ngOnInit() {
    this.movieSvc.getMoviesFromApi()
  }

}
