import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../../../core/models/movie.model';
import { TvShowModel } from '../../../core/models/tv-show.model';
import { SearchModel } from '../../../core/models/search.model';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() item!: MovieModel | TvShowModel | SearchModel;
  @Input() landscape: boolean = false;


  getFullImageUrl(item: MovieModel | TvShowModel | SearchModel) {
    console.log(item)
    return 'https://image.tmdb.org/t/p/w500' + item.image_portrait;
    //this.landscape === true ? 'https://image.tmdb.org/t/p/w500' + item.image_landscape: 
  }

}
