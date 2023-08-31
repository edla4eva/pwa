import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import { styles } from './about-styles';

import { styles as sharedStyles } from '../../styles/shared-styles'

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-about')
export class AppAbout extends LitElement {
  static styles = [
    sharedStyles,
    styles
  ]

  constructor() {
    super();
  }

  render() {
    return html`
      <app-header ?enableBack="${true}"></app-header>

      <main>
        <h2>About Page</h2>

        <sl-card>
          <h2>Mobile App Information Card</h2>

          <p>This app will be used to enter data into the database, set reminders and automatically
              alert users
          </p>

          <p>Check out <a
              href="https://app.nodeldantravels.com/public</a> to learn more about the database</p>
        </sl-card>
  </main>
    `;
  }
}
