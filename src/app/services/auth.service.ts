import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
// import firebase from "firebase/app";
import "firebase/auth";
import * as auth from 'firebase/auth';
import { User } from "../../app/model/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;

  constructor(
    public router: Router,
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public fireDB: AngularFireDatabase,
    public ngZone: NgZone
  ) { }

  SignIn(email: string, password: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result) {
          this.userData = result['user'];
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
          this.router.navigate(['pages']);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignUp(userModel: User) {
    return this.fireAuth
      .createUserWithEmailAndPassword(userModel.email, userModel.password)
      .then((result: any) => {
        if (result.operationType === 'signIn') {
          if (result.additionalUserInfo) {
            const basePath = this.fireDB.database.ref('/users');
            const data = {
              email: result.user?.multiFactor?.user?.email,
              firstName: userModel.firstName,
              lastName: userModel.lastName,
              contactNo: userModel.contactNo,
            };
            basePath.push(data);
            this.router.navigate(['/auth/sign-in']);
          }

        } else {
          window.alert('SignUp failed');
          this.router.navigate(['/auth/sign-up']);
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/sign-in']);
    });
  }

  GetAllUsers() {
    return new Promise<any>((resolve) => {
      this.fireStore.collection('users').valueChanges().subscribe(Users => resolve(Users));
    })
  }

  // public signUp(
  //   email: string,
  //   password: string,
  //   fName: string,
  //   lName: string,
  //   address: string,
  //   mobile: number,
  //   pincode: number
  // ): void {
  //   this.angularFireAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((res: any) => {
  //       if (res.operationType === 'signIn') {
  //         if (res.additionalUserInfo) {
  //           const basePath = this.db.database.ref('/users');
  //           const data = {
  //             email: res.user?.multiFactor?.user?.email,
  //             role: 'customer',
  //             fName: fName,
  //             lName: lName,
  //             address: address,
  //             mobile: mobile,
  //             pincode: pincode,
  //             image: '',
  //           };
  //           basePath.push(data);
  //           this.router.navigate(['dashboard']);
  //         }
  //         this.toaster.success('Account created successfully..');
  //       } else {
  //         window.alert('SignUp failed');
  //         this.router.navigate(['signup']);
  //       }
  //     })
  //     .catch((err) => {
  //       this.toaster.error(err);
  //     });
  // }
}
