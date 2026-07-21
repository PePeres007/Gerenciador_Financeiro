import { useEffect, useState } from 'react';
import { api } from '../../Services/Api';

interface Pessoa {
  id: number;
  nome: string;
}

interface Transacao {
  id: number;
  valor: number;
  tipo: number;
  pessoaId: number;
}

interface Resumo {
  pessoaId: number;
  nome: string;
  receitas: number;
  despesas: number;
  saldo: number;
}

export default function ConsultasDashboard() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  
  // Controle de quais pessoas estão selecionadas no filtro
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // Busca pessoas e transações simultaneamente (ganho de performance)
      const [respPessoas, respTransacoes] = await Promise.all([
        api.get('/pessoas'),
        api.get('/transacoes')
      ]);

      const listaPessoas: Pessoa[] = respPessoas.data;
      setPessoas(listaPessoas);
      setTransacoes(respTransacoes.data);
      
      // Por padrão, todas as pessoas começam selecionadas
      setSelecionadas(listaPessoas.map(p => p.id));
    } catch (erro) {
      console.error("Erro ao carregar dados do dashboard:", erro);
      alert("Falha ao carregar os dados de consulta.");
    } finally {
      setCarregando(false);
    }
  };

  // Função para lidar com o clique nos checkboxes de filtro
  const togglePessoa = (id: number) => {
    setSelecionadas(prev => 
      prev.includes(id) 
        ? prev.filter(pessoaId => pessoaId !== id) // Remove se já estiver
        : [...prev, id] // Adiciona se não estiver
    );
  };

  const selecionarTodas = () => setSelecionadas(pessoas.map(p => p.id));
  const limparFiltro = () => setSelecionadas([]);

  // Processamento Matemático: Cruza os dados apenas das pessoas selecionadas
  const gerarResumo = (): Resumo[] => {
    return pessoas
      .filter(p => selecionadas.includes(p.id))
      .map(pessoa => {
        const transacoesDaPessoa = transacoes.filter(t => t.pessoaId === pessoa.id);
        
        const receitas = transacoesDaPessoa
          .filter(t => t.tipo === 1)
          .reduce((acc, t) => acc + t.valor, 0);
          
        const despesas = transacoesDaPessoa
          .filter(t => t.tipo === 2)
          .reduce((acc, t) => acc + t.valor, 0);

        return {
          pessoaId: pessoa.id,
          nome: pessoa.nome,
          receitas,
          despesas,
          saldo: receitas - despesas
        };
      });
  };

  const resumos = gerarResumo();

  // Cálculo do Total Geral da tabela atual
  const totalGeralReceitas = resumos.reduce((acc, r) => acc + r.receitas, 0);
  const totalGeralDespesas = resumos.reduce((acc, r) => acc + r.despesas, 0);
  const totalGeralSaldo = totalGeralReceitas - totalGeralDespesas;

  // Utilitário de formatação de moeda
  const formatarMoeda = (valor: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  if (carregando) return <div className="loading-texto">Analisando matriz de dados...</div>;

  return (
    <div className="painel-container">
      <header className="painel-header">
        <div>
          <h1 className="painel-title">Consultas e Totais</h1>
          <p className="painel-subtitle">Visão consolidada do fluxo de caixa por usuário.</p>
        </div>
      </header>

      {/* Painel de Filtros Customizados */}
      <section className="bento-card">
        <div className="bento-header" style={{ marginBottom: 0 }}>
          <h2 className="bento-title">Filtrar Pessoas</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={selecionarTodas} className="btn-secundario" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>Marcar Todas</button>
            <button onClick={limparFiltro} className="btn-secundario" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}>Desmarcar Todas</button>
          </div>
        </div>
        
        <div className="filtro-grid">
          {pessoas.map(p => (
            <label key={p.id} className="checkbox-grupo">
              <input 
                type="checkbox" 
                checked={selecionadas.includes(p.id)}
                onChange={() => togglePessoa(p.id)}
              />
              <span style={{ fontWeight: 500, color: 'var(--color-fin-400)' }}>{p.nome}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Tabela de Resultados Consolidados */}
      <main className="bento-card-large">
        <h2 className="bento-title mb-6">Relatório de Fechamento</h2>
        
        <div className="tabela-wrapper">
          <table className="tabela-padrao">
            <thead>
              <tr className="tabela-linha-cabecalho">
                <th className="tabela-cabecalho">Pessoa</th>
                <th className="tabela-cabecalho">Total Receitas</th>
                <th className="tabela-cabecalho">Total Despesas</th>
                <th className="tabela-cabecalho">Saldo Líquido</th>
              </tr>
            </thead>
            <tbody>
              {resumos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="tabela-celula-vazia">Nenhuma pessoa selecionada para a consulta.</td>
                </tr>
              ) : (
                resumos.map((resumo) => (
                  <tr key={resumo.pessoaId} className="tabela-linha">
                    <td className="tabela-celula-destaque">{resumo.nome}</td>
                    <td className="tabela-celula-valor texto-receita">{formatarMoeda(resumo.receitas)}</td>
                    <td className="tabela-celula-valor texto-despesa">{formatarMoeda(resumo.despesas)}</td>
                    <td className={`tabela-celula-valor ${resumo.saldo >= 0 ? 'texto-receita' : 'texto-despesa'}`}>
                      {formatarMoeda(resumo.saldo)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            
            {/* Rodapé com os Totais Gerais */}
            {resumos.length > 0 && (
              <tfoot>
                <tr style={{ backgroundColor: 'rgba(71, 122, 58, 0.05)', borderTop: '2px solid rgba(71, 122, 58, 0.2)' }}>
                  <td className="tabela-celula-destaque" style={{ fontSize: '1.1rem' }}>TOTAL GERAL</td>
                  <td className="tabela-celula-valor texto-receita">{formatarMoeda(totalGeralReceitas)}</td>
                  <td className="tabela-celula-valor texto-despesa">{formatarMoeda(totalGeralDespesas)}</td>
                  <td className={`tabela-celula-valor ${totalGeralSaldo >= 0 ? 'texto-receita' : 'texto-despesa'}`} style={{ fontSize: '1.1rem' }}>
                    {formatarMoeda(totalGeralSaldo)}
                  </td>
                </tr>
              </tfoot>
            )}
            
          </table>
        </div>
      </main>
    </div>
  );
}