// Design system for consistent values throughout app

export const DESIGN_SYSTEM = {
    // Color tokens
    colors: {
        primary: '#6366f1', // Indigo
        secondary: '#ec4899', // Pink
        accent: '#f59e0b', // Amber
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
    },

    // Spacing tokens
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '64px',
    },

    // Breakpoints
    breakpoints: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },

    // Z-index scale
    zIndex: {
        dropdown: '1000',
        sticky: '1020',
        fixed: '1030',
        backdrop: '1040',
        offcanvas: '1050',
        modal: '1060',
        popover: '1070',
        tooltip: '1080',
    },

    // Border radius
    radius: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        full: '9999px',
    },

    // Typography
    fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
    },

    // Shadows
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        elevated: '0 20px 25px -5px rgba(99, 102, 241, 0.1)',
    },

    // Animation durations
    durations: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
    },
};

export type DesignToken = typeof DESIGN_SYSTEM;
