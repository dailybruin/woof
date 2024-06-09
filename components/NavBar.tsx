import Link from 'next/link';

export default function NavBar() {
  const navItems = [
    'All',
    'News',
    'Opinion',
    'Arts',
    'Sports',
    'Misc.',
    'Troubleshooting',
  ];
  return (
    <div className="nav">
      {navItems.map((item) => (
        <div key={item} className="nav-component">
          <Link href="/" className="nav-link">
            {item}
          </Link>
        </div>
      ))}
    </div>
  );
}
