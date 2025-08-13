const API_BASE_URL = "http://127.0.0.1:8000/api";

export const apiService = {
  async getHighPotential() {
    try {
      console.log("Fetching from:", `${API_BASE_URL}/high_potential`);

      const response = await fetch(`${API_BASE_URL}/high_potential`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching high potential data:", error);
      throw error;
    }
  },

  // Add this new method
  async getCrossSell() {
    try {
      console.log("Fetching from:", `${API_BASE_URL}/cross_sell`);

      const response = await fetch(`${API_BASE_URL}/cross_sell`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Cross-sell response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Cross-sell response data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching cross-sell data:", error);
      throw error;
    }
  },

  async getPerformance() {
    try {
      console.log("Fetching from:", `${API_BASE_URL}/performance`);

      const response = await fetch(`${API_BASE_URL}/performance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Performance response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Performance response data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching performance data:", error);
      throw error;
    }
  },

  async getSummary() {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/summary`);
      
      const response = await fetch(`${API_BASE_URL}/summary`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Summary response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Summary response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching summary data:', error);
      throw error;
    }
  },
  
};
