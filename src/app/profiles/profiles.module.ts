import { ProfilesRoutingModule } from './profiles.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule, ProfilesRoutingModule, FormsModule
  ]
})
export class ProfilesModule { }
