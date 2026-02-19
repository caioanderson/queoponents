import { createContext, useContext, type ReactNode, type ComponentType } from 'react';
import { themeClass } from '../styles/index.css';

const ThemeContext = createContext<boolean | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('Design System components must be used within a ThemeProvider');
  }

  return context;
}

export function withTheme<T extends object>(Component: ComponentType<T>) {
  function ProtectedComponent(props: T) {
    useTheme();
    return <Component {...props} />;
  }

  ProtectedComponent.displayName = `withTheme(${Component.displayName || Component.name || 'Component'})`;

  return ProtectedComponent;
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={true}>
    <div className={themeClass}>{children}</div>
  </ThemeContext.Provider>
);
