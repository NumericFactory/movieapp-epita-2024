import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieListViewComponent } from './views/movie-list-view/movie-list-view.component';
import { MovieDetailViewComponent } from './views/movie-detail-view/movie-detail-view.component';
import { ActionbarComponent } from './views/movie-list-view/actionbar/actionbar.component';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { CardComponent } from './shared/components/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { TvListViewComponent } from './views/tv-list-view/tv-list-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchViewComponent } from './views/search-view/search-view.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieListViewComponent,
    MovieDetailViewComponent,
    ActionbarComponent,
    SearchbarComponent,
    CardComponent,
    TvListViewComponent,
    HomeViewComponent,
    SearchViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
