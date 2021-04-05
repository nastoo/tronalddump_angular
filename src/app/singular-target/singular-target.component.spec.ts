import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularTargetComponent } from './singular-target.component';

describe('SingularTargetComponent', () => {
  let component: SingularTargetComponent;
  let fixture: ComponentFixture<SingularTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingularTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingularTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
