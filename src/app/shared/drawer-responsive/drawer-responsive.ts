import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-drawer-responsive',
  imports: [NzDrawerModule],
  templateUrl: './drawer-responsive.html',
  styles: `
    ::ng-deep .ant-drawer-content {
      background-color: var(--color-bg-primary) !important;
    }
    ::ng-deep .dark .ant-drawer-content {
      background-color: var(--color-dark-bg-primary) !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerResponsive {
  public visible = input<boolean>(false);
  public title = input<string>('');
  public width = input<number>(320);
  public placement = input<'left' | 'right' | 'top' | 'bottom'>('left');
  public closed = output<void>();

  public onClose(): void {
    this.closed.emit();
  }
}
