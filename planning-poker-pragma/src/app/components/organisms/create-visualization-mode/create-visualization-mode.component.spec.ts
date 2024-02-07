import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateVisualizationModeComponent } from './create-visualization-mode.component';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';

describe('CreateVisualizationModeComponent', () => {
  let component: CreateVisualizationModeComponent;
  let fixture: ComponentFixture<CreateVisualizationModeComponent>;
  let userService: UsersService;
  let classroomService: ClassroomsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateVisualizationModeComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UsersService);
    classroomService = TestBed.inject(ClassroomsService);

    window.alert = jest.fn();

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to player mode', () => {
    component.selectedMode = '';
    component.switchRadio('player');
    expect(component.selectedMode).toBe('player');
  });

  it('should switch to spectator mode', () => {
    component.selectedMode = '';
    component.switchRadio('spectator');
    expect(component.selectedMode).toBe('spectator');
  });

  it('should continue to room with valid username and selectedMode', () => {
    component.username = 'validUsername';
    component.selectedMode = 'player';

    const setUsernameSpy = jest.spyOn(userService, 'setUsername');
    const updateUserStateSpy = jest.spyOn(classroomService, 'updateUserState' );
    const emitSpy = jest.spyOn(component.roomGeneratedEvent, 'emit');

    component.continueToRoom();

    expect(setUsernameSpy).toHaveBeenCalledWith('validUsername');
    expect(sessionStorage.getItem('user_username')).toEqual('validUsername');
    expect(updateUserStateSpy).toHaveBeenCalledWith(component.classroomId,component.userId,'validUsername','player');
    expect(emitSpy).toHaveBeenCalled();

    sessionStorage.clear()
  });

  it('should assign automatically selectedMode if no value is provided', () => {
    component.username = 'validUsername';
    component.selectedMode = '';
    component.continueToRoom();
    expect(component.selectedMode).toBe('player')
  });

  it('should not continue to room with invalid username', () => {
    component.username = '';
    component.selectedMode = '';

    const setUsernameSpy = jest.spyOn(userService, 'setUsername')
    const updateUserStateSpy = jest.spyOn(classroomService, 'updateUserState');
    const emitSpy = jest.spyOn(component.roomGeneratedEvent, 'emit');

    component.continueToRoom();

    expect(setUsernameSpy).not.toHaveBeenCalled();
    expect(updateUserStateSpy).not.toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should assign userId and username from userService', () => {
    const userId = 'testUserId';
    const username = 'testUsername';
  
    userService.userIdSubject.next(userId);
    userService.usernameSubject.next(username);
  
    fixture.detectChanges();
  
    expect(component.userId).toBe(userId);
    expect(component.username).toBe(username);
    expect(component.initialUsername).toBe('');
  });
});
