import { NgModule } from '@angular/core';
import { EditorModule } from 'primeng/editor';

@NgModule({
   imports: [
    EditorModule
   ],
   exports: [
    EditorModule
   ],
   providers: []
})

export class PrimengModule { }