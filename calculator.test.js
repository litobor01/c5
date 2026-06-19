import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from './calculator.js';

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  describe('add', () => {
    it('складывает два положительных числа', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    it('складывает отрицательные числа', () => {
      expect(calc.add(-4, -6)).toBe(-10);
    });

    it('складывает числа с плавающей точкой', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('складывает ноль с числом', () => {
      expect(calc.add(0, 7)).toBe(7);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calc.add('2', 3)).toThrow(TypeError);
      expect(() => calc.add(2, null)).toThrow('Аргументы должны быть числами');
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calc.add(NaN, 1)).toThrow('Аргументы не должны быть NaN');
      expect(() => calc.add(1, NaN)).toThrow(TypeError);
    });
  });

  describe('subtract', () => {
    it('вычитает два положительных числа', () => {
      expect(calc.subtract(10, 4)).toBe(6);
    });

    it('вычитает отрицательное число (эквивалент сложения)', () => {
      expect(calc.subtract(5, -3)).toBe(8);
    });

    it('возвращает отрицательный результат', () => {
      expect(calc.subtract(3, 8)).toBe(-5);
    });

    it('вычитает числа с плавающей точкой', () => {
      expect(calc.subtract(1.5, 0.5)).toBeCloseTo(1);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calc.subtract(undefined, 5)).toThrow(TypeError);
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calc.subtract(NaN, 5)).toThrow('Аргументы не должны быть NaN');
    });
  });

  describe('multiply', () => {
    it('умножает два положительных числа', () => {
      expect(calc.multiply(4, 5)).toBe(20);
    });

    it('умножает отрицательные числа', () => {
      expect(calc.multiply(-3, -4)).toBe(12);
    });

    it('умножает положительное и отрицательное число', () => {
      expect(calc.multiply(6, -2)).toBe(-12);
    });

    it('умножает на ноль', () => {
      expect(calc.multiply(100, 0)).toBe(0);
    });

    it('умножает числа с плавающей точкой', () => {
      expect(calc.multiply(0.2, 0.3)).toBeCloseTo(0.06);
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calc.multiply('4', 5)).toThrow('Аргументы должны быть числами');
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calc.multiply(4, NaN)).toThrow(TypeError);
    });
  });

  describe('divide', () => {
    it('делит два положительных числа', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    it('делит с результатом с плавающей точкой', () => {
      expect(calc.divide(7, 2)).toBe(3.5);
    });

    it('делит отрицательное на положительное', () => {
      expect(calc.divide(-8, 4)).toBe(-2);
    });

    it('делит отрицательное на отрицательное', () => {
      expect(calc.divide(-9, -3)).toBe(3);
    });

    it('делит ноль на число', () => {
      expect(calc.divide(0, 5)).toBe(0);
    });

    it('выбрасывает Error при делении на ноль', () => {
      expect(() => calc.divide(10, 0)).toThrow('Деление на ноль');
    });

    it('выбрасывает Error при делении на ноль (отрицательное число)', () => {
      expect(() => calc.divide(-5, 0)).toThrow(Error);
      expect(() => calc.divide(-5, 0)).toThrow('Деление на ноль');
    });

    it('выбрасывает TypeError для нечисловых аргументов', () => {
      expect(() => calc.divide(10, '2')).toThrow(TypeError);
    });

    it('выбрасывает TypeError для NaN', () => {
      expect(() => calc.divide(NaN, 2)).toThrow('Аргументы не должны быть NaN');
    });
  });
});
