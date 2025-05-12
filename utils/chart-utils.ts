import { Page, Locator } from '@playwright/test';
import { selfHealingLocator } from './selfHeal'; // Adjust the path if needed

export async function getTooltipValueOnHover(
  page: Page,
  barSelector: string
): Promise<{ label: string; value: number }> {
  // Use self-healing locator for the bar
  const barPathLocator = await selfHealingLocator(
    page,
    `${barSelector} path`,
    'Chart bar element to hover'
  ) as Locator

  await barPathLocator.hover();

  // Use self-healing for label and value tooltip
  const labelLocator = await selfHealingLocator(
    page,
    '.recharts-tooltip-item-name',
    'Tooltip label showing chart category'
  ) as Locator

  const valueLocator = await selfHealingLocator(
    page,
    '.recharts-tooltip-item-value',
    'Tooltip value showing chart number'
  ) as Locator

  await labelLocator.waitFor({ state: 'visible', timeout: 3000 });

  const label = (await labelLocator.textContent())?.trim() || '';
  const valueText = (await valueLocator.textContent())?.trim() || '';
  const value = parseFloat(valueText);

  console.log(`🟢 Hovered Label: ${label}, Value: ${value}`);

  return { label, value };
}
