// import React, { useEffect, useState } from 'react'
// import axios from 'axios'

// function ChordPiano() {
//     const [chord_piano, setChordPiano] = useState([])
//     const [values, setValues] = useState({
//         chord_note: '',
//         chord_tension: '',
//     })

//     useEffect(() => {
//         const handleChordPiano = () => {
//             axios.post('http://localhost:8081/chord/findchord', values)
//                 .then(function (res) {
//                     setChordPiano(res.data)
//                 }).catch(function (err) {
//                     console.error(err)
//                 })
//         }
//         handleChordPiano()
//     }, [])

//     return (
//         <div>
//             <h1>Chord Piano Page</h1>
//             <div>
//                 <label htmlFor="chordNote">Chord Note:</label>
//                 <select id="chordNote" onChange={e => setValues({ ...values, chord_note: e.target.value })}>
//                     <option value="">Select</option>
//                     <option value="C">C</option>
//                     {/* Add more options as needed */}
//                 </select>
//             </div>
//             <div>
//                 <label htmlFor="chordTension">Chord Tension:</label>
//                 <select id="chordTension" onChange={e => setValues({ ...values, chord_tension: e.target.value })}>
//                     <option value="">Select</option>
//                     <option value="Major">Major</option>
//                     <option value="Minor">Minor</option>
//                     <option value="Major 7">Major 7</option>
//                     <option value="Minor 7">Minor 7</option>
//                     {/* Add more options as needed */}
//                 </select>
//             </div>
//             <div>
//                 {chord_piano.map((chord, index) => (
//                     <div key={index}>
//                         <p>Chord Name: {chord.chord_name}</p>
//                         <p>Chord Note: {chord.chord_note}</p>
//                         <p>Chord Tension: {chord.chord_tension}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default ChordPiano

import React, { useEffect, useState } from 'react'
import axios from 'axios'

function ChordPiano() {
    const [chord_piano, setChordPiano] = useState([])
    const [filterValues, setFilterValues] = useState({
        chord_note: '',
        chord_tension: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/chord/findchord', filterValues);
                setChordPiano(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filterValues])

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterValues(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <h1>Chord Piano Page</h1>
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
                {chord_piano.map((chord, index) => (
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

export default ChordPiano

