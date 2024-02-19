import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { HomepageComponent } from './components/homepage/homepage.component';
import { OffsaleComponent } from './components/offsale/offsale.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/signin/signin.component';

const appRoutes: Routes=[
    //FORMATO DE RUTA EN ANGULAR DENTRO DE UN OBJETO JSON{}: {path:'nombre de la ruta',component:componenteDeLaRuta}
    {path:'inicio',component:HomepageComponent},
    {path:'ofertas',component:OffsaleComponent},
    {path:'productos',component:CategoriesComponent},
    {path:'registro',component:NewuserComponent},
    {path:'inicio-sesion',component:SigninComponent},
    {path:'agregar-articulo',component:AddarticleComponent},
    {path:'detalle/:id',component:DetailComponent},
    {path:'editar/:id',component:EditComponent},
    {path:'search',component:SearchComponent},
    {path: 'carrito',component:CartComponent},
    {path:'**',component:HomepageComponent}
];

//Servicio 
export const appRoutingProviders:any[]=[];
//Modulo
export const routing: ModuleWithProviders<any>=RouterModule.forRoot(appRoutes)