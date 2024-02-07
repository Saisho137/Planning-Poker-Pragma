import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clickEventReveal when revealClick is called', () => {
    const revealSpy = jest.spyOn(component.clickEventReveal, 'emit');
    component.revealClick();
    expect(revealSpy).toHaveBeenCalled();
  });

  it('should emit clickEventRestart when restartClick is called', () => {
    const restartSpy = jest.spyOn(component.clickEventRestart, 'emit');
    component.restartClick();
    expect(restartSpy).toHaveBeenCalled();
  });

  it('should render button with buttonText when allPlayersSelected is true and votationFinished is false', () => {
    component.allPlayersSelected = true;
    component.votationFinished = false;
    component.buttonText = 'Revelar cartas';

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.button-reveal'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Revelar cartas');
  });

  it('should render loader div when votationFinished is true', () => {
    component.votationFinished = true;

    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('.button-reveal.loader'));
    expect(loader).toBeTruthy();
  });
});
