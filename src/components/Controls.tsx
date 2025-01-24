import { Listbox, Switch } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface ControlsProps {
  gridSize: number;
  dotSize: number;
  shape: "square" | "circle";
  onGridSizeChange: (size: number) => void;
  onDotSizeChange: (size: number) => void;
  onShapeChange: (shape: "square" | "circle") => void;
  onMonoColorChange: (monoColor: boolean) => void;
  monoColor: boolean;
}

const shapes = [
  { id: 1, name: "Square", value: "square" },
  { id: 2, name: "Circle", value: "circle" },
] as const;

const Controls: React.FC<ControlsProps> = ({
  gridSize,
  dotSize,
  shape,
  onGridSizeChange,
  onDotSizeChange,
  onShapeChange,
  onMonoColorChange,
  monoColor,
}) => {
  return (
    <div className="rounded-lg">
      <div>
        <label
          htmlFor="grid-size"
          className="block text-sm font-medium text-gray-900 mb-2"
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
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div>
        <label
          htmlFor="dot-size"
          className="block text-sm font-medium text-gray-900 mb-2"
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
          className="w-full h-1 bg-gray-300  rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Shape
        </label>
        <Listbox value={shape} onChange={onShapeChange}>
          <div className="relative">
            <Listbox.Button className="relative w-full px-3 py-2 bg-slate-100 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none text-left">
              <span className="block truncate capitalize">{shape}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {shapes.map((shapeOption) => (
                <Listbox.Option
                  key={shapeOption.id}
                  value={shapeOption.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                      active ? "bg-slate-100" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate capitalize ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {shapeOption.name}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Mono Color
        </label>
        <Switch
          checked={monoColor}
          onChange={onMonoColorChange}
          className={`${
            monoColor ? "bg-black" : "bg-gray-300 border border-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
        >
          <span className="sr-only">Enable mono color</span>
          <span
            className={`${
              monoColor ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-gray-400 transition-transform`}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Controls;
