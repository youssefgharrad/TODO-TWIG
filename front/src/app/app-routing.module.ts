import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './demo/components/mydashboard/mydashboard.component';
import {AuthGuardService} from "./guards/auth-guard.service";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,canActivate:[AuthGuardService],

                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'plan', loadChildren: () => import('./pages/planification/planification.module').then(m => m.PlanificationModule) },
                    { path: 'clubView', loadChildren: () => import('./pages/club/club.module').then(m => m.ClubModule) },
                    { path: 'joueurview', loadChildren: () => import('./pages/joueur/joueur.module').then(m => m.JoueurModule) },
                    { path: 'session', loadChildren: () => import('./pages/session/session.module').then(m => m.SessionModule) },


                    // New Update Template
                    { path: 'mydashboard', component: MydashboardComponent },
                ],
            },
            { path: 'club', loadChildren: () => import('./pages/club/club.module').then(m => m.ClubModule) },
            { path: 'group', loadChildren: () => import('./pages/group/group.module').then(m => m.GroupModule) },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)},
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
