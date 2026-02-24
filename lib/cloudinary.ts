export async function uploadFile(file: File) {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
        console.warn('Cloudinary not configured');
        throw new Error('File upload not available');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        { method: 'POST', body: formData }
    );

    return res.json();
}
