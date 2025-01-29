import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Products } from './product.model';
import { RedisCacheClusterService } from './redis-cache-cluster.service';

@Component({
    selector: 'app-products',
    imports: [SharedModule],
    providers: [RedisCacheClusterService],
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss'
})
export default class ProductsComponent implements OnInit {
  dataSource: any;
  loading = false;

  prodList: Products[] = [];

  prodSvc:any = inject(RedisCacheClusterService);

  displayedColumns: string[] = ['id', 'Name', 'Category', 'Price', 'Quantity', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editDept(id: number) {}

  deletePromptPopup(id: number) {}

  getAll() {
    this.loading = true;
    this.prodSvc.GetAllProd(this.prodList).subscribe((res: any) => {
      if (res.length > 0) {
        this.prodList = res;
        this.dataSource = new MatTableDataSource(this.prodList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      } else {
        this.prodList = res;
        this.dataSource = new MatTableDataSource(this.prodList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
    });
  }
  ngOnInit(): void {
    this.getAll();
  }
}
