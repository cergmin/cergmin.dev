import { serialize as MDXSerialize } from 'next-mdx-remote/serialize';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkTypograf from '@mavrin/remark-typograf';

export async function parseMDX(mdxString: string) {
  const source = await MDXSerialize(mdxString, {
    mdxOptions: {
      // ts-ignore reasons:
      // https://github.com/hashicorp/next-mdx-remote/issues/86
      remarkPlugins: [
        // @ts-ignore
        remarkParse,
        // @ts-ignore
        remarkMath,
        [remarkTypograf, { locale: ['ru', 'en-US'] }],
      ],
      // @ts-ignore
      rehypePlugins: [[rehypeKatex, { fleqn: true }]],
    },
  });

  return { source };
}
