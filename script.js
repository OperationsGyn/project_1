function printOutput() {    //Main function 

  //Beginning of the first HTTP requisition, to obtain a list of activities from a git repository"
  let requestJSON = new XMLHttpRequest();
  const urlJSON = `https://raw.githubusercontent.com/probono-digital/DesafioTecnico/main/MOCK_DATA.json`;

  requestJSON.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let responseJSON = JSON.parse(this.responseText);

      //Beginning of the API requisition, from the input submited by the user
      let inputVal = document.getElementsByName("inputCity")[0];
      let request = new XMLHttpRequest();
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal.value}&appid=13b857a4e089d4877b195fb8442a624b`;
      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let response = JSON.parse(this.responseText);
          let condition = response.weather[0].main;

          //Beginning of the filter
          let resultFilter = responseJSON.filter(function (con) {
            return con.suggested_weather_conditions == condition;
          });

          //Printing the results in the HTML
          if (resultFilter.length == 0) {
            let result = document.getElementById("output");
            result.innerHTML = "<p style='color:red'>Sorry, you really have nothing to do!<p>";
          } else {
            let result = document.getElementById("output");
            result.innerHTML = "<b>Condition in " + "<b style = 'color:green'>" + JSON.stringify(inputVal.value) + ": </b>" + "</b>"
              + "<b style = 'color:blue'>" + condition + "</b>" + "<br><br>" + "<b>Things to do: </b>" + "<br><br>";

            for (i = 0; i < resultFilter.length; i++) {
              let cost = resultFilter[i].requisites.cost;
              if (cost == null) {
                cost = "Free!";
              }

              result.innerHTML += "<p>" + "<b style ='color:red'> " + JSON.stringify(resultFilter[i].activity_title) + "</b>" + "<br>"
                + "<b>Cost: </b>" + cost + "<br>"
                + "<b>Participants number: </b>" + JSON.stringify(resultFilter[i].requisites.participants_number) + "<br>"
                + "<b>Suggested location: </b>" + JSON.stringify(resultFilter[i].suggested_location) + "<br>" + "</p> <br>";
            }
          }
        }
      };
      request.open("GET", url, true);
      request.send();
    }
  };
  requestJSON.open("GET", urlJSON, true);
  requestJSON.send();
}





















