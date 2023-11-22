const login = async (payload) => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/login`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const json = await data.json();
        console.log({ json })
        return json;
    } catch (e) {
        console.log(e)
        return e
    }
}


export default login;