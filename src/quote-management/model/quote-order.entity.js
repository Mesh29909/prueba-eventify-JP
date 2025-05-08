import {generateUuid} from "../../shared/model/uuid.js";

export class Quote{
    constructor({id='',title='',eventType='',state = '', guestQuantity=0, totalPrice = 0,eventDate = null, location = '', serviceItems=[]}){
        this.id = id?id:generateUuid();
        this.title=title;
        this.eventType = eventType;
        this.guestQuantity = guestQuantity;
        this.location = location;
        this.totalPrice = totalPrice;
        this.state = state;
        this.eventDate = eventDate;
        this.serviceItems = serviceItems;
    }
}