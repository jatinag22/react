// import React, { Component } from 'react'

// export default class Content extends Component {
//     componentDidMount() {
//         console.log('Content mount')
//     }

//     componentWillUnmount() {
//         console.log('Content unmount')
//     }

//     render() {
//         return (
//             <div>I am a div</div>
//         )
//     }
// }

import React from 'react'
import AppContext, { ADD_IMAGE } from '../../store';
import Images from './Images';
import Auth from '../../middleware/Auth'

function Content() {

    const [, dispatch] = React.useContext(AppContext);
    const [newImageUrl, setNewImageUrl] = React.useState("");

    
    // const [hoverIndex, setHoverIndex] = React.useState(-1);

    // React.useEffect(() => { //didmount and update
    //     console.log('Content useEffect')
    //     return () => { //return function for unmount
    //         console.log('Content useEffect return')
    //     }
    // }, []) //empty brackets - only didmount

    const urlRef = React.useRef();

    React.useEffect(() => {
        urlRef.current.focus();
    }, [])

    function handleChange(event) {
        setNewImageUrl(event.target.value)
    }

    function addNewImage() {
        dispatch({type: ADD_IMAGE, payload: newImageUrl});
    }

    return (
        <div>
            <Images />
        
            <div className="my-5 flex justify-center">
                <input 
                    ref={urlRef}
                    type="text" 
                    onChange={handleChange}
                    value={newImageUrl}
                    className="p-2 rounded shadow border border-gray-800"
                />
                <button
                    className="rounded bg-yellow-600 p-2 text-white mx-2"
                    onClick={addNewImage}
                >
                    Add Image
                </button>
            </div>
        </div>
    )
}

export default Auth(Content);