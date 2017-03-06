function query(url, headers, body) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  for (const header in headers) {
    console.log(header, headers[header]);
    myHeaders.append(header, headers[header])
  }

  return fetch(url,
      { method: 'POST',
        headers: myHeaders,
        body: body })
      .then( response => response.json())
      .catch( error => {
        console.log(error, "error");
      });
}


export { query }