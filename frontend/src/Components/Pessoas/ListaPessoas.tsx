import { useEffect, useState } from 'react';
import { api } from '../../Services/Api';

// Definindo o formato exato dos dados que vêm do C#
interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export default function ListaPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar os dados na API
  const carregarPessoas = async () => {
    try {
      const resposta = await api.get('/pessoas');
      setPessoas(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar pessoas:", erro);
      alert("Não foi possível carregar a lista de pessoas.");
    } finally {
      setCarregando(false);
    }
  };

  // O useEffect faz a busca automática assim que o componente aparece na tela
  useEffect(() => {
    carregarPessoas();
  }, []);

  // Função para deletar acionando o Delete Cascade no Back-end
  const handleDelete = async (id: number, nome: string) => {
    const confirmacao = window.confirm(
      `Atenção! Você tem certeza que deseja excluir ${nome}?\n\nIsso também apagará TODOS os registros financeiros ligados a essa pessoa (Delete Cascade).`
    );

    if (confirmacao) {
      try {
        await api.delete(`/pessoas/${id}`);
        alert('Registro excluído com sucesso.');
        // Atualiza a tabela chamando a API novamente
        carregarPessoas();
      } catch (erro) {
        console.error("Erro ao excluir:", erro);
        alert("Ocorreu um erro ao tentar excluir a pessoa.");
      }
    }
  };

  if (carregando) {
    return <div className="text-center text-fin-300 p-8 font-medium animate-pulse">Carregando dados...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-fin-300 mb-6">Pessoas Cadastradas</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-fin-100/20 text-fin-400">
              <th className="p-3 font-semibold">ID</th>
              <th className="p-3 font-semibold">Nome</th>
              <th className="p-3 font-semibold">Idade</th>
              <th className="p-3 font-semibold text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-fin-200 font-medium">
                  Nenhuma pessoa cadastrada ainda.
                </td>
              </tr>
            ) : (
              pessoas.map((pessoa) => (
                <tr 
                  key={pessoa.id} 
                  className="border-b border-fin-100/10 hover:bg-fin-100/5 transition-colors"
                >
                  <td className="p-3 text-fin-300 font-medium">#{pessoa.id}</td>
                  <td className="p-3 text-fin-400 font-semibold">{pessoa.nome}</td>
                  <td className="p-3 text-fin-300">{pessoa.idade} anos</td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => handleDelete(pessoa.id, pessoa.nome)}
                      className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300"
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