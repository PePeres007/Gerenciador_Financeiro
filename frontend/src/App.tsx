import React, { useState } from 'react';
import PainelPessoas from './Components/Pessoas/PainelPessoas'; 
import PainelTransacoes from './Components/Transacoes/PainelTransacoes'; 

export default function App() {
  // Estado para controlar qual aba está ativa no menu lateral
  const [abaAtiva, setAbaAtiva] = useState<'pessoas' | 'transacoes'>('pessoas');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Menu Lateral (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-fin-400">
          Gerente Financeiro
        </h1>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setAbaAtiva('pessoas')}
            className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
              abaAtiva === 'pessoas' 
                ? 'bg-fin-400 text-white' 
                : 'text-gray-400 hover:bg-slate-800 hover:text-gray-200'
            }`}
          >
            👥 Gestão de Pessoas
          </button>
          
          <button 
            onClick={() => setAbaAtiva('transacoes')}
            className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
              abaAtiva === 'transacoes' 
                ? 'bg-fin-400 text-white' 
                : 'text-gray-400 hover:bg-slate-800 hover:text-gray-200'
            }`}
          >
            💸 Transações
          </button>
        </nav>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 p-8 overflow-y-auto">
        {abaAtiva === 'pessoas' ? <PainelPessoas /> : <PainelTransacoes />}
      </main>
    </div>
  );
}