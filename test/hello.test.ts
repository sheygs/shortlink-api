import { sayHello } from '../src/utils';

describe('Say Hello', () => {
  it('should return "Hello JavaScript"', () => {
    const result = sayHello('JavaScript');
    expect(result).toEqual('Hello JavaScript');
  });

  it('should return "Hello TypeScript"', () => {
    const result = sayHello();
    expect(result).toEqual('Hello TypeScript');
  });
});
