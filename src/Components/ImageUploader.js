import { useState, useEffect } from 'react';
import { db } from "../Data/db";


const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [imageList, setImageList] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setImageName(file.name); //Nome dell'immagine
  };

  const saveImage = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        await db.images.add({
          name: imageName,
          data: event.target.result,
        });
        setSelectedImage(null);
        setImageName('');
        fetchImages();
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const fetchImages = async () => {
    const images = await db.images.toArray();
    setImageList(images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className=" mx-auto p-4 bg-black/25 rounded-md shadow-md border-4 w-full h-full">
      <input
        type="file"
        accept=".jpg, .png"
        onChange={handleImageChange}
        className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
      {selectedImage && (
        <div className="mt-4">
          <p className="text-gray-700">Selected Image: {imageName}</p>
          <button
            onClick={saveImage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Image
          </button>
        </div>
      )}
      <div className="m-2">
        <h2 className="text-lg font-bold text-gray-700">Saved Images:</h2>
        <ul className="list-none flex flex-auto items-center justify-around">
          {imageList.map((image) => (
            <li key={image.id} className="flex h-full flex-col items-center justify-around w-max">
              {/* <p className="text-gray-700">{image.name}</p> */}
              <img
                src={image.data}
                alt={image.name}
                className="w-54 hover:scale-150 h-36 cursor-pointer rounded-xl"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;