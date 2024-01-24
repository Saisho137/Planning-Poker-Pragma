import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateClassroomComponent } from './create-classroom.component';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateClassroomComponent', () => {
  let component: CreateClassroomComponent;
  let fixture: ComponentFixture<CreateClassroomComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CreateClassroomComponent,
        HttpClientTestingModule,
      ],
    });

    fixture = TestBed.createComponent(CreateClassroomComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty regexMessage', () => {
    expect(component.regexMessage).toEqual('');
  });

  it('should update regexMessage when onInputChange is called with invalid value', () => {
    const invalidValue = 'invalid   value  12345';
    component.onInputChange(invalidValue);
    expect(component.regexMessage).not.toEqual('');
  });

  it('should reset regexMessage when onInputChange is called with valid value', () => {
    const validValue = 'validValue123';
    component.onInputChange(validValue);
    expect(component.regexMessage).toEqual('');
  });

  it('should not allow navigate with invalid classroomName', () => {
    component.classroomName.patchValue('Invalid  Name  for Classroom 12345');
    component.validateName();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should navigate when validateName is called with valid classroomName', () => {
    component.classroomName.patchValue('Sprint 32');
    component.validateName();
    expect(router.navigate).toHaveBeenCalledWith([
      'classroom/' + component.classroomName.value,
    ]);
  });
});
