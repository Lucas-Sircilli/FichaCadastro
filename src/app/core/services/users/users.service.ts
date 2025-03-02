import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../features/users/models/users/users.model';
import { ViaCep } from '../../../features/users/models/users/viaCep.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'http://localhost:5055/api/Usuario';
  private apiViaCepUrl = 'http://localhost:5055/api/ViaCep';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getEnderecoByCEP(cep: string): Observable<any> {
    return this.http.get<any>(`${this.apiViaCepUrl}?cep=${cep}`);
  }
  

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}