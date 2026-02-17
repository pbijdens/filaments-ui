import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { FilamentHeaderModel } from './models/filament-header-model';
import { LoggedinUserComponent } from "./shared/loggedin-user/loggedin-user.component";
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, LoggedinUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  filaments: FilamentHeaderModel[] = [];

  title = 'Filament Manager';

  constructor(public navbarService: NavbarService) { }

  async ngOnInit(): Promise<void> {
    this.navbarService.title$.subscribe(x => {
      this.title = x;
    });
  }
}
