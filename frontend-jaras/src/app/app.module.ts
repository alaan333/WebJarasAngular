import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders} from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { OffsaleComponent } from './components/offsale/offsale.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    OffsaleComponent,
    CategoriesComponent,
    AddarticleComponent,
    NewuserComponent,
    HomepageComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
