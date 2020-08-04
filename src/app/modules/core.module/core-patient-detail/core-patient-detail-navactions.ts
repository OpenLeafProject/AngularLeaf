import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'bottom-sheet-overview-example-sheet',
    templateUrl:'core-patient-detail-navactions.html'
  })
  export class BottomSheetOverviewActions {
    constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewActions>) { }
  
    closeBottomSheet(){
      //  pass the data to parent when bottom sheet closes.
      this._bottomSheetRef.dismiss(null);
    }

    emit(value: string) {
      this._bottomSheetRef.dismiss(value);
    }
  }