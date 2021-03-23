import React, {useState, useEffect} from 'react';
import './App.css';


function App() {
  const [data, setData] = useState({});
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
   const fetchEvents = async () =>{
      await fetch(`http://data.fixer.io/api/latest?access_key=fe3a9b3f9ac173a3e51d8ea22951cf95`)
      .then(response => response.json())
      .then(json =>{
        setData(json.rates); 
        setDate(new Date());
      })
      .catch(
        err => {
          console.log(err);
        }
      )
    };
    fetchEvents();
  },[])

 //Function to check if last digit is even and returning related css classname

 const isEven = (n) => {
    //Check if v is an integer or has decimal points
    if(n%1 > 0){
      var lastDigit = n.toString().slice(-1)
      if(lastDigit %2 === 0){
        return true
      }
      else {
        return false
      }
    }
    else if( n %2 === 0){
      return true
    }
    else{
      return false
    }
 }
 
 // a function to display more readable numbers 

 const rounding = (n) =>{
   var subString = n.toString().split(".");
   var decimalPlaces = subString[1].length;
   
   if(decimalPlaces <6 ){
     return n;
   }
   else{
    var num = n.toFixed(6);
    return num;
   }
   
 }

  return (
    <div className="App">
      <div className="table-wrapper">
        <div className="name-div">
          <h1>Coding Exercise Karen Cheung </h1>
        </div>
        <h3>Rates retrieved on {date.toString()}</h3>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rates</th>
              <th>Conversion</th>
            </tr>
          </thead>
          <tbody>
              {Object.entries(data).map(([key,value]) =>
                <tr>
                  <td>{key}</td>
                  <td className={isEven(value)? "redBorder" : key === "HKD" ? "redBorder" : ""}>{value}</td>
                  <td className={isEven(rounding(value+=10.0002))? "redBorder" : key === "HKD" ? "redBorder" : ""}>{rounding(value)}</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      
     
      
    </div>
  );
}

export default App;
