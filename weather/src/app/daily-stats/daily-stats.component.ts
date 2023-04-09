import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';
import { TodaySiteService } from '../services/today-site.service';
import { TodaySite } from '../models/today-site';
import * as d3 from 'd3';

@Component({
  selector: 'app-daily-stats',
  templateUrl: './daily-stats.component.html',
  styleUrls: ['./daily-stats.component.css'],
})
export class DailyStatsComponent {
  name: string = 'N15 Kilygordon';
  date: string = '2023-03-20';
  options: string[] = [];
  data: TodaySite[] = [];
  min: number | undefined;
  max: number | undefined;
  avg: number | undefined;
  private sizes = { w: 1140, h: 500 };
  private svg: any;

  constructor(service: SitesService, private serviceTS: TodaySiteService) {
    // options for select (names of site)
    service.getSites().subscribe((obj) => {
      obj.map((s) => this.options.push(s.site_name));
    });
  }

  onSubmit() {
    // console.log('Date:', this.date);
    // console.log('Site:', this.name);
    if (this.name && this.date) {
      this.serviceTS
        .getTodaySite(this.name, new Date(this.date))
        .subscribe((res) => {
          this.data = res;
          this.calk();
          this.createSvgBar(res);
          // console.log(res);
        });
    }
  }

  calk() {
    this.max = Math.max(...this.data.map((e) => e.air_temperature));
    this.min = Math.min(...this.data.map((e) => e.air_temperature));
    let sum = 0;
    let count = 0;
    this.data.map((e) => {
      if (e.wind_speed) {
        count += 1;
        sum += e.wind_speed;
      }
    });
    this.avg = Math.round((sum / count) * 1000) / 1000;
  }

  createSvgBar(data: TodaySite[]): void {
    // clear
    d3.selectAll('svg').remove();

    const sizes = { w: 1140, h: 500 };

    // Sizes depend off windows size
    this.svg = d3
      .select('div#bar')
      .append('svg')
      .attr('width', sizes.w - 10)
      .attr('height', sizes.h + 10)
      .append('g')
      .attr('transform', 'translate( 30, 20)');

    //max y

    const yMax = Math.ceil(
      data.reduce((prev, curr) =>
        prev.wind_speed < curr.wind_speed ? curr : prev
      ).wind_speed + 0.2
    );

    // Create the X-axis band scale
    const x = d3.scaleLinear().domain([0, data.length]).range([0, sizes.w]);

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([sizes.h - 20, 0]);

    // Draw the X-axis on the avrage level
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + y(this.avg || 0) + ')')
      .style('stroke-dasharray', '5 5')
      .call(d3.axisBottom(x).tickValues([]));

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .append('text')
      .attr('x', 5)
      .attr('y', y(this.avg || 0) - 7)
      .text('Mean');

    console.log(data.length);
  }
}
