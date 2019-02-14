import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserBubbleComponent} from './components/user-bubble/user-bubble.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [UserBubbleComponent],
    exports: [UserBubbleComponent]
})
export class SharedModule {
}
