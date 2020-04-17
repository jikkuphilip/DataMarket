import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import { FileListComponent } from './file-list/file-list.component';
import { BatchVerificationComponent } from './batch-verification/batch-verification.component';

import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';

const routes : Routes  = [
  {path:'', redirectTo:'Login', pathMatch:'full'},
  {path:'Home', component: HomeComponent},
  {path:'Login', component:LoginComponent,},
  {path:'Register', component: RegistrationComponent},
  {path:'FileUpload', component: FileUploadComponent,
   canActivate: [AuthGuard]
  },
  {path: 'ListFiles', component: FileListComponent,
   canActivate: [AuthGuard]
  },
  {path:'BatchVerification', component:BatchVerificationComponent, 
  canActivate: [AuthGuard]
}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]  
})
export class AppRoutingModule { }
