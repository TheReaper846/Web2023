import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent {
  @Input() full: boolean = true;
  @Input() read: boolean = true;
  @Input() toRead: boolean = true;
  @Input() reading: boolean = true;
}
