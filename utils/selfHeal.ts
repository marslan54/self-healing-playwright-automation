import { Page } from '@playwright/test';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Main function: try original selector, fallback to Groq suggestion
export async function selfHealingLocator(
  page: Page,
  selector: string,
  description = '',
  maxRetries = 2
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const locator = page.locator(selector);
      await locator.waitFor({ state: 'visible', timeout: 3000 });
      console.log(`[✅ Selector OK] ${selector}`);
      return locator;
    } catch (err) {
      console.warn(`[⚠️ Attempt ${attempt}] Failed: ${selector}`);
      if (attempt < maxRetries) {
        const newSelector = await getSelectorFromGroq(selector, description);
        if (newSelector !== selector) {
          console.log(`[🤖 Groq Suggestion] Switching to: ${newSelector}`);
          selector = newSelector;
        } else {
          console.warn(`[🛑 Groq returned no alternative for: ${selector}]`);
        }
      } else {
        throw new Error(`❌ All ${maxRetries} attempts failed for selector: ${selector}`);
      }
    }
  }
}

async function getSelectorFromGroq(originalSelector: string, description: string): Promise<string> {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'mixtral-8x7b-32768', // or llama3-8b
        messages: [
          {
            role: 'system',
            content: 'You are a Playwright testing assistant that helps fix broken selectors.'
          },
          {
            role: 'user',
            content: `The following selector is failing in a Playwright test:\n\nSelector: "${originalSelector}"\nDescription: ${description}\n\nSuggest a new working Playwright selector for this UI element. Only return the valid selector as a string.`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const suggestion = response.data.choices?.[0]?.message?.content?.trim();
    return suggestion || originalSelector;
  } catch (error: unknown) {
    const err = error as Error;
    console.error('[❌ Groq API Failed]', err.message);
    return originalSelector;
  }
}
