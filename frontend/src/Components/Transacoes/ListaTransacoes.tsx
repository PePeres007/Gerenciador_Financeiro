import { useEffect, useState } from 'react';
import { api } from '../../Services/Api';

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: number; // 1 = Receita, 2 = Despesa
  data: string;
  pessoa: {
    nome: string;
  };
}

export default function ListaTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarTransacoes = async () => {
    try {
      const resposta = await api.get('/transacoes');
      setTransacoes(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar transações:", erro);
      alert("Não foi possível carregar o extrato.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await api.delete(`/transacoes/${id}`);
        carregarTransacoes();
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
      }
    }
  };

  if (carregando) return <div className="text-center p-8 animate-pulse">Carregando extrato...</div>;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-fin-300 mb-6">Extrato de Movimentações</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-fin-100/20 text-fin-400">
              <th className="p-3 font-semibold">Data</th>
              <th className="p-3 font-semibold">Pessoa</th>
              <th className="p-3 font-semibold">Descrição</th>
              <th className="p-3 font-semibold">Valor</th>
              <th className="p-3 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-fin-200">Nenhuma transação registrada.</td>
              </tr>
            ) : (
              transacoes.map((t) => (
                <tr key={t.id} className="border-b border-fin-100/10 hover:bg-fin-100/5">
                  <td className="p-3 text-fin-300">{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                  <td className="p-3 font-medium">{t.pessoa?.nome || 'Desconhecida'}</td>
                  <td className="p-3 text-fin-400">{t.descricao}</td>
                  <td className={`p-3 font-bold ${t.tipo === 1 ? 'text-green-600' : 'text-red-500'}`}>
                    {t.tipo === 1 ? '+ ' : '- '}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => handleDelete(t.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}