import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private TMDB_URL: string = 'https://api.themoviedb.org/3';
  private API_TOKEN: string = '';


  constructor(private http: HttpClient) { }

  getMoviesFromApi() {
    console.log("hello je vais faire une request");
    const ENDPOINT = '/discover/movie';
    this.http.get('https://api.themoviedb.org/3/discover/movie')
      .subscribe(data => console.log(data))
  }
}
