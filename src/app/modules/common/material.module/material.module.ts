import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';




@NgModule({
   imports: [

    /*
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        ,
        MatInputModule,
        ,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
    */

      MatButtonModule,
      MatFormFieldModule,
      CommonModule,
      MatCardModule,
      MatInputModule,
      MatSelectModule,
      MatToolbarModule,
      MatDividerModule,
      MatIconModule,
      MatGridListModule
   ],
   exports: [
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule
   ],
   providers: [
     // MatDatepickerModule,
   ]
})

export class MaterialModule { }