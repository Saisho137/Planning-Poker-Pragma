import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonsMenuComponent } from './radio-buttons-menu.component';

describe('RadioButtonsMenuComponent', () => {
  let component: RadioButtonsMenuComponent;
  let fixture: ComponentFixture<RadioButtonsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonsMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
