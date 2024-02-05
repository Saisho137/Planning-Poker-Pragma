import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeEvent on click and assign to selectedMode the radioButton value', () => {
    const emitSpy = jest.spyOn(component.InputChange, 'emit');
    const input = fixture.nativeElement.querySelector('input') as HTMLElement;

    component.contentText = 'testing'
    component.onInputChange();

    expect(input).toBeTruthy;
    expect(emitSpy).toHaveBeenCalledWith('testing');
  });
});
