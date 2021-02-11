import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TableauComponent } from './tableau/tableau.component';
import { AnimReducerService } from './anim-reducer.service';
import { ReducerComponent } from './reducer/reducer.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNavComponent } from './page-nav/page-nav.component';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: 'reduce', component: PageNavComponent },
  { path: '**', component: PageNavComponent, }

];

@NgModule({
  imports:      [
    BrowserModule, FormsModule,
    MatButtonModule, MatProgressSpinnerModule,
    RouterModule.forRoot(routes)
   ],
  declarations: [ AppComponent, TableauComponent, ReducerComponent, PageNavComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AnimReducerService]
})
export class AppModule { }
