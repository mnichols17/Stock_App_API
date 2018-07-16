const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

btn1.addEventListener("click",function(){
  getStock(document.getElementById('stock1').value, 1);
  document.getElementById('symbol1').innerHTML = (document.getElementById('stock1').value);
  document.getElementById('stock1').value = "";
});

btn2.addEventListener("click",function(){
  getStock(document.getElementById('stock2').value, 2);
  document.getElementById('symbol2').innerHTML = (document.getElementById('stock2').value);
  document.getElementById('stock2').value = "";
});

function getStock(stock, btnNum){
  const list  = ("list"+btnNum);
  const xhr = new XMLHttpRequest();
  const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+stock+"&interval=60min&outputsize=compact&apikey=RIETOAG0ANW2FE16"
  xhr.open('GET',url,true);

  xhr.onload = function(){
    if(this.status == 200){
      let data = JSON.parse(this.responseText);
      if (("Error Message") in  data){
        document.getElementById(list).innerHTML =("<td>Error. That stock symbol doesn't appear to exist. Please enter a valid stock symbol (ex: GOOGL)</td>");
      } else {
        displayStock(data, list);
      }
    }
  }
  xhr.send();
}

function displayStock(data, list){
  let counter = 0;
  let output = "";
  for(let i in data["Time Series (Daily)"]){
    let date = i;
    let info = data["Time Series (Daily)"][i]["4. close"]
    output += `<tr><td>${date}</td><td>$${info}</td></tr>`;
    counter++;
    if(counter == 7){
      break;
    }
  }
  document.getElementById(list).innerHTML = output;
}
