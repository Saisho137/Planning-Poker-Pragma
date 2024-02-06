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
        ClassroomComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.alert = jest.fn();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Initializing Room (ngOnInit, initializeValues, initializeRoom)

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
