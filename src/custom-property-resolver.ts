export function customPropertyResolver(content: string): string {
  let match, cur, start, end;
  const REGEX = /(\;|\{|\s)\-\-.+\:(.*)/g;

  while(match = REGEX.exec(content)){
    start = cur = match.index;
    while (cur < content.length && ![';', '{', '}'].includes(content[cur])) cur++;
    end = cur;

    content = content.slice(0, start) 
    + content.substring(start, end).replace(/(?!#{)(hvar\(.*\))(?!})/g, "#{$1}")
    + content.slice(end);
  }

  return content;
}