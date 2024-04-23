
import Link from 'next/link';

export default function ChangeArticle() {
    return (
        
        <div className="lower-header">
            <div>Need to edit or create an article?</div>
            <Link href="/">Home</Link>
            <Link href="/new">Add Article</Link>
      </div>
    );
}