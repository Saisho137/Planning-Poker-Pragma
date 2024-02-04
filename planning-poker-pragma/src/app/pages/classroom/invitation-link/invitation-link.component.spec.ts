import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationLinkComponent } from './invitation-link.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';

export class SampleComponent {
  constructor(private clipboard: Clipboard) {
  }

  copySomething(): void {
    this.clipboard.copy('test');
  }
}

describe('InvitationLinkComponent', () => {
  let component: InvitationLinkComponent;
  let fixture: ComponentFixture<InvitationLinkComponent>;

  let router: Router;
  let clipboard: Clipboard

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [InvitationLinkComponent, CommonModule, FormsModule, ClipboardModule],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitationLinkComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Cant made it work yet!
  it('should initialize link with current location', () => {
    const expectedLink = window.location.origin + window.location.pathname;
    expect(component.link + '/').toEqual(expectedLink);
  });

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEvent, 'emit');
    const button = fixture.nativeElement.querySelector('button-atom') as HTMLElement;
    
    component.onButtonClick()

    expect(button).toBeTruthy();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should copy to clipboard', () => {
    const clipSpy = jest.spyOn(component['clipboard'], 'copy')
    component.copyUrl();
    expect(clipSpy).toHaveBeenCalled();
});
});
