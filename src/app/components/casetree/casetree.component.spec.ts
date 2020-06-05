import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetreeComponent } from './casetree.component';

describe('CasetreeComponent', () => {
  let component: CasetreeComponent;
  let fixture: ComponentFixture<CasetreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasetreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasetreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
