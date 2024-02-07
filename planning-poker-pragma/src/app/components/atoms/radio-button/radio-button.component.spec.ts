import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
  let component: RadioButtonComponent;
  let fixture: ComponentFixture<RadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event on radioButton click', () => {
    const emitSpy = jest.spyOn(component.switchEvent, 'emit');
    const radio = fixture.nativeElement.querySelector('input') as HTMLElement;

    component.onInputChange()

    expect(radio).toBeTruthy;
    expect(emitSpy).toHaveBeenCalled();
  });
});
