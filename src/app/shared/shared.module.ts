import { PlayerComponent } from './player/player.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [PlayerComponent],
  imports: [CommonModule],
  exports: [PlayerComponent]
})
export class SharedModule {}
