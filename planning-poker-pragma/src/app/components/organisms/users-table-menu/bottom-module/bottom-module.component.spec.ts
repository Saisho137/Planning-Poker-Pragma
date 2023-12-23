import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomModuleComponent } from './bottom-module.component';

describe('BottomModuleComponent', () => {
  let component: BottomModuleComponent;
  let fixture: ComponentFixture<BottomModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
