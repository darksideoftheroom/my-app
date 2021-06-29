import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogindataService {

  username: string;
  password: string;

  constructor() { }
}