import { useState } from "react";
import { CameraBox } from "./components/CameraBox";
import { SizeButton } from "./components/SizeButton";

const SIZES = ["XS", "S", "M", "L", "XL"];

function App() {
  const [selectedSize, setSelectedSize] = useState<string>("");

  return (
    <div>
      <CameraBox selectedSize={selectedSize} />
      <div className="flex-1 flex-col justify-center items-center px-2">
        {SIZES.map((size, idx) => (
          <div key={idx}>
            <SizeButton
              selected={size === selectedSize}
              size={size}
              onClick={(size: string) => {
                setSelectedSize(size);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
