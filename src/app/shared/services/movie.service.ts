import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { TvShowModel } from '../models/tv-show.model';
import { environment } from '../../../environments/environment.development';
import { SearchModel } from '../models/search.model';
// importer l'environment


@Injectable({
  providedIn: 'root'
})
export class MovieService {


  private TMDB_URL: string = environment.TMDB_API_URL;
  private API_TOKEN: string = environment.TMDB_TOKEN;

  /* on crée un Behabior Subject qui sert de store pour nos MovieModel */
  private movies$$ = new BehaviorSubject<MovieModel[]>([]);
  private tv$$ = new BehaviorSubject<TvShowModel[]>([]);

  constructor(private http: HttpClient) { }
  /*
    Observable.pipe() return un Observable

    .pipe( ) accepte en parametres des opérateurs de transformation : 
    map(), filter(), etc....

    On utilise pipe() pour donner à nos components un Observable qui contient
    des données formatées comme on le décide

    Ainsi on délégue totalement au service la responsabilité de mapper les
    reponses API en modeles d'objets côté front-end
  */

  /**
   * API TMDB
   * endpoint : /discover/movie
   * @returns @Observable<MovieModel>
   */
  getMoviesFromApi(): Observable<MovieModel[]> {

    console.log('Subject movies$$', this.movies$$);
    console.log('Subject movies$$ value', this.movies$$.getValue());

    if (this.movies$$.getValue().length > 0) {
      return this.movies$$.asObservable()
    }
    else {
      const ENDPOINT = `/discover/movie`;
      let options = {
        params: { language: 'fr' }
      }

      this.http.get(this.TMDB_URL + ENDPOINT, options)
        .pipe(
          map((response: any) =>
            response.results.map(
              (movieFromApi: any) => new MovieModel(movieFromApi)
            )
          )
        )
        //fairela request HTTP
        .subscribe((response: MovieModel[]) => this.movies$$.next(response))

      return this.movies$$.asObservable()
    }

  }

  /**
   * API TMDB
   * endpoint : /discover/tv
   * @returns @Observable<TvShowModel[]>
   */
  getTvShowFromApi(): Observable<TvShowModel[]> {
    if (this.tv$$.getValue().length > 0) {
      return this.tv$$.asObservable()
    }
    else {
      const ENDPOINT = `/discover/tv`;
      let options = {
        params: { language: 'fr' }
      }
      this.http.get(this.TMDB_URL + ENDPOINT, options)
        .pipe(
          map((response: any) =>
            response.results.map(
              (movieFromApi: any) => new TvShowModel(movieFromApi)
            )
          )
        )
        .subscribe(response => this.tv$$.next(response))
      return this.tv$$.asObservable()
    }
  }


  /**
   * API TMDB
   * endpoint: /movie/{id}
   * queryParam: append_to_response=videos
   * @returns @Observable<MovieModel>
   */
  getMovieFromApi(id: string): Observable<MovieModel> {
    const ENDPOINT = `/movie/${id}`;
    let options = {
      params: {
        language: 'fr',
        append_to_response: 'videos'
      }
    }
    return this.http.get(this.TMDB_URL + ENDPOINT, options)
      .pipe(
        map(response => new MovieModel(response))
      );
  }

  /**
   * API TMDB
   * endpoint /search/multi
   * queryParams userSearchText : string
   * @returns Observable<any> (movies, tvshows, or people)
   */
  search(userSearchText: string): Observable<any> {
    let ENDPOINT = '/search/multi';
    let options = {
      params: {
        language: 'fr',
        query: userSearchText
      }
    }
    return this.http.get(this.TMDB_URL + ENDPOINT, options)
      .pipe(
        map(
          (response: any) => response.results.map((item: any) => new SearchModel(item))
        )
      )

  }



}
