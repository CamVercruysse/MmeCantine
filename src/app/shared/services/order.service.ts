import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { UserService } from './user.service';

const API: string = 'http://localhost:8080/lunchtime';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public findAllOrderByUserId() {
    let user = this.userService.getCurrentUser();

    return this.http.get(API + '/order/findallforuser/' + user.id);
  }

  public addOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(API + '/order/add', order);
  }

  /**
   * findAllOrderDateBetween
   * Retourn la liste des commandes avec le status 0 (created) entre deux date
   * Necessite le role LunchLady
   */
  public findAllOrderDateBetween(beginDate, endDate): Observable<Order[]> {
    let parametres = new HttpParams();
    parametres = parametres.append('status', '0');
    parametres = parametres.append('beginDate', beginDate);
    parametres = parametres.append('endDate', endDate);

    return this.http.get<Order[]>(API + "/order/findallbetweendateinstatus", { params: parametres })
  }

  /**
   * Necessite le role LunchLady
   */
  public validerUneCommande(orderId, constraintId = -1) {
    return this.http.patch(API + "/order/deliverandpay/" + orderId + "/" + constraintId, {})
  }

  /**
   * Necessite le role LunchLady
   */
  public SupprimerUneCommande(orderId) {
    return this.http.patch(API + "/order/cancel/" + orderId, {})
  }
}
