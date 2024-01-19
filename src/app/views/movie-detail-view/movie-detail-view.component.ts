import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../shared/models/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail-view',
  templateUrl: './movie-detail-view.component.html',
  styleUrl: './movie-detail-view.component.scss'
})
export class MovieDetailViewComponent implements OnInit {

  movie!: MovieModel;
  constructor(private route: ActivatedRoute) {

  }

  // 1 récupere l'id dans l'URL
  ngOnInit() {
    console.log(this.route.snapshot.params)
  }

  // 2 demander au service : faire une request TMDB_URL/movie/{id} 
  //movieService.getDetailMovie(id)
  // Je recupere un objet MovieModel

  // 3 dans le template movie-detail-.html

}
