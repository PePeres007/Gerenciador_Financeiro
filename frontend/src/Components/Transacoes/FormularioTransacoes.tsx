import React, { useState, useEffect } from 'react';
import { api } from '../../Services/Api';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function FormularioTransacao() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  
  // Campos do formulário
  const [pessoaId, setPessoaId] = useState<string>('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<number>(1); // 1 = Receita, 2 = Despesa
  
  // Controle
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

  // Avalia a idade assim que uma pessoa é selecionada
  const handlePessoaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSelecionado = e.target.value;
    setPessoaId(idSelecionado);

    const pessoa = pessoas.find(p => p.id === parseInt(idSelecionado));
    
    if (pessoa && pessoa.idade < 18) {
      setMenorDeIdade(true);
      setTipo(2); // Força para Despesa automaticamente
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fade-in">
      <h2 className="text-xl font-bold text-fin-300 border-b border-fin-100/20 pb-2">Nova Movimentação</h2>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-fin-400">Pessoa Vinculada</label>
        <select 
          value={pessoaId} 
          onChange={handlePessoaChange}
          className="p-3 rounded-lg border border-fin-200 focus:outline-none focus:ring-2 focus:ring-fin-300"
          required
        >
          <option value="" disabled>Selecione uma pessoa...</option>
          {pessoas.map(p => (
            <option key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold text-fin-400">Descrição</label>
        <input 
          type="text" 
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex: Compra de Equipamento" 
          className="p-3 rounded-lg border border-fin-200 focus:outline-none focus:ring-2 focus:ring-fin-300"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-fin-400">Valor (R$)</label>
          <input 
            type="number" 
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0.00" 
            className="p-3 rounded-lg border border-fin-200 focus:outline-none focus:ring-2 focus:ring-fin-300"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-fin-400">Tipo</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(parseInt(e.target.value))}
            className="p-3 rounded-lg border border-fin-200 focus:outline-none focus:ring-2 focus:ring-fin-300"
            disabled={menorDeIdade} // Desabilita se for menor de 18
          >
            <option value={1}>Receita</option>
            <option value={2}>Despesa</option>
          </select>
          {menorDeIdade && (
            <span className="text-xs text-red-500 font-medium mt-1">
              * Menores de 18 anos só podem registrar despesas.
            </span>
          )}
        </div>
      </div>

      <button type="submit" className="btn-primario mt-4 py-3 text-lg">
        Salvar Transação
      </button>
    </form>
  );
}