<script>


import {Dialog as PvDialog} from "primevue";

export default {
  name: "add-new-service",
  components: {PvDialog},
  props:{
    isVisible:Boolean,
  },
  emits:['create-new-service','change-visible'],
  methods:{
    onCreateNewService(){
      console.log('creating new service')
      this.$emit('create-new-service',{description: this.description, quantity:this.quantity,unitPrice:this.unitPrice, totalPrice:this.totalPrice})

      this.$emit('change-visible')
    },
  },
  data(){
    return{
      description:"",
      quantity:null,
      unitPrice:null,
    }
  },
  computed:{
    totalPrice(){
      return this.quantity * this.unitPrice;
    }
  }
}
</script>

<template>
    <div class="ml-4 mr-4">
      <form v-on:submit.prevent="onCreateNewService">
        <div class="flex flex-column form-group">
          <label class="text-sm" for="description">Description</label>
          <pv-input-group>
            <pv-input-group-addon>
              <i class="pi pi-pencil"></i>
            </pv-input-group-addon>
            <pv-input-text id="description" v-model="description" required></pv-input-text>
          </pv-input-group>
        </div>
        <div class="flex flex-column form-group">
          <label class="text-sm" for="quantity">Quantity</label>
          <pv-input-group>
            <pv-input-group-addon>
              <i class="pi pi-hashtag"></i>
            </pv-input-group-addon>
            <pv-input-number v-model="quantity" id="quantity" fluid required/>
          </pv-input-group>
        </div>
        <div class="flex flex-column form-group">
          <label class="text-sm" for="unitPrice">Unit Price</label>
          <pv-input-group>
            <pv-input-group-addon>S/</pv-input-group-addon>
            <pv-input-number v-model="unitPrice" id="unitPrice" min-fraction-digits="2" max-fraction-digits="2" required></pv-input-number>
          </pv-input-group>
        </div>
        <div class="flex flex-column form-group">
          <label class="text-sm"  for="totalPrice">Total Price</label>
          <pv-input-group>
            <pv-input-group-addon>S/</pv-input-group-addon>
            <pv-input-number v-model="totalPrice" id="totalPrice" min-fraction-digits="2" max-fraction-digits="2" readonly></pv-input-number>
          </pv-input-group>
        </div>
        <div class="mt-4 mb-2">
          <pv-button class="w-full" label="Add Service" type="submit"/>
        </div>
      </form>
    </div>
</template>

<style scoped>
  label{
    margin-bottom: 4px;
    font-weight: bold;
  }
  .form-group{
    margin: 16px 0;
  }
</style>