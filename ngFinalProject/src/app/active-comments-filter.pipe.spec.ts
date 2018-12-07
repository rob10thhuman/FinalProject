import { ActiveCommentsFilterPipe } from './active-comments-filter.pipe';

describe('ActiveCommentsFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ActiveCommentsFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
