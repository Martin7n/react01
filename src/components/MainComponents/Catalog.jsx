import { useEffect, useState } from "react";
import Asset from "./Asset";
import workoutsApi from "../api/workoutsApi";

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        workoutsApi.getAll()
        .then(setAssets)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

    }, []);

    return (
        <>
            <h2>Asset list</h2>

            {assets.length === 0 ? (
                <p>No items</p>
            ) : (
                assets.map((asset) => <Asset key={asset.id} asset={asset} />)
            )}
        </>
    );
}
