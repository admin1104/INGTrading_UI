
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
  connectedCallback(){
    super.connectedCallback();
    let ajaxCall = this.$.ajaxstcok;
   // ajaxCall.url = config.baseUrl + "/trades/users";
  }

  static get properties() {
    return {
      data: Array  ,
      actionType: {
        type: String,
        value: 'list'
      },
      priceValue:{
        type: Number
      },
      totalPrice:{
        type: Number
      },
      
      entityClient: {
        type: Array,
        value: [
          {
              name: 'user 1',
            
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
    personData:{
      type:Object,
      value:{}
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

  dataFlag:{
    type: String
  },
  brokageFee:{
    type: Number
  },
  userId:{
    type: String
  },
  totalId: {
      type: Number
  }

    }
  }

  _userSelected (e) {
    //console.log(e.target.selectedItem.textContent)
    var selectedItem = e.target.selectedItem;
    if (selectedItem) {
        this.categorySelected = selectedItem.value;
        let selectedtTYpe =this.categorySelected
        if(selectedtTYpe == "user 1"){
          this.userId = "101"  
        }
        if(selectedtTYpe == "user 2"){
          this.userId = "102"  
        }

        if(selectedtTYpe == "user 3"){
          this.userId = "103"  
        }
        if(selectedtTYpe == "user 4"){
          this.userId = "104"  
        }
        if(selectedtTYpe == "user 5"){
          this.userId = "105"  
        }
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
  
  this.personData = event.detail.response;
  
  let stockPrice = event.detail.response['Global Quote']['05. price'];  
  if(this.$.quantityValue.value < 500){
    this.$.brokageFee = .1 * stockPrice;
  }
  else{
    this.$.brokageFee = .15 * stockPrice;
    
  }
  let brokageFee = this.$.brokageFee; 
  console.log(brokageFee);
  let totalPrice = (parseInt(stockPrice) + this.$.brokageFee) * this.$.quantityValue.value;
  this.$.totalId.value = parseFloat(totalPrice).toFixed(3);
  this.$.priceValue.value = parseFloat(stockPrice).toFixed(3);
  //this.$.brokageFee.value= brokageFee;
  
  this.brokageFee = brokageFee;
}

_generateAjaxCall(url,method,data){  
  let ajaxstcok = this.$.ajaxstcok;
  ajaxstcok.url = url;  
  if(method == 'POST'){
    ajaxstcok.contentType='application/json';
    ajaxstcok.body= JSON.stringify(data);
  }
  ajaxstcok.method = method;
  ajaxstcok.generateRequest();
}

_loadQuote(){     
  
  this._generateAjaxCall("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=HCl&apikey=MMGWFDI4RI56JCZA",'GET',null);       
}

getUrl(param) {
  return config.baseUrl + param;

}

_buyStock() {  
  var ajaxstcok = this.$.ajaxstcok;  
  ajaxstcok.url = config.baseUrl + "trades/submit";
  ajaxstcok.method = "POST"
  let obj = {"userId": this.userId, 

  "stockName": this.stocksData,
  "totalPrice": this.totalPrice,
  "priceValue": this.$.priceValue.value,
"brokerageFee": this.brokageFee};
console.log(obj);
  ajaxstcok.body = obj;
  this._generateAjaxCall( ajaxstcok.url , "POST",obj);
  this.$.ajaxstcok.generateRequest(); 
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
      id="ajaxstcok"            
      on-response="_handleResponse" 
      url="[[_getUrl('/trades/submit')]]"> </iron-ajax>


      <div class="card">
      <form>
      <iron-form id="stockForm">
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
   <paper-input type="number" label="Price" name="totalPrice" value="{{totalPrice}}" id="priceValue"></paper-input>
   <paper-input type="number" label="brokage fee" id="brokageFee" name="brokageFee" value={{brokageFee}} ></paper-input>
   <paper-input type="number" label="Total" id="totalId"></paper-input>
   
   <paper-button name="Submit" autofocus id="getQueto" raised on-click="_loadQuote">get Quote</paper-button>

   <paper-button name="Submit" autofocus id="buyId" raised on-click="_buyStock">Buy</paper-button>

   <paper-button name="Submit" autofocus id="cacelId" raised on-click="_cancelStocks">Cancel</paper-button>

   
<div>
   
</div>
</iron-form
</form>
</div>
    `;
  }
}

window.customElements.define('stock-view', Stockview);
