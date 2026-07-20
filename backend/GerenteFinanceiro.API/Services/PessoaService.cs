using GerenteFinanceiro.API.Data;
using GerenteFinanceiro.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenteFinanceiro.API.Services
{
    /*
     Implementa a comunicação direta com o banco de dados (Entity Framework) 
     que foram definidas na interface IPessoaService.
     */
    public class PessoaService : IPessoaService
    {
        private readonly SistemaDbContext _context;

        /*
         Construtor:
         Faz com que a classe acesse as tabelas sem precisar instanciar uma nova conexão manualmente.
         */
        public PessoaService(SistemaDbContext context)
        {
            _context = context;
        }

        /*
         Lógica: Utiliza o Entity Framework para fazer uma consulta na tabela de Pessoas 
         e converte o resultado para uma.
         */
        public async Task<List<Pessoa>> GetAllAsync()
        {
            return await _context.Pessoas.ToListAsync();
        }

        /*
         Lógica: Utiliza o método FindAsync para buscar 
         um registro diretamente pela seu id.
         */
        public async Task<Pessoa> GetByIdAsync(int id)
        {
            return await _context.Pessoas.FindAsync(id);
        }

        /*
         Lógica: 
         Adiciona a nova pesso Add, Salva no banco de dado, como um Insert e retorna o objeto atualizado.
         */
        public async Task<Pessoa> CreateAsync(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        /*
         * Lógica:
         Faz a query da pessoa pelo id, se não encontrar retorna false, se encontar deleta a pessoa
        e como foi criado o DeleteCascade tambem deleta as transações dessa pessoa.
         */
        public async Task<bool> DeleteAsync(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null) return false;

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}