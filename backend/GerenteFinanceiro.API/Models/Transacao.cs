namespace GerenteFinanceiro.API.Models
{
    public class Transacao
    {
        /*
         A criação sera de fato feita na proxima sprint, o foco agoa é a classe pessoa
         */
        public int Id { get; set; }


        public int PessoaId { get; set; }
        public Pessoa? Pessoa { get; set; }
    }
}