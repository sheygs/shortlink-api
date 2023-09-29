import { generateUUID } from '../src/helpers/utils';

describe('Generate valid UUID', () => {
  it('should generate a UUID string', () => {
    const result = generateUUID();
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
  });
});
