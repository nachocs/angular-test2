import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { initPhotos } from '../../+state/photos.actions';
import { PhotosEntity } from '../../+state/photos.models';
import { selectAllPhotos } from '../../+state/photos.selectors';
import { LoadPhotosService } from '../../services/load-photos.service';
import { PhotoComponent } from '../photo/photo.component';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    NgFor,
    PhotoComponent,
    MatPaginatorModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
})
export class PhotosComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  photos: PhotosEntity[] = [];
  photosShown: PhotosEntity[] = [];
  submitForm!: FormGroup;

  constructor(
    private store: Store<PhotosEntity[]>,
    private service: LoadPhotosService
  ) {}
  ngOnInit() {
    this.submitForm = new FormGroup({
      message: new FormControl(''),
    });
    this.store.dispatch(initPhotos());
    this.subscription.add(
      this.store
        .pipe(select(selectAllPhotos))
        .subscribe((data: PhotosEntity[]) => {
          this.photos = data;
        })
    );
  }
  onSubmit() {
    console.log(this.submitForm.value);
    this.service.postMessage(this.submitForm.value.message).subscribe((res) => {
      console.log('res', res);
      this.submitForm.reset();
      this.store.dispatch(initPhotos());
    });
  }
}
