import React, { useState } from 'react';
import FormularioPessoa from './FormularioPessoa';
import ListaPessoas from './ListaPessoas';

export default function PainelPessoas() {
  const [exibindoCadastro, setExibindoCadastro] = useState(false);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-fin-400 tracking-tight">
            Gestão de Pessoas
          </h1>
          <p className="text-fin-200/80 font-medium mt-1">
            Administre os clientes e usuários do seu sistema.
          </p>
        </div>

        <button 
          className="btn-primario"
          onClick={() => setExibindoCadastro(!exibindoCadastro)}
        >
          {exibindoCadastro ? '← Voltar para Lista' : '+ Nova Pessoa'}
        </button>
      </header>

      <main className="bento-card min-h-[400px]">
        {exibindoCadastro ? (
          <FormularioPessoa />
        ) : (
          <ListaPessoas />
        )}
      </main>

    </div>
  );
}