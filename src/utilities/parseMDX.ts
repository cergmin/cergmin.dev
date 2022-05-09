import { serialize as MDXSerialize } from 'next-mdx-remote/serialize';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkTypograf from '@mavrin/remark-typograf';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';

export interface Heading {
  title: string;
  slug: string;
  level: number;
}

function rehypeHeadings(headings: Heading[]) {
  const headingTags = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  };

  function dfs(node): string {
    if (node.type === 'text') {
      return node.value;
    }

    if (node.type === 'element' && headingTags.hasOwnProperty(node.tagName)) {
      headings.push({
        title: dfs(node.children[0]),
        slug: node.properties?.id || '',
        level: headingTags[node.tagName],
      });
    }
  }

  return (rootNode) => rootNode.children.forEach(dfs);
}

export async function parseMDX(mdxString: string) {
  const headings = [];
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
      rehypePlugins: [
        [rehypeKatex, { fleqn: true }],
        rehypeSlug,
        [rehypeHeadings, headings],
      ],
    },
  });

  return { source, headings };
}
