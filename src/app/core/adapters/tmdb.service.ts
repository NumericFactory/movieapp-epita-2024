import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, mapTo, tap } from 'rxjs';
import { MovieModel } from '../models/movie.model';
import { TvShowModel } from '../models/tv-show.model';
import { environment } from '../../../environments/environment.development';
import { SearchModel } from '../models/search.model';
import { APIExternalMoviesGateway } from '../ports/api-external-movies.gateway';

@Injectable({
  providedIn: 'root'
})
export class TMDBService implements APIExternalMoviesGateway {

  private TMDB_URL: string = environment.TMDB_API_URL;

  /* on crée un Behabior Subject qui sert de store pour nos MovieModel */
  private movies$$ = new BehaviorSubject<MovieModel[]>([]);
  private tv$$ = new BehaviorSubject<TvShowModel[]>([]);

  private searchPageNumber = 1;
  private searchResults$$ = new BehaviorSubject<SearchModel[]>([]);
  public searchResults$ = this.searchResults$$.asObservable();


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
            response.results
              .map(
                (tvshowFromApi: any) => new TvShowModel(tvshowFromApi)
              )
              .filter((tvShow: TvShowModel) => tvShow.resume.length)
          )
        )
        .subscribe(response => this.tv$$.next(response))
      return this.tv$$.asObservable()
    }
  }

  /**
  * API TMDB
  * endpoint: /tv/{id}
  * queryParam: append_to_response=videos
  * @returns @Observable<TvShowModel>
  */
  getOneTvShowFromApi(id: string): Observable<TvShowModel> {
    const ENDPOINT = `/tv/${id}`;
    let options = {
      params: {
        language: 'fr',
        append_to_response: 'videos'
      }
    }
    return this.http.get(this.TMDB_URL + ENDPOINT, options)
      .pipe(
        map(response => new TvShowModel(response))
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
