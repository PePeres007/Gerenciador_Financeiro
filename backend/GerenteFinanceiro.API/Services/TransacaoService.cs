using GerenteFinanceiro.API.Data;
using GerenteFinanceiro.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GerenteFinanceiro.API.Services
{
    /*
     * Classe de serviço que implementa as regras de negócio para Transações.
     * Faz a comunicação direta e segura com o banco de dados (Supabase) 
     * utilizando os métodos do Entity Framework.
     */
    public class TransacaoService : ITransacaoService
    {
        private readonly SistemaDbContext _context;

        public TransacaoService(SistemaDbContext context)
        {
            _context = context;
        }

        /*
         Retorna todas as transações.
         Utiliza o .Include() para realizar o JOIN (junção) com a tabela de Pessoas,
         trazendo os dados completos do dono da transação na mesma consulta.
         */
        public async Task<IEnumerable<Transacao>> BuscarTodasAsync()
        {
            return await _context.Transacoes
                .Include(t => t.Pessoa)
                .ToListAsync();
        }

        /*
         Adiciona uma nova transação ao contexto e salva as alterações no banco.
         Retorna a transação atualizada com o id gerado automaticamente.
         */
        public async Task<Transacao> AdicionarAsync(Transacao transacao)
        {
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            return transacao;
        }

        /*
         Busca uma transação pelo id. Se ela existir, remove do banco e salva.
         Retorna true se a exclusão foi bem-sucedida, ou false caso o registro não exista.
         */
        public async Task<bool> DeletarAsync(int id)
        {
            var transacao = await _context.Transacoes.FindAsync(id);

            /* Verifica se a transação realmente existe antes de tentar excluí-la */
            if (transacao == null) return false;

            _context.Transacoes.Remove(transacao);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}