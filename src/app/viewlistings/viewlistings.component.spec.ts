import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistingsComponent } from './viewlistings.component';

describe('ViewlistingsComponent', () => {
  let component: ViewlistingsComponent;
  let fixture: ComponentFixture<ViewlistingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlistingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
