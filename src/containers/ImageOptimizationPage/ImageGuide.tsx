export default function ImageGuide() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Welcome to the Image Compression Tool
      </h1>
      <section className="space-y-4">
        <p>
          This tool allows you to compress images efficiently to reduce file
          size while maintaining quality. You can upload, drag, drop, or paste
          images for instant compression.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Supported Formats</h2>
          <p>Our tool supports the following image formats:</p>
          <ul className="list-disc pl-5">
            <li>SVG</li>
            <li>PNG</li>
            <li>JPG/JPEG</li>
            <li>GIF</li>
            <li>WebP</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">How to Use</h2>
          <ol className="list-decimal pl-5">
            <li>
              Upload files directly from your device by clicking the "Upload
              files from device" button.
            </li>
            <li>
              Alternatively, drag and drop your images into the area below.
            </li>
            <li>You can also paste images directly from your clipboard.</li>
            <li>
              Once uploaded, your images will be automatically compressed.
            </li>
            <li>Download the optimized images to your device.</li>
          </ol>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Tips for Best Results</h2>
          <ul className="list-disc pl-5">
            <li>Use high-resolution images for better compression quality.</li>
            <li>
              Upload multiple images at once to save time (up to 100 files).
            </li>
            <li>
              Consider using the WebP format for superior compression and
              quality.
            </li>
          </ul>
        </div>

        {/* <div className="text-center">
          <p>
            If you need further assistance, please check out our{" "}
            <a href="#" className="text-blue-600 underline">
              Help Center
            </a>
            .
          </p>
        </div> */}
      </section>
    </div>
  );
}
