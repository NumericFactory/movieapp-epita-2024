interface Genre {
    id: number,
    name: string
}

export class TvShowModel {
    id: number;
    titre: string;
    resume: string;
    image_landscape: string;
    image_portrait: string;
    score: number;
    genres: Genre[];
    date: Date;


    constructor(tv: any) {
        this.id = tv.id;
        this.titre = tv.name;
        this.resume = tv.overview;
        this.image_landscape = tv.backdrop_path;
        this.image_portrait = tv.poster_path;
        this.score = tv.vote_average;
        this.genres = [];
        this.date = tv.first_air_date;
    }
}