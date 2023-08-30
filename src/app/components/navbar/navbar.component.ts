import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // @Input() public userName;
  public user = JSON.parse(localStorage.getItem('currentUser')!);
  public isloggedIn = false;

  constructor(private router: Router, private _authenticationService: AuthenticationService) { }

  goToHome = () => {
    this.router.navigateByUrl("/list");
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.isloggedIn = true;
    }
  }

  login = () => {
    this.router.navigateByUrl("/login");
  }

  logout = () => {
    this.router.navigate([""]);
    this._authenticationService.logout();
    this.isloggedIn = false;
  }

}
