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

const App = () => {
  const [inputsearch, setInputSearch] = useState('');
  const [responseIMG, setResponseIMG] = useState([]);
  const [curPg, setCurPg] = useState('');
  const [loading, setLoading] = useState(false);
  // для умов сповіщенням 1
  const [status, setStatus] = useState('');
  // для умов сповіщенням 2
  const [respHits, setRespHits] = useState([]);
    // для умов сповіщенням 3
  const [totall, setTotall] = useState('');


  // отримувач з форми скидач сторінки та галереї
  const submiterFromForm = inputSearch => {
    setInputSearch(inputSearch);
    setCurPg(1);
    setResponseIMG([]);
    // console.log(inputSearch, "Є");
  };

  // давай ще
  const givMeMore = () => {
    setCurPg(prevCurpg => prevCurpg + 1);
  };
  // запитувач

  useEffect(() => {
    if (!inputsearch) {
      return;
    }
    //  лодер +...
    setLoading(true);
    fetchIMG(inputsearch, curPg)
      .then(respImg => {
        // якщо пагінація
        curPg > 1 && status === 200
          ? setResponseIMG(prevResponseIMG => [
              ...prevResponseIMG,
              ...respImg.data.hits,
            ])
          : // якщо вперше
            setResponseIMG(respImg.data.hits);
//  для сповіщення 1
          setTotall(respImg.data.totalHits);
// для  сповіщення 2
        setRespHits(respImg.data.hits);
        // для сповіщення 3
        setStatus(200);
      })
      .catch(error => {
        toast.warn(`🐒Отакої! ${error} 🐒`);
      })
      // вимикання лодеря
      .finally(() => {
        setLoading(false);
      });
  }, [curPg, inputsearch, status]);



  // скільки знайшли
  useEffect(() => {
    if (responseIMG.length !== 0 && curPg === 1 && status === 200) {
      toast.success(`🐒Ми знайшли ${totall} 🍌..., світлин 🐒`);
    }
  }, [curPg, responseIMG.length, status, totall]);
  // // нічого не знайшли
  useEffect(() => {
    if (respHits.length === 0 && status === 200) {
      toast.warn(`🐒 Ми нічого не знайшли 🐒`);
    }
  }, [respHits.length, status ]);

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
      {responseIMG.length !== 0 && loading === false && (
        <Button
          // // метод пропс попвнення галереї
          givMeMore={givMeMore}
        />
      )}
    </div>
  );
};

export default App;
