import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationLinkComponent } from './invitation-link.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvitationLinkComponent', () => {
  let component: InvitationLinkComponent;
  let fixture: ComponentFixture<InvitationLinkComponent>;

  let clipboardMock: Partial<Clipboard>;
  let router: Router;

  beforeEach(async () => {
    clipboardMock = {
      copy: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: Clipboard, useValue: clipboardMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationLinkComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should assign link on Init', () => {
    fixture.detectChanges();
    expect(component.link).toBe('http://localhost');
  });

  it('should call clipboard.copy with the link when copyUrl is called', () => {
    const expectedLink = 'http://localhost:4200/classroom/sprint%2032';
    component.link = expectedLink;
    component.copyUrl();
    expect(clipboardMock.copy).toHaveBeenCalledWith(expectedLink);
  });

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');
    const button = fixture.nativeElement.querySelector('button-atom') as HTMLElement;
    
    component.onButtonClick();

    expect(button).toBeTruthy();
    expect(emitSpy).toHaveBeenCalled();
  });
});
