import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

const LIST: string[] = ['Все митапы', 'Мои митапы', 'Пользователи'];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  public list: string[] = LIST;
  public activeItem: string | undefined;

  ngOnInit(): void {}
  
  public onSelectItem(item: string): void {
    this.activeItem = item;
  }

  logout() {
    this.authService.logout();
  }
}
