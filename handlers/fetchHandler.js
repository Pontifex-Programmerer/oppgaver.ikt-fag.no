async function apiPostFetch(endpoint, json){
    const authserver = process.env.AUTHSERVER;
    return await fetch(
        authserver+endpoint,
        {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: json
        })
}


module.exports={
    apiPostFetch
}