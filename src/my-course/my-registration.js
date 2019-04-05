import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './shared-styles.js';

class MyRegistration extends PolymerElement {
  static get properties() {
    return {
      name:{
        type: String,
        value: ''
      },
      username:{
        type: String,
        value: ''
      },
      sapId: {
        type : Number
      },
      email:{
        type: String
      },
      primarySkill:{
        type: String
      },
      band:{
        type: String
      },
      password:{
        type: String
      }
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
      <h1>Register</h1>
      <iron-ajax id="ajaxUser"
               url="http://localhost:3000/register"
               method="post"
               handle-as="json"
               content-type="application/json"
               body="[[obj]]"
               loading="{{loading}}"
               on-response="saveUserCredentials"
               last-response="{{user}}"></iron-ajax>
      <iron-form id ="regForm">
      <form>
      <paper-input always-float-label label="Full Name" name='name' value={{name}}></paper-input>
      <paper-input always-float-label label="User Name" name='username' value={{username}}></paper-input>
      <paper-input always-float-label label="Sap Id" name='sapId', value={{sapId}}></paper-input>
      <paper-input always-float-label label="email" name="email" value={{email}}></paper-input>
      <paper-input always-float-label label="Primary Skill" name="primarySkill" value={{primarySkill}}></paper-input>
      <paper-input always-float-label label="Band" name="band" value={{band}}></paper-input>
      <paper-input type="password" always-float-label label="Password" name="password" value={{password}}></paper-input>
      <paper-button raised class="indigo" on-click="Register" disabled="[[loading]]">Register</paper-button>
      <template is="dom-if" if="[[loading]]">Loading...</template>
    <pre>[[json(user)]]</pre>
      </form>
      </iron-form>
    </div>
  `;
}

saveUserCredentials(event){
  var status= event.detail.response.status;
  console.log(status);
  // if( status=="success")
  // {
    sessionStorage.setItem('username',this.email)
    alert('Registration Successfully');
 // }
  this.$.regForm.reset();
   this.set('route.path', '/mylogin');
}


Register() {  
    var ajaxuser = this.$.ajaxUser;
    let obj = {"name": this.name, "username": this.username, "sapId": this.sapId, "email": this.email, "primarySkill": this.primarySkill, "band": this.band, "password": this.password};
    ajaxuser.body = obj;
    this.$.ajaxUser.generateRequest(); 
}
}

window.customElements.define('my-registration', MyRegistration);
