import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalktomeComponent } from './talktome.component';

describe('TalktomeComponent', () => {
  let component: TalktomeComponent;
  let fixture: ComponentFixture<TalktomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalktomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalktomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
