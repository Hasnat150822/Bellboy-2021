import { DeviceCodePipe } from './device-code.pipe';

describe('DeviceCodePipe', () => {
  it('create an instance', () => {
    const pipe = new DeviceCodePipe();
    expect(pipe).toBeTruthy();
  });
});
