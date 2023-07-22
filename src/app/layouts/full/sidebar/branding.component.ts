import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/stint360-logo.png"
          class="align-middle m-2"
          alt="logo"
          width="150px"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() { }
}
