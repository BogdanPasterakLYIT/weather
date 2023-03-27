import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesMapComponent } from './sites-map.component';

describe('SitesMapComponent', () => {
  let component: SitesMapComponent;
  let fixture: ComponentFixture<SitesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitesMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
