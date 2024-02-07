import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassroomComponent } from './classroom.component';

describe('ClassroomComponent', () => {
  let component: ClassroomComponent;
  let fixture: ComponentFixture<ClassroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomComponent);
    component = fixture.componentInstance;
    
    window.alert = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Initializing Room (ngOnInit, initializeValues, initializeRoom)


  //Html
  it('should render player/spectator view', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    component.visualization = 'player'
    fixture.detectChanges();

    expect(compiled.querySelector('app-create-visualization-mode')).toBeTruthy();
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-users-table-menu')).toBeTruthy();
    expect(compiled.querySelector('app-card-menu')).toBeTruthy();
    expect(compiled.querySelector('a')).toBeTruthy();

    component.visualization = 'spectator'
    fixture.detectChanges();

    expect(compiled.querySelector('app-card-menu')).toBeFalsy();
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
    component.restartGame()
    expect(window.alert).toHaveBeenCalledWith('Debes ser administrador para presionar este botón!');
  });
});
