import { ProfilesRoutingModule } from './profiles.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';



@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule, ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
