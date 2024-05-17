
import Link from 'next/link';
// import '../css/body.css';

export default function ChangeArticle() {
    return (
        
        <div className="edit-article">
            <div className="edit-heading">Need to edit or create an article?</div>
            {/* <Link href="/">Home</Link> */}
            <Link href="/new" className="edit-link">Click Here</Link>
      </div>
    );
}