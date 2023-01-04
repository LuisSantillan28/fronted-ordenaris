import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'lista', component: PaginatorComponent },
      {
        path: '**',
        redirectTo: 'lista',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRoutingModule {}
