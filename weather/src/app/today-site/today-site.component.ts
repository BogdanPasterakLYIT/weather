import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodaySiteService } from '../services/today-site.service';
import { TodaySiteAvrage } from '../models/today-site-avrage';
import { TodaySite } from '../models/today-site';
import * as d3 from 'd3';

@Component({
  selector: 'app-today-site',
  templateUrl: './today-site.component.html',
  styleUrls: ['./today-site.component.css'],
})
export class TodaySiteComponent implements AfterViewInit {
  @ViewChild('bar') bar?: ElementRef;

  site = '';
  day: Date = new Date();
  siteData: TodaySite[] = [];
  avrage: TodaySiteAvrage = new TodaySiteAvrage(0, 0, 0);

  private data = [
    { Framework: 'Vue', Stars: '166443', Released: '2014' },
    { Framework: 'React', Stars: '150793', Released: '2013' },
    { Framework: 'Angular', Stars: '62342', Released: '2016' },
    { Framework: 'Backbone', Stars: '27647', Released: '2010' },
    { Framework: 'Ember', Stars: '21471', Released: '2011' },
  ];
  private sizes = { w: 0, h: 0 };
  private svg: any;
  private margin = 50;
  // private width = 850 - this.margin * 2;
  private height = 500 - this.margin * 2;

  constructor(
    private route: ActivatedRoute,
    private service: TodaySiteService
  ) {
    this.site = route.snapshot.paramMap.get('site') || '';
    this.day = new Date(route.snapshot.paramMap.get('day') || '');

    service.getTodaySite(this.site, this.day).subscribe((res) => {
      this.siteData = res;
      if (this.svg) this.drawBars(this.data);
    });

    service.getTodaySiteAvrage(this.site, this.day).subscribe((res) => {
      this.avrage = res;
    });
  }

  ngAfterViewInit(): void {
    this.sizes.w = this.bar?.nativeElement.offsetWidth - 150;
    this.sizes.h = this.bar?.nativeElement.offsetWidth / 2;

    this.createSvg();
    if (this.siteData.length) this.drawBars(this.data);
  }

  ngOnInit(): void {}

  private createSvg(): void {
    this.svg = d3
      .select('div#bar')
      .append('svg')
      .attr('width', this.sizes.w + 80)
      .attr('height', this.sizes.h)
      .append('g')
      .attr('transform', 'translate( 40, 20)');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const yMin = Math.floor(
      this.siteData.reduce((prev, curr) =>
        prev.air_temperature > curr.air_temperature ? curr : prev
      ).air_temperature - 0.2
    );
    const yMax = Math.ceil(
      this.siteData.reduce((prev, curr) =>
        prev.air_temperature < curr.air_temperature ? curr : prev
      ).air_temperature + 0.2
    );
    // console.log(yMin, yMax);

    const x = d3
      .scaleLinear()
      .domain([0, this.siteData.length])
      // .tickFormat(d3.format('.2f'))
      .range([0, this.sizes.w]);
    // const x = d3
    //   .scaleBand()
    //   .range([0, this.width])
    //   .domain(data.map((d) => d.Framework))
    //   .padding(0.2);

    // Create the Y-axis band scale
    const y = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([this.sizes.h - 40, 0]);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + y(0) + ')')
      .style('stroke-dasharray', '5 5')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('font', '0 times');

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y));
    this.svg
      .append('g')
      .call(d3.axisRight(y))
      .attr('transform', 'translate(' + this.sizes.w + ',0)');

    // Create and fill the bars
    // this.svg
    //   .selectAll('bars')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d: any) => x(d.Framework))
    //   .attr('y', (d: any) => y(d.Stars))
    //   // .attr('width', x.bandwidth())
    //   .attr('height', (d: any) => this.height - y(d.Stars))
    //   .attr('fill', '#d04a35');
  }
}
