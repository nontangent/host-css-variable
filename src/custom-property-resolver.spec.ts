import { customPropertyResolver } from './custom-property-resolver';

describe('', () => {
  it('', async () => {
    const content = `:host {
      --test1: hvar(--test1);
      --test2: hvar(--test2);
      --test3: #{hvar(--test3)};
    }`;

    const answer = `:host {
      --test1: #{hvar(--test1)};
      --test2: #{hvar(--test2)};
      --test3: #{hvar(--test3)};
    }`;

    const res = customPropertyResolver(content);
    expect(res).toBe(answer);
  });
});