import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { Campaign } from '../../../../domain/models/campaign-view';
import { CurrencyPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import {
  bootstrapAmazon,
  bootstrapGoogle,
  bootstrapMegaphone,
  bootstrapMeta,
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-campaign-card',
  imports: [NzProgressModule, CurrencyPipe, NgIcon, NzTooltipModule],
  viewProviders: [
    provideIcons({
      bootstrapGoogle,
      bootstrapMeta,
      bootstrapAmazon,
      bootstrapMegaphone,
    }),
  ],
  templateUrl: './campaign-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignCard {
  //signals
  public hPlatform = signal<string>('Indica la plataforma de publicidad donde se está ejecutando la campaña, como Google Ads, Meta Ads o Amazon Ads.');
  public hPlace = signal<string>('Indica la ubicación geográfica donde se está ejecutando la campaña.');
  public hCTR = signal<string>('CTR (Click Through Rate): porcentaje de personas que hicieron clic después de ver el anuncio');
  public hRoas = signal<string>('ROAS (Return on Ad Spend): mide cuánto ingreso genera la campaña por cada unidad invertida.');
  public hSpent = signal<string>('Monto total gastado en la campaña hasta el momento.');
  public hBudget = signal<string>('Presupuesto total asignado para la campaña.');

  // inputs and outputs
  public campaign = input.required<Campaign>();
  public selected = output<Campaign>();

  // methods
  openDetails() {
    this.selected.emit(this.campaign());
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'Activa':
        return 'bg-success/20 text-success';

      case 'Pausada':
        return 'bg-warning/20 text-warning';

      default:
        return 'bg-danger/20 text-danger';
    }
  }

  getIcon(platform: string) {
    switch (platform) {
      case 'Google Ads':
        return 'bootstrapGoogle';

      case 'Meta Ads':
        return 'bootstrapMeta';

      case 'Amazon Ads':
        return 'bootstrapAmazon';

      default:
        return 'bootstrapMegaphone';
    }
  }
}
