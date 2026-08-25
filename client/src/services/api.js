const API_BASE_URL =
    import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchPortfolioData = async () => {
    const response = await fetch(`${API_BASE_URL}/api/profile`);

    if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return response.json();
};

export const updatePortfolioData = async (updatedData) => {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    return response.json();
};