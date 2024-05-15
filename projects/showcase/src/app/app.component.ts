import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SystelabVirtualKeyboardDirectiveModule } from 'systelab-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SystelabVirtualKeyboardDirectiveModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'showcase';
}
