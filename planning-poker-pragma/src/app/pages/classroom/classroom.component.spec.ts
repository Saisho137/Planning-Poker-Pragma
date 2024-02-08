import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassroomComponent } from './classroom.component';
import { UsersService } from '../../shared/services/users-service/users.service';
import { ClassroomsService } from '../../shared/services/classrooms-service/classrooms.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ClassroomI } from '../../interfaces/classroom-interface';
import { firstValueFrom, of, throwError } from 'rxjs';

describe('ClassroomComponent', () => {
  let component: ClassroomComponent;
  let fixture: ComponentFixture<ClassroomComponent>;

  let userService: UsersService;
  let classroomService: ClassroomsService;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: 'testingSprint' })
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UsersService);
    classroomService = TestBed.inject(ClassroomsService);

    TestBed.inject(ActivatedRoute);

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    
  
    window.alert = jest.fn();
  });

  afterEach(() => {
    //Clean Up room from service
    classroomService.rooms.splice(0, 1);
    classroomService.users.length = 0;

    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Initializing Room (initializeValues, ngOnInit, initializeRoom)
  it('should initialize room values properly', () => {
    const roomId = 'testingSprint'
    const newRoom: ClassroomI = {
      id: roomId,
    } as any;

    classroomService.rooms.push(newRoom);
    component.initializeValues()

    expect(component.roomId).toBe(roomId)
    expect(component.room).toBe(newRoom)
    expect(component.scoringMode).toBe(classroomService['scoringMode']['fibonacci'])
  });

  it('should assign userId and username from userService and create basic room on Init', () => {
    const userId = 'testUserId';
    const username = 'testUsername';
  
    userService.userIdSubject.next(userId);
    userService.usernameSubject.next(username);
    const createSpy = jest.spyOn(classroomService, 'createRoom')
  
    fixture.detectChanges();
  
    expect(component['userId']).toBe(userId);
    expect(component['username']).toBe(username);
    expect(createSpy).toHaveBeenCalled()
  });

  it('should initialize room properly', () => {
    const spy1 = jest.spyOn(component, 'addMockUpUsers')
    const spy2 = jest.spyOn(component, 'setVisualization')
    const spy3 = jest.spyOn(component, 'updateRoom')
    const spy4 = jest.spyOn(component, 'selectCard')

    component.configurationWindow = true;
    component.alreadyInitialized = false;
    component.visualization = 'spectator';
    component.selectedCard = '';

    component.initializeRoom();

    //first If
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(component.alreadyInitialized).toBe(true);

    //body
    expect(component.configurationWindow).toBe(false);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledTimes(1);

    //Spectator flow
    expect(spy4).toHaveBeenCalledWith('');
    expect(component.allPlayersSelected).toBe(false);
  });

  //Html
  it('should render organic view', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    component.visualization = 'player';
    fixture.detectChanges();

    //Validate normal player view
    expect(compiled.querySelector('app-create-visualization-mode')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-users-table-menu')).toBeTruthy();
    expect(compiled.querySelector('app-card-menu')).toBeTruthy();
    expect(compiled.querySelector('a')?.textContent).toBe('Abandonar la Sala');

    //Validate another modal and spectator view
    component.visualization = 'spectator';
    component.configurationWindow = false;
    component.invitationWindow = true;
    fixture.detectChanges();

    expect(compiled.querySelector('app-card-menu')).toBeFalsy();
    expect(compiled.querySelector('app-create-visualization-mode')).toBeFalsy();
    expect(compiled.querySelector('app-invitation-link')).toBeTruthy();
  });

  //setVisualization()
  it('should set visualization Mode', () => {
    const roomId = 'testingSprint';
    const userId = '1'

    component.roomId = roomId;
    component['userId'] = userId;

    const newRoom: ClassroomI = {
      id: roomId,
      users: [{
          id: userId,
          username: 'userTest',
          rol: 'player',
          cardSelected: ''
      }]
    } as any;

    classroomService.rooms.push(newRoom);
    component.setVisualization()

    expect(component.visualization).toBe('player')
  });

  //addMockUpUsers
  it('should add users to the room properly', () => {
    //mock room
    const roomId = 'testingSprint';
    const newRoom: ClassroomI = {
      id: roomId,
      users: [{
          id: '1',
          username: 'userTest',
          rol: 'player',
          cardSelected: ''
      }]
    } as any;
    classroomService.rooms.push(newRoom);

    //mock response from userService
    const getAllUsersMock = jest.spyOn(userService, 'getAllUsers').mockReturnValue(of([{
      _id: '2',
      username: 'userTest2',
      email: 'string',
      password: 'string',
      __v: 0
    }]));
    const newUsersSpy = jest.spyOn(classroomService, 'addUsersToRoom')

    //Mock Random selection to always receive 'player'
    jest.spyOn(globalThis.Math, 'random').mockReturnValue(0.1);

    component.addMockUpUsers();

    expect(getAllUsersMock).toHaveBeenCalledTimes(1);
    expect(newUsersSpy).toHaveBeenCalledWith(roomId, 
      [{
        id: '2',
        username: 'userTest2',
        rol: 'player',
        cardSelected: ''
      }]);
  });

  it('should handle error when getAllUsers fails',  () => {
    const errorResponse = new Error('Error fetching users');
    jest.spyOn(userService, 'getAllUsers').mockReturnValueOnce(throwError(() => errorResponse));
    component.addMockUpUsers();
    expect(firstValueFrom(userService.getAllUsers())).rejects.toThrow('Error fetching users.');
  });
  
  //updateScoringMode
  it('should update scoringMode (Card Menu)', () => {
    const scoringSpy = jest.spyOn(classroomService, 'createScoringMode');
    component.selectedCard = '999';
    component.usersAlreadySelectedCard = true;

    component.updateScoringMode('oneToFive');

    expect(component.selectedCard).toBe('');
    expect(component.usersAlreadySelectedCard).toBe(false);
    expect(scoringSpy).toHaveBeenCalledTimes(1);
    expect(component.scoringMode).toBe(classroomService['scoringMode']['oneToFive']);
  });

  //updateRoom
  it('should get the room correctly', () => {
    const roomId = 'testingSprint'
    const newRoom: ClassroomI = {
      id: roomId,
    } as any;
    classroomService.rooms.push(newRoom);
    
    component.roomId = roomId;
    const getSpy = jest.spyOn(classroomService, 'getRoom')

    component.updateRoom();

    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(component.room).toBe(newRoom);
  })

  //switchInvitationWindow

  //selectCard

  //votesCount

  //makeAverageScore

  //revealCards

  //restartGame
  it('should show an alert', () => {
    component.restartGame();
    expect(window.alert).toHaveBeenCalledWith(
      'Debes ser administrador para presionar este botón!'
    );
  });
});
