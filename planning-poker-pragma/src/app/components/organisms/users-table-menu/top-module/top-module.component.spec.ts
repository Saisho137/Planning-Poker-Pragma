import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopModuleComponent } from './top-module.component';

describe('TopModuleComponent', () => {
  let component: TopModuleComponent;
  let fixture: ComponentFixture<TopModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(TopModuleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
