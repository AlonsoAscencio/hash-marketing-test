import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { updateThemeMeta } from '../../../utilities/update-theme-meta';

interface IThemeStore {
  isDarkMode: boolean;
}

const initialState: IThemeStore = {
  isDarkMode: matchMedia('(prefers-color-scheme: dark)').matches,
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorageSync('theme-store'),
  withMethods((store, metaService = inject(Meta)) => ({
    updateIsDarkmode: (isDarkMode: boolean) => {
      if (
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function'
      ) {
        const prefersDarkMode = window.matchMedia(
          '(prefers-color-scheme: dark)',
        );

        const mediaQueryListener = (event: MediaQueryListEvent) => {
          patchState(store, { isDarkMode: event.matches });
        };

        prefersDarkMode.addEventListener('change', mediaQueryListener);
      }
      updateThemeMeta(metaService, isDarkMode ? 'dark' : 'light');
      patchState(store, { isDarkMode });
    },
  })),
);
