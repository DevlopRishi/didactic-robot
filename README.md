
# Greyscale Image Colorizer

A simple React application that allows users to colorize neutral/greyscale/black-and-white images, giving them a more modern and vibrant appearance. The application uses basic image manipulation techniques to simulate the colorization process.

## Features
- Upload a greyscale or black-and-white image.
- Apply a colorization effect to enhance the image with a modern look.
- Preview both the original and colorized images.
- Clear the uploaded image and start over.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DevlopRishi/diblotic-robot
   cd image-colorizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Usage

1. **Upload an Image**: Click the upload area and select a greyscale or black-and-white image from your device.
2. **Colorize the Image**: Press the "Colorize" button to apply the colorization effect.
3. **View Results**: The original image and the colorized image will be displayed for comparison.
4. **Clear and Restart**: Use the "Clear" button to remove the current image and upload a new one.

## Project Structure

```
src/
â”œâ”€â”€ components/
â”‚   â””â”€â”€ ImageColorizer.tsx  # Main component
â”œâ”€â”€ App.tsx                 # Entry point for the application
â”œâ”€â”€ index.tsx               # React DOM rendering
â”œâ”€â”€ styles/                 # CSS styles (if any)
â””â”€â”€ assets/                 # Static assets (e.g., icons, placeholders)
```

## How It Works

1. The user uploads an image through an `<input type="file">` element.
2. The image is previewed using a `FileReader` to convert it into a Base64 data URL.
3. A simulated colorization process is applied using a `<canvas>` element:
   - The greyscale values of each pixel are calculated and adjusted with different intensity ratios for red, green, and blue channels.
   - The modified image data is rendered back into the `<canvas>` and converted into a downloadable image.

## Dependencies

- React: A JavaScript library for building user interfaces.
- TypeScript: A strongly-typed programming language that builds on JavaScript.
- TailwindCSS (optional): For styling the application.

## Future Enhancements

- Integrate a real AI-based API for advanced image colorization.
- Add support for downloading the colorized image.
- Improve UI/UX with better styling and animations.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to contribute by submitting issues or pull requests to enhance the application!