import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})
export class UserGraphComponent implements OnInit {

    // Pie
    public pieChartLabels:string[] = ['JavaScript', 'Java', 'C++', 'C', 'Swift', 'Go', 'Python'];
    public pieChartData:number[] = [300, 500, 100, 200, 100, 100, 500];
    public pieChartType:string = 'pie';

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

  constructor() { }

  ngOnInit() {
  }

}
