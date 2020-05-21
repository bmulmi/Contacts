import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/contact-list', pathMatch: 'full' },
  {
    path: 'contact-list',
    component: ContactListComponent,
  },
  {
    path: 'contact-add',
    component: ContactEditComponent,
  },
  {
    path: 'contact-edit/:id',
    component: ContactEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
