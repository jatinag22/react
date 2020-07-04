import React, { useState, useEffect, useContext } from 'react'
import Image from './Image'
import AppContext from '../../store';

export default function Images() {
    const [{ images }] = useContext(AppContext)
    const [myRand, setMyRand] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            const rand = Math.floor(Math.random() * images.length);
            setMyRand(rand);
        }, 1000);
        return () => clearInterval(interval);
    });
    
    return (
        <div className="flex flex-wrap justify-between">
            {images.map((image, i) => (
                <Image 
                    image={image}
                    i={i}
                    key={i}
                    myRand={myRand}
                />
            ))}
        </div>
    )
}
