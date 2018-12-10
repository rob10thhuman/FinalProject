import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css']
})
export class UserGraphComponent implements OnInit {

    // Pie
    public pieChartLabels:string[] = ['JavaScript', 'Java', 'C++', 'C', 'Swift', 'Go', 'Python'];
    public pieChartData:number[] = [2.47, 13.27, 4.27, 10.16, 1.57, 1.39, 3.78];
    public pieChartColors: any[] = [
      {
        backgroundColor: ['#ff0000', '#ff8000', '#00ff00', '#0040ff', '#5c0a5c', '#00bfff', '#33FF90']
      }];
    public pieChartType:string = 'doughnut';

    // events

    public options: any = {
      legend: {position: 'bottom'},
      };

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
