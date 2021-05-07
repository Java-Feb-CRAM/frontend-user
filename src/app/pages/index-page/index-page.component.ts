import { Component } from '@angular/core';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
})
export class IndexPageComponent {
  seats = [
    {
      seatClass: 'First',
      minRow: 1,
      maxRow: 3,
      cols: ['A', 'B', ' ', 'E', 'F'],
      seats: [
        {
          row: 1,
          column: 'A',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 1,
          column: 'B',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 1,
          column: 'E',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 1,
          column: 'F',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 2,
          column: 'A',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 2,
          column: 'B',
          occupied: true,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 2,
          column: 'E',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 2,
          column: 'F',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 3,
          column: 'A',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 3,
          column: 'B',
          occupied: true,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 3,
          column: 'E',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
        {
          row: 3,
          column: 'F',
          occupied: false,
          width: 1.5,
          height: 1.5,
        },
      ],
    },
    {
      seatClass: 'Economy Plus',
      minRow: 7,
      maxRow: 21,
      cols: ['A', 'B', 'C', ' ', 'D', 'E', 'F'],
      seats: [
        {
          row: 7,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 7,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 7,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 7,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 7,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 7,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 8,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 8,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 8,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 8,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 8,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 8,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 10,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 10,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 10,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 10,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 10,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 10,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 11,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 11,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 11,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 11,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 11,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 11,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 12,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 12,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 12,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 12,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 12,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 12,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },

        {
          row: 20,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 20,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 20,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 20,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },

        {
          row: 21,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 21,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 21,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 21,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 21,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 21,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
      ],
    },
    {
      seatClass: 'Economy',
      minRow: 22,
      maxRow: 32,
      cols: ['A', 'B', 'C', ' ', 'D', 'E', 'F'],
      seats: [
        {
          row: 22,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 22,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 22,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 22,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 22,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 22,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 23,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 23,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 23,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 23,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 23,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 23,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 24,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 24,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 24,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 24,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 24,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 24,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 25,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 25,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 25,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 25,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 25,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 25,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 26,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 26,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 26,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 26,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 26,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 26,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 27,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 27,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 27,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 27,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 27,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 27,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 28,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 28,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 28,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 28,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 28,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 28,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 29,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 29,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 29,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 29,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 29,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 29,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 30,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 30,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 30,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 30,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 30,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 30,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 31,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 31,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 31,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 31,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 31,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 31,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
        //
        {
          row: 32,
          column: 'A',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 32,
          column: 'B',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 32,
          column: 'C',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 32,
          column: 'D',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 32,
          column: 'E',
          occupied: false,
          width: 1,
          height: 1,
        },
        {
          row: 32,
          column: 'F',
          occupied: false,
          width: 1,
          height: 1,
        },
      ],
    },
  ];
  test(x: any): void {
    alert(JSON.stringify(x));
  }
}
