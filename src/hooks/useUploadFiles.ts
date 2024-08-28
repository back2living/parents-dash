import { useEffect, } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {SignedImageUrl} from "@hooks/useImageUpload";
const useUploadFiles = (URLS: null | SignedImageUrl[], selectedImage: File[]) => {
    useEffect(() => {
        if (URLS && URLS?.length > 0) {
            const uploadFiles = async () => {
                const uploadPromises = URLS?.map((element, index: number) => {
                    return axios.put(element.url, selectedImage[index], {
                        headers: {
                            "x-amz-acl": "public-read",
                            "Content-Type": element.type,
                        }
                    });
                });
                try {
                    await Promise.all(uploadPromises);
                } catch (error) {
                    toast.error("File upload failed");
                    console.error("File upload failed:", error);
                }
            };
            uploadFiles();
        }
    }, [URLS, selectedImage]);
};
export default useUploadFiles;
