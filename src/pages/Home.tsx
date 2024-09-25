import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from 'axios';

var Array:any = [];

interface CardProps {
  titulo: string; 
  numero: string;
  dados: any;
}

function getRandomElement(arr:any) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}


const Card: React.FC<CardProps> = ({ titulo,numero,dados}) => {

  const [tecnologias,setTecnologias] = useState<any>([]);
  const [status,setStatus] = useState<any>(0);


  useEffect(() => {   
    return () => {
        axios.get(`http://localhost:9999/tecnologias/${numero}`)
        .then(function (response) {
          const dados_aleatorios = [getRandomElement(response.data)];
            setTecnologias(dados_aleatorios);
            dados((prevItens:any) => [...prevItens, dados_aleatorios[0]]);
          // dados_aleatorios.map((item:any) => {
          //   Array.push(item.id);
          // })
          
          // dados(dados_aleatorios);      
          // setKeyAleatoria(Math.floor(Math.random() * tecnologias.length));
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          
          // setTimeout(() => {
            setStatus(1);
  
          // }, 3000);
             
        });


        
    };
  }, []);

 

  // if(!status){
  //   return(
  //     <h1>Carregando...</h1>
  //   )
  // }

  return (
    <div className='col-5 col-md-2 text-center'>

      <h3>{titulo}</h3>
      <div className="d-flex card-tecnologia col-12 rounded-3 shadow-sm">
        {tecnologias.map((item:any,key:any) => <div className='d-flex align-items-center flex-wrap m-auto justify-content-between' key={key}><img className="col-4 m-auto" src={`assets/${item.id}.png`} alt="" /><p className='fw-bolder col-12'>{item.tecn_tx_nome}</p></div>)}
      </div>
    </div>
  );
}


const Home = () => {

    const [categorias,setCategorias] = useState<any>([]);
    const [dadossorteio,setDadosSorteio] = useState<any>([]);
    
    function sortear(){
          setCategorias([]);
          axios.get('http://localhost:9999/categorias/')
          .then(function (response) {
            setCategorias(response.data);
          })
          .catch(function (error) {
            console.error(error);
          })
          .finally(function () {
            
          });
    }
    useEffect(() => {   
      return () => {     
       sortear();
      };
    }, []);

    
  return (
      <>
        <div className="col-12 d-flex flex-wrap justify-content-between container">

          <div className="col-12 text-center mb-5">
              <h1>Escolhedor de Tecnologias</h1>
          </div>
          {/* {
  Array.map((item:any) => <h3>{item}</h3>)
} */}

          {categorias.map((item:any,key:any) => 
            <Card titulo={item.cate_tx_nome} numero={item.id} key={key} dados={setDadosSorteio}/>
          )}

{/* {
  dadossorteio.map((item:any) => <><h1>{item.tecn_tx_nome}</h1><br/></>)
} */}
         <div className="col-12">
            <div className="d-flex col-12 mt-5 mb-3 text-center">
                <button className="btn btn-warning" onClick={()=>sortear()}>SORTEAR TECNOLOGIAS</button>
            </div>
          </div>
        </div>
      </>
  )
}

export default Home;