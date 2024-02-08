import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../../core/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { TMDBService } from '../../../core/adapters/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { APIExternalMoviesGateway } from '../../../core/ports/api-external-movies.gateway';



@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-detail-view.component.html',
  styleUrl: './movie-detail-view.component.scss'
})
export class MovieDetailViewComponent implements OnInit {

  //movie!: MovieModel;
  movie$!: Observable<MovieModel>

  constructor(
    public location: Location,
    private _route: ActivatedRoute,
    // private _TMDBSvc: TMDBService,
    private _TMDBSvc: APIExternalMoviesGateway,
    private _sanitize: DomSanitizer) { }

  ngOnInit() {
    //1 On récupere l'id dans l'URL
    const movieId: string = this._route.snapshot.params['id'];
    // 2 On demande au service de nous donner le film correspondant
    //   this._TMDBSvc.getMovieFromApi(movieId)
    //   .subscribe(data => this.movie = data)

    // OU via le pipe async dans la view (en remplacement du .subscribe précédent)
    this.movie$ = this._TMDBSvc.getMovieFromApi(movieId)
    // Pour afficher, on utilise @if(movie$ | async; as movie)
  }

  getFullVideoUrl(key: string): SafeResourceUrl {
    return this._sanitize.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + key);
  }













  // 2 demander au service : faire une request TMDB_URL/movie/{id} 
  //TMDBService.getDetailMovie(id)
  // Je recupere un objet MovieModel

  // 3 dans le template movie-detail-.html

}
