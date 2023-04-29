import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { HomepageComponent } from './components/homepage/homepage.component';
import { OffsaleComponent } from './components/offsale/offsale.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

const appRoutes: Routes=[
    {path:'inicio',component:HomepageComponent},
    {path:'ofertas',component:OffsaleComponent},
    {path:'productos',component:CategoriesComponent},
    {path:'registro',component:NewuserComponent},
    {path:'agregar-articulo',component:AddarticleComponent},
    {path:'detalle/:id',component:DetailComponent},
    {path:'editar/:id',component:EditComponent},
    {path:'**',component:HomepageComponent}
];

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders<any>=RouterModule.forRoot(appRoutes)