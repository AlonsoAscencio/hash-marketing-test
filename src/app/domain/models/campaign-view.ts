import { Details } from "./details-view";
import { History } from "./history-view";
import { Metrics } from "./metrics-view";

export interface Campaign {
  id: string;
  name: string;
  place: string;
  platform: 'Google Ads' | 'Meta Ads' | 'Amazon Ads';
  client: string;
  status: 'Activa' | 'Pausada' | 'Finalizada';
  objective: string;
  budget: number;
  spent: number;
  metrics: Metrics;
  details: Details;
  history: History[];
}
