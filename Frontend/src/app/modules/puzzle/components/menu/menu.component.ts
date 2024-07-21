import {Component, OnInit} from '@angular/core';
import{AuthenticationService} from "../../../../services/services/authentication.service";
import {TokenService} from "../../../../services/token/token.service";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  constructor( private tokenService: TokenService) {
  }

    ngOnInit(): void {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }



  getUsername(): string | null {
    const token = this.tokenService.token;

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        return decoded.fullName || null;
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }

    return null;
  }


  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }


}
