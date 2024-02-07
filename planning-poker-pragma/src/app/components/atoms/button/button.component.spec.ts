import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
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

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');
    const button = fixture.nativeElement.querySelector('button') as HTMLElement;
    
    component.onButtonClick()

    expect(button).toBeTruthy();
    expect(emitSpy).toHaveBeenCalled();
  });
});
