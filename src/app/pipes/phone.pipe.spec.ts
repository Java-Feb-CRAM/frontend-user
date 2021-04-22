import { PhonePipe } from './phone.pipe';

describe('PhonePipe', () => {
  const pipe = new PhonePipe();

  it('removes ( and )', () => {
    expect(pipe.transform('(281)')).toBe('281');
  });

  it('removes dashes', () => {
    expect(pipe.transform('2-8-1')).toBe('281');
  });

  it('removes spaces', () => {
    expect(pipe.transform('2 8 1')).toBe('281');
  });

  it('adds dash after area code', () => {
    expect(pipe.transform('2812')).toBe('281-2');
  });

  it('adds dash after middle part of phone number', () => {
    expect(pipe.transform('2812921')).toBe('281-292-1');
  });

  it('removes extraneous numbers', () => {
    expect(pipe.transform('281292145199999999999')).toBe('281-292-1451');
  });

  it('preserves properly formatted numbers', () => {
    expect(pipe.transform('281-292-1451')).toBe('281-292-1451');
  });
});
