import { Routes } from '@angular/router';
import { UsersComponent } from './features/users/components/users.component';
import { LoginComponent } from './features/users/components/login/login.component';

export const routes: Routes = [
    {
        path:"cadastro",
        component:UsersComponent
    },
    // Componente descontinuado
    /*{
        path:"",
        component:LoginComponent
    }*/
];
