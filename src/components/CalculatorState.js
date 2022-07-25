import { createContext, useState, useContext } from "react";

const AppContext = createContext({
    /* state */
    memory: null,
    operation: null,    
    currentValue: 0,
    isDecimal: false,
    /* methods */
    addNumber: (value) => {},
    addOperation: (operation) => {},
    getResult: () => {},
    executeAction: (action) =>{}
});

function CalculatorState({ children }) {

    const[memory, setMemory] = useState(null);
    const[operation, setOperation] = useState(null);
    const[currentValue, setcurrentValue] = useState(0);
    const[isReset, setIsReset] = useState(true);
    const[isDecimal, setIsDecimal] = useState(false);

    function handleAddNumber(value) {
        if(isReset){
            if(value === "."){
                setIsDecimal(true);
            }else{
                const point = isDecimal ? "." : "";
                const newValue = currentValue.toString() + point + value.toString();
                setcurrentValue(parseFloat(newValue));
                setIsReset(false);
                setIsDecimal(false);
            }
        } else {
            if(value === "."){
                setIsDecimal(true)
            }else{
                const point = isDecimal ? "." : "";
                const newValue = currentValue.toString() + point + value.toString();
                setIsDecimal(false);
                setcurrentValue(parseFloat(newValue));
            }
        }
    }

    function handleAddOperation(op) {
        if(currentValue){
            if(operation){
                //TODO: tenemos que resolver
                handleGetResult();
                setOperation(op);
            }else{
                setOperation(op);
                setMemory(currentValue);
                setcurrentValue(0);
                setIsReset(true)
            }
        }
    }
    function handleGetResult() {
        let result = 0;
        if(currentValue && operation && memory){
            switch(operation){
                case "+":
                    result = parseFloat(currentValue) + parseFloat(memory); 
                    break
                case "-":
                    result = parseFloat(memory) - parseFloat(currentValue); 
                    break
                case "*":
                    result = parseFloat(currentValue) * parseFloat(memory); 
                    break
                case "/":
                    result = parseFloat(memory) / parseFloat(currentValue); 
                    break
                case "%":
                    result = parseFloat(memory) / 100 * parseFloat(currentValue); 
                    break

                    default:
            }

            setcurrentValue(result);
            setOperation(null);
            setMemory(result);
            setIsReset(true);
            setIsDecimal(false);
        }
    }

    function clean(){
        setcurrentValue(0);
        setOperation(null);
        setMemory(0);
        setIsReset(true); 
        setIsDecimal(false)
    }

    function deleteNumber(){
        const index = currentValue.toString().indexOf(".");
        if(index > 0 ){ // numero decimal
            const numberOfdecimals = currentValue.toString().slice(index + 1).length;
            if(numberOfdecimals === 1){
                const numMin = Math.floor(currentValue);
                setcurrentValue(numMin);
            } else {
                // to fixed me pide un rango de numeros de decimales que quiero mostrar en mi numero.
                const newNumber = parseFloat(currentValue).toFixed(numberOfdecimals -1);
                setcurrentValue(newNumber);
            }
        } else {
            setcurrentValue(parseInt(currentValue / 10))
        }
    }

    function changeSigne(){
        setcurrentValue(currentValue * -1);
    }

    function converToFloat(){
        if(currentValue.toString().indexOf(".") > 0 ){
            //el numero ya es flotante
        }else {
            handleAddNumber(".");
        }
    }

    function handleExecuteAction(action) {
        switch(action){
            case "=":
                handleGetResult();
                break;
            case "AC":
                clean();
                break;
            case "←":
                deleteNumber();
                break;
            case "+/-":
                changeSigne();
                break;
            case ".":
                converToFloat();
                break;

            default:
        }
    }


    return (
        <AppContext.Provider value={{
            memory,operation,currentValue,isDecimal, addNumber: handleAddNumber, addOperation: handleAddOperation,
            getResult: handleGetResult, executeAction: handleExecuteAction,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default CalculatorState;

export function useAppContext(){
    return useContext(AppContext)
}
