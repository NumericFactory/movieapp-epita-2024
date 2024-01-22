import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { TvShowModel } from '../models/tv-show.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  private TMDB_URL: string = 'https://api.themoviedb.org/3';
  private API_TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmRlYjY2MWFhYTAwNmIxZTRmMzZmOTkwYTVmZDhmZCIsInN1YiI6IjU5ZDZiMDhiYzNhMzY4NTU3ZDAwMDQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.569-rPTcXUPOapO2e4uIsfSVs6KDPK0yFQ74mmsHSpo';

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
    const ENDPOINT = `/discover/movie`;
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
            (movieFromApi: any) => new MovieModel(movieFromApi)
          )
        )
      )
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
