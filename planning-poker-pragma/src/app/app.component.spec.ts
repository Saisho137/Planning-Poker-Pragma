import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should print sessionStorage token', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    sessionStorage.setItem('session_token', 'mi_token');

    component.printSessionStorage()
    expect(consoleSpy).toHaveBeenCalledWith('Token: ', 'mi_token');

    sessionStorage.clear()
  });
});
