import React, { useState, useEffect } from 'react';
import { api } from '../../Services/Api';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function FormularioTransacao() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  
  const [pessoaId, setPessoaId] = useState<string>('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<number>(1);
  
  const [menorDeIdade, setMenorDeIdade] = useState(false);

  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    try {
      const resposta = await api.get('/pessoas');
      setPessoas(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar pessoas:", erro);
    }
  };

  const handlePessoaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSelecionado = e.target.value;
    setPessoaId(idSelecionado);

    const pessoa = pessoas.find(p => p.id === parseInt(idSelecionado));
    
    if (pessoa && pessoa.idade < 18) {
      setMenorDeIdade(true);
      setTipo(2); 
    } else {
      setMenorDeIdade(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pessoaId) {
      alert("Por favor, selecione uma pessoa.");
      return;
    }

    try {
      await api.post('/transacoes', {
        descricao,
        valor: parseFloat(valor),
        tipo,
        pessoaId: parseInt(pessoaId)
      });
      
      alert('Transação salva com sucesso!');
      setDescricao('');
      setValor('');
      setPessoaId('');
      setTipo(1);
      setMenorDeIdade(false);
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      alert("Ocorreu um erro ao salvar a transação.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container bento-card-large">
      <h2 className="form-title">Nova Movimentação</h2>

      <div className="form-grid">
        <div className="grupo-form">
          <label className="label-padrao">Pessoa Vinculada</label>
          <select 
            value={pessoaId} 
            onChange={handlePessoaChange}
            className="input-padrao"
            required
          >
            <option value="" disabled>Selecione uma pessoa...</option>
            {pessoas.map(p => (
              <option key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</option>
            ))}
          </select>
        </div>

        <div className="grupo-form">
          <label className="label-padrao">Descrição</label>
          <input 
            type="text" 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Compra de Equipamento" 
            className="input-padrao"
            required
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="grupo-form">
          <label className="label-padrao">Valor (R$)</label>
          <input 
            type="number" 
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0.00" 
            className="input-padrao"
            required
          />
        </div>

        <div className="grupo-form">
          <label className="label-padrao">Tipo</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(parseInt(e.target.value))}
            className="input-padrao"
            disabled={menorDeIdade} 
          >
            <option value={1}>Receita</option>
            <option value={2}>Despesa</option>
          </select>
          {menorDeIdade && (
            <span className="msg-alerta-erro">
              * Menores de 18 anos só podem registrar despesas.
            </span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primario">
          Salvar Transação
        </button>
      </div>
    </form>
  );
}