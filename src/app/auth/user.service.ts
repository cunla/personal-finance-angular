import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(public db: AngularFirestore,
              public afAuth: AngularFireAuth) {
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    const user = firebase.auth().currentUser;
    return user.updateProfile({
      displayName: value.name,
      photoURL: user.photoURL
    });
  }
}
