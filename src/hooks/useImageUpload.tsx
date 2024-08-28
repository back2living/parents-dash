import {useState} from "react";
import instance, {baseUrl} from "@/api/instance";

export type SignedImageUrl = {
    imageUrl: string;
    url: string;
    name: string;
    type: string;
}

const uploadImages = async (images: {name: string; type: string}[]) => {
    const {data} = await instance.post(`${baseUrl}/uploads`, {files: [...images]});
    return data?.data;
}
const useImageUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File[]>([]);
    const [URLS, setURLS] = useState<null | SignedImageUrl[]>(null);
    const [isImageConversionLoading, setIsImageConversionLoading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files && e.target.files[0];

        if (selectedImage && selectedImage.type === "image/heic") {
            setIsImageConversionLoading(true);
            try {
                const heic2anyFile = (await import("heic2any")).default;
                const convertedBlob: Blob | Blob[] = await heic2anyFile({
                    blob: selectedImage!,
                    toType: "image/png",
                });
                const newFileName = selectedImage?.name.replace(/\.heic$/i, ".png"); // Change the extension
                const newFile = new File(
                    Array.isArray(convertedBlob) ? convertedBlob : [convertedBlob],
                    newFileName,
                    { type: "image/png" }
                );
                // const newFile = new File([convertedBlob], newFileName, { type: "image/png" });
                setFile(newFile);
                setSelectedImage([newFile]);
                setIsImageConversionLoading(false);
            } catch (error) {
                console.error("Error converting HEIC to JPEG:", error);
            }
        } else {
            setFile(selectedImage);
            setSelectedImage(selectedImage ? [selectedImage] : []);

        }
    }

    const handleGetImageSignedUrls = async () => {
        if (selectedImage?.length > 0) {
            const image = selectedImage.map((file) => ({name: file.name, type: file.type}));
            const signedUrls = await uploadImages(image) as SignedImageUrl[];
            if (signedUrls) {
                setURLS(signedUrls);
                return signedUrls.map((url) => url.imageUrl);
            }
        }
        return undefined;
    }

    return { file, selectedImage, handleImageUpload, setFile, setURLS, URLS, handleGetImageSignedUrls, isImageConversionLoading };
};
export default useImageUpload;