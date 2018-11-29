import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public loading: boolean;
  public client: Client;
  public subscribe: Subscription;
  public isEdit: boolean;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private toastr: ToastrService,
    private routerActive: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.loading = true;
    this.client = new Client();

    this.subscribe = await this.routerActive.params.subscribe((params: any) => {
      if (params['id']) {
        this.getClient(params['id']);
      } else {
        this.loading = false;
      }
    });
  }

  async getClient(id: number) {
    try {
      const client = await this.clientService.getClient(id);
      if (client) {
        this.isEdit = true;
        this.client = client;
        this.client.register = client.register === 'active';
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  async onCreate(values: Client) {
    try {
      const clientCreated = await this.clientService.addClient(values);
      if (clientCreated) {
        this.toastr.success('Registro de ' + values.name.toLocaleUpperCase() + ' foi cadastrado', 'Sucesso');
        this.router.navigate(['/clientes']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async onUpdate(values: Client) {
    try {
      const clientUpdated = await this.clientService.alterClient(this.client.id, values);
      if (clientUpdated) {
        this.toastr.success('Registro de ' + values.name.toLocaleUpperCase() + ' foi editado', 'Sucesso');
        this.router.navigate(['/clientes']);
      }
    } catch (e) {
      console.log(e);
    }
  }

  onSubmit(client: Client) {

    const values = Object.assign({}, client, {
      register: client.register ? 'active' : 'inactive'
    });

    if (this.isEdit) {
      this.onUpdate(values);
    } else {
      this.onCreate(values);
    }
  }

  cancel() {
    this.router.navigate(['/clientes']);
  }

}
