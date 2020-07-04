import React, { useState } from 'react';
import Header from './components/Header'
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router';
import GlobalContext, { reducer, InitialState } from "./store/global";

//class based component - not used now beacause functional components are used with hooks
//class based components are heavy
// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { title: 'My React App', isOpen: false };
//     }

//     handleClick = () => {
//         this.setState({ isOpen: !this.state.isOpen });
//     }

//     componentDidMount() {
//         console.log('App mount')
//     }

//     componentDidUpdate() {
//         console.log('App update')
//     }

//     render() {
//         console.log('App render')
//         return (
//             <>
//                 <Header title={this.state.title} />
//                 <div className="h-screen">
//                     <div className="flex justify-center">
//                         <div className="w-1/2">
//                             <button 
//                                 className="bg-pink-600 p-2 rounded shadow text-white" 
//                                 onClick = {this.handleClick}
//                             >
//                                 Toggle Me
//                             </button>
//                             {this.state.isOpen ? <Content /> : null}
//                         </div>
//                     </div>
//                 </div>
//                 <Footer />
//             </ >
//         );
//     }
// }

//functional component
function App() {
    const [title] = useState('My React App'); //useState is a hook
    // const [isOpen, setIsOpen] = useState(false);

    // //useEffect is a hook
    // React.useEffect(() => {
    //     console.log('App useEffect')
    // })
    
    // //componenetWillUpdate
    // React.useEffect(() => {
    //     if(isOpen)
    //         console.log('div is showing');
    // }, [isOpen]) //only when isOpen changes

    // React.useEffect(() => {
    //     console.log('title is changed');
    // }, [title])

    

    // function handleRemove(idx) {
    //   setImages(images.filter((img, i) => i !== idx));
    // }

    // function handleNewImage() {
    //   setImages([...images, newImageUrl]);
    //   setNewImageUrl("");
    // }

    // const [newImageUrl, setNewImageUrl] = React.useState("");

    // const state = {
    //   images, setImages, handleRemove, handleNewImage, newImageUrl, setNewImageUrl
    // }
    
    const [state, dispatch] = React.useReducer(reducer, InitialState);

    return (
      <GlobalContext.Provider value={[state, dispatch]}>
      <Router>
        <Header title={title} />
        <div className="h-screen">
          <div className="flex justify-center">
            <div className="w-10/12 mt-10">
              <AppRouter />
            </div>
          </div>
        </div>
        <Footer />
      </Router>
      </GlobalContext.Provider>
    );
}

export default App;