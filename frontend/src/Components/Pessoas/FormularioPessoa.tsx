import React, { useState } from 'react';
import { api } from '../../Services/Api';

export default function FormularioPessoa() {
  // Requisitos do banco de dados
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Fazendo a requisição POST para o backend
      // Convertendo a idade para número inteiro para casar com o tipo "int" do C#
      await api.post('/pessoas', {
        nome: nome,
        idade: parseInt(idade, 10) 
      });
      
      alert('Pessoa cadastrada com sucesso!');
      
      // Limpa os campos
      setNome('');
      setIdade('');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert('Ocorreu um erro ao tentar salvar os dados.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-left animate-fade-in">
      <h2 className="text-2xl font-bold text-fin-300 mb-6">Nova Pessoa</h2>
      
      {/* Grid responsivo adaptado para 2 campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Campo Nome */}
        <div className="md:col-span-1">
          <label className="label-padrao" htmlFor="nome">Nome Completo</label>
          <input 
            type="text" 
            id="nome"
            className="input-padrao" 
            placeholder="Ex: João da Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        {/* Campo Idade */}
        <div className="md:col-span-1">
          <label className="label-padrao" htmlFor="idade">Idade</label>
          <input 
            type="number" 
            id="idade"
            className="input-padrao" 
            placeholder="Ex: 30"
            min="0"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>

      </div>

      <div className="flex justify-end gap-4 border-t border-fin-100/20 pt-6">
        <button 
          type="button" 
          className="btn-secundario"
          onClick={() => {
            setNome('');
            setIdade('');
          }}
        >
          Limpar
        </button>
        <button type="submit" className="btn-primario">
          Salvar Cadastro
        </button>
      </div>
    </form>
  );
}