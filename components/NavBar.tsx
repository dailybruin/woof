import Link from 'next/link';
import { useState, SetStateAction, Dispatch } from 'react';


interface NavBarProps {
    selectedItem: string;
    setSelectedItem: Dispatch<SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ selectedItem, setSelectedItem }) => {
    const navItems = ['All', 'News', 'Opinion', 'Arts', 'Sports', 'Misc', 'Troubleshooting'];
    

    return (
        <div className="nav">
            {navItems.map((item) => (
                <div key={item}  className={`nav-component ${item} ${item === selectedItem ? 'selected' : ''}`}>
                    {/* <Link href={`/newpages/${item}`} className='nav-link' onClick={() => setSelectedItem(item)}>{item}</Link> */}
                    <Link href={`/`} className='nav-link' onClick={() => setSelectedItem(item)}>{item}</Link>
                </div>
            ))}
        </div>
    );
}

export default NavBar;

// export default function NavBar({ selectedItem, setSelectedItem }) {
//     const navItems = ['All', 'News', 'Opinion', 'Arts', 'Sports', 'Misc.', 'Troubleshooting'];
//     const [selectedItem, setSelectedItem] = useState('');

//     return (
//         <div className="nav">
//             {navItems.map((item) => (
//                 <div key={item} className='nav-component'>
//                     <Link href="/" className='nav-link' onClick={() => setSelectedItem(item)}>{item}</Link>
//                 </div>
//             ))}
//         </div>
//     );
//     }