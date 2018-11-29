import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from './models/client.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: any[];

  public loading: boolean;
  public noResults: boolean;
  public showMessage: boolean;
  public message: string;
  public idRestore: number;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.clients = new Array<any>();

    await this.getClients();
  }

  async getClients() {
    try {
      const clients = await this.clientService.getClients();

      if (clients.length > 0) {
        this.clients = clients;
        console.log(this.clients);
      } else {
        this.noResults = true;
      }
    } catch (e) {
      this.noResults = true;
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  edit(client: Client) {
    this.router.navigate(['/cliente/' + client.id + '/editar']);
  }

  async remove(client: Client) {
    try {
      const clientDelete = await this.clientService.deleteClient(client.id);
      if (clientDelete) {
        this.idRestore = client.id;
        this.message = `Registro de ${client.name.toLocaleUpperCase()} foi excluído com sucesso`;
        this.feedBackTemplate();
        this.getClients();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async restore(id: number) {
    try {
      const clientRestore = await this.clientService.restoreClient(id);
      if (clientRestore) {
        this.getClients();
      }
    } catch (e) {
      console.log(e);
    }
  }


  feedBackTemplate() {
    this.showMessage = true;
    setTimeout(function() {
      this.showMessage = false;
    }.bind(this), 5000);
  }
}
