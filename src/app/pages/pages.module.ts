import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
