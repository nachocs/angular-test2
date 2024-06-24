import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { SidenavComponent } from './components/sidenav/sidenav';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, PhotosComponent, SidenavComponent],
})
export class AppComponent {
  title = 'angular-test';
}
