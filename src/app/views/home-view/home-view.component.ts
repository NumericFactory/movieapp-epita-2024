import { Component } from '@angular/core';
import { MovieModel } from '../../core/models/movie.model';
import { TvShowModel } from '../../core/models/tv-show.model';
import { TMDBService } from '../../core/adapters/tmdb.service';
import { APIExternalMoviesGateway } from '../../core/ports/api-external-movies.gateway';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.scss'
})
export class HomeViewComponent {

  movies!: MovieModel[];
  tv!: TvShowModel[];

  constructor(
    //private _TMDBSvc: TMDBService
    private _TMDBSvc: APIExternalMoviesGateway
  ) { }

  ngOnInit() {
    // recuperer les 5 premiers movies
    this._TMDBSvc.getMoviesFromApi().subscribe(
      data => {
        console.log(data)
        this.movies = data.slice(0, 6)
      }
    )
    // recuperer les 5 premieres series
    this._TMDBSvc.getTvShowFromApi().subscribe(
      data => this.tv = data.slice(0, 6)
    )

  }

  ngOnDestroy() {
    console.log('ceci va s\'executer juste avant la destruction du component HomeView')
  }

}
