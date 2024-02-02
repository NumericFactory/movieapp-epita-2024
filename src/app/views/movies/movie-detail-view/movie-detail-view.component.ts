import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../../shared/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../../shared/services/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';



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
    private route: ActivatedRoute, private tmdbSvc: TmdbService, private sanitize: DomSanitizer) { }

  ngOnInit() {
    //1 On récupere l'id dans l'URL
    const movieId: string = this.route.snapshot.params['id'];
    // 2 On demande au service de nous donner le film correspondant
    //   this.tmdbSvc.getMovieFromApi(movieId)
    //   .subscribe(data => this.movie = data)

    // OU via le pipe async dans la view (en remplacement du .subscribe précédent)
    this.movie$ = this.tmdbSvc.getMovieFromApi(movieId)
    // Pour afficher, on utilise @if(movie$ | async; as movie)
  }

  getFullVideoUrl(key: string): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + key);
  }













  // 2 demander au service : faire une request TMDB_URL/movie/{id} 
  //TmdbService.getDetailMovie(id)
  // Je recupere un objet MovieModel

  // 3 dans le template movie-detail-.html

}
