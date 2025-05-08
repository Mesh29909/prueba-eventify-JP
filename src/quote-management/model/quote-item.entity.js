import {Quote} from "./quote-order.entity.js";

export class QuoteServiceItem {
    constructor({description ='', quantity = 0, unitPrice=0, totalPrice = 0}){
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice?totalPrice : this.unitPrice * this.quantity;
    }
}