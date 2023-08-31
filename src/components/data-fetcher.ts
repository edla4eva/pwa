import { LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';


@customElement('data-fetcher')
export class DataFetcher extends LitElement {
  @property({ type: Array }) data = [];

  async fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      this.data = responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
