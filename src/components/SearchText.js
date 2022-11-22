import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import axios from 'axios';

function SearchText() {
    const [query, setQuery] = useState('');
    const [listing, setListing] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchQuery = useDebounce(query, 500);

    useEffect(() => {
        setListing('');
        if (searchQuery || query.length < 0) {
            fetchData();
        }
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            setListing([]);
            setLoading(true);

            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
            console.log(response);

            setListing(response.data.results);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setListing([]);
            setLoading(true);
        }
    };

    return (
        <div>
            <h1 mb={4}>Search Rick and Morty Character</h1>
            <input type="text" onChange={(event) => setQuery(event.target.value)} value={query} />
            {loading && <div mb={10} mt={10} textAlign="left">Loading...</div>}
            {listing.length > 0 &&  
            <div mt={10} display={'block'}>
                {listing.map(character => (
                    <span key={character.id} mb={10}>
                        <img src={character.image} alt={character.name}  style={{border: '10px solid'}} />
                        {character.name}
                    </span>
                ))}
            </div>}
        </div>
    );
}

export default SearchText;