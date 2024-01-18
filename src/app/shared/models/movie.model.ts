// export type MovieModel = {
//     title: string,
//     resume: string,
//     image_portrait: string,
//     image_paysage: string
// }

// export interface MovieModel {
//     title: string,
//     resume: string,
//     image_portrait: string,
//     image_paysage: string
// }


interface Genre {
    id: number,
    name: string
}

export class MovieModel {
    id: number;
    titre: string;
    duration: undefined | number;
    resume: string;
    image_landscape: string;
    image_portrait: string;
    score: number;
    genres: Genre[];
    date: Date;
    hasVideo: boolean;
    video: undefined | string;

    constructor(movie: any) {
        this.id = movie.id;
        this.titre = movie.title;
        this.resume = movie.overview;
        this.duration = movie.runtime ? movie.runtime : undefined;
        this.image_landscape = movie.backdrop_path;
        this.image_portrait = movie.poster_path;
        this.score = movie.vote_average;
        this.genres = [];
        this.date = movie.release_date;
        this.hasVideo = movie.video
        this.video = movie.video ? '' : undefined;
    }
}