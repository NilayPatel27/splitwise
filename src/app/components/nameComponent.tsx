import { useEffect } from "react";

const NameComponent = ({ index, item, setItem }: any) => {

    const names = ['Ayushi', 'Hetvi', 'Marmik', 'Nilay', 'Om', 'Romil'];
    const onNameClick = (contributor: string) => {
        const temp = JSON.parse(JSON.stringify(item));
        if (!temp[index].contributor.some((name: string) => name === contributor)) {
            temp[index].contributor = [...temp[index]?.contributor, contributor];
        } else {
            temp[index].contributor = temp[index].contributor.filter((name: string) => name !== contributor);
        }
        setItem(temp);
        console.log(temp);
    }

    return (
        <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: "40%", padding: '10px' }}>
            {
                Array.from({ length: names.length }).map((_, contributor) => {
                    return (
                        <div style={{
                            flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', display: 'flex', width: '100%',
                            backgroundColor: item[index]?.contributor?.includes(names[contributor]) ? 'yellow' : 'white',
                            margin: '10px', padding: '10px', borderRadius: '5px',
                            borderWidth: '1px', borderColor: 'black', borderStyle: 'solid'
                        }}
                            key={contributor}
                            onClick={() => onNameClick(names[contributor])}
                        >{names[contributor]}
                        </div>
                    )
                })
            }
        </div>
    )
}

export { NameComponent }