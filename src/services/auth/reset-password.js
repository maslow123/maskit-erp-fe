const resetPassword = async (payload) => {
    try {
        const data = await fetch(`${process.env['NEXT_PUBLIC_API_SERVICE_URL']}/users/reset-password`, {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        const json = await data.json();
        return json;
    } catch (e) {
        console.log(e)
    }
}


export default resetPassword;