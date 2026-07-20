import React from 'react';
import './styles/LayoutPrincipal.css';
import PainelPessoas from '../src/Components/Pessoas/PainelPessoas';

function App() {
  return (
    <div className="layout-container">
      
      <aside className="layout-sidebar">
        <h2 className="text-2xl font-black text-fin-100 tracking-wider">
          GERENTE<br/>FINANCEIRO
        </h2>
        <nav className="mt-8 flex flex-col gap-2">
          {/* Botão ativo com destaque refinado */}
          <button className="text-left px-4 py-2 rounded-lg bg-fin-300/20 text-fin-100 font-bold border-r-4 border-fin-100 transition-colors">
            Pessoas
          </button>
          <button className="text-left px-4 py-2 rounded-lg hover:bg-fin-300/10 text-white/80 hover:text-white transition-colors">
            Transações
          </button>
        </nav>
      </aside>

      <main className="layout-content">
        {/* Renderizando a tela total que acabamos de criar */}
        <PainelPessoas />
      </main>

    </div>
  );
}

export default App;