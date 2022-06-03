import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public allUsers: any;
  public basePath: any;

  constructor(
    private authService: AuthService,
    private db: AngularFireDatabase
  ) {
    this.basePath = this.db.database.ref('/users');
    this.basePath.on('value', (data: any) => {
      this.allUsers = Object.keys(data.val()).map((key) => {
        return {
          ...data.val()[key],
        };
      });
    });
  }

  ngOnInit(): void { }


}
