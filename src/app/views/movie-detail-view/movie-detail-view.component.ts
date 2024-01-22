import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../shared/models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Location } from '@angular/common';



@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-detail-view.component.html',
  styleUrl: './movie-detail-view.component.scss'
})
export class MovieDetailViewComponent implements OnInit {

  movie!: MovieModel;

  constructor(
    public location: Location,
    private route: ActivatedRoute, private movieSvc: MovieService, private sanitize: DomSanitizer) { }


  ngOnInit() {
    //1 On récupere l'id dans l'URL
    console.log(this.route.snapshot.params);
    const movieId: string = this.route.snapshot.params['id'];
    //console.log(movieId);

    //2 On demande au service de nous donner le film correspondant
    this.movieSvc.getMovieFromApi(movieId)
      .subscribe(data => this.movie = data)

  }

  getFullVideoUrl(key: string): SafeResourceUrl {
    return this.sanitize.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + key);
  }













  // 2 demander au service : faire une request TMDB_URL/movie/{id} 
  //movieService.getDetailMovie(id)
  // Je recupere un objet MovieModel

  // 3 dans le template movie-detail-.html

}
