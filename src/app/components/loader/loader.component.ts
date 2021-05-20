import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lottie/loading.json',
  };

  constructor() {}

  ngOnInit(): void {}

  animationCreated(animationItem: any): void {}
}
