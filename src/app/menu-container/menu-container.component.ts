import { Component, OnInit } from '@angular/core';
import { Menu } from '../shared/models/menu.model';
import { Order } from '../shared/models/order.model';
import { Quantity } from '../shared/models/quantity.model';
import { User } from '../shared/models/user';
import { MenuService } from '../shared/services/menu.service';
import { OrderService } from '../shared/services/order.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})
export class MenuContainerComponent implements OnInit {

  public menus: Menu[];
  public user: User;
  public message: string = null
  public messageType: boolean = null

  constructor(private MenuService: MenuService,private orderService: OrderService,
    private userService: UserService) { }

  ngOnInit(): void {
    // console.log(this.user.firstname);
    
    this.MenuService.findAllAvailableForToday().subscribe((menus: Menu[]) => {
      this.menus = menus;
    });
    this.user = this.userService.getCurrentUser();
    if (this.user) {
      this.userService.getCurrentUserFromBack(this.user.id).subscribe((user: User) => {
        this.user = user
      })      
    }    
  }

  public addCommande(menu) {
    if (window.confirm('Passer la commande ?')) {
      if (this.user.wallet >= menu.priceDF) {

        let order = new Order(this.user.id, 1, [new Quantity(1, null, menu.id)]);
        this.orderService.addOrder(order).subscribe(
          (order: Order) => {
            this.message = "Commande effectuer"
            this.messageType = true

            setTimeout(() => {
              this.message = null
              this.messageType = null
            }, 3000);
          },
          (err) => {
            console.log();
            this.message = err.error.exceptionMessage
            this.messageType = false

            setTimeout(() => {
              this.message = null
              this.messageType = null
            }, 3000);
          }
        );
      }
      else {
        this.message = "Fond insufisant, merci d'aller voir la cantiniere"
        this.messageType = false

        setTimeout(() => {
          this.message = null
          this.messageType = null
        }, 3000);
      }
    }
  }

}
