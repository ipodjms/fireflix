import { ModelBase } from './model-base';
import { HttpService } from './http/http.service';
import { OnInit, Injector, AfterContentInit } from '@angular/core';


export class ListBaseComponent<M extends ModelBase, S extends HttpService<M>> implements OnInit {
  constructor(protected injector: Injector, protected service: S) {  }


  public models: M[] = [];

  public ngOnInit(): void {
    console.log ('list base');
    this.loadList();
  }

  public loadList(): void {
    this.list();
  }

  public list(): void {
    // this.service.getAll().subscribe((models) => {
    //   this.models = models;
    // });
    this.models = this.service.getAll();
  }

  public ngOnDestroy(): void {
  }
}
