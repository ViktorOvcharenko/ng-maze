import { Component, Input } from '@angular/core';
import { MatDrawer } from "@angular/material/sidenav";
import { AuthService } from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() drawer: MatDrawer;

  get displayName(): string {
    return this.authService.username;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public drawerToggle(): void {
    this.drawer.toggle();
  }

  public logout():void {
    this.authService.logout()
    this.router.navigate(['/auth', 'login']);
  }
}
