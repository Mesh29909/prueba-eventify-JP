<script>
import AddNewService from "./add-new-service.component.vue";
import {QuoteServiceItem} from "../model/quote-item.entity.js";
import {generateUuid} from "../../shared/model/uuid.js";
import {Quote} from "../model/quote-order.entity.js";
export default {
  name: "create-quote",
  components: {AddNewService},
  emits: ['create-quote-order','close-create-quote'],
  props:{
    quote: Quote
  },
  mounted(){
    if(this.quote){
      this.id = this.quote.id;
      this.title = this.quote.title;
      this.eventType = this.quote.eventType;
      this.guestQuantity = this.quote.guestQuantity;
      this.state = this.quote.state;
      this.location = this.quote.location;
      this.serviceItems = [...this.quote.serviceItems];
      this.eventDate = new Date(this.quote.eventDate);
    }
  },
  data(){
    return{
      id:generateUuid(),
      title:'',
      eventType:'',
      eventDate: null,
      guestQuantity: 0,
      state:'Pending',
      location:'',
      serviceItems:[],
      eventTypeOptions:['Wedding','Conference','Quinceanera','Graduation'],
      visible: false
    }
  },
  methods:{

    onCreateNewService(service){
      const servItem = new QuoteServiceItem(service);
      servItem.unitPrice = parseFloat(service.unitPrice.toFixed(2));
      servItem.totalPrice = parseFloat(service.totalPrice.toFixed(2));
      this.serviceItems.push(servItem);
    },
    onCreateQuoteOrder(){
      console.log(this.eventDate);
      this.eventDate = this.eventDate.toISOString().split("T")[0]
      console.log(this.eventDate)
      console.log('Creating a new Quote order');
      this.$emit('create-quote-order',{
        id:this.id,
        title:this.title,
        eventType:this.eventType,
        guestQuantity:this.guestQuantity,
        state:this.state,
        location:this.location,
        serviceItems: this.serviceItems,
        totalPrice: this.getTotalPrice(),
        eventDate:this.eventDate
      })
      this.$emit('close-create-quote');
    },
    deleteServiceItem(description){
      this.serviceItems = this.serviceItems.filter(item => item.description !== description);
    }
    ,
    getFormatPrice(price){
        return `S/ ${price.toFixed(2)}`;
    },

    getTotalPrice(){
      let total = this.serviceItems.map(item => item.totalPrice).reduce((total,item)=> total+item,0)
      return parseFloat(total.toFixed(2));
    },
    getIGV(){
      return parseFloat(this.getTotalPrice() * 0.18).toFixed(2);
    },
    getSubTotal(){
      return parseFloat(this.getTotalPrice()-this.getIGV()).toFixed(2);
    }

  }
}
</script>

<template>

  <div class="text-3xl text-left font-bold">
    <p>Create New Quote</p>
  </div>

  <div class="flex flex-column p-4 quote-container">

    <div class="text-xl text-left font-bold">
      <p>Main Information</p>
    </div>

    <div>
      <form v-on:submit.prevent="onCreateQuoteOrder">
        <div class="flex flex-column form-group">
          <label for="title">Title</label>
          <pv-input-group>
            <pv-input-group-addon><i class="pi pi-bookmark"></i></pv-input-group-addon>
            <pv-input-text id="title" v-model="title" required></pv-input-text>
          </pv-input-group>
        </div>
        <div class="flex form-group justify-content-between" >
          <div class="w-24rem flex flex-column align-content-start">
            <label for="eventType">Event Type</label>
            <pv-input-group>
              <pv-input-group-addon><i class="pi pi-headphones"></i></pv-input-group-addon>
              <pv-select id="eventType" v-model="eventType" :options="eventTypeOptions" required></pv-select>
            </pv-input-group>
          </div>
          <div class="w-24rem flex flex-column align-content-start">
            <label>Event Date</label>
            <pv-input-group>
              <pv-input-group-addon><i class="pi pi-calendar"></i></pv-input-group-addon>
              <pv-date-picker v-model="eventDate" date-format="dd/mm/yy" fluid required/>
            </pv-input-group>
          </div>
        </div>
        <div class="flex form-group justify-content-between">
          <div class="w-24rem flex flex-column align-content-start">
            <label for="guestQuantity">Guests Number</label>
            <pv-input-group>
              <pv-input-group-addon><i class="pi pi-user"></i></pv-input-group-addon>
              <pv-input-number v-model="guestQuantity" id="guestQuantity" required></pv-input-number>
            </pv-input-group>
          </div>
          <div class="w-24rem flex flex-column align-content-start">
            <label for="location">Location</label>
            <pv-input-group>
              <pv-input-group-addon><i class="pi pi-map-marker"></i></pv-input-group-addon>
              <pv-input-text id="location" v-model="location" required></pv-input-text>
            </pv-input-group>
          </div>
        </div>
        <pv-button type="submit">Guardar</pv-button>
      </form>
    </div>

    <pv-divider/>

    <div class="flex flex-column align-content-start">

      <div class="text-xl text-left font-bold">
        <p>Included Services</p>
      </div>
      <pv-data-table :value="serviceItems" table-style="min-width:50rem">
        <pv-column field="description" header="Description"></pv-column>
        <pv-column field="quantity" header="Quantity"></pv-column>
        <pv-column field="unitPrice" header="Price">
          <template #body="slotProps">{{getFormatPrice(slotProps.data.unitPrice)}}</template>
        </pv-column>
        <pv-column field="totalPrice" header="Total Price">
          <template #body="slotProps">{{getFormatPrice(slotProps.data.totalPrice)}}</template>
        </pv-column>
        <pv-column field="actions" header="Actions">
          <template #body="slotProps">
            <pv-button type="button" @click="deleteServiceItem(slotProps.data.description)" class="bg-red-500"><i class="pi pi-trash"></i></pv-button>
          </template>
        </pv-column>
      </pv-data-table>
    </div>

    <div class="flex">


      <div class="w-3">

        <pv-button class="w-full mt-4" label="Add New Service" @click="visible=true"><i class="pi pi-plus-circle"></i> Add New Service</pv-button>
        <pv-dialog v-model:visible="visible" modal header="New Service" style="width: 30%">
          <add-new-service v-on:create-new-service="onCreateNewService" @change-visible="visible=false"></add-new-service>
        </pv-dialog>

      </div>


      <div class="w-5"></div>
      <div class="flex flex-column w-4 ">
        <div class="total-price-info flex justify-content-between">
          <p><b>Subtotal:</b></p>
          <p>S/ {{ this.getSubTotal()}}</p>
        </div>
        <div class="total-price-info flex justify-content-between">
          <p><b>IGV (18%):</b></p>
          <p>S/ {{this.getIGV()}}</p>
        </div>
        <pv-divider/>
        <div class="total-price-info flex justify-content-between text-lg">
          <p><b>TOTAL: </b></p>
          <p><b>S/ {{parseFloat(this.getTotalPrice()).toFixed(2)}}</b></p>
        </div>
      </div>
    </div>


  </div>

</template>

<style scoped>
  label{
    margin:0 0 4px 4px;
    font-weight: bold;
    text-align: start;
  }
  .form-group{
    margin: 16px 0;
  }
  .quote-container{
    border-radius: 10px;
    background-color: white;
  }
</style>