import { Checkup } from '@models/chekoups';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { BookingService } from '@services/booking.service';
import { ResourceFilters, RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  title = 'Reservas';
  showAddBtn = true;
  url: string[] = [];

  filters: ResourceFilters;
  downloading: boolean;

  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {
    this.filters = { };
    this.downloading = false;
    this.subscribeRouteEvents();
    this.subscribeRouteParams();
  }

  ngOnInit(): void {
  }

  subscribeRouteEvents(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        this.url = event.url.split('?');
        if (this.url[0] !== '/reservas' && this.url[0] !== '/reservas/historial') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/reservas') {
          this.title = 'Reservas';
        }
      }
    });
  }
  subscribeRouteParams(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.filters.status = RESOURCE_STATUS.PendingRepair;
        this.filters.page = undefined;
        this.filters.perPage = 99999999999999999999999999;
        this.filters.client = params.client;
        this.filters.office = params.office;
        this.filters.type = params.type;
        this.filters.from = params.from;
        this.filters.to = params.to;
        this.filters.reference = params.reference;
      });
  }


}
