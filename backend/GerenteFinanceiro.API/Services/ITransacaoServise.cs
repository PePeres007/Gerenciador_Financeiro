using GerenteFinanceiro.API.Models;

namespace GerenteFinanceiro.API.Services
{
    /*
     Interface ITransacaoService:
     Define o contrato de operações para a entidade transacao.
     */
    public interface ITransacaoService
    {
        /* 
         Retorna uma lista com todas as transações cadastradas no banco de dados. 
         */
        Task<IEnumerable<Transacao>> BuscarTodasAsync();

        /* 
        Pega o objeto transacao, salva no banco e logo depois ja retorna ele com seu id
         */
        Task<Transacao> AdicionarAsync(Transacao transacao);

        /* 
         Busca uma transacao pelo ID e, se encontrada, remove ela do banco de dados.
         */
        Task<bool> DeletarAsync(int id);
    }
}