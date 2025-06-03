export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function getImagePath(imagePath: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'

    if (imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}