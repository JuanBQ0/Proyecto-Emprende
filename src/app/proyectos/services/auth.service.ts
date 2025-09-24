import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

private apiUrl = 'https://proyectosgradoapi.onrender.com/api/UsuarioControllerAuth/login'; // Cambia a la URL correcta de tu API

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
}
