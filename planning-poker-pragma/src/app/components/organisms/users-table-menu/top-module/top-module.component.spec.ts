import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopModuleComponent } from './top-module.component';

describe('TopModuleComponent', () => {
  let component: TopModuleComponent;
  let fixture: ComponentFixture<TopModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
