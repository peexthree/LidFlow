import { create } from 'zustand';

export type PricingStep = {
  id: string;
  question: string;
  options: { id: string; label: string; price: number; type: 'landing' | 'bot' | 'complex' | 'feature' | 'none' }[];
  multiple?: boolean;
};

export const PRICING_STEPS: PricingStep[] = [
  {
    id: "project_type",
    question: "Какая основная цель вашей системы?",
    options: [
      { id: "landing", label: "Только Landing (Свирепая конверсия)", price: 90000, type: "landing" },
      { id: "twa", label: "Telegram Web App (Внутри экосистемы)", price: 150000, type: "bot" },
      { id: "full", label: "Full-Stack доминация (Landing + TWA + Bot)", price: 290000, type: "complex" }
    ],
    multiple: false
  },
  {
    id: "ai_integration",
    question: "Интегрируем нейросети для автоматизации продаж (LLM)?",
    options: [
      { id: "ai_yes", label: "Да, хочу автономного продавца", price: 80000, type: "feature" },
      { id: "ai_no", label: "Нет, обойдусь стандартами", price: 0, type: "none" }
    ],
    multiple: false
  },
  {
    id: "design",
    question: "Уровень визуального присутствия:",
    options: [
      { id: "3d_motion", label: "Premium (3D, GSAP, Cyberpunk)", price: 50000, type: "feature" },
      { id: "lid", label: "LID (Строгий минимализм)", price: 0, type: "none" }
    ],
    multiple: false
  }
];

interface PricingState {
  currentStepIndex: number;
  selectedOptions: Record<string, string[]>;
  totalPrice: number;
  isComplete: boolean;
  selectOption: (stepId: string, optionId: string, price: number, multiple?: boolean) => void;
  nextStep: () => void;
  reset: () => void;
}

export const usePricingStore = create<PricingState>((set, get) => ({
  currentStepIndex: 0,
  selectedOptions: {},
  totalPrice: 0,
  isComplete: false,

  selectOption: (stepId, optionId, price, multiple = false) => set((state) => {
    const currentSelected = state.selectedOptions[stepId] || [];
    let newSelected: string[];

    if (multiple) {
      newSelected = currentSelected.includes(optionId)
        ? currentSelected.filter(id => id !== optionId)
        : [...currentSelected, optionId];
    } else {
      newSelected = [optionId];
    }

    return {
      selectedOptions: { ...state.selectedOptions, [stepId]: newSelected }
    };
  }),

  nextStep: () => set((state) => {
    // Calculate total price based on current selections
    let newTotal = 0;
    PRICING_STEPS.forEach(step => {
      const selected = state.selectedOptions[step.id] || [];
      selected.forEach(optId => {
        const opt = step.options.find(o => o.id === optId);
        if (opt) newTotal += opt.price;
      });
    });

    if (state.currentStepIndex < PRICING_STEPS.length - 1) {
      return {
        currentStepIndex: state.currentStepIndex + 1,
        totalPrice: newTotal
      };
    }

    return {
      isComplete: true,
      totalPrice: newTotal
    };
  }),

  reset: () => set({ currentStepIndex: 0, selectedOptions: {}, totalPrice: 0, isComplete: false })
}));
