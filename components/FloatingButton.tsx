// components/FloatingButton.tsx
import React from 'react';
import Link from 'next/link';

const FloatingButton = () => (
    <div className="floating-button">
        Need to edit or create an article? <Link href="/login">Click here</Link>
    </div>
);

export default FloatingButton;
