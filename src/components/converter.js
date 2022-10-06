import React from "react";
import Box from './box';

function Converter(){
    async function getCotation(){
        let currency = "EUR";
        try{    
            console.log(currency)        
            const connection = await fetch("https://api.currencyapi.com/v3/latest?apikey=KTO6CzmlBv62dhHsi0P92jkiwFfgkIiRxBhWImd5")
            const connectionResponse = await connection.json();
            const cotation = new Map(Object.entries(connectionResponse.data));
            const requestedCotation = cotation.get(currency)
            const requestedCotationValue = requestedCotation.value    
            const element = document.getElementById("cotationValue").textContent = currency + " " +requestedCotationValue.toFixed(2);            
        } catch(err){
            console.log(err)
        }
    }

    function changeHandler(){

    }

    return(
        <Box>
            "simple"

            <div id="cotationValue">Cotação</div>
            <input type="number" value="" onChange={changeHandler} />
            <div>Conversão</div>
            <button onClick={getCotation}>Converter</button>
        </Box>
    )
}

export default Converter;