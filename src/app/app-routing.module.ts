import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'area',
loadChildren: ()=> import('./area/area.module').then(m=> m.AreaModule)
},
{
  path: '**', redirectTo: 'area'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
