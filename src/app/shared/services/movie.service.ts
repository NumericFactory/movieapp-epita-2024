import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { TvShowModel } from '../models/tv-show.model';
import { environment } from '../../../environments/environment.development';
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

    if (this.movies$$.getValue().length > 0) {
      return this.movies$$.asObservable()
    }
    else {
      const ENDPOINT = `/discover/movie`;
      let options = {
        headers: {
          Authorization: 'Bearer ' + this.API_TOKEN,
          accept: 'application/json'
        },
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
        .subscribe((data: MovieModel[]) => this.movies$$.next(data))

      return this.movies$$.asObservable()
    }

  }

  /**
   * API TMDB
   * endpoint : /discover/tv
   * @returns @Observable<TvShowModel[]>
   */
  getTvShowFromApi(): Observable<TvShowModel[]> {

    const ENDPOINT = `/discover/tv`;
    let options = {
      headers: {
        Authorization: 'Bearer ' + this.API_TOKEN,
        accept: 'application/json'
      },
      params: { language: 'fr' }
    }
    return this.http.get(this.TMDB_URL + ENDPOINT, options)
      .pipe(
        map((response: any) =>
          response.results.map(
            (movieFromApi: any) => new TvShowModel(movieFromApi)
          )
        )
      );
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
      headers: {
        Authorization: 'Bearer ' + this.API_TOKEN,
        accept: 'application/json'
      },
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



}
