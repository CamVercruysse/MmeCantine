import { Time } from "@angular/common";

export interface Contraint {
    id: number;
    orderTimeLimit:Time;
    maximumOrderPerDay:number
    rateVAT:number
}

