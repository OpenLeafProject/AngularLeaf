import { AgePipe } from './age.pipe';

describe('Age', () => {
  it('create an instance', () => {
    const pipe = new AgePipe();
    expect(pipe).toBeTruthy();
  });
});
