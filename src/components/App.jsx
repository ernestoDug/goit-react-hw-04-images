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
const [isLoading, setIsloading] = useState(false);
const [curPg, setCurPg] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [totall, setTotall] = useState('')


  // отримувач з форми скидач сторінки та галереї
  const  submiterFromForm = inputSearch => {
    setInputSearch(inputSearch);
    setCurPg(1);
    setResponseIMG([])
    // console.log(this.state.responseIMG, "Є");
  };

  
  // давай ще
  const givMeMore = () => {
    setCurPg(prevState => prevState + 1);
    };
    // запитувач

useEffect(
  ()=> 
{
 //  вмикання  лодеря...
 setLoading(true);
  fetchIMG(inputsearch, curPg)
 
 .then(respImg => 
  {
  // якщо пагінація
  // curPg > 1 && respImg.request.status === 200
  //   ? // this.setState({responseIMG: [...this.state.responseIMG, ...respImg.data.hits]})
  //    setResponseIMG(prevState => ([...prevState.responseIMG, ...respImg.data.hits],
  //     setTotall(respImg.data.totalHits)
  //          )
  //     )
  //  : // якщо вперше
      setResponseIMG(respImg.data.hits);
  // що знайшли
   }
 )

.catch((error) =>  {
setError( error );
toast.warn(`🐒Отакої! ${error} 🐒`)
})
// вимикання лодеря

.finally(()=>{
  setIsloading(false)
  }) 


}, [inputsearch, curPg])
if (
  responseIMG.length !== 0 &&
  curPg === 1
)
 {
  toast.success(
    `🐒Ми знайшли ${totall} 🍌..., світлин 🐒`
  );
}

// нічого не знайшли
if (responseIMG.length === 0) {
  toast.warn(`🐒 Ми нічого не знайшли 🐒`);
}

      

    return (
      <div>
        <Searchbar onSubmit={givMeMore} />
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
        {loading === true && <Loader />}

        {responseIMG.length !== 0 && (
          <>
            <ImageGallery
              // метод пропс для галерії
              imageForGalery={responseIMG}
            />
          </>
        )}

        {/* кнопка */}
        {/* {(responseIMG.length !== 0 && loading === false) && ( */}
          <Button
            // // метод пропс попвнення галереї
            givMeMore={givMeMore}
          />
        {/* )} */}
      </div>
    );
  }


export default App;
