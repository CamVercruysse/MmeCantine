import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-commandes-details',
  templateUrl: './commandes-details.component.html',
  styleUrls: ['./commandes-details.component.css']
})
export class CommandesDetailsComponent implements OnInit {
  public commande = null
  public message: string = null
  public messageType: boolean = null

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.commande = history.state.data
  }

  public validerCommande(idCommande) {
    this.orderService.validerUneCommande(idCommande).subscribe((res: any) => {
      this.message = "Commande Valider"
      this.messageType = true

      setTimeout(() => {
        this.message = null
        this.messageType = null
        this.router.navigate(['commandes-list'])
      }, 3000);
    }, (err) => {
      this.message = err.error.exceptionMessage
      this.messageType = false

      setTimeout(() => {
        this.message = null
        this.messageType = null
      }, 3000);
    })
  }

  public supprimerCommande(idCommande) {
    if (window.confirm("Supprimer la commande?")) {
      this.orderService.SupprimerUneCommande(idCommande).subscribe((res: any) => {
        this.message = "Commande Supprimer"
        this.messageType = true

        setTimeout(() => {
          this.message = null
          this.messageType = null
          this.router.navigate(['commandes-list'])
        }, 3000);
      }, (err) => {
        this.message = err.error.exceptionMessage
        this.messageType = false

        setTimeout(() => {
          this.message = null
          this.messageType = null
        }, 3000);
      })

    }

  }

}
