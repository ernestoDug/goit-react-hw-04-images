import { ToastContainer } from 'react-toastify';
// npm i react-toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader/Loader';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { fetchIMG } from '../helpers/fetchIMG';
import { useState, useEffect } from 'react';

const  App = () => {
  
const [inputsearch, setInputSearch] = useState('');
const [responseIMG, setResponseIMG] = useState([]);
// const [isLoading, setIsloading] = useState(false);

const [curPg, setCurPg] = useState('');
const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);
const [totall, setTotall] = useState('');
const [status, setStatus] = useState('');


  // отримувач з форми скидач сторінки та галереї
  const  submiterFromForm = inputSearch => {
    setInputSearch(inputSearch);
    setCurPg(1);
    setResponseIMG([])
    // console.log(inputSearch, "Є");
  };

  
  // давай ще
  const givMeMore = () => {
    setCurPg(prevCurpg => prevCurpg + 1);
    };
    // запитувач


useEffect(
  ()=> 
{
  if(!inputsearch)
  {
    return
  }
  //  вмикання  лодеря...
  setLoading(true);
 fetchIMG(inputsearch, curPg)
 
 .then(respImg => 
  {
    
  // якщо пагінація
  curPg > 1 && status === 200
    ? // this.setState({responseIMG: [...this.state.responseIMG, ...respImg.data.hits]})
     setResponseIMG(prevResponseIMG => ([...prevResponseIMG, ...respImg.data.hits]),
     )
  : // якщо вперше
  setResponseIMG(respImg.data.hits);
  
  // **************f
  setTotall(respImg.data.totalHits);
  // що знайшли
  setStatus(200);
     }
)
.catch((error) =>  {
  // setError( error );
  toast.warn(`🐒Отакої! ${error} 🐒`);
})
// вимикання лодеря
.finally(()=>{
  setLoading(false)
}) 
// return ()=> {setCurPg(curPg +1)}
}, [curPg, inputsearch, status])
// скільки знайшли
useEffect(()=> {if (
  responseIMG.length !== 0 && curPg === 1 && status === 200  
)
 {
  toast.success(
    `🐒Ми знайшли ${totall} 🍌..., світлин 🐒`
    );
            }},[curPg, responseIMG.length, status, totall])
// // нічого не знайшли
useEffect(()=>{if (responseIMG.length === 0 && status === 200 ) {
  toast.warn(`🐒 Ми нічого не знайшли 🐒`);
  }},[responseIMG.length, status])

    return (
      <div>
        <Searchbar onSubmit={submiterFromForm} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* лоадер чи галерея?  */}

        {responseIMG.length !== 0 && (
          <>
            <ImageGallery
              // метод пропс для галерії
              imageForGalery={responseIMG}
              />
              {loading === true && <Loader />}
          </>
        )}

        {/* кнопка */}
        {(responseIMG.length !== 0 && loading === false) && (
          <Button
            // // метод пропс попвнення галереї
            givMeMore={givMeMore}
          />
        )} 
      </div>
    );
  }


export default App;
