import { Review } from "./review.model";

interface Genre {
    id: number,
    name: string
}

export class TvShowModel {
    id: number;
    titre: string;
    resume: string;
    episode_runtime: number | undefined;
    image_landscape: string;
    image_portrait: string;
    score: number;
    genres: Genre[];
    date: Date;
    video: any[];
    reviews: Review[];
    constructor(tv: any) {
        this.id = tv.id;
        this.titre = tv.name;
        this.resume = tv.overview;
        this.episode_runtime = tv.episode_run_time ? tv.episode_run_time : undefined;
        this.image_landscape = tv.backdrop_path;
        this.image_portrait = tv.poster_path;
        this.score = tv.vote_average;
        this.genres = tv.genres ? tv.genres : [];
        this.date = tv.first_air_date;
        this.video = tv.videos?.results.length > 0 ? tv.videos.results : undefined;
        this.reviews = []
    }
}