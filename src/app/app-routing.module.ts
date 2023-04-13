import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    // {
    //     path: '',
    //     loadChildren: () => import('').then(m=>m.)
    // }
]

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports: []
})

export class AppRoutingModule {}