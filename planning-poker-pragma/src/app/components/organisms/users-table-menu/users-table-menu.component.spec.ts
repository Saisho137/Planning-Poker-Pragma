import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableMenuComponent } from './users-table-menu.component';

describe('UsersTableMenuComponent', () => {
  let component: UsersTableMenuComponent;
  let fixture: ComponentFixture<UsersTableMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();

    fixture = TestBed.createComponent(UsersTableMenuComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit click event on revealClick button click', () => {
    const emitSpy = jest.spyOn(component.clickEventReveal, 'emit');
    
    component.revealClick()

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit click event on restartClick button click', () => {
    const emitSpy = jest.spyOn(component.clickEventRestart, 'emit');
    
    component.restartClick()

    expect(emitSpy).toHaveBeenCalled();
  });
});
