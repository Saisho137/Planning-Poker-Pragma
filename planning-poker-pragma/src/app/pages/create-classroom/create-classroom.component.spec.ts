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

  it('should update regexMessage when onInputChange is called with invalid regex', () => {
    const invalidValue = 'invalid@value!321';
    component.onInputChange(invalidValue);
    expect(component.regexMessage).toEqual(
      'Solo se permiten carácteres alfanuméricos!'
    );
  });

  it('should update regexMessage when onInputChange is called with invalid lenght', () => {
    const invalidValue = 'invalidExtendedRoomName123';
    component.onInputChange(invalidValue);
    expect(component.regexMessage).toEqual(
      'El nombre debe tener entre 5 y 20 carácteres!'
    );
  });

  it('should update regexMessage when onInputChange is called with invalid number size', () => {
    const invalidValue = 'invalidValue12345';
    component.onInputChange(invalidValue);
    expect(component.regexMessage).toEqual(
      'No debe haber más de 3 números en el nombre!'
    );
  });

  it('should update regexMessage when onInputChange is called with invalid double space', () => {
    const invalidValue = 'invalid  value';
    component.onInputChange(invalidValue);
    expect(component.regexMessage).toEqual('Solo un espacio es permitido!');
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

  it('should clear session and navigate to login when logOut is called', () => {
    sessionStorage.setItem('session_token', 'test')
    sessionStorage.setItem('user_id', 'test')
    sessionStorage.setItem('user_username', 'test')
    
    component.logOut();

    expect(sessionStorage.getItem('session_token')).toBeNull();
    expect(sessionStorage.getItem('user_id')).toBeNull();
    expect(sessionStorage.getItem('user_username')).toBeNull();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
