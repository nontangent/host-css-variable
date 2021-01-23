import loader from './loader';

export async function testLoader(...args: any[]): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      loader.call({
        callback: (_, src, map) => resolve(src)
      }, ...args);
    } catch (error) {
      resolve(error);
    }
  });
}

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

    const res = await testLoader(content, null);
    expect(res).toBe(answer);
  });

  it('Host CSS Variable in Calc Function', async () => {
    const content = `:host {
      --test1: calc(hvar(--test1) * 2);
    }`;

    const answer = `:host {
      --test1: calc(#{hvar(--test1)} * 2);
    }`;

    const res = await testLoader(content, null);
    expect(res).toBe(answer);
  });
});