function query(url, headers, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  for (const header in headers) {
    myHeaders.append(header, headers[header])
  }
  console.log(body)
  return fetch(url,
      { method: 'POST',
        headers: myHeaders,
        body: body })
      .then( response => response.json())
      .catch( error => {
        console.log(error, "error");
      });
}

function request(url, headers) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  for (const header in headers) {
    myHeaders.append(header, headers[header])
  }
  return fetch(url,
      { method: 'GET',
        headers: myHeaders
      })
      .then( response => response.json())
      .catch( error => {
        console.log(error, "error");
      });
}


export { query, request }