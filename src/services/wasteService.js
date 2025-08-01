import { api } from './api';

export const wasteService = {
  getTypes: api.waste.getTypes,
  submitWaste: api.waste.submitWaste,
  getHistory: api.waste.getHistory,
  calculatePrice: api.waste.calculatePrice
};