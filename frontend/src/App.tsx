import { useState } from 'react';
import PainelPessoas from './Components/Pessoas/PainelPessoas'; 
import PainelTransacoes from './Components/Transacoes/PainelTransacoes'; 
import ConsultasDashboard from './Components/Dashboard/ConsultasDashboard'; 

export default function App() {
  const [abaAtiva, setAbaAtiva] = useState<'pessoas' | 'transacoes' | 'dashboard'>('pessoas');

  return (
    <div className="layout-container">
      
      <header className='layout-header'>
        <h1 className="layout-header-title">
          Gerenciador Financeiro
        </h1>
        
        <nav className="layout-nav">
          <button 
            onClick={() => setAbaAtiva('pessoas')}
            className={abaAtiva === 'pessoas' ? 'btn-nav-ativo' : 'btn-nav'}
          >
            Gestão de Pessoas
          </button>
          
          <button 
            onClick={() => setAbaAtiva('transacoes')}
            className={abaAtiva === 'transacoes' ? 'btn-nav-ativo' : 'btn-nav'}
          >
            Gestão Financeira
          </button>

          <button 
            onClick={() => setAbaAtiva('dashboard')}
            className={abaAtiva === 'dashboard' ? 'btn-nav-ativo' : 'btn-nav'}
          >
           Consultas & Dashboard
          </button>
        </nav>
      </header>

      {/* Área Principal - Limpa, sem overflow-y-auto e sem bg-gray! */}
      <main className="layout-content">
        {abaAtiva === 'pessoas' && <PainelPessoas />}
        {abaAtiva === 'transacoes' && <PainelTransacoes />}
        {abaAtiva === 'dashboard' && <ConsultasDashboard />}
      </main>
      
    </div>
  );
}