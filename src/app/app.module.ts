import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { MovieListViewComponent } from './views/movies/movie-list-view/movie-list-view.component';
import { MovieDetailViewComponent } from './views/movies/movie-detail-view/movie-detail-view.component';
import { TvListViewComponent } from './views/tv/tv-list-view/tv-list-view.component';
import { TvDetailViewComponent } from './views/tv/tv-detail-view/tv-detail-view.component';
import { PersonDetailViewComponent } from './views/person/person-detail-view/person-detail-view.component';
import { WatchlistComponent } from './views/user/watchlist/watchlist.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { RegisterViewComponent } from './views/user/register-view/register-view.component';
import { LoginViewComponent } from './views/user/login-view/login-view.component';

import { ActionbarComponent } from './views/movies/movie-list-view/actionbar/actionbar.component';
import { SearchbarComponent } from './shared/components/searchbar/searchbar.component';
import { CardComponent } from './shared/components/card/card.component';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { PrintdurationPipe } from './shared/pipes/printduration.pipe';
import { ClickoutsideDirective } from './shared/directives/clickoutside.directive';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { APIExternalMoviesGateway as APIExternalMoviesGateway } from './core/ports/api-external-movies.gateway';
import { TMDBService } from './core/adapters/tmdb.service';
import { APIInMemoryService } from './core/adapters/api-in-memory.service';
import { DialogConfirmComponent } from './shared/components/ui/dialog-confirm/dialog-confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthGateway } from './core/ports/auth.gateway';
import { AuthService } from './core/adapters/auth.service';
import { APIGateway } from './core/ports/api.gateway';
import { ApiService } from './core/adapters/api.service';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeViewComponent,
    // movie views
    MovieListViewComponent, MovieDetailViewComponent,
    // tv views
    TvListViewComponent, TvDetailViewComponent,
    // user watchlist view
    WatchlistComponent,
    // person view
    PersonDetailViewComponent,
    // search view
    SearchViewComponent,
    // auth views
    RegisterViewComponent, LoginViewComponent,
    // stateless component
    ActionbarComponent, SearchbarComponent, CardComponent, DropdownComponent,
    // pipes & directives
    PrintdurationPipe,
    ClickoutsideDirective,
    DialogConfirmComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogContent,
    MatButtonModule,
    MatProgressBarModule
  ],

  providers: [
    /*  
      Pattern PORT/ADAPTER
    */

    { provide: APIExternalMoviesGateway, useClass: TMDBService }, // useClass: APIInMemoryService
    { provide: AuthGateway, useClass: AuthService },
    { provide: APIGateway, useClass: ApiService },


    /*
      Les interceptorrs : 
      * pour ajouter un token à la request
      * pour traiter les retours erreurs HTTP (400,401,403,500,..)
      * pour gérer un loader
    */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
