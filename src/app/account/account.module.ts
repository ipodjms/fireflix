import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigninComponent } from "./signin/signin.component";
import { AuthRoutingModule } from "./account.routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AccountModule {}
