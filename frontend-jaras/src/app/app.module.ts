import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders} from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';//para poder ingresar un dato en el <input> y poder utilizar el dato guardado con [(ngModel)]='dato'
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppComponent } from './app.component';
import { OffsaleComponent } from './components/offsale/offsale.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/signin/signin.component';
import { ConfirmUserComponent } from './components/confirm-user/confirm-user.component';

@NgModule({
  declarations: [ //declarations sirve para cargar nuestros componentes, pipes y directivas
    AppComponent,
    OffsaleComponent,
    CategoriesComponent,
    AddarticleComponent,
    NewuserComponent,
    HomepageComponent,
    DetailComponent,
    EditComponent,
    SearchComponent,
    CartComponent,
    SigninComponent,
    ConfirmUserComponent,
  ],
  imports: [ //sirve para cargar modulos, de Angular o creados por nosotros
    BrowserModule,
    routing, 
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    OAuthModule.forRoot()
  ],
  providers: [ //sirve para cargar servicios
    appRoutingProviders
  ],
  bootstrap: [AppComponent] //para cargar el componente principal
})
export class AppModule { }
