import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CardMenuComponent } from './card-menu.component';
import { ClassroomsService } from '../../../shared/services/classrooms-service/classrooms.service';
import { ClassroomI } from '../../../interfaces/classroom-interface';
import { ScoringModeItemI } from '../../../interfaces/scoring-mode-interface';
import { UsersService } from '../../../shared/services/users-service/users.service';

describe('CardMenuComponent', () => {
  let component: CardMenuComponent;
  let fixture: ComponentFixture<CardMenuComponent>;

  let userService: UsersService;
  let classroomService: ClassroomsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMenuComponent);
    component = fixture.componentInstance;

    window.alert = jest.fn()
    classroomService = TestBed.inject(ClassroomsService);
    userService = TestBed.inject(UsersService);

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign userId and username from userService', () => {
    const userId = 'testUserId';
  
    userService.userIdSubject.next(userId);
  
    fixture.detectChanges();
  
    expect(component['userId']).toBe(userId);
  });

  it('should update scoring mode and emit event when user is admin', () => {
    const mockRoom: ClassroomI = { admin: ['userId'] } as any;
    const mockScoringMode: ScoringModeItemI[] = [{ id: 1, value: '10' }];

    jest.spyOn(classroomService, 'createScoringMode').mockReturnValueOnce(mockScoringMode);
    const clearMockupsSpy = jest.spyOn(classroomService, 'clearSelectedCardForMockUpUsers')
    const clearSpy = jest.spyOn(classroomService, 'clearSelectedCard')
    const emitSpy = jest.spyOn(component.scoringModeSelection, 'emit');

    component.room = mockRoom;
    component['userId'] = 'userId';

    component.getScoringMode('fibonacci');

    expect(emitSpy).toHaveBeenCalledWith('fibonacci');
    expect(component.scoringSelection).toBe('fibonacci');
    expect(component.scoringMode).toEqual(mockScoringMode);
    expect(classroomService.createScoringMode).toHaveBeenCalledWith('fibonacci');
    expect(clearMockupsSpy).toHaveBeenCalledWith(component.roomId);
    expect(clearSpy).toHaveBeenCalledWith(component.roomId, component['userId']);
  });

  it('should emit an alert when user is not admin', () => {
    const mockRoom: ClassroomI = { admin: ['notUserId'] } as any;
    const alertSpy =  jest.spyOn(window, 'alert')

    component.room = mockRoom;
    component['userId'] = 'userId';

    component.getScoringMode('fibonacci');

    expect(alertSpy).toHaveBeenCalledWith('Necesitas ser administrador para cambiar el modo de cartas!')
  });

  it('should toggle scoring mode window', () => {
    component.scoringModeWindow = false;

    component.switchDisplayModes();

    expect(component.scoringModeWindow).toBe(true);

    component.switchDisplayModes();

    expect(component.scoringModeWindow).toBe(false);
  });

  it('should emit click event', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');

    component.onButtonClick('value');

    expect(emitSpy).toHaveBeenCalledWith('value');
  });
});
