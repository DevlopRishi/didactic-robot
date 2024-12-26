import React, { useState, useRef, useEffect } from 'react';

export default function ImageColorizer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [coloredImage, setColoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
          return;
      }
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setSelectedImage(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleColorize = async () => {
    if (!selectedImage) {
      return;
    }

    setLoading(true);
      // Simulate an API call for colorization (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (imageData) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg * 1.2 > 255 ? 255 : avg * 1.2 ; // Red
          data[i + 1] = avg * 1.1 > 255 ? 255 : avg * 1.1; // Green
          data[i + 2] = avg * 1.3 > 255 ? 255 : avg * 1.3;  // Blue
      }
      ctx?.putImageData(imageData, 0, 0);
      setColoredImage(canvas.toDataURL('image/png'));
        setLoading(false);
      }
    };
    img.src = selectedImage;


  };

  const handleClear = () => {
    setSelectedImage(null);
    setColoredImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Greyscale Image Colorizer</h1>
        <div className="flex flex-col items-center mb-8 w-full max-w-md">
            {!selectedImage && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 w-full">
                    <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.725-8.65M17.25 19.5a4.5 4.5 0 001.725-8.65M6.75 7.5h10.5" />
                            </svg>
                    </div>
                        <p className="text-gray-600">Upload an image</p>
                    </label>
                    <input
                      id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                    />
                </div>
            )}
            {selectedImage && (
                <div className="flex flex-col items-center w-full">
                   <h2 className="text-lg font-semibold mb-2 text-gray-700">Original Image</h2>
                   <div className="border-2 border-gray-300 rounded-xl mb-4 overflow-hidden w-full max-w-sm">
                        <img src={selectedImage} alt="Selected" className="w-full object-cover" />
                    </div>
                    <div className="flex gap-2 justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleColorize}
                            disabled={loading}
                        >
                            {loading ? 'Colorizing...' : 'Colorize'}
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleClear}
                            disabled={loading}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
            {coloredImage && (
                <div className="flex flex-col items-center mt-8 w-full">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Colored Image</h2>
                   <div className="border-2 border-gray-300 rounded-xl overflow-hidden w-full max-w-sm">
                    <img src={coloredImage} alt="Colored" className="w-full object-cover" />
                </div>
                </div>
            )}
        </div>
    </div>
  );
}
