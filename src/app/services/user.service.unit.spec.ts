import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CredentialsDto } from '../models/CredentialsDto';
import { UserService } from './user.service';

const validCredentials = new CredentialsDto('A_123456', 'Testing123!');

const registrationUri = `${environment.apiBase}/users/new`;
const loginUri = `${environment.apiBase}/users/credentials/authenticate`;
const currentUserUri = `${environment.apiBase}/users/current`;

const validRegistrationFormData = {
  username: 'A_123456',
  password: 'Testing123!',
  matchingPassword: 'Testing123!',
  phone: '7776665555',
  email: 'craig@ss.com',
  familyName: 'Craig',
  givenName: 'Saunders',
};

const invalidRegistrationFormData = {
  username: 'A!123456',
  password: 'Testing',
  matchingPassword: 'Testing123',
  phone: '1',
  email: 'craig',
  familyName: '',
  givenName: 'S',
};

describe('UserService', () => {
  let httpTestingController: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should register valid accounts', () => {
    userService.register(validRegistrationFormData);
    const currentUserRequest = httpTestingController.expectOne(registrationUri);
    expect(currentUserRequest.request.method).toEqual('POST');
  });

  it('should login valid credentials', () => {
    userService.login(validCredentials);
    const currentUserRequest = httpTestingController.expectOne(loginUri);
    expect(currentUserRequest.request.method).toEqual('POST');
  });

  it('should check if user fetch was a success', () => {
    expect(userService.isUserFetchSuccess('ROLE_USER')).toBeTruthy();
  });

  it('should fetch user', () => {
    userService.fetchUser().subscribe((next) => {
      expect(next).toBeTruthy();
    });
    const currentUserRequest = httpTestingController.expectOne(currentUserUri);
    expect(currentUserRequest.request.method).toEqual('GET');
  });
});
