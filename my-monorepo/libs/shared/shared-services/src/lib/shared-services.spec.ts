import { sharedServices } from './shared-services.js';

describe('sharedServices', () => {
  it('should work', () => {
    expect(sharedServices()).toEqual('shared-services');
  });
});
