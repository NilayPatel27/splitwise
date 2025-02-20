import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const Header = ({ item, setItem, setItemCount, itemCount }: any) => {

    const names = ['Ayushi', 'Hetvi', 'Marmik', 'Nilay', 'Om', 'Romil'];

    const tempItem = JSON.parse(JSON.stringify(item));
    const [individualExpense, setIndividualExpense] = useState({
        'Ayushi': 0,
        'Hetvi': 0,
        'Marmik': 0,
        'Nilay': 0,
        'Om': 0,
        'Romil': 0
    })

    useEffect(() => {
        let individualExpenses = {
            'Ayushi': 0,
            'Hetvi': 0,
            'Marmik': 0,
            'Nilay': 0,
            'Om': 0,
            'Romil': 0
        };
        for (let i = 0; i < tempItem.length; i++) {

            const price = tempItem[i].price;
            console.log(tempItem[i].isChecked);
            const tax = tempItem[i].isChecked ? (price * 13 / 100) : 0;
            const total = price + tax;
            const contributor = tempItem[i].contributor;
            const individual = total / contributor.length;

            for (let j = 0; j < contributor.length; j++) {
                const name = contributor[j];
                individualExpenses = {
                    ...individualExpenses,
                    [name]: individualExpenses[name] + individual
                }
            }
        }
        setIndividualExpense(individualExpenses);
    }, [item])

    return (
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', position: 'sticky', top: '0', zIndex: 1, backgroundColor: 'black' }}>
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '70%', padding: '10px' }}>
                <div style={{ width: '60%', backgroundColor: "white", padding: '10px', textAlign: "center", border: '1px solid black', borderRadius: '5px', margin: '5px' }}>Item Name</div>
                <div style={{ width: '20%', backgroundColor: "white", textAlign: "center", padding: '10px', border: '1px solid black', borderRadius: '5px', margin: '5px' }}>Price</div>
                <div style={{ width: '20%', backgroundColor: "white", textAlign: "center", padding: '10px', border: '1px solid black', borderRadius: '5px', margin: '5px' }}>Tax</div>
            </div>
            <Button
                onClick={() => {
                    setItemCount(itemCount + 1);
                    setItem([...item, { name: '', price: 0, tax: 0, isChecked: false, contributor: [] }]);
                }}
                variant="outline"
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%', padding: '10px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}
            >Add Item</Button>
            <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%', padding: '6px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}>
                <Dialog>
                    <DialogTrigger>Summary</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle style={{ textAlign: "center" }}>Individual Expense</DialogTitle>
                            <DialogDescription>
                                {
                                    Array.from({ length: names.length }).map((_, contributor) => {
                                        return (
                                            <>
                                                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: "100%", padding: '10px' }}>
                                                    <div style={{
                                                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '50%',
                                                        backgroundColor: 'white',
                                                        margin: '10px', padding: '10px', borderRadius: '5px',
                                                        borderWidth: '1px', borderColor: 'black', borderStyle: 'solid', color: 'black'
                                                    }}
                                                        key={contributor}
                                                    >{names[contributor]}
                                                    </div>
                                                    <div style={{
                                                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '50%',
                                                        backgroundColor: 'white',
                                                        margin: '10px', padding: '10px', borderRadius: '5px',
                                                        borderWidth: '1px', borderColor: 'black', borderStyle: 'solid'
                                                    }}
                                                        key={contributor}
                                                    >{individualExpense[names[contributor]].toFixed(2)}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}

export default Header;
