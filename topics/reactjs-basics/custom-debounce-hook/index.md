# What is debouncing?

    Debouncing is an optimizing technique for the result of any expensive function. These functions can take a lot of execution effort, so we will create this effect by simulating a delayed execution for a period. Using debounce can improve our React application by chunking the executed actions, adding a delayed response, and executing the last call.

# Improving our debounce Hook in React

    To improve the debounce Hook in React, we will use AbortController, a WebAPI natively built-in with all modern browsers. This API helps us stop any ongoing Web requests.

    To start using this controller, instantiate it with the following:

    const controller = new AbortController();

    With the controller, we can access two properties:
        abort() : When executed, this cancels the ongoing request
        Signal: This maintains the connection between the controller and requests to cancel

    Here, we introduced an additional Hook into our app. We used the controller constructor to create a new instance of AbortSignal and assigned the controller to useRef. The useRef helped us get the elements from the DOM to keep an eye on the state changes.

    During our API call, we passed in the current signal option with controllerRef.current.signal. We added a cancel controller to call in the cleanup function when the searchQuery values changed:

    Aborted: A Boolean value that indicates the signal has been aborted, it’s initially false, and when fired, it is originally null
    abortController.abort(): This helps us stop the fetch request
    We can also make multiple calls to the server and abort the request as needed. This comes in handy when dealing with network traffic and optimization techniques.

# Code Base

**\*** useDebounce.js **\***
import { useState, useEffect } from 'react'

export const useDebounce = (value, milliSeconds) => {
const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliSeconds || 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [value, milliSeconds]);

    return debouncedValue;

};

**\*** SearchText.js **\***
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { getCharacter } from '../utils/getCharacter';
import axios from 'axios';

function SearchText() {
const [query, setQuery] = useState('');
const [listing, setListing] = useState([]);
const [loading, setLoading] = useState(false);
const controllerRef = useRef();

    const searchQuery = useDebounce(query, 500);
    const controller  = new AbortController();
    controllerRef.current = controller;

    const searchCharacter = async () => {
        try {
            setListing([]);
            setLoading(true);

            const data = await getCharacter(searchQuery, controllerRef.current?.signal);
            controllerRef.current = null;

            setListing(data.results);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            setListing([]);
            setLoading(true);
        }
    };

    useEffect(() => {
        setListing([]);
        if (searchQuery || query.length < 0) {
            searchCharacter();
        }

        return () => {
            controllerRef.current.abort();
        };
    }, [searchQuery]);

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

\***\* getCharacter.js \*\***

export async function getCharacter(value) {

    const data = await fetch(`https://rickandmortyapi.com/api/character/?name=${value}`);

    const response = await data.json();
    if (response === undefined || response.error) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }

    return response;

}
