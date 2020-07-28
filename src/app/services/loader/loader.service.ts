import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

    isLoading: Subject<boolean>;

    constructor() {
        this.isLoading = new Subject<boolean>();
        this.isLoading.next(false);
    }

    show() {
        this.isLoading.next(true);
    }

    hide() {
        this.isLoading.next(false);
    }
}
