import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  
  constructor(private http: HttpClient) {}
  signup(username: string, password: string) {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<{message: string}>('http://localhost:3000/signup', loginData, httpOptions);
  }

  login(username: string, password: string) {
    const loginData = {
      username: username,
      password: password
    };

    return this.http.post<{message: string}>('http://localhost:3000/login', loginData, httpOptions);
  }

  sendHighscore(username: string, points: number) {
    const scoreData = {
      username: username,
      points: points
    };
    return this.http.post<{message: string}>('http://localhost:3000/highscore', scoreData, httpOptions);
  }

  loadHighscore() {
    return this.http.get<{message: string}>('http://localhost:3000/gethighscore', httpOptions);
  }


/*   loadUserHighscore(username: string) {
    const scoreData = {
      username: username
    };
    return this.http.get<{message: string}>('http://localhost:3000/getuserhighscore', scoreData, httpOptions);
  }  */

}
