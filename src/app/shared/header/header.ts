import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapList } from '@ng-icons/bootstrap-icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ThemeStore } from '../../states/stores/theme/theme.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [NzButtonModule, NzIconModule, NzSwitchModule, NgIcon, FormsModule],
  viewProviders: [
    provideIcons({
      bootstrapList,
    }),
  ],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  //injects
  private _themeStore = inject(ThemeStore);
  //computed signals
  public isDarkMode = computed(() => this._themeStore.isDarkMode());
  //inputs and outputs
  public isMobile = input(false);
  public menuClicked = output<void>();
  //methods
  public toggleTheme(): void {
    this._themeStore.updateIsDarkmode(!this._themeStore.isDarkMode());
  }
}
