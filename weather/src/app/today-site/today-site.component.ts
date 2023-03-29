import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-today-site',
  templateUrl: './today-site.component.html',
  styleUrls: ['./today-site.component.css'],
})
export class TodaySiteComponent {
  site = '';

  constructor(private route: ActivatedRoute) {
    this.site = route.snapshot.paramMap.get('site') || '';
  }
}
