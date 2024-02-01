import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationComponent, HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Creation tests
  it('should initialize the userForm', () => {
    expect(component.userForm).toBeTruthy();
    expect(component.userForm.get('userUsername')).toBeDefined();
    expect(component.userForm.get('userEmail')).toBeDefined();
    expect(component.userForm.get('userPassword')).toBeDefined();
  });
  
  it('should initialize isLogin and title correctly when url its /register', () => {
    expect(component.isLogin).toBeFalsy();
    expect(component.title).toEqual('Register');
  });
});
