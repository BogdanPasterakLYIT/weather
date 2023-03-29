import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySiteComponent } from './today-site.component';

describe('TodaySiteComponent', () => {
  let component: TodaySiteComponent;
  let fixture: ComponentFixture<TodaySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaySiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
