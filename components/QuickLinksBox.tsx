import React, { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
}


export default function QuickLinksBox(){
  return(
    <div className="container border-0 shadow-md ml-2 mt-8 mr-9 w-[335px] rounded-[16px] relative" style={{ boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 1)' }}>
      <div className="container bg-QUICKLINKS p-1 border-3 flex items-center rounded-t-[16px]">
        <div className="text-boxhead ml-3 mt-1.5 h-51 text-WHITE font-display bg-QUICKLINKS text-align">Quick Links</div>
      </div>

    {/* Bottom part with different color */}
    <div className="bg-WHITE p-4 rounded-b-[16px] border-3 border-t-0" >
      <h2 className="font-lato text-base bg-WHITE">Text Here</h2>
  </div>
  </div>
  );
}