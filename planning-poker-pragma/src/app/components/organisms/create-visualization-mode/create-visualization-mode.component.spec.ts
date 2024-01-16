import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVisualizationModeComponent } from './create-visualization-mode.component';

describe('CreateVisualizationModeComponent', () => {
  let component: CreateVisualizationModeComponent;
  let fixture: ComponentFixture<CreateVisualizationModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVisualizationModeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVisualizationModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
