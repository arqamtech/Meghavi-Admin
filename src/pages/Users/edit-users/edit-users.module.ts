import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUsersPage } from './edit-users';

@NgModule({
  declarations: [
    EditUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUsersPage),
  ],
})
export class EditUsersPageModule {}
