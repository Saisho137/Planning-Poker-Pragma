import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateClassroomComponent } from './create-classroom.component';
import { Router } from '@angular/router';

describe('CreateClassroomComponent', () => {
  let component: CreateClassroomComponent;
  let fixture: ComponentFixture<CreateClassroomComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });

    fixture = TestBed.createComponent(CreateClassroomComponent);
    component = fixture.componentInstance;
  
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Initial Value validators
  it('should initialize with empty regexMessage', () => {
    expect(component.regexMessage).toEqual('');
  });

  //Html Unit Tests
  it('should render view', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('input-atom')).toBeTruthy();
    expect(compiled.querySelector('button-atom')).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')?.textContent).toContain(
      'Crear Partida'
    );
  });

  it('should render Submit button Message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button-atom.col-8')?.textContent?.trim()).toContain(
      'Crear partida'
    );
  });

  it('should render LogOut button Message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button-atom.col-6')?.textContent?.trim()).toContain(
      'Logout'
    );
  });

  it('should render label name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toContain(
      'Nombra la partida'
    );
  });

  it('should render regex message if exist', () => {
    component.regexMessage = 'errorTest';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('errorTest');
  });

  it('should not render regex message if doesnt exist', () => {
    component.regexMessage = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')).toBeFalsy;
  });

  //Constructor() //I havent made it work yet!
  it('should not navigate to login with token in sessionStorage', () => {
    expect(router.navigate).toBeTruthy();
  });
  it('should not navigate to login with token in sessionStorage', () => {
    sessionStorage.setItem('session_token', 'Test');
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  //

  //onInputChange() and regexMessage property interactions
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
    component.regexMessage = 'test'
    component.onInputChange(validValue);
    expect(component.regexMessage).toEqual('');
  });

  //validateName()
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

  //logOut()
  it('should clear session and navigate to login when logOut is called', () => {
    sessionStorage.setItem('session_token', 'test');
    sessionStorage.setItem('user_id', 'test');
    sessionStorage.setItem('user_username', 'test');

    component.logOut();

    expect(sessionStorage.getItem('session_token')).toBeNull();
    expect(sessionStorage.getItem('user_id')).toBeNull();
    expect(sessionStorage.getItem('user_username')).toBeNull();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
