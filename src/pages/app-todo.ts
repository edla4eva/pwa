import {LitElement, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {animate, fadeOut, flyBelow} from '@lit-labs/motion';
import {styles} from '../styles/styles-todo';
import {TextField} from '@material/mwc-textfield';
import {Checkbox} from '@material/mwc-checkbox';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import { DataFetcher } from '../components/data-fetcher';


const data = [
  {id: 1, value: 'Check for course in canada', completed: false},
  {id: 2, value: 'Book flight ticket to Germany', completed: true},
  {id: 3, value: 'Check ticket', completed: false},
  {id: 4, value: 'Swap ticket.', completed: true},
  {id: 5, value: 'Office chores.', completed: false},
  {id: 6, value: 'Call client', completed: false},
  {id: 7, value: 'Post Day\'s Job', completed: false},
];

type DataItem = typeof data[number];

@customElement('app-todos')
export class AppTodos extends LitElement {
  static styles = styles;
  @property({type: Array}) data = data;
  @query('mwc-textfield') textField!: TextField;

    //fetch from API using component
//   private dataFetcher!: DataFetcher; // Declare dataFetcher property
//   @property({ type: Array }) data: DataItem[] = [];
//   connectedCallback() {
//     super.connectedCallback();
//     this.dataFetcher = this.shadowRoot!.querySelector('data-fetcher') as DataFetcher;
//     this.dataFetcher.addEventListener('data-fetched', this.handleDataFetched);
//     this.fetchData(); // Fetch data using DataFetcher
//   }

//   async fetchData() {
//     await this.dataFetcher.fetchData('https://api.com/'); // Fetch data using DataFetcher
//   }

//   private handleDataFetched = (event: CustomEvent) => {
//     this.data = event.detail; // Assign the fetched data to the data property
//   };


  static shadowRootOptions = {
    mode: 'open' as ShadowRootMode,
    delegatesFocus: true,
  };



  addItem() {
    if (!this.textField.value) {
      return;
    }
    const nextId = this.data[this.data.length - 1].id + 1;
    this.data = [
      ...this.data,
      {
        id: nextId,
        value: this.textField.value,
        completed: false,
      },
    ];
    this.textField.value = '';
  }

  removeItem(item: DataItem) {
    this.data = this.data.filter((i) => i != item);
  }

  updateItem(updatingItem: DataItem, completed: boolean) {
    this.data = this.data.map((item) => {
      if (updatingItem === item) {
        updatingItem.completed = completed;
      }
      return item;
    });
  }
  

  render() {
    const keyframeOptions = {
      duration: 500,
      fill: 'both' as FillMode,
    };
    const list = (completed = false) => html`<div
      class="list ${classMap({completed})}"
    >
      <h3>${completed ? `Completed` : `Todos`}</h3>
      <ul tabindex="-1">
        ${repeat(
          this.data.filter((item) =>
            completed ? item.completed : !item.completed
          ),
          (item) => item.id,
          (item) => html`<li
            ${animate({
              keyframeOptions,
              in: flyBelow,
              out: fadeOut,
              stabilizeOut: true,
              id: `${item.id}:${completed ? 'right' : 'left'}`,
              inId: `${item.id}:${completed ? 'left' : 'right'}`,
              skipInitial: true,
            })}
          >
            <mwc-formfield label="${item.id}. ${item.value}"
              ><mwc-checkbox
                type="checkbox"
                ?checked=${completed}
                @change=${(e: Event) =>
                  this.updateItem(item, (e.target! as Checkbox).checked)}
              ></mwc-checkbox></mwc-formfield
            ><button @click=${() => this.removeItem(item)}>
              remove_circle_outline
            </button>
          </li>`
        )}
      </ul>
    </div>`;
    return html`
      <mwc-textfield outlined label="Enter a todo..."></mwc-textfield>
      <div class="controls">
        <mwc-button @click=${this.addItem} raised>Add Todo</mwc-button>
      </div>
      <div class="lists">${list()} ${list(true)}</div>
    `;
  }
}