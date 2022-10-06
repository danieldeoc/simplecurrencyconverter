import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';

function Converter(){
    let [currency, setCurrency] = useState("EUR");
    let [cotation, setCotation] = useState("");

    
    let [currencyConverted, setCurrencyConverted] = useState("")

    async function getCotation(){
        try{            
            const connection = await fetch("https://api.currencyapi.com/v3/latest?apikey=KTO6CzmlBv62dhHsi0P92jkiwFfgkIiRxBhWImd5")
            const connectionResponse = await connection.json();
            console.log(connectionResponse)
            const cotation = new Map(Object.entries(connectionResponse.data));
            const requestedCotation = cotation.get(currency)
            const requestedCotationValue = requestedCotation.value.toFixed(2); 
            setCotation(requestedCotationValue)

            const requestedConvert = cotation.get("BRL");
            const requestedConvertValue = requestedConvert.value.toFixed(2); 
            setCurrencyConverted(requestedConvertValue);
            
            //const ele = document.getElementById("cotationValue").textContent = currency + " " +requestedCotationValue            
            console.log("try")
        } catch(err){
            console.log(err)
        }
    }
    // useEffect(getCotation)
    getCotation();

    function changeHandler(){


        setCurrencyConverted()
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
            <div id="cotationValue">{currency} {cotation}</div>
            <input className="valueToConvert" type="number" value="" onChange={changeHandler} />
            <div>{currencyConverted}</div>
            <button onClick={updateCotation}>Converter</button>
        </Box>
    )
}

export default Converter;