import React from 'react';


function App() {
  return (
    <div className="layout-container">
      
      {/* Menu Lateral usando os tons mais escuros da sua paleta */}
      <aside className="layout-sidebar">
        <h2 className="text-2xl font-black text-fin-100 tracking-wider">
          GERENTE<br/>FINANCEIRO
        </h2>
        <nav className="mt-8 flex flex-col gap-2">
          {/* Exemplo de botão no menu */}
          <button className="text-left px-4 py-2 rounded bg-fin-300 hover:bg-fin-200 transition-colors">
            Pessoas
          </button>
          <button className="text-left px-4 py-2 rounded hover:bg-fin-300 transition-colors">
            Transações
          </button>
        </nav>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="layout-content">
        <h1 className="layout-header-title">
          Painel de Controle
        </h1>
        
        {/* Aqui entrarão os componentes de listagem e formulário */}
        <div className="bg-white p-6 rounded shadow-md border-t-4 border-fin-100">
          <p className="text-fin-300 font-medium">Bem-vindo ao sistema de gerenciamento.</p>
        </div>
      </main>

    </div>
  );
}

export default App;