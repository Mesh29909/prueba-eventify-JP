<script>
import {Quote} from "../model/quote-order.entity.js";
import CreateQuote from "./create-quote.component.vue";

export default {
  name: "quote-order-list",
  components: {CreateQuote},
  emits: [],
  data(){
    return {
      quoteOrderList:[],
      quoteOrderSelected:null,
      visible:false
    }
  },
  methods:{
    onCreateQuoteOrder(quoteOrder){
      const order = new Quote({...quoteOrder});
      this.quoteOrderList.push(order);
      this.visible=true;
    },
    selectQuoteOrder(id){
      this.quoteOrderSelected = this.quoteOrderList.find(quote => quote.id === id);
    },
    deleteQuoteOrder(id){
      this.quoteOrderList = this.quoteOrderList.filter(quote => quote.id !== id);
    }

  }
}
</script>

<template>

  <div class="quote-list-container flex flex-column p-4" style="background-color: #F5F7FA; color:#000;">
    <p class="text-3xl font-bold text-left mb-4 mt-0">Quotes</p>
    <div class="flex mb-4">
      <div class="flex justify-content-between w-8">
        <pv-input-group class="w-5">
          <pv-input-group-addon><i class="pi pi-search"></i></pv-input-group-addon>
          <pv-input-text  id="searchQuotes" placeholder="Search Quotes"></pv-input-text>
        </pv-input-group>
        <pv-select class="w-3" placeholder="Todos"></pv-select>
        <pv-select class="w-3" placeholder="Recientes"></pv-select>
      </div>
      <div class="flex justify-content-end w-4">
        <pv-button style="background-color: #98bef1" type="button" @click="visible = true; quoteOrderSelected = null"><i class="pi pi-plus-circle"></i> New Quote</pv-button>
      </div>
    </div>



    <pv-dialog v-model:visible="visible" modal style="width:70%">
      <create-quote :quote="quoteOrderSelected" v-on:create-quote-order="onCreateQuoteOrder" @close-create-quote="visible=false"></create-quote>
    </pv-dialog>

    <pv-data-table :value="quoteOrderList" table-style="min-width:50rem" style="background-color: #f3f5fa">
      <pv-column field="id" header="Id"></pv-column>
      <pv-column field="title" header="Title"></pv-column>
      <pv-column field="eventType" header="Event Type"></pv-column>
      <pv-column field="eventDate" header="Date"></pv-column>
      <pv-column field="totalPrice" header="Total Price">
        <template #body="slotProps">S/ {{slotProps.data.totalPrice}}</template>
      </pv-column>
      <pv-column field="state" header="State">
      </pv-column>
      <pv-column field="actions" header="Actions">
        <template #body="slotProps">
          <div class="flex">
            <pv-button type="button" class="bg-blue-500 mr-2" @click="selectQuoteOrder(slotProps.data.id); visible=true"><i class="pi pi-pencil"></i></pv-button>
            <pv-button type="button" class="bg-red-500" @click="deleteQuoteOrder(slotProps.data.id);"><i class="pi pi-trash"></i></pv-button>
          </div>

        </template>
      </pv-column>
    </pv-data-table>
  </div>

</template>

<style scoped>
.quote-list-container {
  background-color: #709ff3;
  color: #89d8ef;
  height: 100%;
  overflow-y: auto; /* solo este componente hace scroll si es necesario */
}
</style>
