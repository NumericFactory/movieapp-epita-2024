import { Component } from '@angular/core';
import { MovieModel } from '../../shared/models/movie.model';
import { TvShowModel } from '../../shared/models/tv-show.model';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

  movies!: MovieModel[];
  tv!: TvShowModel[];

  constructor(private movieSvc: MovieService) { }

  ngOnInit() {
    // recuperer les 5 premiers movies
    this.movieSvc.getMoviesFromApi().subscribe(
      data => this.movies = data.slice(0, 6)
    )
    // recuperer les 5 premieres series
    this.movieSvc.getTvShowFromApi().subscribe(
      data => this.tv = data.slice(0, 6)
    )
  }

}
