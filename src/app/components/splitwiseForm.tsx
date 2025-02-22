'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";

import { ItemComponent } from './itemComponent';
import { NameComponent } from './nameComponent';
import Header from './header';

const SplitwiseForm = () => {

    const [item, setItem] = useState([]);
    const [itemCount, setItemCount] = useState(0);

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
                                            <ItemComponent index={index} item={item} setItem={setItem} checkBox={true} />
                                            <Button
                                                onClick={() => {
                                                    setItemCount(itemCount - 1);
                                                    setItem(item.filter((_, i) => i !== index));
                                                }}
                                                variant="outline"
                                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%', padding: '10px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}
                                            >Delete</Button>
                                            <NameComponent index={index} item={item} setItem={setItem} />
                                            <Button
                                                onClick={() => {
                                                    const temp = JSON.parse(JSON.stringify(item));
                                                    temp[index]?.contributor?.length === 6 ? temp[index].contributor = [] :
                                                        temp[index].contributor = ['Ayushi', 'Hetvi', 'Marmik', 'Nilay', 'Om', 'Romil'];
                                                    setItem(temp);
                                                }}
                                                variant="outline"
                                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%', padding: '10px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}
                                            >
                                                {
                                                    item[index]?.contributor?.length === 6 ? 'Uncheck All' : 'Check All'
                                                }</Button>
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