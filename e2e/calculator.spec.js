import { test, expect } from '@playwright/test';

const CALCULATOR_URL = '/calculator.html';

async function openCalculator(page) {
  await page.goto(CALCULATOR_URL);
  await expect(page.locator('#display')).toHaveText('0');
}

async function clickButton(page, name) {
  await page.getByRole('button', { name, exact: true }).click();
}

async function expectDisplay(page, value) {
  await expect(page.locator('#display')).toHaveText(value);
}

test.describe('Калькулятор — E2E', () => {
  test.beforeEach(async ({ page }) => {
    await openCalculator(page);
  });

  test.describe('ввод чисел', () => {
    test('отображает начальное значение 0', async ({ page }) => {
      await expectDisplay(page, '0');
    });

    test('вводит одну цифру', async ({ page }) => {
      await clickButton(page, '5');
      await expectDisplay(page, '5');
    });

    test('вводит многоцифровое число', async ({ page }) => {
      await clickButton(page, '1');
      await clickButton(page, '2');
      await clickButton(page, '3');
      await expectDisplay(page, '123');
    });

    test('вводит десятичное число', async ({ page }) => {
      await clickButton(page, '3');
      await clickButton(page, '.');
      await clickButton(page, '1');
      await clickButton(page, '4');
      await expectDisplay(page, '3.14');
    });

    test('кнопка C сбрасывает ввод', async ({ page }) => {
      await clickButton(page, '9');
      await clickButton(page, '9');
      await clickButton(page, 'C');
      await expectDisplay(page, '0');
    });

    test('кнопка ⌫ удаляет последний символ', async ({ page }) => {
      await clickButton(page, '1');
      await clickButton(page, '2');
      await clickButton(page, '3');
      await clickButton(page, '⌫');
      await expectDisplay(page, '12');
    });
  });

  test.describe('операции и результат', () => {
    test('сложение: 2 + 3 = 5', async ({ page }) => {
      await clickButton(page, '2');
      await clickButton(page, '+');
      await clickButton(page, '3');
      await clickButton(page, '=');
      await expectDisplay(page, '5');
    });

    test('вычитание: 10 - 4 = 6', async ({ page }) => {
      await clickButton(page, '1');
      await clickButton(page, '0');
      await clickButton(page, '-');
      await clickButton(page, '4');
      await clickButton(page, '=');
      await expectDisplay(page, '6');
    });

    test('умножение: 6 × 7 = 42', async ({ page }) => {
      await clickButton(page, '6');
      await clickButton(page, '×');
      await clickButton(page, '7');
      await clickButton(page, '=');
      await expectDisplay(page, '42');
    });

    test('деление: 15 / 3 = 5', async ({ page }) => {
      await clickButton(page, '1');
      await clickButton(page, '5');
      await clickButton(page, '/');
      await clickButton(page, '3');
      await clickButton(page, '=');
      await expectDisplay(page, '5');
    });

    test('показывает промежуточное выражение при вводе', async ({ page }) => {
      await clickButton(page, '8');
      await clickButton(page, '+');
      await clickButton(page, '2');
      await expectDisplay(page, '8+2');
    });

    test('после результата новый ввод начинает с чистого числа', async ({ page }) => {
      await clickButton(page, '2');
      await clickButton(page, '+');
      await clickButton(page, '2');
      await clickButton(page, '=');
      await expectDisplay(page, '4');

      await clickButton(page, '7');
      await expectDisplay(page, '7');
    });

    test('деление на ноль показывает «Ошибка»', async ({ page }) => {
      await clickButton(page, '5');
      await clickButton(page, '/');
      await clickButton(page, '0');
      await clickButton(page, '=');
      await expectDisplay(page, 'Ошибка');
    });
  });
});
