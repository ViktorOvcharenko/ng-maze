import { Component, Input } from '@angular/core';
import { MatDrawer } from "@angular/material/sidenav";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() drawer: MatDrawer;

  public drawerToggle(): void {
    this.drawer.toggle();
  }
}
