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
  date: string = '2023-03-01';
  options: string[] = [];
  data: TodaySite[] = [];
  min: number | undefined;
  max: number | undefined;
  avg: number | undefined;
  private sizes = { w: 1140, h: 500 };
  private svg: any;
  private svg2: any;

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
          if (res.length) this.createSvgBar(res);
          else d3.selectAll('svg').remove();

          // console.log(res);
        });
    }
  }

  calk() {
    this.max = Math.max(...this.data.map((e) => e.air_temperature));
    if (!Number.isFinite(this.max)) this.max = undefined;
    this.min = Math.min(...this.data.map((e) => e.air_temperature));
    if (!Number.isFinite(this.min)) this.min = undefined;
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
    const x = d3
      .scaleLinear()
      .domain([0, data.length + 1])
      .range([0, sizes.w]);

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([sizes.h - 20, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));

    // bars
    this.svg
      .selectAll('mybar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: TodaySite) => x(data.indexOf(d)) + 4)
      .attr('y', (d: TodaySite) => y(d.wind_speed))
      .attr('width', x(1) - 6)
      .attr('height', (d: TodaySite) => sizes.h - y(d.wind_speed) - 20)
      .attr('fill', '#06B')
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    // Add value on bar
    this.svg
      .selectAll('value')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d: TodaySite) => x(data.indexOf(d)) + 25)
      .attr('y', sizes.h - 30)
      .text((d: TodaySite) => d.wind_speed.toFixed(1));

    // text on x axis
    this.svg
      .append('text')
      .attr('x', 5)
      .attr('y', y(this.avg || 0) - 7)
      .text('Mean');

    // Draw the X-axis on the avrage level
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + y(this.avg || 0) + ')')
      .style('stroke-dasharray', '5 5')
      .call(d3.axisBottom(x).tickValues([]));

    // line chart

    // Sizes depend off windows size
    this.svg2 = d3
      .select('div#bar2')
      .append('svg')
      .attr('width', sizes.w - 10)
      .attr('height', sizes.h + 10)
      .append('g')
      .attr('transform', 'translate( 30, 10)');

    // Draw the Y-axis on the DOM
    this.svg2.append('g').call(d3.axisLeft(y));

    // Create the X-axis band scale
    const x2 = d3
      .scaleLinear()
      .domain([0.5, data.length + 1.5])
      .range([0, sizes.w]);

    // points
    this.svg2
      .selectAll('point')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d: TodaySite) => x2(data.indexOf(d) + 1))
      .attr('cy', (d: TodaySite) => y(d.wind_speed))
      .attr('r', 5)
      .attr('fill', '#049')
      .attr('stroke-width', 1)
      .attr('stroke', '#000');

    this.svg2
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x((d, i) => x2(i + 1))
          .y((d: any) => y(d.wind_speed))
      );

    // Draw the X-axis on the avrage level
    this.svg2
      .append('g')
      .attr('transform', 'translate(0,' + y(0) + ')')
      .call(d3.axisBottom(x2));
  }
}
