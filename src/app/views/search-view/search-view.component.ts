import { Component } from '@angular/core';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.scss'
})

export class SearchViewComponent {

  getSearchResults(results: any) {
    console.log(results)
    // [
    //  { id:1, titre: 'Tom et jerry', image_landscape, media_type: 'tv'}, 
    //  { id:2, titre: 'Tom et jerry', image_landscape, media_type: 'person'}
    // ]
  }
}
