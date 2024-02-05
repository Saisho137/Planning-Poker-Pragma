import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableMenuComponent } from './users-table-menu.component';

describe('UsersTableMenuComponent', () => {
  let component: UsersTableMenuComponent;
  let fixture: ComponentFixture<UsersTableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTableMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEventReveal, 'emit');
    
    component.revealClick()

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit click event on button click', () => {
    const emitSpy = jest.spyOn(component.clickEventRestart, 'emit');
    
    component.restartClick()

    expect(emitSpy).toHaveBeenCalled();
  });
});
