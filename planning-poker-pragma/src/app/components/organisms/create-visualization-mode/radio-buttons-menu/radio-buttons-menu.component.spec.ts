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
  
  it('should emit changeEvent on click and assign to selectedMode the radioButton value', () => {
    const emitSpy = jest.spyOn(component.changeEvent, 'emit');
    const radio = fixture.nativeElement.querySelector('input') as HTMLElement;

    expect(component.selectedMode).toBe('');
    component.switchRadio('player');

    expect(radio).toBeTruthy;
    expect(component.selectedMode).toBe('player');
    expect(emitSpy).toHaveBeenCalledWith('player');
  });
});
