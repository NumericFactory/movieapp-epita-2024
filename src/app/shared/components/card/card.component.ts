import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { TvShowModel } from '../../models/tv-show.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input() item!: MovieModel | TvShowModel;

  ngOnInit(): void {

  }
  getFullImageUrl(fragmentUrl: string) {
    return 'https://image.tmdb.org/t/p/w500' + fragmentUrl;
  }

}
