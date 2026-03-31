"use client";

import Image from "next/image"

export default function Dado({ valor }) {
    function handleClick(evt){
    }

    return (
        <div>
        <button onClick={handleClick}>
            {valor}
        </button>
            <Image
                src="/faces.svg"
                alt="Next.js logo"
                width={100}
                height={20}
                priority
            />
        </div>
      
    );
}