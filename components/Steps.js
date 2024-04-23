import React from 'react'; // Importa a biblioteca React

const Steps = () => { // Declaração do componente funcional Steps
    return (
        <div className='pt-8'> {/* Div para o componente Steps */}
            <ul className="steps text-lime-400"> {/* Lista de etapas com estilos */}
                <li className="step step-success">Registre sua renda</li> {/* Item da lista: Registre sua renda */}
                <li className="step step-success">Crie uma categoria</li> {/* Item da lista: Crie uma categoria */}
                <li className="step step-success">Adicione sua despesa</li> {/* Item da lista: Adicione sua despesa */}
                <li className="step step-success">Verifique o gráfico</li> {/* Item da lista: Verifique o gráfico */}
            </ul>
        </div>
    )
}

export default Steps; // Exporta o componente Steps para ser utilizado em outros lugares da aplicação
