import { HiringStatusPipe } from './hiring-status.pipe';

describe('HiringStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new HiringStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
