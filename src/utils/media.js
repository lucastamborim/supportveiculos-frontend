export const getMediaUrl = (path) => {
    // Retorna null se não houver caminho
    if (!path) return null;

    // Se já for uma URL absoluta, retorna como está
    if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
        return path;
    }

    const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendUrl}${normalizedPath}`;
};