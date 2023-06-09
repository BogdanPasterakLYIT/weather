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
import { SiteDataComponent } from './site-data/site-data.component';
import { StatsComponent } from './stats/stats.component';
import { DailyStatsComponent } from './daily-stats/daily-stats.component';

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
    SiteDataComponent,
    StatsComponent,
    DailyStatsComponent,
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
      { path: 'site-data', component: SiteDataComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'dayly-stats', component: DailyStatsComponent },
      { path: '**', component: RoutesComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
