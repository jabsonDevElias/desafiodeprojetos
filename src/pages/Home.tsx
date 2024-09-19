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
  const [status,setStatus] = useState<any>(0);

  useEffect(() => {   
    // return () => {
        axios.get(`http://localhost:9999/tecnologias/${numero}`)
        .then(function (response) {
          setTecnologias([getRandomElement(response.data)]);
          
          // setKeyAleatoria(Math.floor(Math.random() * tecnologias.length));
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(function () {
          setTimeout(() => {
            setStatus(1);
          }, 3000);
             
        });
    // };
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
        {tecnologias.map((item:any,key:any) => <div className='d-flex align-items-center flex-wrap m-auto justify-content-between'><img className="col-4 m-auto" src={`assets/${item.id}.png`} alt="" /><p className='fw-bolder col-12'>{item.tecn_tx_nome}</p></div>)}
      </div>
    </div>
  );
}


const Home = () => {

    const [categorias,setCategorias] = useState<any>([]);

    // useEffect(() => {   
    //   return () => {
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
          {categorias.map((item:any) => 
            <Card titulo={item.cate_tx_nome} numero={item.id} key={item.id}/>
          )}

         <div className="col-12">
            <div className="d-flex col-4 mt-5 mb-3 text-center justify-content-between">
                <button className="btn btn-warning" onClick={()=>sortear()}>SORTEAR TECNOLOGIAS</button>
                <button className="btn btn-success" onClick={()=>sortear()}>CADASTRAR SORTEIO</button>
            </div>
          </div>

          <div className="col-12 mt-5 ">
              <table className="table table-dark table-custom">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome do Projeto</th>
                    {categorias.map((item:any) => 
                        <th scope="col">{item.cate_tx_nome}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr> */}
                </tbody>
              </table>
          </div>
        </div>
      </>
  )
}

export default Home;