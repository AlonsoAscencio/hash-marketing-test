import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MenuSection } from '../../domain/models/menu-section';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Menu {
  //inputs and outputs
  public title = input('Ads Manager');
  public sections = input<MenuSection[]>([]);
  public filterSelected = output<{
    type: string;
    value: string;
  }>();

  public onItemClick(sectionTitle: string, item: string) {
    this.filterSelected.emit({
      type: sectionTitle,
      value: item,
    });
  }
}
