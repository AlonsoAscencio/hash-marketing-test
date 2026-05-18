import { Component, inject, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ThemeStore } from './states/stores/theme/theme.store';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  //injects
  private _themeStore = inject(ThemeStore);
  private _renderer = inject(Renderer2);
  private _overlayContainer = inject(OverlayContainer);
  //signals
  protected readonly title = signal('hashDashboard');

  constructor() {
    toObservable(this._themeStore.isDarkMode)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (isDarkMode) => this._updateThemeClases(isDarkMode),
      });
  }
  //methods
  private _updateThemeClases(isDarkMode: boolean) {
    const newThemeClass = isDarkMode ? 'dark' : 'light';
    const oldThemeClass = isDarkMode ? 'light' : 'dark';

    this._renderer.removeClass(document.body, oldThemeClass);
    this._renderer.addClass(document.body, newThemeClass);
    const overlayContainerClasses = this._overlayContainer.getContainerElement();
    this._renderer.removeClass(overlayContainerClasses, oldThemeClass);
    this._renderer.addClass(overlayContainerClasses, newThemeClass);
  }
}
