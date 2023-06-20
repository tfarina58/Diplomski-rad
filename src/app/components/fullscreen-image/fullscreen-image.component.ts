import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.component.html',
  styleUrls: ['./fullscreen-image.component.scss']
})
export class FullscreenImageComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    let image = document.getElementById('image') as any;
    if (!image) return;

    let src = localStorage.getItem('image');
    if (!src) return;

    image.src = src;
    localStorage.removeItem('image');
  }

}
