import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private TMDB_URL: string = 'https://api.themoviedb.org/3';
  private API_TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmRlYjY2MWFhYTAwNmIxZTRmMzZmOTkwYTVmZDhmZCIsInN1YiI6IjU5ZDZiMDhiYzNhMzY4NTU3ZDAwMDQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.569-rPTcXUPOapO2e4uIsfSVs6KDPK0yFQ74mmsHSpo';


  constructor(private http: HttpClient) { }

  getMoviesFromApi(): Observable<any> {
    const ENDPOINT = `/discover/movie`;
    // const HEADERS = new HttpHeaders({
    //   Authorization: 'Bearer ' + this.API_TOKEN,
    //   accept: 'application/json'
    // });
    let options = {
      headers: {
        Authorization: 'Bearer ' + this.API_TOKEN,
        accept: 'application/json'
      },
      params: { language: 'fr' }
    }
    // this.http.get(url, {headers: value, params:value})
    return this.http.get(this.TMDB_URL + ENDPOINT, options)
    //.pipe(
    // transforme moviesFromApi -> moviesInFrondEndModel
    //);
  }
}
