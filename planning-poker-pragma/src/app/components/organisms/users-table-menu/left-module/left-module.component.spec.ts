import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftModuleComponent } from './left-module.component';

describe('LeftModuleComponent', () => {
  let component: LeftModuleComponent;
  let fixture: ComponentFixture<LeftModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftModuleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeftModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
