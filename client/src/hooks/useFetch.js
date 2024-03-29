import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_GIPHY_API

const useFetch = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState('')
    const defaultGif = 'https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif'

    const fetchGifs = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (e) {
            console.error('Error while fetching gif', e)
            setGifUrl(defaultGif)
        }
    }

    useEffect(() => {
        if (keyword) fetchGifs()
    }, [keyword])


    return gifUrl
}

export default useFetch