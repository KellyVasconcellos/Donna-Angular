import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundPretoComponent } from './background-preto.component';

describe('BackgroundPretoComponent', () => {
  let component: BackgroundPretoComponent;
  let fixture: ComponentFixture<BackgroundPretoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundPretoComponent]
    });
    fixture = TestBed.createComponent(BackgroundPretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
