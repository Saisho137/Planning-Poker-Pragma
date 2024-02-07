import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassroomComponent } from './classroom.component';
import { UsersService } from '../../shared/services/users-service/users.service';
import { ClassroomsService } from '../../shared/services/classrooms-service/classrooms.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ClassroomI } from '../../interfaces/classroom-interface';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Initializing Room (initializeValues, ngOnInit, initializeRoom)
  it('should initialize room properly', () => {
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

  it('should create', () => {

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
  //setVisualization

  //addMockUpUsers

  //updateScoringMode

  //updateRoom

  //switchInvitationWindow

  //selectCard

  //votesCount

  //makeAverageScore

  //revealCards

  //restartGame
  it('should show an alert', () => {
    //Clean Up room from service
    classroomService.rooms.splice(0, 1);
    classroomService.users.length = 0;

    component.restartGame();
    expect(window.alert).toHaveBeenCalledWith(
      'Debes ser administrador para presionar este botón!'
    );
  });
});
