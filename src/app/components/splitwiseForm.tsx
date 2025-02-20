'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";

import { ItemComponent } from './itemComponent';
import { NameComponent } from './nameComponent';
import Header from './header';

const SplitwiseForm = () => {

    const [item, setItem] = useState([{
        name: '',
        price: 0,
        isChecked: false,
        contributor: []
    }]);

    const [itemCount, setItemCount] = useState(1);

    return (
        <div>
            <div style={{ flexDirection: 'row', backgroundColor: 'black', width: '100%', display: "flex" }}>
                <div style={{ flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', display: 'flex', width: '100%' }}>
                    <Header item={item} setItem={setItem} setItemCount={setItemCount} itemCount={itemCount} />
                    <div style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '100%' }}>
                        <div style={{ display: "flex", 'justifyContent': 'space-between', 'alignItems': 'center', width: '100%', flexDirection: 'column' }}>
                            {
                                Array.from({ length: itemCount }).map((_, index) => {
                                    return (
                                        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', padding: '10px' }}
                                            key={index}
                                        >
                                            <ItemComponent index={index} item={item} setItem={setItem} />
                                            <NameComponent index={index} item={item} setItem={setItem} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default SplitwiseForm;