namespace GerenteFinanceiro.API.Models
{
    public class Pessoa
    {
        /*
         Definição dos atributos da classe Pessoa
        Id: Requisito;
        Nome: Requisito;
        Idade: Requisito;
         */
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }

        // Relação 1:N -> Uma pessoa tem uma lista de transações
        public List<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}