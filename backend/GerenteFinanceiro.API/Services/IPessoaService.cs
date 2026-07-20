using GerenteFinanceiro.API.Models;

namespace GerenteFinanceiro.API.Services
{
    /*
     Interface IPessoaService:
     Define o contrato de operações para a entidade Pessoa
     */
    public interface IPessoaService
    {
        /* 
         Retorna uma lista com todas as pessoas cadastradas no banco de dados. 
         */
        Task<List<Pessoa>> GetAllAsync();

        /* 
         Busca e retorna uma pessoa específica baseada no seu Id. 
         */
        Task<Pessoa> GetByIdAsync(int id);

        /* 
        Pega o objeto pessoa, salva no banco e logo depois ja retorna ele com seu id
         */
        Task<Pessoa> CreateAsync(Pessoa pessoa);

        /* 
         Busca uma pessoa pelo ID e, se encontrada, remove ela do banco de dados.
         */
        Task<bool> DeleteAsync(int id);
    }
}