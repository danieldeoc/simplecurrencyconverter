import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';

function Converter(){

    let [currency, setCurrency] = useState("EUR"); // moeda referencia  > 1
    let [currencyConverter, setCurrencyConverter] = useState("BRL"); // moeda para conversao > val

    const [euroValue, setCotation] = useState(1.00); // euro 1
    let [euroDisplayValue, setEuroDisplayValue] = useState(1.00);
    let [currencyRef, setNewCotation] = useState("") // ref = val da api

    

    
    let [currencyConverted, setCurrencyConverted] = useState("")

    async function getCotation(){
        try{            
            const connection = await fetch("https://api.currencyapi.com/v3/latest?apikey=KTO6CzmlBv62dhHsi0P92jkiwFfgkIiRxBhWImd5")
            const connectionResponse = await connection.json();
            const cotation = new Map(Object.entries(connectionResponse.data));
            //const requestedCotation = cotation.get(currency)
            //const requestedCotationValue = requestedCotation.value.toFixed(2); 
            //setCotation(requestedCotationValue)

            const requestedConvert = cotation.get(currencyConverter);
            const requestedConvertValue = requestedConvert.value.toFixed(2); 
            
            setNewCotation(requestedConvertValue);
            
            
            document.getElementById("initValue").value = requestedConvertValue
        } catch(err){
            console.log(err)
        }
    }
    // useEffect(getCotation)
    getCotation();

    function changeHandler(){
        setTimeout( () => {
            const newCotation = document.getElementById("initValue").value
            let newValue = (newCotation/currencyRef).toFixed(2);
            setEuroDisplayValue(newValue)
        }, 600)
    }

    function updateCotation(){
        try {
            getCotation();
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <Box className="muiBoxAdjustments" sx={{
            width: 450
          }}>
            <div className="valuesCompare">
                <div id="cotationValue">{currency} <span>{euroDisplayValue}</span></div>
                <div>{currencyConverter}
                <input 
                    pattern="[0-9]*" 
                    className="valueToConvert" 
                    type="number" 
                    min="0" 
                    max="99999"
                    step="0.01"
                    id="initValue"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} />            
                </div>
                <button onClick={changeHandler}>Converter</button>
            </div>

            
        </Box>
    )
}

export default Converter;