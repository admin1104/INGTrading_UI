
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
              name: 'user 1'
          },
          {
              name: 'user 2'
          } ,
          {
            name: 'user 3'
        } , 
        {
          name: 'user 4'
         } , 
       {
        name: 'user 5'
       } ,                    
      ]
    },
    categorySelected:{
      type: String
    },
    stockname:{
      type:String
    },

    stocksData: {
      type: Array,
      value: [
        {
            name: 'ING'
        },
        {
            name: 'infosys'
        } ,
        {
          name: 'HCL'
      } , 
      {
        name: 'Wipro'
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
    }
}

_stockSelected(e){
  var selectedItem = e.target.selectedItem;
    if (selectedItem) {
        this.stocksData = selectedItem.value;
        let selectedtStockVal =this.stocksData;
        this.stockname = selectedtStockVal;
        console.log(selectedtStockVal);  
             
    }
}


_handleResponse(event) {
  debugger;
  this.$.priceValue.value = event.detail.response['Global Quote']['05. price'];
  this.$.priceValue.value = this.$.priceValue.value * this.$.quantityValue.value;
}

_generateAjaxCall(url,method,data){
  
  let ajaxEle = this.$.ajaxquote;
  ajaxEle.url = url;
  if(method == 'POST'){
      ajaxEle.contentType='application/json';
      ajaxEle.body= JSON.stringify(data);
  }
  ajaxEle.method = method;
  ajaxEle.generateRequest();
}

_loadQuote(){     
  
  this._generateAjaxCall("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=HCl&apikey=MMGWFDI4RI56JCZA",'GET',null);       
}

getUrl() {
  return baseUrl + "trades/stocks";
}

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <iron-ajax  
      auto      
      id="ajaxquote"
      url="[[getUrl()]]"      
      on-response="_handleResponse"> </iron-ajax>


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
   <paper-input id="quantityValue" type="number" label="Quantity"></paper-input>
   <paper-input type="number" label="price" disabled id="priceValue"></paper-input>
   
   <paper-button name="Submit" autofocus id="getQueto" raised on-click="_loadQuote">get Quote</paper-button>
<div>
   
</div>

</div>
    `;
  }
}

window.customElements.define('stock-view', Stockview);
