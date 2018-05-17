import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs/Observable';
import { RemoteAPI } from '../remote-api';

@Injectable()
export class UsuarioService {

  private serviceUrl = "http://" + RemoteAPI.CONFIG.serverIp + ":" + RemoteAPI.CONFIG.serverPort + "/api/usuario";

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.serviceUrl);
  }

  createUpdate(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.serviceUrl + "/save", usuario);
  }

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.serviceUrl + "/" + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Usuario>(this.serviceUrl + "/delete/" + id);
  }

}
