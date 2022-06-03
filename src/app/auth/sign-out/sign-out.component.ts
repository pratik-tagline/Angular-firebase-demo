import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  userSignOut() {
    this.authService.SignOut()
  }

}
