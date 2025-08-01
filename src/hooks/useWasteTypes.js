import { useState, useEffect } from 'react';
import { wasteTypes, getWasteTypesByCategory, calculatePrice, getUniqueCategories } from '../data/wasteTypes';

// Custom hook untuk mengelola data jenis sampah
const useWasteTypes = () => {
  const [selectedWasteType, setSelectedWasteType] = useState(null);
  const [weight, setWeight] = useState('');
  const [calculation, setCalculation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hitung ulang ketika waste type atau weight berubah
  useEffect(() => {
    if (selectedWasteType && weight && parseFloat(weight) > 0) {
      const result = calculatePrice(selectedWasteType.id, parseFloat(weight));
      setCalculation(result);
    } else {
      setCalculation(null);
    }
  }, [selectedWasteType, weight]);

  // Function untuk memilih jenis sampah
  const selectWasteType = (wasteType) => {
    setSelectedWasteType(wasteType);
  };

  // Function untuk mengupdate berat
  const updateWeight = (newWeight) => {
    setWeight(newWeight);
  };

  // Function untuk reset form
  const resetForm = () => {
    setSelectedWasteType(null);
    setWeight('');
    setCalculation(null);
  };

  // Function untuk submit waste
  const submitWaste = async () => {
    if (!selectedWasteType || !weight || !calculation) {
      throw new Error('Please complete all fields');
    }

    setLoading(true);
    try {
      // Here you would make an API call to submit the waste
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const submissionData = {
        id: Date.now(),
        wasteType: selectedWasteType,
        weight: parseFloat(weight),
        calculation: calculation,
        submittedAt: new Date(),
        status: 'submitted'
      };

      // Reset form after successful submission
      resetForm();
      
      return { success: true, data: submissionData };
    } catch (error) {
      console.error('Submission failed:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    // Data
    wasteTypes,
    selectedWasteType,
    weight,
    calculation,
    loading,
    
    // Functions
    selectWasteType,
    updateWeight,
    resetForm,
    submitWaste,
    
    // Utility functions
    getWasteTypesByCategory,
    getUniqueCategories,
    calculatePrice
  };
};

export default useWasteTypes;