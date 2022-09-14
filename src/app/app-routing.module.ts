import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './dashboard/employees/employees.component';


const routes: Routes = [
  {
    path: '', component: EmployeesComponent,
    children: [
      { path: 'home', component: EmployeesComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
