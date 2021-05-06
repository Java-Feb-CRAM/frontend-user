import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-validation-page',
  templateUrl: './email-validation-page.component.html',
  styleUrls: ['./email-validation-page.component.scss']
})
export class EmailValidationPageComponent implements OnInit {
  isTokenValid = false;
  validationMessage?= "";
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    public readonly userService: UserService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['validationToken'] !== undefined) {
        this.userService.validate({ token: params['validationToken'] });
      }
    });
  }

  ngOnInit(): void {
  }

  generateNewToken() {
    this.userService.generateToken({ username: `${localStorage.getItem("username")}` });
  }

}
