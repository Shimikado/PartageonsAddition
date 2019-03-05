import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ScanPage} from '../scan/scan.page';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    public pushPageDashboard = ScanPage;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    public goToScan() {
        this.router.navigateByUrl('/scan');
    }

    public goToJoin() {
        this.router.navigateByUrl('/join');
    }

    public goToHistoric() {
        this.router.navigateByUrl('/historic');
    }

    public goToDebt() {
        this.router.navigateByUrl('/debt');
    }

}
