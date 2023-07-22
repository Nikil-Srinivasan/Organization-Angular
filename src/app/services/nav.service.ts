import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavService {

    // BehaviorSubject to store and notify about the current URL
    public currentUrl = new BehaviorSubject<any>(undefined);

    constructor(private router: Router) {

        // Subscribe to router events to track navigation changes
        this.router.events.subscribe((event: Event) => {

            // Check if the event is an instance of NavigationEnd
            if (event instanceof NavigationEnd) {

                // Update the current URL in the BehaviorSubject when navigation is complete
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
    }
}
