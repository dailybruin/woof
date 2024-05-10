import React, { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
}


export default function Box(){
  return(

    
    <div className="container border-0 shadow-md ml-9 mt-8 w-[991px] rounded-[16px] relative" style={{ boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 1)' }}>
      {/* Top header section*/}
      <div className="container bg-QUICKLINKS p-1 border-3 flex items-center rounded-t-[16px]">
        <div className="text-boxhead ml-3 mt-1.5 text-WHITE font-display bg-QUICKLINKS text-align">Header Here</div>
    </div>

    {/* Bottom text section*/}
    <div className="bg-WHITE p-4 rounded-b-[16px] border-3 border-t-0" >
      <div className="flex items-center bg-WHITE text-bold">
        <img src="/Push_pin.png" alt="Pinned Icon" className="mr-2 h-4 w-auto"/>
        <div className="text-lg text-bold mt-1.5 font-display bg-WHITE text-align">Pinned</div>
          {/*pinned links and text goes here, make sure its bolded*/}
      </div>
      <h2 className="font-lato text-base bg-WHITE">Text Here</h2>
    </div>
    </div>
  );
}
