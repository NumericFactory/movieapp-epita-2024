export class SearchModel {
    id: number;
    titre: string;
    image_landscape: string;
    image_portrait: string;
    media_type: 'movie' | 'tv' | 'person'

    constructor(responseFromApi: any) {
        this.id = responseFromApi.id;
        this.titre = (responseFromApi.media_type == 'person' || responseFromApi.media_type == 'tv')
            ? responseFromApi.name
            : responseFromApi.title;

        this.image_landscape = (responseFromApi.media_type == 'movie' || responseFromApi.media_type == 'tv')
            ? responseFromApi.backdrop_path
            : responseFromApi.profile_path,
            this.media_type = responseFromApi.media_type;

        this.image_portrait = (responseFromApi.media_type == 'movie' || responseFromApi.media_type == 'tv')
            ? responseFromApi.poster_path
            : responseFromApi.profile_path,
            this.media_type = responseFromApi.media_type
    }
}