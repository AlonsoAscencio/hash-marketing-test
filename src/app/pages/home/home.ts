import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrawerResponsive } from '../../shared/drawer-responsive/drawer-responsive';
import { isPlatformBrowser } from '@angular/common';
import { Header } from '../../shared/header/header';
import { CAMPAIGNS } from '../../config/constants/campaigns';
import { Menu } from '../../shared/menu/menu';
import { CampaignList } from './components/campaign-list/campaign-list';
import { Campaign } from '../../domain/models/campaign-view';
import { CampaignFilters } from '../../shared/campaign-filters/campaign-filters';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CampaignDetailModal } from '../../shared/campaign-detail-modal/campaign-detail-modal';

@Component({
  selector: 'app-home',
  imports: [
    NzButtonModule,
    DrawerResponsive,
    Header,
    Menu,
    CampaignList,
    CampaignFilters,
    NzSpinModule,
  ],
  templateUrl: './home.html',

  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  //injects
  private platformId = inject(PLATFORM_ID);
  private modal = inject(NzModalService);
  //signals
  public loading = signal(true);
  public campaigns = signal(CAMPAIGNS);
  public drawerVisible = signal(false);
  public isMobile = signal(false);
  public selectedCampaign = signal<Campaign | null>(null);
  public search = signal('');
  public platformFilter = signal<string | null>(null);
  public statusFilter = signal<string | null>(null);
  //computed signals
  public menuSections = computed(() => {
    const campaigns = this.campaigns();

    const platformCounts = campaigns.reduce(
      (acc, campaign) => {
        acc[campaign.platform] = (acc[campaign.platform] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );

    const statusCounts = campaigns.reduce(
      (acc, campaign) => {
        acc[campaign.status] = (acc[campaign.status] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );

    return [
      {
        title: 'Plataformas',

        items: Object.entries(platformCounts).map(([label, count]) => ({
          label,
          count,
        })),
      },

      {
        title: 'Estado',

        items: Object.entries(statusCounts).map(([label, count]) => ({
          label,
          count,
        })),
      },
    ];
  });

  public filteredCampaigns = computed(() => {
    const search = this.search()?.trim().toLowerCase();

    const platform = this.platformFilter();

    const status = this.statusFilter();

    return this.campaigns().filter((campaign) => {
      const matchSearch =
        !search ||
        campaign.name.toLowerCase().includes(search) ||
        campaign.client.toLowerCase().includes(search) ||
        campaign.platform.toLowerCase().includes(search);

      const matchPlatform = !platform || campaign.platform === platform;

      const matchStatus = !status || campaign.status === status;

      return matchSearch && matchPlatform && matchStatus;
    });
  });

  constructor() {
    setTimeout(() => {
      this.loading.set(false);
    }, 800);
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreen();
    }
  }

  // listeners
  @HostListener('window:resize')
  onResize() {
    this.checkScreen();
  }
  //methods
  toggleDrawer() {
    this.drawerVisible.update((v) => !v);
  }

  private checkScreen() {
    this.isMobile.set(window.innerWidth < 768);
  }

  updateFilters(filters: { search: string; platform: string | null; status: string | null }) {
    this.search.set(filters.search);

    this.platformFilter.set(filters.platform);

    this.statusFilter.set(filters.status);
  }

  applyMenuFilter(event: { type: string; value: string }) {
    if (event.type === 'Plataformas') {
      this.platformFilter.set(event.value);
    }

    if (event.type === 'Estado') {
      this.statusFilter.set(event.value);
    }

    if (this.isMobile()) {
      this.drawerVisible.set(false);
    }
  }

  public openCampaignDetails(campaign: Campaign) {
    this.modal.create({
      nzContent: CampaignDetailModal,
      nzData: {
        campaign,
      },
      nzFooter: null,
      nzWidth: '900px',
      nzCentered: true,
      nzClassName: 'campaign-detail-modal',
    });
  }
}
