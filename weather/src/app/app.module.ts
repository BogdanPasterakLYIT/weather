import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutesComponent } from './routes/routes.component';
import { RouterModule } from '@angular/router';
import { SitesComponent } from './sites/sites.component';
import { HttpClientModule } from '@angular/common/http';
import { SitesMapComponent } from './sites-map/sites-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutesComponent,
    SitesComponent,
    SitesMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: RoutesComponent },
      { path: 'sites', component: SitesComponent },
      { path: 'sites-map', component: SitesMapComponent },
      { path: '**', component: RoutesComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
