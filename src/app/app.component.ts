import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'newapp';

  constructor(private router: Router) {}


  async ngOnInit() {
    console.log("New app");
    await this.router.navigate(['/auth']);
  }
}
