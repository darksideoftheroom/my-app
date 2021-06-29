import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupdataService {

  username: string;
  password: string;
  password2: string;
  company: string;
  street: string;
  pcode: number;

  constructor() { }
}
