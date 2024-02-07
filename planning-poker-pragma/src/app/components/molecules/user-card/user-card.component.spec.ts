import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserCardComponent } from './user-card.component';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { firstValueFrom, of, throwError } from 'rxjs';
import { UserI } from '../../../interfaces/user-interface';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  let userService: UsersService;
  let classroomServoce: ClassroomsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UsersService);
    classroomServoce = TestBed.inject(ClassroomsService);

    window.alert = jest.fn()
    console.error = jest.fn()
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign userId from getAllUsers', () => {
    const mockUsers: UserI[] = [
      { _id: 'user1', username: 'username1' } as any,
      { _id: 'user2', username: 'username2' } as any,
    ];
    component.cardValue = 'username1';

    jest.spyOn(userService, 'getAllUsers').mockReturnValue(of(mockUsers));
    component.assignUserId()

    expect(component['userId']).toBe('user1');
  });

  it('should handle error when getAllUsers fails',  () => {
    const errorResponse = new Error('Error fetching users');
    jest.spyOn(userService, 'getAllUsers').mockReturnValueOnce(throwError(() => errorResponse));
    component.assignUserId()
    expect(firstValueFrom(userService.getAllUsers())).rejects.toThrow('Error fetching users.');
  });

  it('should show a successful alert based on makeUserAdmin result', () => {
    const roomId = 'testRoomId';
    const userId = 'testUserId';
  
    jest.spyOn(classroomServoce, 'makeUserAdmin').mockReturnValue(true);
    const spyAlert = jest.spyOn(window, 'alert')

    component.roomId = roomId;
    component['userId'] = userId;
    component.onClick();
  
    expect(spyAlert).toHaveBeenCalledWith('Has hecho a ' + component.cardValue + ' administrador!');
  });
  
  it('should show a unsuccessful different alert if user is already admin', () => {
    const roomId = 'testRoomId';
    const userId = 'testUserId';
  
    jest.spyOn(classroomServoce, 'makeUserAdmin').mockReturnValue(false);
    const spyAlert = jest.spyOn(window, 'alert')
  
    component.roomId = roomId;
    component['userId'] = userId;
    component.onClick();

    expect(spyAlert).toHaveBeenCalledWith('El usuario ya es administrador!');
  });
});
