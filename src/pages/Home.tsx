import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from 'axios';


interface CardProps {
  titulo: string; 
  numero: string;
}

function getRandomElement(arr:any) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

const Card: React.FC<CardProps> = ({ titulo,numero }) => {

  const [tecnologias,setTecnologias] = useState<any>([]);

  useEffect(() => {   
    return () => {
        axios.get(`http://localhost:9999/tecnologias/${numero}`)
        .then(function (response) {
          setTecnologias([getRandomElement(response.data)]);
          
          // setKeyAleatoria(Math.floor(Math.random() * tecnologias.length));
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {

        });
    };
  }, []);

  return (
    <div className='col-2 text-center'>
      <h3>{titulo}</h3>
      <div className="card-tecnologia col-12 rounded-3 border border-dark">
        {tecnologias.map((item:any,key:any) => <div className='m-auto'><img className="col-4" src={`assets/${item.id}.png`} alt="" /><p className='fw-bolder'>{item.tecn_tx_nome}</p></div>)}
      </div>
    </div>
  );
}


const Home = () => {

    const [categorias,setCategorias] = useState<any>([]);

    useEffect(() => {   
      return () => {
          // Faz uma requisição a um usuarío com um ID expecifico
          axios.get('http://localhost:9999/categorias/')
          .then(function (response) {
            // manipula o sucesso da requisição
            setCategorias(response.data);
          })
          .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
          })
          .finally(function () {
            // sempre será executado
          });
      };
    }, []);

    

  return (
      <>
        <div className="col-12 d-flex flex-wrap justify-content-between">

          {categorias.map((item:any) => 
            <Card titulo={item.cate_tx_nome} numero={item.id} key={item.id}/>
          )}

          <div className="col-12 mt-5 mb-3 text-center">
              <button className="btn btn-success">SORTEAR TECNOLOGIAS</button>
          </div>
        </div>
      </>
  )
}

export default Home;