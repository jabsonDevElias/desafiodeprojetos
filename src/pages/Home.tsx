import React from 'react'
import "./Home.scss";


interface CardProps {
  titulo: string; 
}

const Card: React.FC<CardProps> = ({ titulo }) => {
  return (
    <div className='col-2 text-center'>
      <h3>{titulo}</h3>
      <div className="card-tecnologia col-12 rounded-3 border border-dark">
        
      </div>
    </div>
  );
}


const Home = () => {
  return (
      <>
        <div className="col-12 d-flex flex-wrap justify-content-between">
          <Card titulo='Front-End'/>
          <Card titulo='Back-End'/>
          <Card titulo='Banco de Dados'/>
          <Card titulo='DevOps'/>

          <div className="col-12 mt-5 mb-3 text-center">
              <button className="btn btn-success">SORTEAR TECNOLOGIAS</button>
          </div>
        </div>
      </>
  )
}

export default Home;