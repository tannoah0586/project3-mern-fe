const BASE_URL = `${import.meta.env.VITE_BACK_EN_SERVER_URL}/ideas`;

const index = async () => {
    try {
        const res = await fetch (BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    index,
}