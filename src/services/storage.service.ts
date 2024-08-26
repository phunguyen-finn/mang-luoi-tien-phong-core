import { Storage } from "./firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

export const StorageService = {
    upload: async (file: File | Blob, onProgress?: CallableFunction, onSuccess?: CallableFunction, onError?: CallableFunction) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const extension = (file as File).name ? (file as File).name.split('.').pop() : 'jpg';
        const storageRef = ref(Storage, `${year}/${month}/${uuidv4()}.${extension}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const defer: any = {};
        defer.promise = new Promise((resolve, reject) => {
            defer.resolve = resolve;
            defer.reject = reject;
        });

        uploadTask.on('state_changed',
            (snapshot) => {
                if (!onProgress) return;
                const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) onProgress({ percent });
            },
            (error) => {
                if (!onError) return;
                onError(error);
                defer.reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (onSuccess) onSuccess(downloadURL);
                    defer.resolve(downloadURL);
                });
            }
        );
        return defer.promise;
    }
}

export default StorageService;