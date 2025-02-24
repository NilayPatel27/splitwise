import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import PasteAndAdd from './pasteAndAdd';

const Header = ({ item, setItem, setItemCount, itemCount, names }: any) => {


    const [totalBill, setTotalBill] = useState(0);
    const tempItem = JSON.parse(JSON.stringify(item));
    const [individualExpense, setIndividualExpense] = useState();
    const [discount, setDiscount] = useState(0);

    useEffect(() => {

        let individualExpenses = Array.from({ length: names.length }).reduce((acc: any, _, index) => {
            return {
                ...acc,
                [names[index]]: 0
            }
        }, {});

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
        const total = tempItem.reduce((acc: number, item: any) => {
            return acc + item?.price;
        }, 0);
        setTotalBill(total);
    }, [item]);

    return (
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', position: 'sticky', top: '0', zIndex: 1, backgroundColor: '#0d031b' }}>
            <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '70%', padding: '10px' }}>
                <div style={{ width: '60%', backgroundColor: "white", textAlign: "center", padding: '10px', border: '1px solid black', borderRadius: '5px', margin: '5px' }}>Item Name</div>
                <div style={{ width: '20%', backgroundColor: "white", textAlign: "center", padding: '10px', border: '1px solid black', borderRadius: '5px', margin: '5px' }}>Price</div>
                <div style={{ width: '20%', backgroundColor: "white", textAlign: "center", padding: '10px', border: '1px solid black', borderRadius: '5px', margin: '5px' }}>Tax</div>
                <PasteAndAdd item={item} setItem={setItem} setItemCount={setItemCount} itemCount={itemCount} />
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
                            <div style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', width: "100%", padding: '10px' }}>
                                <DialogTitle style={{ textAlign: "center" }}>Contributor</DialogTitle>
                                <DialogTitle style={{ textAlign: "center" }}>Individual Expense</DialogTitle>
                                <DialogTitle style={{ textAlign: "center" }}>
                                    <Input type="number" placeholder="Discount" style={{ width: "50%", color: "black" }}
                                        onChange={(e) => {
                                            setDiscount(Number(e.target.value));
                                            if (!e.target.value) {
                                                setDiscount(0);
                                            }
                                        }}
                                        max={totalBill}
                                    />
                                </DialogTitle>
                            </div>
                            <DialogDescription>
                                {
                                    Array.from({ length: names.length }).map((_, contributor) => {
                                        return (
                                            <>
                                                <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: "100%", padding: '5px' }}>
                                                    <div style={{
                                                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '50%',
                                                        backgroundColor: 'white',
                                                        margin: '10px', padding: '10px', borderRadius: '5px',
                                                        borderWidth: '3px', borderColor: 'black', borderStyle: 'solid', color: 'black'
                                                    }}
                                                        key={contributor}
                                                    >{names[contributor]}
                                                    </div>
                                                    <div style={{
                                                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '50%',
                                                        backgroundColor: 'white',
                                                        margin: '10px', padding: '10px', borderRadius: '5px',
                                                        borderWidth: '3px', borderColor: 'blue', borderStyle: 'solid'
                                                    }}
                                                        key={contributor}
                                                    >{individualExpense[names[contributor]]?.toFixed(2)}
                                                    </div>
                                                    <div style={{
                                                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '50%',
                                                        backgroundColor: 'white',
                                                        margin: '10px', padding: '10px', borderRadius: '5px',
                                                        borderWidth: '3px', borderColor: 'red', borderStyle: 'solid'
                                                    }}
                                                        key={contributor}
                                                    >{(individualExpense[names[contributor]]?.toFixed(2) - (individualExpense[names[contributor]]?.toFixed(2) * discount / totalBill)?.toFixed(2)).toFixed(2)}
                                                    </div>
                                                    <div style={{
                                                        flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '50%',
                                                        backgroundColor: 'white',
                                                        margin: '10px', padding: '10px', borderRadius: '5px',
                                                        borderWidth: '3px', borderColor: 'green', borderStyle: 'solid'
                                                    }}
                                                        key={contributor}
                                                    >{discount ? ((individualExpense[names[contributor]]?.toFixed(2) * discount) / totalBill)?.toFixed(2) : 0}
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
