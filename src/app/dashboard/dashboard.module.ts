import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashBoardRoutingModule } from "./dashboard.routing.module";
import { DashboardComponent } from "./dashboard.component";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashBoardRoutingModule],
})
export class DashboardModule {}
