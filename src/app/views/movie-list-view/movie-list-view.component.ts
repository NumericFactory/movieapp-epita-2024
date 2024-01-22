import { Component } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { MovieModel } from '../../shared/models/movie.model';
import { Observable, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

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

    /**
     * getMoviesFromApi()
     * retourne movieSvc.movies$$.asObservable()
     * 
     * donc je peux subscribe à cette source
     *  this.movieSvc.movies$$.subscribe()
     */
    this.movieSvc.getMoviesFromApi().subscribe(
      data => this.movies = data
    )

  }



}
