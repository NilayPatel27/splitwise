import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ItemComponent = ({ index, item, setItem, checkBox = false }: any) => {

    const onItemTextChange = (e: any) => {
        const temp = JSON.parse(JSON.stringify(item));
        temp[index].name = e.target.value;
        setItem(temp);
    }

    const onItemPriceChange = (e: any) => {
        const temp = JSON.parse(JSON.stringify(item));
        temp[index].price = Number(e.target.value);
        setItem(temp);
    }

    return (
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '100%', padding: '10px' }}>
            <div style={
                {
                    width: '5%',
                    backgroundColor: "white",
                    padding: '3px',
                    textAlign: "center",
                    border: '1px solid black',
                    borderRadius: '5px',
                }
            }>{index + 1}</div>

            <Input style={
                {
                    width: '60%',
                    height: '30px',
                    borderRadius: '5px',
                    border: '1px solid black',
                    backgroundColor: "white",
                    color: "black",
                }
            }
                placeholder="Item Name"
                accept="text"
                type='text'
                value={item[index]?.name}
                size={20}
                onChange={(e) => onItemTextChange(e)}
            />

            <Input style={{ width: '20%', height: '30px', borderRadius: '5px', border: '1px solid black', backgroundColor: "white" }}
                type='number'
                onChange={(e) => onItemPriceChange(e)}
                value={item[index]?.price}
                color="black"
                placeholder="Price"
                min={0}
            />
            {
                checkBox &&
                <div style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', display: 'flex', width: '10%' }}>
                    <Checkbox
                        checked={item[index]?.isChecked}
                        onCheckedChange={(e) => {
                            setItem([...item, { ...item[index], isChecked: Boolean(e) }]);
                            const temp = JSON.parse(JSON.stringify(item));
                            temp[index].isChecked = Boolean(e);
                            setItem(temp);
                        }}
                        style={{ backgroundColor: "white", color: "black" }}

                    />
                </div>
            }

        </div>
    )
}

export { ItemComponent }