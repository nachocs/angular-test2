import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { initPhotos } from '../../+state/photos.actions';
import { PhotosEntity } from '../../+state/photos.models';
import { selectAllPhotos } from '../../+state/photos.selectors';
import { PhotoComponent } from '../photo/photo.component';
@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [NgFor, PhotoComponent, MatPaginatorModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  photos: PhotosEntity[] = [];
  pageEvent!: PageEvent;
  length = 50;
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [4, 8, 16];
  photosShown: PhotosEntity[] = [];

  constructor(private store: Store<PhotosEntity[]>) {}
  ngOnInit() {
    this.store.dispatch(initPhotos());
    this.subscription.add(
      this.store
        .pipe(select(selectAllPhotos))
        .subscribe((data: PhotosEntity[]) => {
          this.photos = data;
          this.length = data.length;
          this.photosShown = this.photos.slice(
            this.pageSize * this.pageIndex,
            (this.pageIndex + 1) * this.pageSize
          );
        })
    );
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.photosShown = this.photos.slice(
      this.pageSize * this.pageIndex,
      (this.pageIndex + 1) * this.pageSize
    );
  }
}
