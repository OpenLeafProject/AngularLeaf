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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule }from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
   imports: [

    /*
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
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
      MatGridListModule,
      FlexLayoutModule,
      MatSidenavModule,
      MatListModule,
      MatPaginatorModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatExpansionModule
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
    MatGridListModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatExpansionModule
   ],
   providers: [
     MatDatepickerModule,
    
   ]
})

export class MaterialModule { }