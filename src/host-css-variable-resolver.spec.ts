import { hostCssVariableResolver } from './host-css-variable-resolver';

describe('Host CSS Variable Loader Tests', () => {
  it('Host CSS Variable in custom property', async () => {
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

    const res = hostCssVariableResolver(content);
    expect(res).toBe(answer);
  });

  it('Host CSS Variable in Calc Function', async () => {
    const content = `:host {
      --test1: calc(hvar(--test1) * 2);
    }`;

    const answer = `:host {
      --test1: calc(#{hvar(--test1)} * 2);
    }`;

    const res = hostCssVariableResolver(content);
    expect(res).toBe(answer);
  });
});