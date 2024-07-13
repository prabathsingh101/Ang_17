import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Holidays } from './holiday.model';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HolidaysService } from './holidays.service';
import { PromptService } from '../shared/prompt.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import HolidayModalPopupComponent from './holiday-modal-popup/holiday-modal-popup.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-holidays',
  standalone: true,
  imports: [SharedModule],
  providers: [HolidaysService, ToastrService, PromptService, DatePipe],
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.scss'
})
export default class HolidaysComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private holidaySvc: HolidaysService,
    private promptSvc: PromptService,
    private datePipe: DatePipe,
  ) {}

  displayedColumns: string[] = ['Id', 'Title', 'Description', 'HolidayDate', 'action'];

  holidayList: Holidays[] = [];

  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  getAll() {
    this.holidaySvc.GetAll(this.holidayList).subscribe((res: any) => {
      if (res.length > 0) {
        this.holidayList = res;
        this.dataSource = new MatTableDataSource(this.holidayList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.holidayList = res;
        this.dataSource = new MatTableDataSource(this.holidayList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  openpoup(id: number, title: any) {
    var _popup = this.dialog.open(HolidayModalPopupComponent, {
      width: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        id: id
      }
    });
    _popup.afterClosed().subscribe({
      next: (res) => {
        console.log(res);
        this.getAll();
      }
    });
  }
  editHolidays(id: number) {
    this.openpoup(id, 'Edit Holidays');
  }

  deleteData(id: number) {
    this.promptSvc.openPromptDialog(id).subscribe((res: any) => {
      if (res === true) {
        this.holidaySvc.DELETE(id).subscribe((res: any) => {
          this.toast.success('Deleted successfully.', 'Deleted.', { timeOut: 3000 });
          this.getAll();
        });
      }
    });
  }
}
