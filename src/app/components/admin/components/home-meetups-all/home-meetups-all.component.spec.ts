import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMeetupsAllComponent } from './home-meetups-all.component';

describe('HomeMeetupsAllComponent', () => {
  let component: HomeMeetupsAllComponent;
  let fixture: ComponentFixture<HomeMeetupsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMeetupsAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMeetupsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
