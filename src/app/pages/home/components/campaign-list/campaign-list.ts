import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Campaign } from '../../../../domain/models/campaign-view';
import { CampaignCard } from '../campaign-card/campaign-card';

@Component({
  selector: 'app-campaign-list',
  imports: [CampaignCard],
  templateUrl: './campaign-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignList {
  // inputs and outputs
  campaigns = input.required<Campaign[]>();
  campaignSelected = output<Campaign>();
}
