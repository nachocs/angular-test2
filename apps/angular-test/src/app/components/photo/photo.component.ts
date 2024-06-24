import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PhotosEntity } from '../../+state/photos.models';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
})
export class PhotoComponent {
  @Input() photo: PhotosEntity = {} as PhotosEntity;
}
