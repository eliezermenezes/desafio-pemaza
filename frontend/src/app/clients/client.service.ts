import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Client } from './models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public urlAPI: string;

  constructor(
    private http: HttpClient
  ) {
    this.urlAPI = 'http://localhost:8000/api/client/';
  }

  public async getClients() {
    return await this.http.get<Client[]>(this.urlAPI).toPromise();
  }

  public async getClient(id: number) {
    return await this.http.get<Client>(`${this.urlAPI}${id}`).toPromise();
  }

  public async addClient(client: Client) {
    return await this.http.post(this.urlAPI, client).toPromise();
  }

  public async alterClient(id: number, client: Client) {
    return await this.http.patch(`${this.urlAPI}${id}`, client).toPromise();
  }

  public async deleteClient(id: number) {
    return await this.http.delete(`${this.urlAPI}${id}`).toPromise();
  }

  public async restoreClient(id: number) {
    return await this.http.get(`${this.urlAPI}${id}/restore`).toPromise();
  }
}
