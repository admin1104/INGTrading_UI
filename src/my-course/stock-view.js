
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import './shared-styles.js';

class Stockview extends PolymerElement {

  static get properties() {
    return {
      data: Array  ,
      entityClient: {
        type: Array,
        value: [
          {
              name: 'sbi'
          },
          {
              name: 'infosys'
          } ,
          {
            name: 'Wipro'
        } , 
        {
          name: 'colgate'
         } , 
       {
        name: 'toothpaste'
       } ,                    
      ]
    },
    categorySelected:{
      type: String
    },

    stocksData: {
      type: Array,
      value: [
        {
            name: 'stock 1'
        },
        {
            name: 'stock 2'
        } ,
        {
          name: 'stock 3'
      } , 
      {
        name: 'stock 4'
       } , 
     {
      name: 'stock 5'
     } ,                    
    ]
  },

    }
  }

  _userSelected (e) {
    //console.log(e.target.selectedItem.textContent)
    var selectedItem = e.target.selectedItem;
    if (selectedItem) {
        this.categorySelected = selectedItem.value;
        let selectedtTYpe =this.categorySelected
        console.log(selectedtTYpe);
        // if(selectedtTYpe==="Current"){
        //     this.currentHidden =false;
        //     this.montlyHidden = true;
        // }
        // else{
        //     this.montlyHidden = false;
        //     this.currentHidden =true;
        // }
    }
}

_stockSelected(e){
  var selectedItem = e.target.selectedItem;
    if (selectedItem) {
        this.stocksData = selectedItem.value;
        let selectedtTYpe =this.stocksData
        console.log(selectedtTYpe);        
    }
}


  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
      
      <paper-dropdown-menu name="users" label="Users"  on-iron-select="_userSelected">
       <paper-listbox slot="dropdown-content" class="dropdown-content">
           <dom-repeat items={{entityClient}}>
              <template> <paper-item value={{item.name}}>{{item.name}}</paper-item></template>
           </dom-repeat>
       </paper-listbox>
   </paper-dropdown-menu>

   <div>

   <paper-dropdown-menu name="stocksData" label="Stocks"  on-iron-select="_stockSelected">
       <paper-listbox slot="dropdown-content" class="dropdown-content">
           <dom-repeat items={{stocksData}}>
              <template> <paper-item value={{item.name}}>{{item.name}}</paper-item></template>
           </dom-repeat>
       </paper-listbox>
   </paper-dropdown-menu>
   </div>
   <paper-input type="number" label="Quantity"></paper-input>
   <paper-input type="number" label="price"></paper-input>
   <paper-button toggles raised class="green">Quote</paper-button> 
      </div>
    `;
  }
}

window.customElements.define('stock-view', Stockview);
