import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize button-atom if buttonText is provided', () => {
    component.buttonText = 'Testing';
    component.roomId = 'test';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button-atom') as HTMLElement;
    expect(button).toBeTruthy();
  });

  it('should not initialize button-atom if buttonText isnt provided', () => {
    const button = fixture.nativeElement.querySelector('button-atom') as HTMLElement;
    expect(button).toBeFalsy();
  });

  it('should initialize image if imgUrl is provided', () => {
    component.imgUrl = '../../../../assets/images/pragma.png'
    const image = fixture.nativeElement.querySelector('image-atom') as HTMLElement;
    expect(image).toBeTruthy();
  });

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');
    component.onButtonClick();
    expect(emitSpy).toHaveBeenCalled();
  });
});
