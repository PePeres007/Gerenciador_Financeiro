import { useState } from 'react';
import FormularioTransacao from './FormularioTransacoes';
import ListaTransacoes from './ListaTransacoes';

export default function PainelTransacoes() {
  const [exibindoCadastro, setExibindoCadastro] = useState(false);

  return (
    <div className="painel-container">
      
      <header className="painel-header">
        <div>
          <h1 className="painel-title">
            Transações Financeiras
          </h1>
          <p className="painel-subtitle">
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

      {/* 
        O "bento-card-large" foi removido daqui! 
        Agora, a Lista e o Formulário vão gerenciar seus próprios cards.
      */}
      {exibindoCadastro ? (
        <FormularioTransacao />
      ) : (
        <ListaTransacoes />
      )}

    </div>
  );
}