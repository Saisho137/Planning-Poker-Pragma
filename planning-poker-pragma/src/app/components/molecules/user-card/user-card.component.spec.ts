import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserCardComponent } from './user-card.component';
import { UsersService } from '../../../shared/services/users-service/users.service';
import { of } from 'rxjs';
import { UserI } from '../../../interfaces/user-interface';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let userService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent, HttpClientTestingModule],
      providers: [UsersService],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UsersService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign userId from getAllUsers', async () => {
    const mockUsers: UserI[] = [
      { _id: 'user1', username: 'username1' } as any,
      { _id: 'user2', username: 'username2' } as any,
    ];
    component.cardValue = 'username1';

    jest.spyOn(userService, 'getAllUsers').mockReturnValue(of(mockUsers));
    component.assignUserId()

    expect(component['userId']).toBe('user1');
  });
});
