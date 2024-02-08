import { Review } from "./review.model";


interface Genre {
    id: number,
    name: string
}

export class MovieModel {
    id: number;
    titre: string;
    duration?: undefined | number;
    resume: string;
    image_landscape: string;
    image_portrait: string;
    score: number;
    genres: Genre[];
    date: Date;
    hasVideo: boolean;
    video?: string | undefined;
    //videos: any[];
    reviews: Review[];

    constructor(movie: any) {
        this.id = movie.id;
        this.titre = movie.title;
        this.resume = movie.overview;
        this.duration = movie.runtime ? movie.runtime : undefined;
        this.image_landscape = movie.backdrop_path;
        this.image_portrait = movie.poster_path;
        this.score = movie.vote_average;
        this.genres = movie.genres ? movie.genres : [];
        this.date = movie.release_date;
        this.hasVideo = movie.video
        this.video = movie.videos?.results.length > 0 ? movie.videos.results[0].key : undefined;
        //this.videos = movie.videos?.results.length > 0 ? movie.videos.results : []
        this.reviews = []
    }
}