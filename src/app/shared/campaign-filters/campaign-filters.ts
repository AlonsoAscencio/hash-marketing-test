import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapTrash3 } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-campaign-filters',
  imports: [FormsModule, NzInputModule, NzSelectModule, NzButtonModule, NgIcon],
  viewProviders: [
    provideIcons({
      bootstrapTrash3,
    }),
  ],
  templateUrl: './campaign-filters.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignFilters {
  private debounceTimer?: ReturnType<typeof setTimeout>;
  //input
  public search = input<string>('');
  public platform = input<string | null>(null);
  public status = input<string | null>(null);
  //output
  public filtersChanged = output<{
    search: string;
    platform: string | null;
    status: string | null;
  }>();

  //methods
  public onSearch(value: string) {
    clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.filtersChanged.emit({
        search: value,
        platform: this.platform(),
        status: this.status(),
      });
    }, 300);
  }

  public emitChanges() {
    this.filtersChanged.emit({
      search: this.search(),
      platform: this.platform(),
      status: this.status(),
    });
  }

  public clearFilters() {
    this.filtersChanged.emit({
      search: '',
      platform: null,
      status: null,
    });
  }
}
