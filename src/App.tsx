import { useState } from "react";
import Layout from "./layout";
import SVGUpload from "./components/SVGUpload";
import SVGPixelator from "./components/SVGPixelator";
import Controls from "./components/Controls";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [svgString, setSvgString] = useState<string>("");
  const [gridSize, setGridSize] = useState(8);
  const [dotSize, setDotSize] = useState(6);
  const [shape, setShape] = useState<"square" | "circle">("square");

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSvgString(e.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      // Clear the SVG string when file is removed
      setSvgString("");
    }
  };

  return (
    <Layout>
      <div className="flex mx-auto flex-col md:flex-row">
        <div className="md:w-1/2">
          <section className="max-w-2xl">
            <h1 className="font-display text-3xl text-hotred">SVG Pixelator</h1>
            <p className="font-body text-slate-700">
              Transform any SVG path into a pixel art style using customizable
              grids of squares or circles. Create retro-inspired designs by
              converting smooth vector shapes into stylized dot patterns.
            </p>
          </section>

          <section className="max-w-2xl mt-4">
            <SVGUpload onFileSelect={handleFileSelect} />
          </section>

          <section className="max-w-2xl mt-8">
            {selectedFile && (
              <div className="max-w-96">
                <Controls
                  gridSize={gridSize}
                  dotSize={dotSize}
                  shape={shape}
                  onGridSizeChange={setGridSize}
                  onDotSizeChange={setDotSize}
                  onShapeChange={setShape}
                />
              </div>
            )}
          </section>
        </div>
        <div className="md:w-1/2">
          <section className="max-w-2xl">
            <SVGPixelator
              svgString={svgString}
              gridSize={gridSize}
              dotSize={dotSize}
              shape={shape}
            />
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default App;
