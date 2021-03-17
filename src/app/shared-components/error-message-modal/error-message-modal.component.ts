import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClearAPIMessageAction } from '../../store/actions/imagen.actions';
import { AppState } from '../../store/models/app.state';
import { CustomAPIType } from '../../store/models/imagen.model';

@Component({
  selector: 'app-error-message-modal',
  template: `
    <!-- Error Message Modal (Begins) -->
    <section
      class="message-modal danger-modal" id="danger-modal"
    >
      <div class="message-widget">
        <img src="../assets/images/fail-icon.png" alt="Error Icon" />
      </div>
      <div class="message-widget">{{ message.Message }}</div>
      <div class="message-widget text-right">
        <i
          class="fa fa-times close-message-modal cursor-pointer"
          (click)="closeModal()"
        ></i>
      </div>
    </section>
    <!-- Error Message Modal (Ends) -->
  `,
  styles: [],
})
export class ErrorMessageModalComponent implements OnInit {
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
