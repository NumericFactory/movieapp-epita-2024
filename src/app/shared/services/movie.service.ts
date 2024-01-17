import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const ENDPOINT = '/discover/movie?language=fr&primary_release_year=1940';
    const HEADERS = new HttpHeaders({
      Authorization: 'Bearer ' + this.API_TOKEN,
      accept: 'application/json'
    })
    return this.http.get(this.TMDB_URL + ENDPOINT, { headers: HEADERS }); // Observable
  }
}
