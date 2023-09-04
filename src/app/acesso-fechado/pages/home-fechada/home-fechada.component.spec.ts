import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFechadaComponent } from './home-fechada.component';

describe('HomeFechadaComponent', () => {
  let component: HomeFechadaComponent;
  let fixture: ComponentFixture<HomeFechadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFechadaComponent]
    });
    fixture = TestBed.createComponent(HomeFechadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
