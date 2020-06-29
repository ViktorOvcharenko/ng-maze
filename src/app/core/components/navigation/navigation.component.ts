import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() drawerLocation: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  public logout():void {
    this.authService.logout()
    this.router.navigate(['/auth', 'login']);
  }
}
