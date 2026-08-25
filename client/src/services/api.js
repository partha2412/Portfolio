// Access process.env for Create React App, with fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fetch function requesting data from Express backend
export const fetchPortfolioData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        
        return data;
    } catch (error) {
        console.error("GET Request failed:", error);
        // return mockData;
        throw error;
    }
};

export const updatePortfolioData = async (updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating portfolio data:", error);
        throw error;
    }
};