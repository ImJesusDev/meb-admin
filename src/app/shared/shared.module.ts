import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Components */
import { LoaderComponent } from '../components/loader/loader.component';
/* Lottie Player */
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
/* Initialize lottie player */
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [LoaderComponent],
})
export class SharedModule {}
