import { Injectable } from '@angular/core';
import { APIExternalMoviesGateway } from '../ports/api-external-movies.gateway';
import { MovieModel } from '../models/movie.model';
import { Observable, map, of } from 'rxjs';
import { TvShowModel } from '../models/tv-show.model';
import { moviesData } from '../data/movies.data';
import { tvShowsData } from '../data/tvshows.data';
import { SearchModel } from '../models/search.model';
import { searchData } from '../data/search.data'

@Injectable({
  providedIn: 'root'
})
export class APIInMemoryService implements APIExternalMoviesGateway {

  movies: MovieModel[] = moviesData;
  tvShows: TvShowModel[] = tvShowsData;
  searchData: SearchModel[] = searchData;

  getMoviesFromApi(): Observable<MovieModel[]> {
    return of(this.movies);
  }

  getPrevMoviesFromApi(): Observable<MovieModel[]> {
    return of(this.movies);
  }

  getMovieFromApi(id: string): Observable<MovieModel> {
    let movie = this.movies.find(movie => movie.id.toString() === id);
    if (!movie) {
      throw new Error('not found');
    }
    return of(movie);
  }

  getNextMoviesFromApi(): Observable<MovieModel[]> {
    return of(this.movies);
  }

  getTvShowFromApi(): Observable<TvShowModel[]> {
    return of(this.tvShows)

  }
  getOneTvShowFromApi(id: string): Observable<TvShowModel> {
    let tvShow = this.tvShows.find(tvShow => tvShow.id.toString() === id);
    if (!tvShow) {
      throw new Error('not found');
    }
    return of(tvShow);
  }

  search(userSearchText: string): Observable<any> {
    return of(this.searchData)

  }

  constructor() { }
}
