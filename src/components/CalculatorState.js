import { createContext } from "react";

const AppContext = createContext({
    /* state */
    memory: null,
    operation: null,    
    currentValue: 0,
    /* methods */
    addNumber: (value) => {},
    addOperation: (operation) => {},
    getResult: () => {},
});

function CalculatorState({ children }) {
    return (
        <div>
            
        </div>
    )
}

export default CalculatorState;
