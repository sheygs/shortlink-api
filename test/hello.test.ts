import { sayHello } from '../src/helpers/utils';

describe('Say Hello', () => {
  it('should return "Hello JavaScript"', () => {
    const result = sayHello('JavaScript');
    expect(result).toEqual('Hello JavaScript');
  });

  it('should return "Hello TypeScript" with no parameter passed', () => {
    const result = sayHello();
    expect(result).toEqual('Hello TypeScript');
  });
});
