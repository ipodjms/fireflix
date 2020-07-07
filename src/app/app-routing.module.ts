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
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  }

  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: 'signin'
  //   },
  //   {
  //     path: 'company',
  //     loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule),
  //     data: {
  //       breadcrumb: 'Companies',
  //       title: 'SIGGA Platform | Company',
  //       preload: true,
  //       delay: true,
  //       singleTenant: true
  //     }
  //   },
  //   {
  //     path: 'signin',
  //     pathMatch: 'full',
  //     loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  //     canActivate: [SigninGuard],
  //     data: { breadcrumb: 'Sign In', title: 'SIGGA Platform | Sign In', singleTenant: true }
  //   },
  //   {
  //     path: 'apps',
  //     loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Apps', title: 'SIGGA Platform | Apps' }
  //   },
  //   {
  //     path: 'teams',
  //     loadChildren: () => import('./settings/teams/teams.module').then(m => m.TeamsModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Teams', title: 'SIGGA Platform | Teams' }
  //   },
  //   {
  //     path: 'users',
  //     loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'User', title: 'SIGGA Platform | User' }
  //   },
  //   {
  //     path: 'dashboard',
  //     loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashBoardModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Dashboard', title: 'SIGGA Platform | DashBoard' }
  //   },
  //   {
  //     path: 'settings',
  //     loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
  //     canActivate: [AuthGuard],
  //     data: { title: 'SIGGA Platform | Settings' }
  //   },
  //   {
  //     path: 'flows',
  //     loadChildren: () => import('./flows/flows.module').then(m => m.FlowsModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Flows', title: 'SIGGA Platform | Flow' }
  //   },
  //   {
  //     path: 'data-models',
  //     loadChildren: () => import('./data/data-models/data-models.module').then(m => m.DataModelsModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Data Models', title: 'SIGGA  Platform | Data Models' }
  //   },
  //   {
  //     path: 'data',
  //     loadChildren: () => import('./data/data.module').then(m => m.DataModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Data ', title: 'SIGGA  Platform | Data' }
  //   },
  //   {
  //     path: 'service-builder',
  //     loadChildren: () => import('./service-builder/service-builder.module').then(m => m.ServiceBuilderModule),
  //     data: { breadcrumb: 'Service Builder', title: 'SIGGA Platform | Service Builder' }
  //   },
  //   {
  //     path: 'bots',
  //     loadChildren: () => import('./bots/bots.module').then(m => m.BotsModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Bots', title: 'SIGGA Platform | Bots' }
  //   },
  //   {
  //     path: 'systems',
  //     loadChildren: () => import('./settings/systems/systems.module').then(m => m.SystemsModule),
  //     canActivate: [AuthGuard],
  //     data: { title: 'SIGGA Platform | Systems' }
  //   },
  //   {
  //     path: 'publish-area',
  //     loadChildren: () => import('./publish-area/publish-area.module').then(m => m.PublishAreaModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Publish Area', title: 'SIGGA Platform | Publish Area' }
  //   },
  //   {
  //     path: 'integrations',
  //     loadChildren: () => import('./integrations/integrations.module').then(m => m.IntegrationsModule),
  //     canActivate: [AuthGuard],
  //     data: { breadcrumb: 'Integrations', title: 'SIGGA Platform | Integrations' }
  //   },
  //   {
  //     path: 'error',
  //     pathMatch: 'full',
  //     component: ErrorComponent,
  //     data: { title: 'SIGGA Platform | Error' }
  //   },
  //   { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
  //   // { path: 'data', loadChildren: () => import('./data/data.module').then(m => m.DataModule) }
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
