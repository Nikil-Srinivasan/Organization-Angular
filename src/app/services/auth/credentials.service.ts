import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import jwt_decode from 'jwt-decode'; // Import the JWT decode library


export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}

const credentialsKey = 'credentials';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private _credentials: Credentials | null = null;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null); // Update userSubject type
  public user: any;


  constructor() {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
      if (this._credentials) {
        const user = this.decodeToken(this._credentials.token);
        this.userSubject.next(user); // Update userSubject with decoded user
        this.user = this.userSubject.asObservable();
      }
    }
  }


  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    // console.log("credential :", this.userSubject.value)
    return !!this.userSubject.value;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  public get userValue(): User | null{
    // console.log(this.userSubject.value);
    return this.userSubject.value;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null;
    

    if (credentials) {
      const storage = localStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      const user = this.decodeToken(credentials.token);
      // console.log('User Details:', user);
      this.userSubject.next(user); // Update userSubject with decoded user
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  removeCredential(){
    localStorage.removeItem(credentialsKey);
    this.userSubject.next(null); // Update userSubject with null
  }


  private decodeToken(token: string): any {
    const decodedToken: any = jwt_decode(token);
    const user: User = {
      nameid: decodedToken.nameid,
      unique_name: decodedToken.unique_name,
      role: decodedToken.role,
      token : token
    };
    return user;
  }

}