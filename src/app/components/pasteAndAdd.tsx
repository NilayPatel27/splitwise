import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { SquarePlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ItemComponent } from '@/app/components/index';

const PasteAndAdd = ({ item, setItem, itemCount, setItemCount }: any) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempItem, setTempItem] = useState([]);
    const [tempItemCount, setTempItemCount] = useState(0);
    const [tempPriceCount, setTempPriceCount] = useState(0);

    const PasteAndAddItemName = () => {
        return (
            <Button
                onClick={(e) => {
                    navigator.clipboard.readText().then(text => {
                        const temp = JSON.parse(JSON.stringify(tempItem));
                        const data = text.split('\n');
                        for (let i = 0; i < data.length; i++) {
                            const name = data[i];
                            temp[tempItemCount + i] = { name, price: 0, tax: 0, isChecked: false, contributor: [] };
                        }
                        setTempItem(temp);
                        setTempItemCount(tempItemCount + data.length);
                    });
                }}
                variant="outline"
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '50%', padding: '10px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}
            >Names</Button>
        )
    }

    const PasteAndAddItemPrice = () => {
        return (
            <Button
                onClick={() => {
                    navigator.clipboard.readText().then(text => {
                        const temp = JSON.parse(JSON.stringify(tempItem));
                        const data = text.split('\n');
                        for (let i = 0; i < data.length; i++) {
                            const price = Number(data[i]);
                            temp[tempPriceCount + i] = { ...temp[tempPriceCount + i], price };
                        }
                        setTempItem(temp);
                        setTempPriceCount(tempPriceCount + data.length);
                    });
                }}
                variant="outline"
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '50%', padding: '10px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}
            >Prices</Button>
        )
    }

    const onCancelClick = () => {
        setTempItem([]);
        setTempItemCount(0);
        setTempPriceCount(0);
        setIsDialogOpen(false);
    }

    const onAddItemClick = () => {
        const temp = JSON.parse(JSON.stringify(item));
        for (let i = 0; i < tempItemCount; i++) {
            temp[itemCount + i] = tempItem[i];
        }
        setItem(temp);
        setItemCount(itemCount + tempItemCount);
        onCancelClick();
    }

    return (
        <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%', padding: '6px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white', height: '50%' }}>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                <DialogTrigger>Paste & Add</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <h1 style={{ textAlign: "center", padding: '10px', color: 'black', backgroundColor: 'white', borderRadius: '5px', border: '1px solid black', width: '50%', alignSelf: 'center' }}>Paste & Add</h1>
                        <div style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', display: 'flex', width: "100%", padding: '10px' }}>
                            <PasteAndAddItemName />
                            <PasteAndAddItemPrice />
                        </div>
                    </DialogHeader>

                    <DialogDescription style={{ overflowY: 'scroll', height: '50vh' }}>
                        {
                            Array.from({ length: tempItemCount }).map((_, index) => {
                                return (
                                    <>
                                        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', padding: '10px' }} key={index}>
                                            <ItemComponent index={index} item={tempItem} setItem={setTempItem} />
                                            <Button
                                                onClick={() => {
                                                    setTempItemCount(tempItemCount - 1);
                                                    setTempPriceCount(tempPriceCount - 1);
                                                    setTempItem(tempItem.filter((_, i) => i !== index));
                                                }}
                                                variant="outline"
                                                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%', padding: '10px', margin: '10px', borderRadius: '5px', borderColor: 'black', borderWidth: '1px', borderStyle: 'solid', backgroundColor: 'white' }}
                                            >Delete</Button>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </DialogDescription>
                    <DialogFooter className="sm:justify-around">
                        <DialogClose asChild>
                            <Button type="button" variant="destructive" onClick={() => onCancelClick()}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" style={{ backgroundColor: 'blue', color: 'white' }} disabled={tempItemCount === 0 || tempPriceCount === 0 || (tempItemCount !== tempPriceCount)} onClick={() => onAddItemClick()}>
                                <SquarePlus /> Add Items
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PasteAndAdd;
