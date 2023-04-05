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
import { TodayComponent } from './today/today.component';
import { TodaySiteComponent } from './today-site/today-site.component';
import { LiveComponent } from './live/live.component';
import { FormsModule } from '@angular/forms';
import { LiveMapComponent } from './live-map/live-map.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutesComponent,
    SitesComponent,
    SitesMapComponent,
    TodayComponent,
    TodaySiteComponent,
    LiveComponent,
    LiveMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: RoutesComponent },
      { path: 'sites', component: SitesComponent },
      { path: 'sites-map', component: SitesMapComponent },
      { path: 'today', component: TodayComponent },
      { path: 'today/:site/:day', component: TodaySiteComponent },
      { path: 'live', component: LiveComponent },
      { path: 'live-map', component: LiveMapComponent },
      { path: '**', component: RoutesComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
