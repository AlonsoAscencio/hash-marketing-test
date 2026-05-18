import { Meta } from '@angular/platform-browser';

export const updateThemeMeta = (metaService: Meta, theme: string) => {
  const selector = 'name="theme-color"';
  const themeMetaTag = metaService.getTag(selector);
  if (themeMetaTag) {
    if (themeMetaTag.content !== theme) {
      metaService.updateTag({ content: theme }, selector);
    }
  } else {
    metaService.addTag({ name: 'theme-color', content: theme });
  }
};
