import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-count-up',
  imports: [],
  template: `
    <span>
      {{ prefix() }}
      {{ current().toFixed(decimals()) }}
      {{ suffix() }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountUp {
  value = input.required<number>();

  duration = input(1200);

  decimals = input(0);

  suffix = input('');

  prefix = input('');

  current = signal(0);

  constructor() {
    effect(() => {
      this.animate();
    });
  }

  private animate() {
    const start = 0;
    const end = this.value();

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / this.duration(), 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      const value = start + (end - start) * eased;

      this.current.set(value);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}
