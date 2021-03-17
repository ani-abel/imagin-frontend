import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from '../../store/models/app.state';
import { CustomAPIType } from '../../store/models/imagen.model';
import { ClearAPIMessageAction } from '../../store/actions/imagen.actions';

@Component({
  selector: 'app-success-message-modal',
  template: `
    <!-- Success Message Modal (Begins) -->
    <section
      class="message-modal success-modal"
      id="success-modal"
    >
      <div class="message-widget">
        <img src="../assets/images/success-icon.webp" alt="Success Icon" />
      </div>
      <div class="message-widget">{{ message.Message }}</div>
      <div class="message-widget text-right">
        <i
          class="fa fa-times close-message-modal cursor-pointer"
          (click)="closeModal()"
        ></i>
      </div>
    </section>
    <!-- Success Message Modal (Ends) -->
  `,
  styles: [],
})
export class SuccessMessageModalComponent implements OnInit {
  @Input() message: CustomAPIType;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    //? Set timeout then clear the ngrx store field: APIMessage
    setTimeout(() => {
      this.store.dispatch(new ClearAPIMessageAction());
    }, 10000);
  }

  closeModal(): void {
    this.store.dispatch(new ClearAPIMessageAction());
  }
}
