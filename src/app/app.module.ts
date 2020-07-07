import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule, AngularFireAuth } from "@angular/fire/auth";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    CoreModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
  exports: [CoreModule],
})
export class AppModule {}
