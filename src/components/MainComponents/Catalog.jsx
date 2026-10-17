import { useEffect, useState } from "react";
import Asset from "./Asset";



const testAssets = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Monitor" },
    { id: 3, name: "Keyboard" },
];



const initAsset = {
    id: 2,
    name: "initialAssetForTest",
};

export default function Catalog() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        setAssets(testAssets);
    }, []);


    return (
        <>
            <h2>Asset list</h2>

            {
                assets.length===0 ? ( <p>No items</p>) :


               ( 
                assets.map( (asset) =>
                    <Asset key={asset.id} asset={asset} /> )

                )
            }


        </>
    );
}