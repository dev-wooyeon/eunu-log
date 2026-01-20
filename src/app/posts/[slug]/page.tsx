import { getPostData, getAllPostSlugs, parseHeadingsFromHtml } from '@/lib/posts';
import TableOfContents from '@/components/TableOfContents';
import styles from './post.module.css';

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs;
}

export default async function Post({ params }: { params: { slug: string } }) {
    const postData = await getPostData(params.slug);
    const tocItems = parseHeadingsFromHtml(postData.contentHtml);

    return (
        <>
            <article className={styles.article}>
                <header className={styles.header}>
                    <div className={styles.category}>{postData.category}</div>
                    <h1 className={styles.title}>{postData.title}</h1>
                    <div className={styles.meta}>
                        <time>{postData.date}</time>
                        {postData.tags && (
                            <div className={styles.tags}>
                                {postData.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </header>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                />
            </article>
            <TableOfContents tocItems={tocItems} />
        </>
    );
}
