interface ControlsProps {
  gridSize: number;
  dotSize: number;
  shape: "square" | "circle";
  onGridSizeChange: (size: number) => void;
  onDotSizeChange: (size: number) => void;
  onShapeChange: (shape: "square" | "circle") => void;
}

const Controls: React.FC<ControlsProps> = ({
  gridSize,
  dotSize,
  shape,
  onGridSizeChange,
  onDotSizeChange,
  onShapeChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="grid-size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Grid Size: {gridSize}px
        </label>
        <input
          id="grid-size"
          type="range"
          min="4"
          max="32"
          value={gridSize}
          onChange={(e) => onGridSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="dot-size"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Dot Size: {dotSize}px
        </label>
        <input
          id="dot-size"
          type="range"
          min="1"
          max={gridSize - 2}
          value={dotSize}
          onChange={(e) => onDotSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label
          htmlFor="shape"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Shape
        </label>
        <select
          id="shape"
          value={shape}
          onChange={(e) => onShapeChange(e.target.value as "square" | "circle")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="square">Square</option>
          <option value="circle">Circle</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
