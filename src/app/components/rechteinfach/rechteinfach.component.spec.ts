import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechteinfachComponent } from './rechteinfach.component';

describe('RechteinfachComponent', () => {
  let component: RechteinfachComponent;
  let fixture: ComponentFixture<RechteinfachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechteinfachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechteinfachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
