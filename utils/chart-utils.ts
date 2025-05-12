import { Page, Locator } from '@playwright/test';

export async function getTooltipValueOnHover(page: Page, barSelector: string): Promise<{
  label: string;
  value: number;
}> {
  const bar: Locator = page.locator(`${barSelector} path`);
  await bar.hover();

  const labelLocator = page.locator('.recharts-tooltip-item-name');
  const valueLocator = page.locator('.recharts-tooltip-item-value');

  await labelLocator.waitFor({ state: 'visible', timeout: 3000 });

  const label = (await labelLocator.textContent())?.trim() || '';
  const valueText = (await valueLocator.textContent())?.trim() || '';
  const value = parseFloat(valueText);

  console.log(`🟢 Hovered Label: ${label}, Value: ${value}`);

  return { label, value };
}
