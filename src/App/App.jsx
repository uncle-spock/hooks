import React, { useState, useEffect, useCallback } from 'react';

// ============================================

// USE EFFECT with useCallback !!!!!!!!!

const App = () => {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(true);

  const handleClickNextPlanet = () => {
    setCount(c => c + 1);
  };

  if (visible) {
    return (
      <>
        <button onClick={handleClickNextPlanet}>Next Planet</button>
        <button onClick={() => setVisible(false)}>hide</button>
        <br />
        <br />
        <PlanetInfo id={count} />
      </>
    );
  } else {
    return <button onClick={() => setVisible(true)}>show</button>;
  }
};

const fetchApiData = async (id) => {
  const response = (await fetch(`https://swapi.co/api/planets/${id}`));
  return response.json();
};

const getPlanet = async (id) => {

  const result = (await fetchApiData(id));

  return result;

};

const useRequest = (requestFunc) => {
  const initialState = {
    data: null,
    isLoading: true,
    error: null
  };

  const [dataState, setDataState] = useState(initialState);
  let flag = false;

  const handleRequest = async () => {
    setDataState({ ...initialState, isLoading: true });

    flag = true;

    try {
      const data = await requestFunc();

      flag && setDataState({
        data,
        isLoading: false,
        error: null
      });
    } catch (error) {
      flag && setDataState({
        data: null,
        isLoading: false,
        error
      });

      throw new Error(`missing fetch planet data. Error: ${error}`);
    }
  };

  useEffect(() => {
    handleRequest();
    return () => flag = false;
  }, [requestFunc]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(
    () => getPlanet(id),
    [id]
  );
  return useRequest(request);
};

const PlanetInfo = ({ id }) => {
  const { data, isLoading, error } = usePlanetInfo(id);

  if (error) return <span>Something went wrong</span>;
  if (isLoading) return <span>Loading...</span>;

  return <span>{id} - {data.name}</span>;
};

// ============================================

// USE EFFECT !!!!!!!!!

// const App = () => {
//   const [count, setCount] = useState(0);
//   const [visible, setVisible] = useState(true);

//   if (visible) {
//     return (
//       <>
//         <Alert message="TEST MESSAGE" />
//         <button onClick={() => setCount(c => c + 1)}>counter +</button>
//         <button onClick={() => setVisible(false)}>hide</button>
//         <br />
//         <br />
//         <HookCounter value={count} />
//         <br />
//         <br />
//         <ClassCounter value={count} />
//       </>
//     );
//   } else {
//     return <button onClick={() => setVisible(true)}>show</button>;
//   }
// };

// const Alert = ({ message }) => {
//   const [alertVisible, setAlertVisible] = useState(true);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => setAlertVisible(false), 2500);
//     return () => clearTimeout(timeoutId);
//   }, []);

//   return (
//     <>
//       {alertVisible ? (
//         <div style={{
//           width: 200,
//           textAlign: 'center',
//           border: '1px solid green',
//           padding: 20,
//           fontSize: 30,
//           margin: '0 auto',
//           color: 'red'
//         }}>
//           {message}
//         </div>
//       ) : null}
//     </>
//   );
// };

// const HookCounter = ({ value }) => {
//   useEffect(() => {
//     console.log('use Eff did mount');
//     return () => console.log('use Eff will unmount');
//   }, []);

//   useEffect(() => {
//     console.log('use Eff did update');
//   });

//   return <span>hook counter: {value}</span>;
// };

// class ClassCounter extends Component {
//   componentDidMount() {
//     console.log('class: did mount');
//   }

//   componentDidUpdate() {
//     console.log('class: did update');
//   }

//   componentWillUnmount() {
//     console.log('class: will unmount');
//   }

//   render() {
//     return <span>class counter: {this.props.value}</span>;
//   }
// };

// ============================================

// USE CONTEXT !!!!!!!!!

// import React, { useContext } from 'react';

// const MyContext = React.createContext();

// const App = () => {
//   return (
//     <MyContext.Provider value="App context">
//       <Child />
//     </MyContext.Provider>
//   );
// };

// const Child = () => {
//   const value = useContext(MyContext);

//   return <span>{value}</span>;
// };

// ============================================

// USE STATE !!!!!!!!!

// import React, { useState } from 'react';

// const App = () => {
//   return <HookSwitcher />;
// };

// const 

// const HookSwitcher = () => {
//   const [color, setColor] = useState('white');
//   const [fontSize, setFontSize] = useState(14);

//   return (
//     <div style={{
//       padding: 10,
//       backgroundColor: color,
//       fontSize: fontSize
//     }}>
//       <p>Lorem ipsum dolor sit amet.</p>
//       <button onClick={() => setColor('gray')}>Dark</button>
//       <button onClick={() => setColor('white')}>White</button>
//       <button onClick={() => setFontSize(fz => fontSize + 2)}>fz +</button>
//     </div>
//   );
// };

export default App;
