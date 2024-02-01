export interface Review {
    id: number;
    score: number;
    comment: string;
    media_type: 'movie' | 'tv';
    media_id: number;
    user_id: number;
}