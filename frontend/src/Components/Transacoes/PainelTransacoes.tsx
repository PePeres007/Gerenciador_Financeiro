import React, { useState } from 'react';
import FormularioTransacao from '../Transacoes/FormularioTransacoes';
import ListaTransacoes from '../Transacoes/ListaTransacoes';

export default function PainelTransacoes() {
  const [exibindoCadastro, setExibindoCadastro] = useState(false);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-fin-400 tracking-tight">
            Transações Financeiras
          </h1>
          <p className="text-fin-200/80 font-medium mt-1">
            Controle as receitas e despesas vinculadas aos usuários.
          </p>
        </div>

        <button 
          className="btn-primario"
          onClick={() => setExibindoCadastro(!exibindoCadastro)}
        >
          {exibindoCadastro ? '← Voltar para Extrato' : '+ Nova Transação'}
        </button>
      </header>

      <main className="bento-card min-h-[400px]">
        {exibindoCadastro ? (
          <FormularioTransacao />
        ) : (
          <ListaTransacoes />
        )}
      </main>

    </div>
  );
}