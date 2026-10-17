import AssetDetails from "./AssetDetails";

export default function Asset({ asset }) {
  
  
  

  
  
    return (
    <div>
      <h3>{asset.name}</h3>
      <p>ID: {asset.id}</p>

      <AssetDetails details={asset} />
    </div>
  );
}