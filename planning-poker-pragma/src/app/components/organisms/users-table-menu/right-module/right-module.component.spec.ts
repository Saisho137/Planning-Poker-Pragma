import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightModuleComponent } from './right-module.component';

describe('RightModuleComponent', () => {
  let component: RightModuleComponent;
  let fixture: ComponentFixture<RightModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RightModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
