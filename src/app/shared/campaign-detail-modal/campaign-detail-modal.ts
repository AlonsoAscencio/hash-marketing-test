import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Campaign } from '../../domain/models/campaign-view';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-campaign-detail-modal',
  imports: [
    CurrencyPipe,
    NzModalModule,
    NzTagModule,
    NzStatisticModule,
    NzProgressModule,
    BaseChartDirective,
    NzTooltipModule,
    DecimalPipe,
  ],
  styles: `
    ::ng-deep .ant-modal-content {
      background-color: var(--color-bg-secondary) !important;
    }
    ::ng-deep .dark .ant-modal-content {
      background-color: var(--color-dark-bg-secondary) !important;
    }
  `,
  templateUrl: './campaign-detail-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailModal {
  //injects
  public campaign: Campaign = inject(NZ_MODAL_DATA).campaign;
  //vars
  public budgetUsed = Math.round((this.campaign.spent / this.campaign.budget) * 100);
  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: this.campaign.history.map((item) => item.date),
    datasets: [
      {
        label: 'Conversiones',
        data: this.campaign.history.map((item) => item.conversions),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.18)',
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#ffffff',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#94a3b8',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#020617',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
      },
    },
  };
  public descriptions = {
    impressions: 'Número total de veces que se mostró el anuncio.',
    clicks: 'Cantidad de clics recibidos por la campaña.',
    conversions: 'Acciones valiosas logradas, como compras, registros o leads.',
    roas: 'Retorno sobre la inversión publicitaria. Indica cuánto ingresa por cada peso invertido.',
    ctr: 'Porcentaje de personas que hicieron clic después de ver el anuncio.',
    cpc: 'Costo promedio por cada clic recibido.',
    cpm: 'Costo por cada mil impresiones.',
    cpa: 'Costo promedio por cada conversión conseguida.',
    conversionRate: 'Porcentaje de clics que terminaron en una conversión.',
    budget: 'Porcentaje del presupuesto total que ya fue utilizado.',
  };

  public getStatusLabel(status: Campaign['status']) {
    const labels = {
      Activa: 'Activa',
      Pausada: 'Pausada',
      Finalizada: 'Finalizada',
    };

    return labels[status];
  }

  public getStatusColor(status: Campaign['status']) {
    const colors = {
      Activa: 'green',
      Pausada: 'orange',
      Finalizada: 'red',
    };

    return colors[status];
  }
}
