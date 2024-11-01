import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private DefaultPageTitle = 'Filament Manager';

  public title$: Subject<string> = new BehaviorSubject(this.DefaultPageTitle);

  constructor() { }

  async setPageTitle(prefix: string) {
    setTimeout(() => {
      // this.title$.next(`${prefix} - ${this.DefaultPageTitle}`);
      this.title$.next(`${prefix}`);
    }, 5);
  }

}
