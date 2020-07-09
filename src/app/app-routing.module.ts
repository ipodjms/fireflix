import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppPreloadingStrategy } from "./app-preloading-strategy";
import { SigninGuard } from "./core/auth/signin.guard";
import { AuthGuard } from "./core/auth/auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "signin" },
  {
    path: "signin",
    loadChildren: () =>
      import("./account/account.module").then((m) => m.AccountModule),
    canActivate: [SigninGuard],
  },
  {
    path: "profiles",
    loadChildren: () =>
      import("./profiles/profiles.module").then((m) => m.ProfilesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "movies",
    loadChildren: () =>
      import("./movies/movies.module").then((m) => m.MoviesModule),
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: AppPreloadingStrategy,
      // onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
