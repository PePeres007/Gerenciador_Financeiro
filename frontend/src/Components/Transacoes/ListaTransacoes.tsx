import { useEffect, useState } from 'react';
import { api } from '../../Services/Api';

interface Pessoa {
  id: number;
  nome: string;
}

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: number; 
  data: string;
  pessoaId: number;
  pessoa: {
    nome: string;
  };
}

export default function ListaTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [pessoasSelecionadas, setPessoasSelecionadas] = useState<number[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string>('todos');

  const carregarDados = async () => {
    try {
      const [respPessoas, respTransacoes] = await Promise.all([
        api.get('/pessoas'),
        api.get('/transacoes')
      ]);

      const listaPessoas: Pessoa[] = respPessoas.data;
      setPessoas(listaPessoas);
      setTransacoes(respTransacoes.data);
      setPessoasSelecionadas(listaPessoas.map(p => p.id));
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      alert("Não foi possível carregar o extrato e os filtros.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await api.delete(`/transacoes/${id}`);
        carregarDados(); 
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
      }
    }
  };

  const togglePessoa = (id: number) => {
    setPessoasSelecionadas(prev =>
      prev.includes(id)
        ? prev.filter(pessoaId => pessoaId !== id)
        : [...prev, id]
    );
  };

  const selecionarTodas = () => setPessoasSelecionadas(pessoas.map(p => p.id));
  const limparFiltro = () => setPessoasSelecionadas([]);

  const transacoesFiltradas = transacoes.filter(t => {
    const passaFiltroPessoa = pessoasSelecionadas.includes(t.pessoaId);
    const passaFiltroTipo = tipoSelecionado === 'todos' ? true : t.tipo === parseInt(tipoSelecionado);
    return passaFiltroPessoa && passaFiltroTipo;
  });

  if (carregando) return <div className="loading-texto">Carregando extrato...</div>;

  return (
    /* Container invisível que dá o espaçamento entre os dois cards */
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* CARD 1: PAINEL DE FILTROS */}
      <section className="bento-card">
        <div className="bento-header" style={{ marginBottom: '1rem' }}>
          <h3 className="bento-title" style={{ fontSize: '1.25rem' }}>Filtros de Busca</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={selecionarTodas} className="btn-secundario" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>Marcar Todas</button>
            <button onClick={limparFiltro} className="btn-secundario" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>Desmarcar Todas</button>
          </div>
        </div>

        <div className="form-grid" style={{ marginBottom: 0 }}>
          
          <div className="grupo-form">
            <label className="label-padrao">Filtrar por Pessoa</label>
            <div className="filtro-grid">
              {pessoas.map(p => (
                <label key={p.id} className="checkbox-grupo">
                  <input
                    type="checkbox"
                    checked={pessoasSelecionadas.includes(p.id)}
                    onChange={() => togglePessoa(p.id)}
                  />
                  <span style={{ fontWeight: 500, color: 'var(--color-fin-400)' }}>{p.nome}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grupo-form">
            <label className="label-padrao">Filtrar por Tipo</label>
            <select
              className="input-padrao"
              value={tipoSelecionado}
              onChange={(e) => setTipoSelecionado(e.target.value)}
            >
              <option value="todos">Todos os Tipos (Receitas e Despesas)</option>
              <option value="1">Apenas Receitas (+)</option>
              <option value="2">Apenas Despesas (-)</option>
            </select>
          </div>

        </div>
      </section>

      {/* CARD 2: TABELA DE EXTRATO*/}
      <section className="bento-card-large">
        <h2 className="bento-title mb-6">Extrato de Movimentações</h2>
        
        <div className="tabela-wrapper">
          <table className="tabela-padrao">
            <thead>
              <tr className="tabela-linha-cabecalho">
                <th className="tabela-cabecalho">Data</th>
                <th className="tabela-cabecalho">Pessoa</th>
                <th className="tabela-cabecalho">Descrição</th>
                <th className="tabela-cabecalho">Valor</th>
                <th className="tabela-cabecalho-centro">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transacoesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="tabela-celula-vazia">
                    Nenhuma transação encontrada para os filtros aplicados.
                  </td>
                </tr>
              ) : (
                transacoesFiltradas.map((t) => (
                  <tr key={t.id} className="tabela-linha">
                    <td className="tabela-celula">{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                    <td className="tabela-celula-destaque">{t.pessoa?.nome || 'Desconhecida'}</td>
                    <td className="tabela-celula">{t.descricao}</td>
                    <td className={`tabela-celula-valor ${t.tipo === 1 ? 'texto-receita' : 'texto-despesa'}`}>
                      {t.tipo === 1 ? '+ ' : '- '}
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
                    </td>
                    <td className="tabela-celula-centro">
                      <button onClick={() => handleDelete(t.id)} className="btn-excluir">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}