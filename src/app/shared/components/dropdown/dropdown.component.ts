import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../data/genres.data';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input({ required: true }) items!: Genre[];
  @Output() OnSelectItemEvent = new EventEmitter<Genre>();

  isMenuOpened: boolean = false;
  selectedGenre!: Genre | undefined

  openCloseMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
  closeMenu() {
    this.isMenuOpened = false;
  }
  selectItemAction(item: Genre) {
    this.OnSelectItemEvent.emit(item);
    this.isMenuOpened = false;
    this.selectedGenre = item;
  }


}
