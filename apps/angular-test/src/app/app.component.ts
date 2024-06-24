import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotosComponent } from './components/photos/photos.component';
import { SidenavComponent } from './components/sidenav/sidenav';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LoadPhotosService } from './services/load-photos.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    NxWelcomeComponent,
    RouterModule,
    PhotosComponent,
    SidenavComponent,
  ],
})
export class AppComponent {
  title = 'angular-test';
  loadPhotosService = inject(LoadPhotosService);
}
