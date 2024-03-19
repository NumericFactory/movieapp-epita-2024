import { Observable } from "rxjs";
import { MovieModel } from "../models/movie.model";
import { TvShowModel } from "../models/tv-show.model";


export abstract class APIExternalMoviesGateway {

    abstract getMoviesFromApi(): Observable<MovieModel[]>;
    abstract getNextMoviesFromApi(pageNumber?: number): Observable<MovieModel[]>
    abstract getPrevMoviesFromApi(): Observable<MovieModel[]>
    abstract getMovieFromApi(id: string): Observable<MovieModel>
    abstract getTvShowFromApi(): Observable<TvShowModel[]>;
    abstract getOneTvShowFromApi(id: string): Observable<TvShowModel>;
    abstract search(userSearchText: string): Observable<any>




}