import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ChordGuitar() {
    const [chord_guitar, setChordGuitar] = useState([])
    const [filterValues, setFilterValues] = useState({
        chord_note: '',
        chord_tension: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/chord/findchord', filterValues);
                setChordGuitar(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filterValues]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div>
            <h1>Chord Guitar Page</h1>
            <div>
                <label htmlFor="chordNote">Chord Note:</label>
                <select id="chordNote" name="chord_note" onChange={handleFilterChange} value={filterValues.chord_note}>
                    <option value="">Select</option>
                    <option value="C">C</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div>
                <label htmlFor="chordTension">Chord Tension:</label>
                <select id="chordTension" name="chord_tension" onChange={handleFilterChange} value={filterValues.chord_tension}>
                    <option value="">Select</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    <option value="Major 7">Major 7</option>
                    <option value="Minor 7">Minor 7</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <div>
                {chord_guitar.map((chord, index) => (
                    <div key={index}>
                        <p>Chord Name: {chord.chord_name}</p>
                        <p>Chord Note: {chord.chord_note}</p>
                        <p>Chord Tension: {chord.chord_tension}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChordGuitar

