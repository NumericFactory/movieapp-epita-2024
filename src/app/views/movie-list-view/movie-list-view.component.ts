import { Component } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { MovieModel } from '../../shared/models/movie.model';

@Component({
  selector: 'app-movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrl: './movie-list-view.component.scss'
})
export class MovieListViewComponent {

  // variable d'affichage
  movies: MovieModel[] = [];

  constructor(private movieSvc: MovieService) { }

  ngOnInit() {
    this.movieSvc.getMoviesFromApi()
      .subscribe((data: MovieModel[]) => this.movies = data);
  }



}
